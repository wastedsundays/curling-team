import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';


import '../styles/footer-styles.css';

const Footer = () => {

    const [quote, setQuote] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const fetchQuote = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/data/footer-jokes.json`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const randomIndex = Math.floor(Math.random() * data.jokes.length);
                setQuote(data.jokes[randomIndex]);
            } catch (error) {
                console.error('Error fetching quote:', error);
            }

        }
        fetchQuote();
    }, [location]);

    return (
        <footer className='dark-bg-transparent'>
            <div className='footer-details'>
                <p className='footer-copy'>&copy; {new Date().getFullYear()} Slide & the Family Stone</p>
                <p className='footer-website'>Website by Adam H</p>
                <p className='footer-club'>Proudly curling at Marpole Curling Club.</p>
            </div>
            <div className='footer-joke'>
                <p>{quote}</p>
            </div>
        </footer>
    )
}

export default Footer;