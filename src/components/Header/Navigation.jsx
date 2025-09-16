import { Link } from 'react-router-dom';

const Navigation = ({ isNavOpen, toggleNav }) => {

    const handleLinkClick = () => {
        toggleNav();
    }

    return (
        <nav className={isNavOpen ? 'open' : ''}>
            <ul className='nav-links'>
                <li><Link to='/' onClick={handleLinkClick}>Home</Link></li>
                <li><Link to='/about' onClick={handleLinkClick}>About</Link></li>
                <li><Link to='/results' onClick={handleLinkClick}>Results</Link></li>
                <li><Link to='/contact' onClick={handleLinkClick}>Contact</Link></li>
            </ul>
        </nav>
    );
};

export default Navigation;