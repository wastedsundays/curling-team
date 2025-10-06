import { Link } from 'react-router-dom';
//eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { fadeInUp, 
         viewportSettings,
         viewportSettingsHalf,
         conditionalAnimation,
        //  noAnimation,
         mobileOnly, 
        } from '../utilities/AnimationVariants';
import LinkButton from '../components/LinkButton';
import StatGrid from '../components/StatGrid';
import NeedToKnowSection from '../components/NeedToKnowSection';
import Testimonials from '../components/Testimonials';
import '../styles/home-styles.css';

const HomePage = () => {
  return (
    <div>
        <section className='hero-section'>
            <img className='hero-image' src='https://adamh.ca/slidefamilycurling/images/ai_team_photo.webp' alt='Curling team photo with 4 men in matching uniforms.' />
            <motion.h1 
                className='hero-title'
                variants={conditionalAnimation(mobileOnly.fadeIn, fadeInUp)}
                initial='hidden'
                whileInView='visible'
                viewport={viewportSettings}
                transition='transitions.slow'
                >
                    Slide & The Family Stone
            </motion.h1>
            <h2 className='hero-subtitle'>Curling Funkdamentals</h2>
            <div className='cta-button-group'>
                <LinkButton to='/contact?form=challenge' className='red-button'>Challenge Us</LinkButton>
                <LinkButton to='/about' className='black-button'>Meet The Team</LinkButton>
            </div>
        </section>
        <section className='section-spacing'>
            <StatGrid />
        </section>
        <section className='section-spacing dark-bg-transparent about-section'>
        <div className='split-columns'>
            <h2 className='hide-50rem'>What We're All About</h2>
            <div>
                <h2 className='show-50rem'>What We're All About</h2>
                <p>We're 4 guys who were all in the same Thursday league and thought it would be fun to take on the Monday Open League.</p>
                <p>Sure, our technique is questionable, our strategy meetings are debating whose turn it is to buy drinks and 50/50 tickets. But what we lack in skill, we make up for in determination to have the best possible time on the ice.</p>
                <p>We curl for the love of the game, the friendship, and the inexplicable joy of yelling at a 44 pound slab of granite.</p>

            </div>
            <img src='https://adamh.ca/slidefamilycurling/images/what-were-about.webp' alt='A curling team sweeps a rock while the skip shouts encouragement' />
        </div>
        </section>

        <NeedToKnowSection />

        <section className='section-spacing'>
            <motion.h2 
                className='center-text-700'
                variants={fadeInUp}
                initial='hidden'
                whileInView='visible'
                viewport={viewportSettingsHalf}
                transition='transitions.smooth'
                >
                    What People Are Saying
            </motion.h2>
            <Testimonials />
        </section>
        <section className='section-spacing red-section center-text-700'>
            <motion.h2
                variants={fadeInUp}
                initial='hidden'
                whileInView='visible'
                viewport={viewportSettingsHalf}
                transition='transitions.smooth'
            >
                Ready to Take Us On?
            </motion.h2>
            <p>We promise a good time, questionable curling, and you definitely buying drinks after.</p>
            <div className='cta-button-group'>
                <LinkButton to='/contact?form=challenge' className='black-button'>Challenge Us</LinkButton>
                <LinkButton to='/contact?form=message' className='white-button'>Just Say Hello</LinkButton>
            </div>
        </section>
    </div>
  )
}

export default HomePage
