import type { ReactElement } from 'react';

export type Theme = 'light' | 'dark';

export interface User {
  name: string;
  avatarUrl: string;
  streak: number;
  level: number;
  points: number;
}

export interface Workout {
  date: string; // YYYY-MM-DD
  exercise: 'Push-ups' | 'Squats' | 'Jumping Jacks' | 'Plank';
  durationMinutes: number;
  reps?: number;
  caloriesBurned: number;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  avatarUrl:string;
  points: number;
  isUser: boolean;
}

export interface Challenge {
  title: string;
  description: string;
  progress: number;
  goal: number;
  reward: number; // Changed from string to number
  isTeamChallenge?: boolean;
}

export interface Game {
    title: string;
    description: string;
    // Fix: Use ReactElement to avoid JSX namespace error in a .ts file.
    icon: ReactElement;
}