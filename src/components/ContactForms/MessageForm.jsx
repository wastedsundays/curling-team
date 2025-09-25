import { Link } from "react-router-dom";



const MessageForm = () => {
  return (
    <div>
        <h1>Contact</h1>
        <form className="message-form dark-bg-transparent ">
            <div>
                <label htmlFor="name">Your Name:</label>
                <input type="text" id="name" name="name" required />
            </div>

            <div>
                <label htmlFor="email">Your Email:</label>
                <input type="email" id="email" name="email" required />
            </div>

            <div>
                <label htmlFor="message">Your Message:</label>
                <textarea id="message" name="message" required></textarea>
            </div>

        <button type="submit">Send Message</button>
        </form>
        <p>Looking to challenge us? <Link to="/contact?form=challenge">Click here</Link> to submit a request.</p>
    </div>

  );
}

export default MessageForm;
