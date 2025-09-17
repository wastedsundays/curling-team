import { useState } from 'react';

import Navigation from './Navigation';
import Logo from '../../assets/slide-family-stone-logo.svg';
import '../../styles/header-styles.css';


const Header = () => {

    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleNav = () => {
        setIsNavOpen(prevState => !prevState);
    }

    return (
        <header>
            <img src={Logo} alt='Slide & The Family Stone Logo' onClick={toggleNav} id='logo' className='logo'/>
            <Navigation isNavOpen={isNavOpen} toggleNav={toggleNav} />
        </header>
    );
};

export default Header;