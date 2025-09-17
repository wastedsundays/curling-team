import '../styles/footer-styles.css';

const Footer = () => {
    return (
        <footer className='dark-bg-transparent'>
            <div className='footer-details'>
                <p className='footer-copy'>&copy; {new Date().getFullYear()} Slide & the Family Stone</p>
                <p className='footer-website'>Website by Adam H</p>
                <p className='footer-club'>Proudly curling at Marpole Curling Club.</p>
            </div>
            <div className='footer-joke'>
                <p>A clever curling joke goes here.</p>
            </div>
        </footer>
    )
}

export default Footer;