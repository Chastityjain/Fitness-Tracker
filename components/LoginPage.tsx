import React, { useState } from 'react';
import Logo from './Logo';

interface LoginPageProps {
  onLogin: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() === '' || password.trim() === '') {
      setError('Please fill out all fields.');
      return;
    }
    if (!isLoginView && password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    setError('');
    onLogin();
  };

  return (
    <div className="flex items-center justify-center min-h-screen animate-fade-in">
      <div className="w-full max-w-md p-8 space-y-8 bg-white dark:bg-zinc-800/50 rounded-2xl shadow-2xl">
        <div className="text-center">
          <Logo className="w-12 h-12 mx-auto" />
          <h1 className="mt-4 text-3xl font-bold text-zinc-900 dark:text-zinc-100">
            {isLoginView ? 'Welcome Back' : 'Create an Account'}
          </h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">Your next-generation AI fitness partner.</p>
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Email address
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm placeholder-zinc-400 focus:outline-none focus:ring-primary focus:border-primary bg-zinc-50 dark:bg-zinc-700"
                placeholder="you@example.com"
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete={isLoginView ? 'current-password' : 'new-password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm placeholder-zinc-400 focus:outline-none focus:ring-primary focus:border-primary bg-zinc-50 dark:bg-zinc-700"
                placeholder="••••••••"
              />
            </div>
          </div>
          
          {!isLoginView && (
            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Confirm Password
              </label>
              <div className="mt-1">
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-zinc-300 dark:border-zinc-600 rounded-md shadow-sm placeholder-zinc-400 focus:outline-none focus:ring-primary focus:border-primary bg-zinc-50 dark:bg-zinc-700"
                  placeholder="••••••••"
                />
              </div>
            </div>
          )}
          
          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-light transition-colors duration-300"
            >
              {isLoginView ? 'Sign in' : 'Create Account'}
            </button>
          </div>
        </form>
        <p className="text-center text-sm text-zinc-500 dark:text-zinc-400">
          {isLoginView ? "Don't have an account? " : 'Already have an account? '}
          <button 
            type="button" 
            onClick={() => {
                setIsLoginView(!isLoginView);
                setError('');
            }} 
            className="font-medium text-primary hover:text-primary-dark"
          >
            {isLoginView ? 'Sign up' : 'Sign in'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
