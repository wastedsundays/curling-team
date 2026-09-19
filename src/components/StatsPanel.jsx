import { useMemo, useState } from 'react';
import { filterGames } from '../utilities/Dashboardstats';

const StatsPanel = ({ title, teamResults, calculateStats, statRows, renderExtra }) => {
    const [seasonId, setSeasonId] = useState('');
    const [opponent, setOpponent] = useState('');
    const [rockColor, setRockColor] = useState('');

    const opponentOptions = useMemo(() => {
        const games = filterGames(teamResults.seasons, { seasonId: seasonId || undefined });
        const names = new Set(games.map((g) => g.opponent).filter(Boolean));
        return Array.from(names).sort();
    }, [teamResults, seasonId]);

    const filters = { 
        seasonId: seasonId || undefined,
        opponent: opponent || undefined,
        rockColor: rockColor || undefined,
    };
    const games = filterGames(teamResults.seasons, filters);
    const stats = calculateStats(teamResults.seasons, filters);

     return (
        <section className="section-spacing">
            <h2>{title}</h2>
 
            <div className="dashboard-filters">
                <label>
                    Season
                    <select value={seasonId} onChange={(e) => setSeasonId(e.target.value)}>
                        <option value="">All Seasons</option>
                        {teamResults.seasons
                            .filter((s) => s.games && s.games.length > 0)
                            .map((s) => (
                                <option key={s.id} value={s.id}>
                                    {s.label}
                                </option>
                            ))}
                    </select>
                </label>
 
                <label>
                    Opponent
                    <select value={opponent} onChange={(e) => setOpponent(e.target.value)}>
                        <option value="">All Opponents</option>
                        {opponentOptions.map((name) => (
                            <option key={name} value={name}>
                                {name}
                            </option>
                        ))}
                    </select>
                </label>
 
                <label>
                    Rock Color
                    <select value={rockColor} onChange={(e) => setRockColor(e.target.value)}>
                        <option value="">Both</option>
                        <option value="red">Red</option>
                        <option value="blue">Blue</option>
                    </select>
                </label>
            </div>
 
            <p className="dashboard-game-count">
                {games.length} game{games.length === 1 ? '' : 's'} matching these filters
            </p>
 
            <div className="stat-grid">
                {statRows.map(({ key, label, suffix }) => {
                    const value = stats[key];
                    return (
                        <div className="stat-item" key={key}>
                            <span className="stat-value">
                                {value === null || value === undefined ? '--' : `${value}${suffix ?? ''}`}
                            </span>
                            <span className="stat-label">{label}</span>
                        </div>
                    );
                })}
            </div>
 
            {renderExtra ? renderExtra(stats, games) : null}
        </section>
    );
};
 
export default StatsPanel;