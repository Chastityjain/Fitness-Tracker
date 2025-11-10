import { User, Workout, LeaderboardEntry, Challenge } from './types';

const chastityJainAvatar = 'https://i.ibb.co/HDBDhnDx/Whats-App-Image-2025-11-11-at-01-36-35-5c8560aa.jpg'
export const mockUser: User = {
  name: 'Chastity Jain',
  avatarUrl: chastityJainAvatar,
  streak: 14,
  level: 23,
  points: 12500,
};

const generateMockWorkouts = (): Workout[] => {
    const workouts: Workout[] = [];
    const today = new Date();
    const exercises: Array<'Push-ups' | 'Squats' | 'Jumping Jacks' | 'Plank'> = ['Squats', 'Push-ups', 'Jumping Jacks', 'Plank'];

    for (let i = 30; i >= 0; i--) {
        const day = new Date(today);
        day.setDate(today.getDate() - i);
        
        const numWorkouts = Math.floor(Math.random() * 3) + 1;
        for (let j = 0; j < numWorkouts; j++) {
            const workoutDate = new Date(day);
            // Give it a random time of day
            workoutDate.setHours(Math.floor(Math.random() * 24));
            workoutDate.setMinutes(Math.floor(Math.random() * 60));

            const exercise = exercises[Math.floor(Math.random() * exercises.length)];
            let workout: Workout;
            if (exercise === 'Plank') {
                const duration = Math.floor(Math.random() * 4) + 1; // 1-5 mins
                workout = {
                    date: workoutDate.toISOString(),
                    exercise,
                    durationMinutes: duration,
                    caloriesBurned: duration * 10,
                };
            } else {
                const reps = Math.floor(Math.random() * 41) + 10; // 10-50 reps
                const duration = Math.floor(reps / 3) + 2;
                workout = {
                    date: workoutDate.toISOString(),
                    exercise,
                    reps,
                    durationMinutes: duration,
                    caloriesBurned: Math.floor(reps * 2.5),
                };
            }
            workouts.push(workout);
        }
    }
    return workouts;
};

export const mockWorkouts: Workout[] = generateMockWorkouts();


export const mockFriendsLeaderboard: LeaderboardEntry[] = [
  { rank: 1, name: 'Sarah Chen', avatarUrl: 'https://picsum.photos/seed/sarah/40/40', points: 15200, isUser: false },
  { rank: 2, name: 'Chastity Jain', avatarUrl: chastityJainAvatar, points: 12500, isUser: true },
  { rank: 3, name: 'Mike Johnson', avatarUrl: 'https://picsum.photos/seed/mike/40/40', points: 11800, isUser: false },
  { rank: 4, name: 'Emily White', avatarUrl: 'https://picsum.photos/seed/emily/40/40', points: 9800, isUser: false },
];

export const mockGlobalLeaderboard: LeaderboardEntry[] = [
    { rank: 1, name: 'Kenji Tanaka', avatarUrl: 'https://picsum.photos/seed/kenji/40/40', points: 35000, isUser: false },
    { rank: 2, name: 'Isabella Rossi', avatarUrl: 'https://picsum.photos/seed/isabella/40/40', points: 34500, isUser: false },
    { rank: 3, name: 'Liam Gallagher', avatarUrl: 'https://picsum.photos/seed/liam/40/40', points: 33000, isUser: false },
    { rank: 57, name: 'Chastity Jain', avatarUrl: chastityJainAvatar, points: 12500, isUser: true },
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