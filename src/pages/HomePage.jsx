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
import HeroImage from '../components/HeroImage';
import LinkButton from '../components/LinkButton';
import StatGrid from '../components/StatGrid';
import HomeAboutSection from '../components/HomeAboutSection';
import NeedToKnowSection from '../components/NeedToKnowSection';
import Testimonials from '../components/Testimonials';
import '../styles/home-styles.css';

const HomePage = () => {
  return (
    <div>
        <section className='hero-section'>
            <HeroImage
                className='hero-image'
                src='https://adamh.ca/slidefamilycurling/images/ai_team_photo.webp'
                alt='Curling team photo with 4 men in matching uniforms.'
            />
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

        <HomeAboutSection />

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
