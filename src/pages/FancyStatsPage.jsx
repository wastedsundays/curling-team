import { useEffect, useState } from 'react';
import StatsPanel from '../components/StatsPanel';
import PointsPerEndTable from '../components/PointsPerEndTable';
import { calculateDashboardStats, calculateRecordsDashboardStats } from '../utilities/Dashboardstats';
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
    { key: 'hammerEfficiency', label: 'Hammer Efficiency', suffix: '%' },
    { key: 'forceEfficiency', label: 'Force Efficiency', suffix: '%' },
    { key: 'stealEfficiency', label: 'Steal Efficiency', suffix: '%' },
    { key: 'stealDefence', label: 'Steal Defence', suffix: '%' },
    { key: 'hammerFactor', label: 'Hammer Factor', suffix: '' },
    { key: 'withoutHammerFactor', label: 'Without Hammer Factor', suffix: '' },
    { key: 'combinedTeamIndex', label: 'Combined Team Index', suffix: '' },
    { key: 'winPercentage', label: 'Win %', suffix: '%' },
    { key: 'teamEfficiency', label: 'Team Efficiency', suffix: '' },
];
 
const RECORDS_STAT_ROWS = [
    { key: 'overallRecord', label: 'Overall Record' },
    { key: 'leagueRecord', label: 'League Record' },
    { key: 'bonspielRecord', label: 'Bonspiel Record' },
    { key: 'playoffRecord', label: 'Playoff Record' },
    { key: 'coinTossRecord', label: 'Coin Toss Record' },
    { key: 'withHammerFirstEndRecord', label: 'Record w/ Hammer, First End' },
    { key: 'withoutHammerFirstEndRecord', label: 'Record w/o Hammer, First End' },
    { key: 'pointsFor', label: 'Points For' },
    { key: 'pointsAgainst', label: 'Points Against' },
    { key: 'avgForPerGame', label: 'Avg For / Game' },
    { key: 'avgAgainstPerGame', label: 'Avg Against / Game' },
    { key: 'avgForPerEnd', label: 'Avg For / End' },
    { key: 'avgAgainstPerEnd', label: 'Avg Against / End' },
];
 
const FancyStatsPage = () => {
    const [teamResults, setTeamResults] = useState(null);
 
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
 
    return (
        <div>
            <section className="section-spacing">
                <h1>Fancy Stats</h1>
            </section>
 
            <StatsPanel
                title="Hammer / Steal Efficiency"
                teamResults={teamResults}
                calculateStats={calculateDashboardStats}
                statRows={HEADLINE_STAT_ROWS}
            />
 
            <StatsPanel
                title="Records & Scoring"
                teamResults={teamResults}
                calculateStats={calculateRecordsDashboardStats}
                statRows={RECORDS_STAT_ROWS}
                renderExtra={(stats) => <PointsPerEndTable pointsPerEnd={stats.pointsPerEnd} />}
            />
        </div>
    );
};
 
export default FancyStatsPage;
 