import { useMemo } from 'react';
import { filterGames } from '../utilities/Dashboardstats';

// Controlled filter bar - the parent owns `filters` state, this just renders
// inputs for it and reports changes back via onChange({ ...patch }).
const DashboardFilters = ({ seasons, filters, onChange }) => {
    const { seasonId = '', opponent = '', rockColor = '' } = filters;

    // Opponent list narrows to whichever season is selected, so you're not
    // offered a team you never played that year.
    const opponentOptions = useMemo(() => {
        const games = filterGames(seasons, { seasonId: seasonId || undefined });
        const names = new Set(games.map((g) => g.opponent).filter(Boolean));
        return Array.from(names).sort();
    }, [seasons, seasonId]);

    const update = (patch) => onChange({ ...filters, ...patch });

    return (
        <div className="dashboard-filters">
            <label>
                Season
                <select
                    value={seasonId}
                    onChange={(e) =>
                        // Clear opponent too - the previously-selected opponent may
                        // not exist in the newly-selected season.
                        update({ seasonId: e.target.value || undefined, opponent: undefined })
                    }
                >
                    <option value="">All Seasons</option>
                    {seasons
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
                <select value={opponent} onChange={(e) => update({ opponent: e.target.value || undefined })}>
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
                <select value={rockColor} onChange={(e) => update({ rockColor: e.target.value || undefined })}>
                    <option value="">Both</option>
                    <option value="red">Red</option>
                    <option value="blue">Blue</option>
                </select>
            </label>
        </div>
    );
};

export default DashboardFilters;