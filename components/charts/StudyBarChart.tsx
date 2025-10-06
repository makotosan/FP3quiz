
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useAppContext } from '../../contexts/AppContext';

const StudyBarChart: React.FC = () => {
    const { history, settings } = useAppContext();
    const isDarkMode = settings.theme === 'dark';
    
    const tickColor = isDarkMode ? '#9ca3af' : '#6b7280';
    const gridColor = isDarkMode ? '#374151' : '#e5e7eb';

    const data = React.useMemo(() => {
        const last7Days = Array.from({ length: 7 }, (_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - i);
            return d.toISOString().split('T')[0];
        }).reverse();

        return last7Days.map(date => ({
            date: `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}`,
            学習時間: history.daily_study_time[date] || 0,
        }));
    }, [history.daily_study_time]);

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} margin={{top: 5, right: 20, left: -10, bottom: 5}}>
                <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
                <XAxis dataKey="date" tick={{ fill: tickColor }} />
                <YAxis unit="分" tick={{ fill: tickColor }} />
                <Tooltip 
                    contentStyle={{
                        backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
                        borderColor: isDarkMode ? '#374151' : '#e5e7eb'
                    }}
                    labelStyle={{ color: isDarkMode ? '#f3f4f6' : '#1f2937' }}
                />
                <Legend wrapperStyle={{ color: tickColor }}/>
                <Bar dataKey="学習時間" fill="#818cf8" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default StudyBarChart;