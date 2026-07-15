import { useState } from 'react';
import freepik from '../assets/freepik__background__56867.png';
import { contactApi } from '../services/api';

const Contact = () => {
    const [data, setData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const [status, setStatus] = useState({ type: '', message: '' });
    const [submitting, setSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setStatus({ type: '', message: '' });

        try {
            const res = await contactApi.create(data);
            setStatus({
                type: 'success',
                message: res.message || 'Your message has been sent. We will get back to you within one business day.'
            });
            setData({ name: '', email: '', subject: '', message: '' });
        } catch (err) {
            setStatus({
                type: 'error',
                message: err.message || 'Something went wrong. Please try again later.'
            });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="container">
            <h1>Get In Touch With Us</h1>
            <p className="text-muted">
                We are available 24/7 to assist you with any questions.
            </p>

            <div className="contact-info-grid">
                <div className="contact-card">
                    <h2>Primary Contact Info</h2>
                    <ul>
                        <li>Email: <a href="mailto:support@pixelrate.com">support@pixelrate.com</a></li>
                        <li>Phone: +92 300 1234567</li>
                        <li>Submit a technical ticket via the form below</li>
                    </ul>
                </div>

                <div className="contact-card">
                    <h2>Office Hours</h2>
                    <ul>
                        <li>Monday to Friday: 9AM to 5PM (PKT)</li>
                        <li>Saturday: 10AM to 2PM (PKT)</li>
                        <li>Sunday: Closed</li>
                    </ul>
                </div>
            </div>

            <div className="contact-form">
                <h2>Send Us a Message</h2>

                {status.message && (
                    <div className={`alert ${status.type === 'success' ? 'alert-success' : 'alert-error'}`}>
                        {status.message}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Your Name</label>
                        <input
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            id="name"
                            className="form-input"
                            placeholder="Your full name..."
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            id="email"
                            className="form-input"
                            placeholder="Your email address..."
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="subject">Subject</label>
                        <input
                            type="text"
                            name="subject"
                            value={data.subject}
                            onChange={handleChange}
                            id="subject"
                            className="form-input"
                            placeholder="Enter the subject of your message..."
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea
                            name="message"
                            value={data.message}
                            onChange={handleChange}
                            id="message"
                            className="form-input"
                            placeholder="Enter your message or suggestions..."
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={submitting}
                    >
                        {submitting ? 'Sending...' : 'Submit Message'}
                    </button>
                </form>
            </div>

            <div className="contact-extra">
                <p>
                    We appreciate your feedback and strive to reply to all inquiries within
                    one business day. Thank you for your patience &mdash; we love hearing from
                    our loyal users!
                </p>
                <img src={freepik} alt="Social media icons" className="social-img" />
            </div>
        </div>
    );
};

export default Contact;
