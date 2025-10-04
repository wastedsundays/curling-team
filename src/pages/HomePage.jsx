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
                transition='transitions.slow'>
                    <h1>Slide & The Family Stone</h1>
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
        <section className='section-spacing'>
            <motion.h2 
                className='center-text-700'
                variants={fadeInUp}
                initial='hidden'
                whileInView='visible'
                viewport={viewportSettingsHalf}
                transition='transitions.smooth'
                >
                    Everything You Need to Know
            </motion.h2>
            <div className='need-to-know-grid'>
                <Link to = '/about'>
                    <article className='need-to-know-article'>
                        <img src='https://adamh.ca/slidefamilycurling/images/meet-the-team-image.webp' alt='A comic book style illustration of the curling team in superhero uniforms' />
                        <h3>Meet the Team</h3>
                        <p>Get to know the people responsible for this beautiful disaster.</p>
                        <p className='red-text'>Learn About Us {'>'}</p>
                    </article>
                </Link>
                <Link to = '/results'>
                <article className='need-to-know-article'>
                    <img src='https://adamh.ca/slidefamilycurling/images/results-link-image.webp' alt='An empty curling club with sheets and a scoreboard' />
                    <h3>Results</h3>
                    <p>Check out our schedule and see how we're doing this season.</p>
                    <p className='red-text'>See Our Results {'>'}</p>
                </article>
                </Link>
                <Link to = '/contact'>
                    <article className='need-to-know-article'>
                        <img src='https://adamh.ca/slidefamilycurling/images/get-in-touch-image.webp' alt='A curler yelling at his sweepers' />
                        <h3>Get in Touch</h3>
                        <p>Questions about our technique? Want to challenge us? Good communication is important in curling.</p>
                        <p className='red-text'>Contact Us {'>'}</p>
                    </article>
                </Link>
            </div>
        </section>
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
