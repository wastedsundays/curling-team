import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LinkButton from '../components/LinkButton';
//eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import {
    fadeInLeft,
    fadeInRight,
    transitions,
    viewportSettings,
    mobileOnly,
    conditionalAnimation
} from '../utilities/AnimationVariants';

import { calculateSeasonStats } from '../utilities/Seasonstats';
// Order and display labels for the computed stats. Values come back from
// calculateSeasonStats() keyed like this; anything null (not enough data
// yet for that stat) renders as '--'.
const COMPUTED_STAT_FIELDS = [
    // { key: 'redRockRecord', label: 'Red Rock Record' },
    // { key: 'blueRockRecord', label: 'Blue Rock Record' },
    { key: 'coinTossRecord', label: 'Coin Toss Record' },
    // { key: 'leagueRecord', label: 'League Record' },
    // { key: 'playoffRecord', label: 'Playoff Record' },
    // { key: 'bonspielsRecord', label: 'Bonspiel Record' },
    // { key: 'hammerEfficiency', label: 'Hammer Efficiency', suffix: '%' },
    // { key: 'forceEfficiency', label: 'Force Efficiency', suffix: '%' },
    // { key: 'stealEfficiency', label: 'Steal Efficiency', suffix: '%' },
    // { key: 'stealDefence', label: 'Steal Defence', suffix: '%' },
    // { key: 'hammerFactor', label: 'Hammer Factor' },
];

function formatComputedStats(seasonStats) {
    return COMPUTED_STAT_FIELDS.map(({ key, label, suffix }) => {
        const value = seasonStats[key];
        return {
            label,
            value: value === null || value === undefined ? '--' : `${value}${suffix ?? ''}`,
        };
    });
}

const StatGrid = () => {
    const [teamInfo, setTeamInfo] = useState(null);
    const [teamResults, setTeamResults] = useState(null);
    const [selectedSeasonId, setSelectedSeasonId] = useState(null);

    useEffect(() => {
        const fetchStatsData = async () => {
            try {
                const [infoResponse, resultsResponse] = await Promise.all([
                    fetch(`${import.meta.env.BASE_URL}/data/team-info.json`),
                    fetch(`${import.meta.env.BASE_URL}/data/team-results.json`),
                ]);
                if (!infoResponse.ok || !resultsResponse.ok) {
                    throw new Error('Failed to fetch stats');
                }
                const infoData = await infoResponse.json();
                const resultsData = await resultsResponse.json();
                setTeamInfo(infoData);
                setTeamResults(resultsData);
 
                const lastActiveSeason = [...resultsData.seasons].reverse().find(season => season.games && season.games.length > 0);
                if (lastActiveSeason) {
                    setSelectedSeasonId(lastActiveSeason.id);
                }
            } catch (error) {
                console.error(error);
            }
        };
 
        fetchStatsData();
    }, []);

    // Function to get animation variant based on index
    const getVariantByIndex = (index) => {
        const isLeft = index % 2 === 0; // Even indices (0, 2) go left, odd indices (1, 3) go right
        const desktopVariant = isLeft ? fadeInLeft : fadeInRight;
        const mobileVariant = mobileOnly.slideUpMinimal; // Same animation for all on mobile
        
        return conditionalAnimation(mobileVariant, desktopVariant);
    };

    const getStaggerDelay = (index) => {
        const row = Math.floor(index / 2);
        return row * 0.1;
    };



    if (!teamResults || !teamInfo) {
        return <div>Loading...</div>;
    }

    const resultsSeason = teamResults.seasons.find(s => s.id === selectedSeasonId);
    const infoSeason = teamInfo.seasons.find(s => s.id === selectedSeasonId);
    const games = resultsSeason?.games ?? [];

        const manualStats = infoSeason?.stats ?? [];
    const computedStats = formatComputedStats(calculateSeasonStats(games));
    const stats = [...manualStats, ...computedStats];

// const games = currentSeason?.games ?? [];
 return (
        <>
        {/* Season Selector */}
            <div className='season-selector'>
                {teamResults.seasons.filter(season => season.games && season.games.length > 0).map(season => (
                    <button
                        key={season.id}
                        className={`season-tab ${season.id === selectedSeasonId ? 'active' : ''}`}
                        onClick={() => {
                            setSelectedSeasonId(season.id);
                            console.log(`Selected season: ${season.id}`);
                        }}
                    >
                        {season.label}
                    </button>
                ))}
            </div>  
            <div className="stat-grid">
                {stats.map((stat, index) => (
                    <motion.div 
                        className="stat-item" 
                        key={stat.label}
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportSettings}
                        variants={getVariantByIndex(index)}
                        transition={{...transitions.smooth,
                            delay: getStaggerDelay(index)
                        }}
                    >
                        <span className="stat-value">{stat.value}</span>
                        <span className="stat-label">{stat.label}</span>
                    </motion.div>
                ))}
            </div>
                    <motion.div 
                        className="stat-item" 
                        initial="hidden"
                        whileInView="visible"
                        viewport={viewportSettings}
                        variants={getVariantByIndex(0)}
                        transition={{...transitions.smooth,
                            delay: getStaggerDelay(0)
                        }}
                    ><LinkButton to="/fancy-stats">See the fancy stats</LinkButton></motion.div>
        </>
    );
};
 
export default StatGrid;
 