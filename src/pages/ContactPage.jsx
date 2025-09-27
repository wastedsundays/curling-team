import { useLocation } from 'react-router-dom';

import MessageForm from '../components/ContactForms/MessageForm';
import ChallengeForm from '../components/ContactForms/ChallengeForm';
import '../styles/contact-styles.css';


const ContactPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const formType = queryParams.get('form');

    return (
        <div>
            {formType === 'challenge' && <ChallengeForm />}
            {formType !== 'challenge' && <MessageForm />}
        </div>
    );
}

export default ContactPage;
