import React from 'react';
import { Challenge } from '../types';

interface ChallengesProps {
  challenges: Challenge[];
}

const StarIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);

const Challenges: React.FC<ChallengesProps> = ({ challenges }) => {
  return (
    <div className="bg-white dark:bg-zinc-800/50 p-6 rounded-2xl shadow-lg">
      <h3 className="text-xl font-bold mb-4">Active Challenges</h3>
      <div className="space-y-4">
        {challenges.map((challenge, index) => (
          <div key={index}>
            <div className="flex justify-between items-baseline mb-1">
              <h4 className="font-semibold">{challenge.title}</h4>
              <div className="flex items-center space-x-1 text-yellow-500 dark:text-yellow-400">
                  <StarIcon className="w-4 h-4" />
                  <span className="text-sm font-medium">+{challenge.reward} Points</span>
              </div>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mb-2">{challenge.description}</p>
            <div className="w-full bg-zinc-200 dark:bg-zinc-700 rounded-full h-2.5">
              <div
                className="bg-gradient-to-r from-primary-light to-primary h-2.5 rounded-full"
                style={{ width: `${(challenge.progress / challenge.goal) * 100}%` }}
              ></div>
            </div>
            <p className="text-right text-sm mt-1 text-zinc-500 dark:text-zinc-400">{challenge.progress} / {challenge.goal}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Challenges;