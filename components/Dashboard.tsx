
import React from 'react';
import { User, Workout } from '../types';
import ProfileSummary from './ProfileSummary';
import Challenges from './Challenges';
import GameSelector from './GameSelector';
import Leaderboard from './Leaderboard';
import ProgressChart from './ProgressChart';
import { mockChallenges } from '../constants';

interface DashboardProps {
  user: User;
  workouts: Workout[];
  onStartWorkout: (gameTitle: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, workouts, onStartWorkout }) => {
  return (
    <div className="space-y-8 animate-fade-in">
      <ProfileSummary user={user} />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <ProgressChart data={workouts} />
          <GameSelector onStartWorkout={onStartWorkout} />
        </div>
        <div className="space-y-8">
          <Challenges challenges={mockChallenges} />
          <Leaderboard />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
