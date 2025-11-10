
import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { Workout } from '../types';

interface ProgressChartProps {
  data: Workout[];
}

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-700">
        <p className="label font-semibold">{`Date: ${label}`}</p>
        <p className="intro text-primary dark:text-primary-light">{`Calories Burned: ${payload[0].value}`}</p>
        <p className="desc text-zinc-600 dark:text-zinc-400">{`Exercise: ${payload[0].payload.exercise}`}</p>
      </div>
    );
  }
  return null;
};

const ProgressChart: React.FC<ProgressChartProps> = ({ data }) => {
  const chartData = data.map(workout => ({
    name: new Date(workout.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    calories: workout.caloriesBurned,
    exercise: workout.exercise
  }));
  
  return (
    <div className="bg-white dark:bg-zinc-800/50 p-6 rounded-2xl shadow-lg">
      <h3 className="text-xl font-bold mb-4">Weekly Progress</h3>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorCalories" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0284c7" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#0284c7" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="name" stroke="currentColor" />
            <YAxis stroke="currentColor" />
            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="calories" stroke="#0284c7" fillOpacity={1} fill="url(#colorCalories)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProgressChart;
