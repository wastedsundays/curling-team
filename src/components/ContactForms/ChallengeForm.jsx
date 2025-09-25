import { Link } from 'react-router-dom';

const ChallengeForm = () => {
  return (
    <div>
        <h1>Challenge Request</h1>
        <form className="challenge-form dark-bg-transparent ">
            <div>
                <label htmlFor="name">Your Name:</label>
                <input type="text" id="name" name="name" required />
            </div>

            <div>
                <label htmlFor="email">Your Email:</label>
                <input type="email" id="email" name="email" required />
            </div>

        <div>
            <label htmlFor="date">Preferred date for the match:</label>
            <input type="date" id="date" name="date" required />
        </div>

        <div>
            <label htmlFor="location">Your Location:</label>
            <input type="text" id="location" name="location" required />
        </div>

        <div>
            <label htmlFor="message">In 200 words or less - how good are you?</label>
            <textarea id="message" name="message" required></textarea>
        </div>

        <button type="submit">Submit Challenge</button>
        </form>
        <p>Not ready to challenge? <Link to="/contact?form=message">Click here</Link> to send us a message.</p>
    </div>
    );
}

export default ChallengeForm;
