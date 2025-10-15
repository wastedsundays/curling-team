import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Navigation = ({ isNavOpen, toggleNav }) => {

    const location = useLocation();
    const [activeTab, setActiveTab] = useState(0);

    useEffect(() => {
        switch (true) {
            case location.pathname === '/':
                setActiveTab(0);
                break;
            case location.pathname === '/about':
                setActiveTab(1);
                break;
            case location.pathname === '/results':
                setActiveTab(2);
                break;
            case location.pathname === '/contact':
                setActiveTab(3);
                break;
            default:
                setActiveTab(null);
                break;
        }
    }, [location]);

    const handleLinkClick = () => {
        toggleNav();
    }

    return (
        <nav className={isNavOpen ? 'open' : ''}>
            <ul className='nav-links'>
                <li className={activeTab === 0 ? 'active-header-link' : 'header-link'}><Link to='/' onClick={handleLinkClick}>Home</Link></li>
                <li className={activeTab === 1 ? 'active-header-link' : 'header-link'}><Link to='/about' onClick={handleLinkClick}>About</Link></li>
                <li className={activeTab === 2 ? 'active-header-link' : 'header-link'}><Link to='/results' onClick={handleLinkClick}>Results</Link></li>
                <li className={activeTab === 3 ? 'active-header-link' : 'header-link'}><Link to='/contact' onClick={handleLinkClick}>Contact</Link></li>
            </ul>
        </nav>
    );
};

export default Navigation;