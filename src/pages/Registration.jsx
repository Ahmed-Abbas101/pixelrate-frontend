import { useState } from 'react';
import { Link } from 'react-router-dom';
import { userApi } from '../services/api';

const EMPTY_FORM = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    country: '',
    gender: '',
    subscribedReviews: false,
    subscribedNews: false,
    subscribedSpecs: false,
    termsAccepted: false
};

const Registration = () => {
    const [data, setData] = useState(EMPTY_FORM);
    const [status, setStatus] = useState({ type: '', message: '' });
    const [submitting, setSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(null);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setStatus({ type: '', message: '' });

        try {
            const res = await userApi.register(data);
            setStatus({
                type: 'success',
                message: res.message || 'Account created successfully! A confirmation email is on its way.'
            });
            setSubmitted({ ...data, password: '********' });
            setData(EMPTY_FORM);
        } catch (err) {
            setStatus({
                type: 'error',
                message: err.message || 'Registration failed. Please try again.'
            });
        } finally {
            setSubmitting(false);
        }
    };

    const handleClear = () => {
        setData(EMPTY_FORM);
        setStatus({ type: '', message: '' });
    };

    return (
        <div className="container">
            <h1>PixelRate Member Registration</h1>
            <p className="registration-intro">
                Join the PixelRate community today for <b>exclusive</b> access to early reviews,
                giveaways, and our <i>members-only</i> quarterly market report. Your information
                is <u>kept confidential</u>.
            </p>

            <div className="registration-card">
                <h2>Create Your Account</h2>

                {status.message && (
                    <div className={`alert ${status.type === 'success' ? 'alert-success' : 'alert-error'}`}>
                        {status.message}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="name-row">
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input
                                type="text"
                                name="firstName"
                                value={data.firstName}
                                id="firstName"
                                className="field"
                                onChange={handleChange}
                                placeholder="Enter your first name..."
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                type="text"
                                name="lastName"
                                value={data.lastName}
                                id="lastName"
                                className="field"
                                onChange={handleChange}
                                placeholder="Enter your last name..."
                                required
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={data.email}
                            id="email"
                            className="field"
                            onChange={handleChange}
                            placeholder="Your email address..."
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={data.password}
                            id="password"
                            className="field"
                            onChange={handleChange}
                            placeholder="Pick a password (min 6 characters)..."
                            minLength="6"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="country">Country</label>
                        <select
                            name="country"
                            value={data.country}
                            id="country"
                            className="field"
                            onChange={handleChange}
                            defaultValue=""
                        >
                            <option value="" disabled>Select your country...</option>
                            <option value="Pakistan">Pakistan</option>
                            <option value="China">China</option>
                            <option value="United States of America">USA</option>
                            <option value="United Kingdom">UK</option>
                            <option value="United Arab Emirates">UAE</option>
                        </select>
                    </div>

                    <div className="radio-group">
                        <span className="group-label">Gender</span>
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="Male"
                                onChange={handleChange}
                                checked={data.gender === 'Male'}
                                required
                            />
                            Male
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="gender"
                                value="Female"
                                onChange={handleChange}
                                checked={data.gender === 'Female'}
                            />
                            Female
                        </label>
                    </div>

                    <div className="checkbox-group">
                        <span className="group-heading">What do you want to subscribe to?</span>
                        <p className="text-muted" style={{ marginBottom: '12px', fontSize: '0.92rem' }}>
                            Select all the premium mobile content you want in your inbox:
                        </p>

                        <label className="block-label">
                            <input
                                type="checkbox"
                                name="subscribedReviews"
                                onChange={handleChange}
                                checked={data.subscribedReviews}
                            />
                            Phone Reviews
                        </label>
                        <label className="block-label">
                            <input
                                type="checkbox"
                                name="subscribedNews"
                                onChange={handleChange}
                                checked={data.subscribedNews}
                            />
                            Latest Mobile News
                        </label>
                        <label className="block-label">
                            <input
                                type="checkbox"
                                name="subscribedSpecs"
                                onChange={handleChange}
                                checked={data.subscribedSpecs}
                            />
                            Pro Spec Sheets
                        </label>
                    </div>

                    <div className="checkbox-group">
                        <label className="block-label">
                            <input
                                type="checkbox"
                                name="termsAccepted"
                                checked={data.termsAccepted}
                                onChange={handleChange}
                                required
                            />
                            I agree to the terms and conditions
                        </label>
                    </div>

                    <div className="btn-group">
                        <button
                            type="submit"
                            className="btn btn-primary"
                            disabled={submitting}
                        >
                            {submitting ? 'Registering...' : 'Register Now'}
                        </button>
                        <button
                            type="button"
                            onClick={handleClear}
                            className="btn btn-secondary"
                        >
                            Clear Form
                        </button>
                    </div>
                </form>

                {submitted && (
                    <div className="submitted-data">
                        <h3>Registration Summary</h3>
                        <table className="table">
                            <tbody>
                                <tr><th>First Name</th><td>{submitted.firstName}</td></tr>
                                <tr><th>Last Name</th><td>{submitted.lastName}</td></tr>
                                <tr><th>Email</th><td>{submitted.email}</td></tr>
                                <tr><th>Country</th><td>{submitted.country || '—'}</td></tr>
                                <tr><th>Gender</th><td>{submitted.gender || '—'}</td></tr>
                                <tr><th>Phone Reviews</th><td>{submitted.subscribedReviews ? 'Yes' : 'No'}</td></tr>
                                <tr><th>Mobile News</th><td>{submitted.subscribedNews ? 'Yes' : 'No'}</td></tr>
                                <tr><th>Pro Spec Sheets</th><td>{submitted.subscribedSpecs ? 'Yes' : 'No'}</td></tr>
                                <tr><th>Terms Accepted</th><td>{submitted.termsAccepted ? 'Yes' : 'No'}</td></tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            <div className="registration-side">
                <div>
                    <h3>Membership Benefits</h3>
                    <ol>
                        <li>Monthly Newsletter</li>
                        <li>Ad-Free Browsing</li>
                        <li>Priority Support Access</li>
                    </ol>
                </div>

                <div>
                    <h3>Quick Links</h3>
                    <ul>
                        <li><Link to="/">FAQ Section</Link></li>
                        <li><Link to="/contact">Support Center</Link></li>
                    </ul>
                </div>
            </div>

            <p className="text-muted mt-6">
                After submitting the form, you will receive a confirmation email to finalize your
                subscription. Thank you for joining the PixelRate family!
            </p>
        </div>
    );
};

export default Registration;
