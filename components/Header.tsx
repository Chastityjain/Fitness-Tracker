
import React from 'react';
import { User, Theme } from '../types';

interface HeaderProps {
  user: User;
  theme: Theme;
  toggleTheme: () => void;
}

const SunIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.25a.75.75 0 0 1 .75.75v2.25a.75.75 0 0 1-1.5 0V3a.75.75 0 0 1 .75-.75ZM7.5 12a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM18.697 19.5a.75.75 0 0 0 1.06-1.06l-1.59-1.59a.75.75 0 0 0-1.06 1.06l1.59 1.59ZM21.75 12a.75.75 0 0 1-.75.75h-2.25a.75.75 0 0 1 0-1.5H21a.75.75 0 0 1 .75.75ZM17.25 6.25a.75.75 0 0 0-1.06-1.06L14.596 6.9a.75.75 0 1 0 1.06 1.06l1.594-1.594ZM12 18a.75.75 0 0 0 .75.75v2.25a.75.75 0 0 0-1.5 0V18.75a.75.75 0 0 0 .75-.75ZM4.904 19.5a.75.75 0 0 0 1.06 1.06l1.59-1.59a.75.75 0 0 0-1.06-1.06l-1.59 1.59ZM2.25 12a.75.75 0 0 1 .75-.75h2.25a.75.75 0 0 1 0 1.5H3a.75.75 0 0 1-.75-.75ZM6.25 6.25a.75.75 0 0 0-1.06 1.06L6.9 8.904a.75.75 0 1 0 1.06-1.06L6.25 6.25Z" /></svg>
);

const MoonIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" d="M9.528 1.718a.75.75 0 0 1 .162.819A8.97 8.97 0 0 0 9 6a9 9 0 0 0 9 9 8.97 8.97 0 0 0 3.463-.69.75.75 0 0 1 .981.981A10.503 10.503 0 0 1 18 19.5a10.5 10.5 0 0 1-10.5-10.5A10.503 10.503 0 0 1 9.528 1.718Z" clipRule="evenodd" /></svg>
);

const Header: React.FC<HeaderProps> = ({ user, theme, toggleTheme }) => {
  return (
    <header className="bg-white/70 dark:bg-darkbg/70 backdrop-blur-md sticky top-0 z-50 shadow-md dark:shadow-zinc-800">
      <div className="container mx-auto px-4 md:px-8 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <svg className="w-8 h-8 text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
            <path d="M2 11h2l1.5-3 1.5 3 2-8 2.5 14 2-9h4v-2h2v8h-2v-2h-4l-2 9-2.5-14-2 8-1.5-3-1.5 3h-2v-2zm18.5 1.5v-1c0-.28.22-.5.5-.5h1c.28 0 .5.22.5.5v5c0 .28-.22.5-.5.5h-1c-.28 0-.5-.22-.5-.5v-4z" />
          </svg>
          <h1 className="text-xl md:text-2xl font-bold text-zinc-900 dark:text-zinc-100">Swasth</h1>
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors">
            {theme === 'light' ? <MoonIcon className="w-6 h-6 text-zinc-700" /> : <SunIcon className="w-6 h-6 text-yellow-400" />}
          </button>
          <div className="flex items-center space-x-3">
            <img src={user.avatarUrl} alt={user.name} className="w-10 h-10 rounded-full border-2 border-primary" />
            <div className="hidden md:block">
              <p className="font-semibold">{user.name}</p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Level {user.level}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
