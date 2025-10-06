// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { fadeInLeft,
            fadeInRight,
            transitions,
            viewportSettingsThird,
            mobileOnly,
            conditionalAnimation
         } from '../utilities/AnimationVariants';  


const HomeAboutSection = () => {

    const textVariant = conditionalAnimation(mobileOnly.slideUpMinimal, fadeInLeft);
    const imageVariant = conditionalAnimation(mobileOnly.slideUpMinimal, fadeInRight);

  return (
    <section className='section-spacing dark-bg-transparent about-section'>
        <div className='split-columns'>
            <h2 className='hide-50rem'>What We're All About</h2>
            <motion.div
                initial='hidden'
                whileInView='visible'
                viewport={viewportSettingsThird}
                variants={textVariant}
                transition={transitions.smooth}
            >
                <h2 className='show-50rem'>What We're All About</h2>
                <p>We're 4 guys who were all in the same Thursday league and thought it would be fun to take on the Monday Open League.</p>
                <p>Sure, our technique is questionable, our strategy meetings are debating whose turn it is to buy drinks and 50/50 tickets. But what we lack in skill, we make up for in determination to have the best possible time on the ice.</p>
                <p>We curl for the love of the game, the friendship, and the inexplicable joy of yelling at a 44 pound slab of granite.</p>

            </motion.div>
            <motion.img 
                initial='hidden'
                whileInView='visible'
                viewport={viewportSettingsThird}
                variants={imageVariant}
                transition={transitions.smooth}
        
                src='https://adamh.ca/slidefamilycurling/images/what-were-about.webp' alt='A curling team sweeps a rock while the skip shouts encouragement' />
        </div>
    </section>
    );
};

export default HomeAboutSection;