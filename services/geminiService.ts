import { GoogleGenAI, Chat } from "@google/genai";
import { Workout } from '../types';

let ai: GoogleGenAI;

const getAI = () => {
    if (!ai) {
        if (!process.env.API_KEY) {
            throw new Error("API_KEY environment variable not set");
        }
        ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    }
    return ai;
}

export const createFitnessChatSession = (userHistory: Workout[]): Chat => {
    const historySummary = userHistory
        .slice(-5)
        .map(w => `${w.exercise}: ${w.reps ? `${w.reps} reps` : `${w.durationMinutes} mins`}`)
        .join(', ');
        
    const systemInstruction = `You are Nexus, an elite AI fitness coach. You are motivating, knowledgeable, and you prioritize safety.
Your goal is to help the user on their fitness journey. Keep your responses concise and actionable.
Use simple markdown for formatting, like **bolding** key terms or creating lists with a single \`*\`. Avoid using headers or complex markdown syntax.
The user's recent workouts are: ${historySummary}.
Analyze their recent activity and provide a personalized, encouraging opening message with a suggestion or a question to start the conversation.`;

    const aiInstance = getAI();
    return aiInstance.chats.create({
        model: 'gemini-2.5-flash',
        config: {
            systemInstruction,
            temperature: 0.7,
            topP: 0.9,
        },
    });
};

export const sendMessageToCoach = async (chat: Chat, message: string): Promise<string> => {
    try {
        const response = await chat.sendMessage({ message });
        return response.text;
    } catch (error) {
        console.error("Error sending message to Gemini:", error);
        return "Sorry, I'm having trouble connecting right now. Please try again later.";
    }
};