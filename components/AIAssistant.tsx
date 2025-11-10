
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { createFitnessChatSession, sendMessageToCoach } from '../services/geminiService';
import { Workout } from '../types';
import { Chat } from '@google/genai';

interface AIAssistantProps {
    userHistory: Workout[];
}

const ChatIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M4.848 2.771A49.144 49.144 0 0 1 12 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 0 1-3.476.383.39.39 0 0 0-.297.15l-2.11 2.483a.39.39 0 0 1-.566 0l-2.11-2.483a.39.39 0 0 0-.297-.15 48.9 48.9 0 0 1-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97Z" clipRule="evenodd" /></svg>);
const CloseIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>);
const SendIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" /></svg>);

interface Message {
    sender: 'user' | 'ai';
    text: string;
}

const AIAssistant: React.FC<AIAssistantProps> = ({ userHistory }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatRef = useRef<Chat | null>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages]);

    const initializeChat = useCallback(() => {
        if (!chatRef.current) {
            try {
                chatRef.current = createFitnessChatSession(userHistory);
                setMessages([{ sender: 'ai', text: "Hello! I'm Nexus, your AI Fitness Coach. How can I help you reach your goals today?" }]);
            } catch (error) {
                 setMessages([{ sender: 'ai', text: "Could not initialize AI Coach. Please ensure your API Key is configured." }]);
                 console.error(error);
            }
        }
    }, [userHistory]);
    
    const handleToggle = () => {
        const willOpen = !isOpen;
        setIsOpen(willOpen);
        if(willOpen && messages.length === 0){
             initializeChat();
        }
    }

    const handleSend = async () => {
        if (!input.trim() || isLoading || !chatRef.current) return;

        const userMessage: Message = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const aiResponse = await sendMessageToCoach(chatRef.current, input);
            const aiMessage: Message = { sender: 'ai', text: aiResponse };
            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            const errorMessage: Message = { sender: 'ai', text: 'Sorry, I encountered an error. Please try again.' };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <button
                onClick={handleToggle}
                className="fixed bottom-6 right-6 bg-gradient-to-br from-primary to-primary-dark text-white p-4 rounded-full shadow-2xl z-50 transform hover:scale-110 transition-transform duration-300"
                aria-label="Toggle AI Fitness Coach"
            >
                {isOpen ? <CloseIcon /> : <ChatIcon />}
            </button>
            {isOpen && (
                <div className="fixed bottom-24 right-6 w-[calc(100%-3rem)] max-w-sm h-[70vh] max-h-[500px] bg-white dark:bg-zinc-900 shadow-2xl rounded-2xl flex flex-col z-50 animate-slide-in-up">
                    <header className="p-4 bg-zinc-50 dark:bg-zinc-800 rounded-t-2xl border-b border-zinc-200 dark:border-zinc-700">
                        <h3 className="font-bold text-lg">AI Fitness Coach</h3>
                    </header>
                    <div className="flex-1 p-4 overflow-y-auto">
                        <div className="space-y-4">
                            {messages.map((msg, index) => (
                                <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-primary text-white rounded-br-none' : 'bg-zinc-200 dark:bg-zinc-700 rounded-bl-none'}`}>
                                        <p className="text-sm" dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, '<br />') }}></p>
                                    </div>
                                </div>
                            ))}
                            {isLoading && (
                               <div className="flex justify-start">
                                    <div className="max-w-[80%] p-3 rounded-2xl bg-zinc-200 dark:bg-zinc-700 rounded-bl-none">
                                      <div className="flex items-center space-x-2">
                                        <div className="w-2 h-2 bg-zinc-500 rounded-full animate-pulse"></div>
                                        <div className="w-2 h-2 bg-zinc-500 rounded-full animate-pulse [animation-delay:0.2s]"></div>
                                        <div className="w-2 h-2 bg-zinc-500 rounded-full animate-pulse [animation-delay:0.4s]"></div>
                                      </div>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>
                    </div>
                    <div className="p-4 border-t border-zinc-200 dark:border-zinc-700">
                        <div className="flex items-center space-x-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                placeholder="Ask for workout advice..."
                                className="w-full bg-zinc-100 dark:bg-zinc-800 border-transparent focus:border-primary focus:ring-primary rounded-full py-2 px-4"
                                disabled={isLoading}
                            />
                            <button onClick={handleSend} disabled={isLoading} className="bg-primary text-white p-2 rounded-full disabled:opacity-50">
                                <SendIcon />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AIAssistant;
