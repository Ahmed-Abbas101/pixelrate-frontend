import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../assets/pixelrate-logo-removebg-preview.png';

const Navbar = () => {
    const [open, setOpen] = useState(false);

    const close = () => setOpen(false);

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-brand" onClick={close}>
                <img src={logo} alt="PixelRate logo" />
                <span className="navbar-brand-text">
                    Pixel<span className="accent">Rate</span>
                </span>
            </Link>

            <button
                className="nav-toggle"
                onClick={() => setOpen(!open)}
                aria-label="Toggle navigation"
                aria-expanded={open}
            >
                {open ? '\u2715' : '\u2630'}
            </button>

            <ul className={`navbar-links ${open ? 'open' : ''}`}>
                <li><NavLink to="/" end onClick={close}>Home</NavLink></li>
                <li><NavLink to="/about" onClick={close}>About Us</NavLink></li>
                <li><NavLink to="/contact" onClick={close}>Contact Us</NavLink></li>
                <li><NavLink to="/registration" onClick={close}>Registration</NavLink></li>
                <li><NavLink to="/live-prices" onClick={close}>Live Prices</NavLink></li>
            </ul>
        </nav>
    );
};

export default Navbar;
