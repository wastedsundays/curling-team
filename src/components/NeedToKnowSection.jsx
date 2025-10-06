import { Link } from 'react-router-dom';
//eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { fadeInUp, 

         viewportSettingsHalf,

        } from '../utilities/AnimationVariants';

const NeedToKnowSection = () => {


    return (
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
    );
};

export default NeedToKnowSection;