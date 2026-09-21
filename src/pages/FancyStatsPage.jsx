import { useEffect, useState } from 'react';
import DashboardFilters from '../components/DashboardFilters';
// import StatTileGrid from '../components/xxxStatTileGrid';
import StatsPanel from '../components/StatsPanel';
import PointsPerEndTable from '../components/PointsPerEndTable';
import StatTrendChart from '../components/StatTrendChart';
import { calculateAllDashboardStats, calculateStatTrend } from '../utilities/Dashboardstats';

import '../styles/stats-styles.css';
// eslint-disable-next-line no-unused-vars
// import { motion } from 'framer-motion';
// import { fadeInLeft,
//             fadeInRight,
//             fadeInUp,
//             // viewportSettingsHalf,
//             transitions,
//             viewportSettingsThird,
//             mobileOnly,
//             conditionalAnimation
//          } from '../utilities/AnimationVariants';



// import '../styles/about-styles.css';


const HEADLINE_STAT_ROWS = [
    { key: 'hammerEfficiency', label: 'Hammer Efficiency', decimals: 3, chartable: true },
    { key: 'forceEfficiency', label: 'Force Efficiency', decimals: 3, chartable: true },
    { key: 'stealEfficiency', label: 'Steal Efficiency', decimals: 3, chartable: true },
    { key: 'stealDefence', label: 'Steal Defence', decimals: 3, chartable: true },
    { key: 'hammerFactor', label: 'Hammer Factor', decimals: 3, chartable: true },
    { key: 'withoutHammerFactor', label: 'Without Hammer Factor', decimals: 3, chartable: true },
    { key: 'combinedTeamIndex', label: 'Combined Team Index', decimals: 3, chartable: true },
    { key: 'winPercentage', label: 'Win %', decimals: 3, chartable: true },
    { key: 'teamEfficiency', label: 'Team Efficiency', decimals: 3, chartable: true },
];

const RECORDS_STAT_ROWS = [
    { key: 'overallRecord', label: 'Overall Record' },
    { key: 'leagueRecord', label: 'League Record' },
    { key: 'bonspielRecord', label: 'Bonspiel Record' },
    { key: 'playoffRecord', label: 'Playoff Record' },
    { key: 'coinTossRecord', label: 'Coin Toss Record' },
    { key: 'withHammerFirstEndRecord', label: 'Record w/ Hammer, First End' },
    { key: 'withoutHammerFirstEndRecord', label: 'Record w/o Hammer, First End' },
];

const SCORING_STAT_ROWS = [
    { key: 'pointsFor', label: 'Points For', chartable: true },
    { key: 'pointsAgainst', label: 'Points Against', chartable: true },
    { key: 'avgForPerGame', label: 'Avg For / Game', chartable: true },
    { key: 'avgAgainstPerGame', label: 'Avg Against / Game', chartable: true },
    { key: 'avgForPerEnd', label: 'Avg For / End', chartable: true },
    { key: 'avgAgainstPerEnd', label: 'Avg Against / End', chartable: true },
];

const STAT_LABELS = Object.fromEntries(
    [...HEADLINE_STAT_ROWS, ...RECORDS_STAT_ROWS, ...SCORING_STAT_ROWS].map((row) => [row.key, row.label])
);
 
const FancyStatsPage = () => {
    const [teamResults, setTeamResults] = useState(null);
    const [filters, setFilters] = useState({});
    const [selectedStatKey, setSelectedStatKey] = useState(null);

 
    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await fetch(`${import.meta.env.BASE_URL}/data/team-results.json`);
                if (!response.ok) {
                    throw new Error('Failed to fetch results');
                }
                const data = await response.json();
                setTeamResults(data);
            } catch (error) {
                console.error(error);
            }
        };
 
        fetchResults();
    }, []);
 
    if (!teamResults) {
        return <div>Loading...</div>;
    }

    const stats = calculateAllDashboardStats(teamResults.seasons, filters);
    const trendData = selectedStatKey ? calculateStatTrend(teamResults.seasons, filters, selectedStatKey) : null;

 
    return (
        <div>
            <section className="section-spacing">
                <h1>Fancy Stats</h1>

            </section>
            <DashboardFilters seasons={teamResults.seasons} filters={filters} onChange={setFilters} />
            <StatsPanel
                title="Records"
                stats={stats}
                statRows={RECORDS_STAT_ROWS}
                onStatClick={setSelectedStatKey}
                selectedKey={selectedStatKey}
            />

            <StatsPanel
                title="Team Stats"
                stats={stats}
                statRows={HEADLINE_STAT_ROWS}
                onStatClick={setSelectedStatKey}
                selectedKey={selectedStatKey}
            />

            <StatsPanel
                title="Scoring Stats"
                stats={stats}
                statRows={SCORING_STAT_ROWS}
                onStatClick={setSelectedStatKey}
                selectedKey={selectedStatKey}
            />



            {selectedStatKey && (
                <section className="section-spacing">
                    <StatTrendChart title={STAT_LABELS[selectedStatKey]} data={trendData} />
                </section>
            )}

            <section className="section-spacing">
                <PointsPerEndTable pointsPerEnd={stats.pointsPerEnd} />
            </section>
 
        </div>
    );
};
 
export default FancyStatsPage;
 