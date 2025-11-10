
import React, { useState } from 'react';
import { LeaderboardEntry } from '../types';
import { mockFriendsLeaderboard, mockGlobalLeaderboard, mockHistoryLeaderboard } from '../constants';

type Tab = 'Friends' | 'Global' | 'History';

const LeaderboardList: React.FC<{ data: LeaderboardEntry[] }> = ({ data }) => (
  <ul className="space-y-3">
    {data.map((entry) => (
      <li key={entry.rank} className={`flex items-center space-x-4 p-2 rounded-lg ${entry.isUser ? 'bg-primary/20' : ''}`}>
        <span className="font-bold text-lg w-6 text-center">{entry.rank}</span>
        <img src={entry.avatarUrl} alt={entry.name} className="w-10 h-10 rounded-full" />
        <span className="flex-grow font-semibold">{entry.name}</span>
        <span className="font-bold text-primary dark:text-primary-light">{entry.points.toLocaleString()}</span>
      </li>
    ))}
  </ul>
);

const HistoryList: React.FC<{data: typeof mockHistoryLeaderboard}> = ({data}) => (
     <ul className="space-y-3">
        {data.map((entry) => (
            <li key={entry.period} className="flex items-center justify-between p-3 rounded-lg bg-zinc-100 dark:bg-zinc-700/50">
                <div>
                    <p className="font-bold">{entry.period}</p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">Champion: {entry.champion}</p>
                </div>
                 <div>
                    <p className="font-semibold text-right">Your Rank: {entry.rank}</p>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 text-right">{entry.points.toLocaleString()} pts</p>
                </div>
            </li>
        ))}
    </ul>
)

const Leaderboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<Tab>('Friends');

  const renderContent = () => {
    switch (activeTab) {
      case 'Friends':
        return <LeaderboardList data={mockFriendsLeaderboard} />;
      case 'Global':
        return <LeaderboardList data={mockGlobalLeaderboard} />;
      case 'History':
        return <HistoryList data={mockHistoryLeaderboard} />;
      default:
        return null;
    }
  };

  const TabButton: React.FC<{tabName: Tab}> = ({ tabName }) => (
    <button
        onClick={() => setActiveTab(tabName)}
        className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${
            activeTab === tabName
            ? 'bg-primary text-white shadow'
            : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
        }`}
    >
        {tabName}
    </button>
  )

  return (
    <div className="bg-white dark:bg-zinc-800/50 p-6 rounded-2xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Leaderboards</h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Resets in 5 days</p>
      </div>
      <div className="flex space-x-2 p-1 bg-zinc-100 dark:bg-zinc-700/50 rounded-full mb-4">
        <TabButton tabName="Friends" />
        <TabButton tabName="Global" />
        <TabButton tabName="History" />
      </div>
      <div className="max-h-80 overflow-y-auto pr-2">
        {renderContent()}
      </div>
    </div>
  );
};

export default Leaderboard;
