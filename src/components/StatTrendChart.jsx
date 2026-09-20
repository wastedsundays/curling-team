import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
 

const StatTrendChart = ({ title, data }) => {
    if (!data || data.length === 0) {
        return <p>No games match these filters yet.</p>;
    }
 
    const chartData = data.map((point, index) => ({
        label: point.date || `Game ${index + 1}`,
        opponent: point.opponent,
        value: point.value,
    }));
 
    return (
        <div className="stat-trend-chart">
            <h3>{title} — Season Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="label" />
                    <YAxis />
                    <Tooltip
                        labelFormatter={(label, payload) => {
                            const opponent = payload?.[0]?.payload?.opponent;
                            return opponent ? `${label} vs ${opponent}` : label;
                        }}
                    />
                    <Line type="monotone" dataKey="value" stroke="#1d4ed8" dot={{ r: 3 }} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default StatTrendChart;