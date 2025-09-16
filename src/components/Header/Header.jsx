import { useState } from 'react';

import Navigation from './Navigation';


const Header = () => {

    const [isNavOpen, setIsNavOpen] = useState(false);

    const toggleNav = () => {
        setIsNavOpen(prevState => !prevState);
    }

    return (
        <header>
            <img src='https://picsum.photos/100/70' alt='placeholder logo' onClick={toggleNav} id='logo' className='logo'/>
            <Navigation isNavOpen={isNavOpen} toggleNav={toggleNav} />
        </header>
    );
};

export default Header;