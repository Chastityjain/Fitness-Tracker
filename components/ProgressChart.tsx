import React, { useState } from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, Label } from 'recharts';
import { Workout } from '../types';

interface ProgressChartProps {
  data: Workout[];
}

type Timeframe = 'Daily' | 'Weekly' | 'Monthly';

const CustomTooltip: React.FC<any> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/80 dark:bg-zinc-800/80 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-zinc-200 dark:border-zinc-700">
        <p className="label font-semibold">{`${label}`}</p>
        <p className="intro text-primary dark:text-primary-light">{`Total Calories: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

const processChartData = (data: Workout[], timeframe: Timeframe) => {
    const aggregatedData: { [key: string]: number } = {};

    if (timeframe === 'Daily') {
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);

        const hoursOfDay = [];
        for (let i = 0; i < 24; i++) {
            const hour = new Date(todayStart);
            hour.setHours(i);
            const key = hour.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }).replace(' ', '');
            aggregatedData[key] = 0;
            hoursOfDay.push(key);
        }

        const todaysWorkouts = data.filter(w => {
            const workoutDate = new Date(w.date);
            return workoutDate >= todayStart && workoutDate <= todayEnd;
        });

        todaysWorkouts.forEach(w => {
            const workoutDate = new Date(w.date);
            const key = workoutDate.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }).replace(' ', '');
            if (aggregatedData.hasOwnProperty(key)) {
                aggregatedData[key] += w.caloriesBurned;
            }
        });
        
        return hoursOfDay.map(hour => ({ name: hour, calories: aggregatedData[hour] }));
    }

    if (timeframe === 'Weekly') {
        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);
        sevenDaysAgo.setHours(0, 0, 0, 0);
        
        const daysOfWeek = [];
        for (let i = 0; i < 7; i++) {
            const date = new Date(sevenDaysAgo);
            date.setDate(sevenDaysAgo.getDate() + i);
            const key = date.toLocaleDateString('en-US', { weekday: 'short' });
            aggregatedData[key] = 0;
            daysOfWeek.push(key);
        }

        data.filter(w => {
            const workoutDate = new Date(w.date);
            return workoutDate >= sevenDaysAgo && workoutDate <= todayEnd;
        }).forEach(w => {
            const key = new Date(w.date).toLocaleDateString('en-US', { weekday: 'short' });
            if (aggregatedData.hasOwnProperty(key)) {
                aggregatedData[key] += w.caloriesBurned;
            }
        });
        
        return daysOfWeek.map(day => ({ name: day, calories: aggregatedData[day] }));

    } else if (timeframe === 'Monthly') {
        const todayEnd = new Date();
        todayEnd.setHours(23, 59, 59, 999);
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 29);
        thirtyDaysAgo.setHours(0, 0, 0, 0);

        const daysOfMonth = [];
        for (let i = 0; i < 30; i++) {
            const date = new Date(thirtyDaysAgo);
            date.setDate(thirtyDaysAgo.getDate() + i);
            const key = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            aggregatedData[key] = 0;
            daysOfMonth.push(key);
        }

        data.filter(w => {
            const workoutDate = new Date(w.date);
            return workoutDate >= thirtyDaysAgo && workoutDate <= todayEnd;
        }).forEach(w => {
            const key = new Date(w.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
            if (aggregatedData.hasOwnProperty(key)) {
                aggregatedData[key] += w.caloriesBurned;
            }
        });

        return daysOfMonth.map(day => ({ name: day, calories: aggregatedData[day] }));
    }

    return Object.entries(aggregatedData).map(([name, calories]) => ({ name, calories }));
};


const ProgressChart: React.FC<ProgressChartProps> = ({ data }) => {
  const [timeframe, setTimeframe] = useState<Timeframe>('Weekly');
  
  const chartData = processChartData(data, timeframe);

  const TimeframeButton: React.FC<{tabName: Timeframe}> = ({ tabName }) => (
    <button
        onClick={() => setTimeframe(tabName)}
        className={`px-3 py-1 text-sm font-semibold rounded-full transition-colors ${
            timeframe === tabName
            ? 'bg-primary text-white shadow'
            : 'text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
        }`}
    >
        {tabName}
    </button>
  );
  
  return (
    <div className="bg-white dark:bg-zinc-800/50 p-6 rounded-2xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">{timeframe} Progress</h3>
        <div className="flex space-x-2 p-1 bg-zinc-100 dark:bg-zinc-700/50 rounded-full">
            <TimeframeButton tabName="Daily" />
            <TimeframeButton tabName="Weekly" />
            <TimeframeButton tabName="Monthly" />
        </div>
      </div>
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 20, bottom: 20 }}>
            <defs>
              <linearGradient id="colorCalories" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0284c7" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#0284c7" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="name" stroke="currentColor" tick={{ fontSize: 12 }}>
                <Label 
                    value={timeframe === 'Daily' ? 'Hour' : timeframe === 'Weekly' ? 'Day' : 'Date'} 
                    offset={-15} 
                    position="insideBottom" 
                    fill="currentColor" />
            </XAxis>
            <YAxis stroke="currentColor" tick={{ fontSize: 12 }}>
                <Label value="Calories Burned" angle={-90} position="insideLeft" style={{ textAnchor: 'middle' }} fill="currentColor" />
            </YAxis>
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