import { useEffect, useState } from 'react';

const StatGrid = () => {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const fetchStatsData = async () => {
            try {
                const response = await fetch('data/team-info.json');
                if (!response.ok) {
                    throw new Error('Failed to fetch stats');
                }
                const data = await response.json();
                setStats(data.stats);
            } catch (error) {
                console.error(error);
            }
        };

        fetchStatsData();
    }, []);

    if (!stats) {
        return <div>Loading...</div>;
    }

    return (
        <div className="stat-grid">
            {stats.map((stat) => (
                <div className="stat-item" key={stat.label}>
                    <span className="stat-value">{stat.value}</span>
                    <span className="stat-label">{stat.label}</span>
                </div>
            ))}
        </div>
    );
};

export default StatGrid;
