
import React from 'react';
import { User } from '../types';

interface ProfileSummaryProps {
  user: User;
}

const FireIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 2a7.987 7.987 0 00-6.113 2.87C2.17 6.845 2 8.89 2 11c0 2.11.17 4.155 1.887 6.13A8.003 8.003 0 0010 20a8.003 8.003 0 006.113-2.87C17.83 15.155 18 13.11 18 11c0-2.11-.17-4.155-1.887-6.13A7.987 7.987 0 0010 2zm0 14a6 6 0 100-12 6 6 0 000 12z" clipRule="evenodd" />
        <path d="M10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 6a1 1 0 100 2 1 1 0 000-2z" />
        <path d="M12.293 7.293a1 1 0 011.414 0l2 2a1 1 0 01-1.414 1.414L13 9.414V13a1 1 0 11-2 0V9.414l-1.293 1.293a1 1 0 01-1.414-1.414l2-2z" />
    </svg>
);

const StarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
);


const ProfileSummary: React.FC<ProfileSummaryProps> = ({ user }) => {
  return (
    <div className="bg-white dark:bg-zinc-800/50 p-6 rounded-2xl shadow-lg animate-slide-in-up">
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
        <img src={user.avatarUrl} alt={user.name} className="w-24 h-24 rounded-full border-4 border-primary-light shadow-md" />
        <div>
          <h2 className="text-3xl font-bold text-center sm:text-left">{user.name}</h2>
          <p className="text-zinc-500 dark:text-zinc-400 text-center sm:text-left">Welcome back! Keep up the great work.</p>
        </div>
        <div className="flex-grow flex justify-center sm:justify-end space-x-6 pt-4 sm:pt-0">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2">
                <FireIcon />
                <span className="text-3xl font-bold text-orange-500">{user.streak}</span>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Day Streak</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2">
                <StarIcon />
                <span className="text-3xl font-bold text-yellow-400">{user.points.toLocaleString()}</span>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">Total Points</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSummary;
