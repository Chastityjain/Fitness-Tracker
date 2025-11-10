import { User, Workout, LeaderboardEntry, Challenge } from './types';

export const mockUser: User = {
  name: 'Alex Ryder',
  avatarUrl: 'https://picsum.photos/seed/alexryder/100/100',
  streak: 14,
  level: 23,
  points: 12500,
};

export const mockWorkouts: Workout[] = [
  { date: '2024-07-20', exercise: 'Squats', reps: 50, durationMinutes: 15, caloriesBurned: 150 },
  { date: '2024-07-21', exercise: 'Push-ups', reps: 30, durationMinutes: 10, caloriesBurned: 100 },
  { date: '2024-07-22', exercise: 'Jumping Jacks', durationMinutes: 20, caloriesBurned: 250 },
  { date: '2024-07-23', exercise: 'Plank', durationMinutes: 5, caloriesBurned: 50 },
  { date: '2024-07-24', exercise: 'Squats', reps: 60, durationMinutes: 18, caloriesBurned: 180 },
  { date: '2024-07-25', exercise: 'Push-ups', reps: 35, durationMinutes: 12, caloriesBurned: 120 },
  { date: '2024-07-26', exercise: 'Jumping Jacks', durationMinutes: 25, caloriesBurned: 300 },
];

export const mockFriendsLeaderboard: LeaderboardEntry[] = [
  { rank: 1, name: 'Sarah Chen', avatarUrl: 'https://picsum.photos/seed/sarah/40/40', points: 15200, isUser: false },
  { rank: 2, name: 'Alex Ryder', avatarUrl: 'https://picsum.photos/seed/alexryder/40/40', points: 12500, isUser: true },
  { rank: 3, name: 'Mike Johnson', avatarUrl: 'https://picsum.photos/seed/mike/40/40', points: 11800, isUser: false },
  { rank: 4, name: 'Emily White', avatarUrl: 'https://picsum.photos/seed/emily/40/40', points: 9800, isUser: false },
];

export const mockGlobalLeaderboard: LeaderboardEntry[] = [
    { rank: 1, name: 'Kenji Tanaka', avatarUrl: 'https://picsum.photos/seed/kenji/40/40', points: 35000, isUser: false },
    { rank: 2, name: 'Isabella Rossi', avatarUrl: 'https://picsum.photos/seed/isabella/40/40', points: 34500, isUser: false },
    { rank: 3, name: 'Liam Gallagher', avatarUrl: 'https://picsum.photos/seed/liam/40/40', points: 33000, isUser: false },
    { rank: 57, name: 'Alex Ryder', avatarUrl: 'https://picsum.photos/seed/alexryder/40/40', points: 12500, isUser: true },
];

export const mockHistoryLeaderboard: { period: string, rank: number, champion: string, points: number }[] = [
    { period: 'June 2024', rank: 5, champion: 'Sarah Chen', points: 55000 },
    { period: 'May 2024', rank: 8, champion: 'Kenji Tanaka', points: 49000 },
    { period: 'April 2024', rank: 3, champion: 'Kenji Tanaka', points: 61000 },
];

export const mockChallenges: Challenge[] = [
    { title: 'Daily Squat Challenge', description: 'Perform 100 squats today', progress: 60, goal: 100, reward: 50 },
    { title: 'Weekly Cardio Goal', description: 'Burn 1500 calories this week', progress: 950, goal: 1500, reward: 200 },
    { title: 'Team Push-up Power', description: 'Your team needs to complete 1000 push-ups', progress: 750, goal: 1000, reward: 500, isTeamChallenge: true },
];