
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useAppContext } from '../../contexts/AppContext';

const HistoryLineChart: React.FC = () => {
    const { history } = useAppContext();

    const data = React.useMemo(() => {
        const last30Days = Array.from({ length: 30 }, (_, i) => {
            const d = new Date();
            d.setDate(d.getDate() - i);
            return d.toISOString().split('T')[0];
        }).reverse();

        return last30Days.map(date => ({
            date: `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}`,
            正答率: history.daily_correct_rate[date] || 0,
        }));
    }, [history.daily_correct_rate]);

    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis unit="%" domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="正答率" stroke="#4f46e5" strokeWidth={2} activeDot={{ r: 8 }} />
            </LineChart>
        </ResponsiveContainer>
    );
};

export default HistoryLineChart;
