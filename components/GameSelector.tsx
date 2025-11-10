
import React from 'react';
import { Game } from '../types';

interface GameSelectorProps {
  onStartWorkout: (gameTitle: string) => void;
}

const SquatIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>);
const PlankIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h8a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.8 11.25l1.25.417M16.2 11.25l-1.25.417M12 11.25v2.5M12 17v-2.5" /></svg>);
const JumpIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-4l-3 3-3-3z" /></svg>);

const games: Game[] = [
    { title: 'Squat Race', description: 'Race against others by squatting.', icon: <SquatIcon /> },
    { title: 'Plank Duel', description: 'Hold a plank to outlast your opponent.', icon: <PlankIcon /> },
    { title: 'Jump Wars', description: 'Jump to collect points and win.', icon: <JumpIcon /> },
];

const GameCard: React.FC<{ game: Game; onSelect: (title: string) => void }> = ({ game, onSelect }) => (
    <div 
      className="bg-gradient-to-br from-primary to-primary-dark p-6 rounded-2xl shadow-lg cursor-pointer transform hover:scale-105 transition-transform duration-300 flex flex-col items-center text-center text-white"
      onClick={() => onSelect(game.title)}
    >
        {game.icon}
        <h4 className="text-xl font-bold mt-4">{game.title}</h4>
        <p className="text-sm mt-1 opacity-80">{game.description}</p>
    </div>
);

const GameSelector: React.FC<GameSelectorProps> = ({ onStartWorkout }) => {
  return (
    <div className="bg-white dark:bg-zinc-800/50 p-6 rounded-2xl shadow-lg">
      <h3 className="text-xl font-bold mb-4">Start a Fitness Game</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {games.map(game => (
          <GameCard key={game.title} game={game} onSelect={onStartWorkout} />
        ))}
      </div>
    </div>
  );
};

export default GameSelector;
