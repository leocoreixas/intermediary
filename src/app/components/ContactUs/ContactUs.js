import "./ContactUs.css";

const ContactUs = () => {
    return (
        <div className="contact-us-container">
            <h1 className="contact-us-title">Contact Us</h1>

            <p className="contact-us-subtitle">
                Thank you for your interest in contacting us. We value your feedback, suggestions, and questions.<br />
                Please fill out the form below and we will get back to you as soon as possible.
            </p>
            <form className="contact-us-form">
                <label className="contact-us-label" htmlFor="name">Name</label>
                <input className="contact-us-input" type="text" id="name" name="name" required />
                <label className="contact-us-label" htmlFor="email">Email</label>
                <input className="contact-us-input" type="email" id="email" name="email" required />
                <label className="contact-us-label" htmlFor="message">Message</label>
                <textarea className="contact-us-input" id="message" name="message" required></textarea>
                <button className="contact-us-button" type="submit">Submit</button>
            </form>
        </div>
    );
}

export default ContactUs;