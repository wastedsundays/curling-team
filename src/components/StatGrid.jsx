import { useEffect, useState } from 'react';
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


const StatGrid = () => {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        const fetchStatsData = async () => {
            try {
                // const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/data/team-info.json`);
                const response = await fetch(`${import.meta.env.BASE_URL}/data/team-info.json`);
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


    if (!stats) {
        return <div>Loading...</div>;
    }

    return (
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
    );
};

export default StatGrid;
