import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';



import '../styles/footer-styles.css';

const Footer = () => {

    const [quote, setQuote] = useState(null);
    const location = useLocation();
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        const fetchQuote = async () => {
            try {
                const response = await fetch(`${import.meta.env.BASE_URL}/data/footer-jokes.json`);
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

    useEffect(() => {
        switch (true) {
            case location.pathname  === '/':
                setActiveTab(0);
                break;
            case location.pathname  === '/about':
                setActiveTab(1);
                break;
            case location.pathname  === '/results':
                setActiveTab(2);
                break;
            case location.pathname  === '/contact':
                setActiveTab(3);
                break;
            default:
                setActiveTab(null);
                break;
            }
        }, [location])

    return (
        <footer className='dark-bg-transparent'>
            <nav className='footer-nav'>
                <ul>
                    <li className={activeTab === 0 ? 'active-footer-link' : 'footer-link'}><Link to='/' className='footer-link'>Home</Link></li>
                    <li className={activeTab === 1 ? 'active-footer-link' : 'footer-link'}><Link to='/about' className='footer-link'>About</Link></li>
                    <li className={activeTab === 2 ? 'active-footer-link' : 'footer-link'}><Link to='/results' className='footer-link'>Results</Link></li>
                    <li className={activeTab === 3 ? 'active-footer-link' : 'footer-link'}><Link to='/contact' className='footer-link'>Contact</Link></li>
                </ul>
            </nav>
                
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