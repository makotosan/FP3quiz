
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useAppContext } from '../../contexts/AppContext';

const StudyBarChart: React.FC = () => {
    const { history } = useAppContext();
    
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
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis unit="分" />
                <Tooltip />
                <Legend />
                <Bar dataKey="学習時間" fill="#818cf8" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default StudyBarChart;
