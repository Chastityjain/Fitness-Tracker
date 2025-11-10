import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import AIAssistant from './components/AIAssistant';
import WorkoutTracker from './components/WorkoutTracker';
import LoginPage from './components/LoginPage';
import { Theme } from './types';
import { mockUser, mockWorkouts } from './constants';

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedTheme = window.localStorage.getItem('theme') as Theme;
      return storedTheme || 'light';
    }
    return 'light';
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isWorkoutActive, setIsWorkoutActive] = useState(false);
  const [activeWorkout, setActiveWorkout] = useState<string | null>(null);

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  }, []);

  const handleLogin = useCallback(() => {
    setIsAuthenticated(true);
  }, []);

  const handleLogout = useCallback(() => {
    setIsAuthenticated(false);
  }, []);

  const handleStartWorkout = useCallback((gameTitle: string) => {
    setActiveWorkout(gameTitle);
    setIsWorkoutActive(true);
  }, []);

  const handleEndWorkout = useCallback(() => {
    setIsWorkoutActive(false);
    setActiveWorkout(null);
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(theme === 'light' ? 'dark' : 'light');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  if (!isAuthenticated) {
    return (
       <div className="min-h-screen bg-lightbg dark:bg-darkbg text-zinc-800 dark:text-zinc-200 transition-colors duration-300 font-sans">
            <LoginPage onLogin={handleLogin} />
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-lightbg dark:bg-darkbg text-zinc-800 dark:text-zinc-200 transition-colors duration-300 font-sans">
      <Header user={mockUser} theme={theme} toggleTheme={toggleTheme} onLogout={handleLogout} />
      <main className="p-4 md:p-8">
        {isWorkoutActive && activeWorkout ? (
          <WorkoutTracker workoutTitle={activeWorkout} onEndWorkout={handleEndWorkout} />
        ) : (
          <Dashboard user={mockUser} workouts={mockWorkouts} onStartWorkout={handleStartWorkout} />
        )}
      </main>
      {!isWorkoutActive && <AIAssistant userHistory={mockWorkouts} />}
    </div>
  );
};

export default App;