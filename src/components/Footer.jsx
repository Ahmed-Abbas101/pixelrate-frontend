import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="site-footer">
            <div className="footer-inner">
                <div className="footer-brand">
                    <h3>Pixel<span className="accent">Rate</span></h3>
                    <p>
                        Your unbiased mobile phone specifications, reviews, and live
                        prices companion. Cutting through the jargon so you can pick
                        the right device with confidence.
                    </p>
                </div>

                <div className="footer-col">
                    <h4>Quick Links</h4>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/about">About Us</Link></li>
                        <li><Link to="/live-prices">Live Prices</Link></li>
                        <li><Link to="/registration">Register</Link></li>
                        <li><Link to="/contact">Contact Us</Link></li>
                    </ul>
                </div>

                <div className="footer-col">
                    <h4>Get in Touch</h4>
                    <ul>
                        <li><a href="mailto:support@pixelrate.com">support@pixelrate.com</a></li>
                        <li>+92 300 1234567</li>
                        <li>Mon &ndash; Fri, 9AM &ndash; 5PM PKT</li>
                    </ul>
                </div>
            </div>

            <div className="footer-bottom">
                &copy; {new Date().getFullYear()} PixelRate. All rights reserved. Built with the MERN stack.
            </div>
        </footer>
    );
};

export default Footer;
