import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import bannerImg from '../assets/pr-bannerimg.jpg';
import mainImg   from '../assets/xiaomi-17-pro-max-main.jpg';
import backImg   from '../assets/xiaomi-17-pro-max-back.jpg';
import sideImg   from '../assets/xiaomi-17-pro-max-side.jpg';
import reviewvid from '../assets/I Unboxed the Xiaomi 17 Pro Max - Quick Review & First Impressions!.mp4';

import { phoneApi } from '../services/api';

const Home = () => {
    const [phones, setPhones]   = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError]     = useState('');

    useEffect(() => {
        phoneApi
            .getAll()
            .then((data) => {
                setPhones(data.slice(0, 3));
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const brands = ['Samsung', 'Apple', 'Xiaomi', 'Oppo', 'Realme', 'Infinix', 'Google', 'Vivo'];

    return (
        <div className="container">
            <img className="banner" src={bannerImg} alt="PixelRate banner" />

            <section className="hero">
                <h1>PixelRate &mdash; Your Mobile Specs Companion</h1>
                <p>
                    PixelRate is your ultimate, unbiased mobile device specifications, reviews,
                    and news companion. In the fast-moving world of smartphones, it is easy to
                    get lost in technical jargon. Our mission is to cut through the noise and
                    provide meticulously researched comparisons.
                </p>
            </section>

            <section>
                <h2 className="section-title">Browse Brands</h2>
                <p className="text-muted">
                    Pick a manufacturer to see their full device history and specs.
                </p>
                <div className="brand-grid">
                    {brands.map((b) => (
                        <Link
                            key={b}
                            to={`/specs/${b.toLowerCase()}`}
                            className="brand-card"
                        >
                            {b}
                        </Link>
                    ))}
                </div>
            </section>

            <section>
                <h2 className="section-title">Top Featured Phones</h2>

                {loading && (
                    <div className="loading">
                        <div className="loading-spinner" />
                        <p>Loading featured phones from our database&hellip;</p>
                    </div>
                )}

                {error && (
                    <div className="alert alert-error">
                        Could not load featured phones: {error}
                    </div>
                )}

                {!loading && !error && phones.length > 0 && (
                    <div className="showcase-grid">
                        {phones.map((p) => (
                            <div key={p._id} className="showcase-card">
                                <img src={`https://placehold.co/200x200/f9fafb/e53e3e?text=${encodeURIComponent(p.brand)}`} alt={`${p.brand} ${p.model}`} />
                                <h3>{p.brand} {p.model}</h3>
                                <p className="price">Rs. {p.price.toLocaleString()}</p>
                                <Link to={`/specs/${p.brand.toLowerCase()}`} className="btn btn-primary">
                                    View Details
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </section>

            <section>
                <h2 className="section-title">Featured Device: Xiaomi 17 Pro Max</h2>

                <div className="featured-device">
                    <div className="featured-images">
                        <img className="featured-main" src={mainImg} alt="Xiaomi 17 Pro Max front" />
                        <img src={backImg} alt="Xiaomi 17 Pro Max back" />
                        <img src={sideImg} alt="Xiaomi 17 Pro Max side" />
                    </div>

                    <div className="featured-highlights">
                        <div className="highlight-card">
                            <h3>1-Inch Sensor</h3>
                            <p>A massive second-generation sensor with 10x optical zoom for unparalleled light capture and dynamic range.</p>
                        </div>
                        <div className="highlight-card">
                            <h3>15-Min HyperCharge</h3>
                            <p>Next-gen battery tech replenishes the device from zero to 100% in blistering speeds under 15 minutes.</p>
                        </div>
                        <div className="highlight-card">
                            <h3>Dynamic Back Bar</h3>
                            <p>The aluminum frame doubles as a pressure-sensitive interface for highly accurate, one-handed custom shortcuts.</p>
                        </div>
                        <div className="highlight-card">
                            <h3>Oversized Ultrasonic</h3>
                            <p>A massive under-display fingerprint sensor covering the bottom half of the screen for instant, precise unlocking.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <h2 className="section-title">Watch the Latest Review</h2>
                <div className="video-wrapper">
                    <video src={reviewvid} controls></video>
                </div>
            </section>

            <section className="comparison-block">
                <h2 className="section-title">Quick Specs Comparison</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Feature</th>
                            <th>Xiaomi 17 Pro Max</th>
                            <th>Samsung Galaxy S25 Ultra</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Processor</td>
                            <td>Snapdragon 8 Elite Gen 5</td>
                            <td>Snapdragon 8 Elite</td>
                        </tr>
                        <tr>
                            <td>RAM</td>
                            <td>16GB</td>
                            <td>16GB</td>
                        </tr>
                        <tr>
                            <td>Camera</td>
                            <td>50MP</td>
                            <td>200MP</td>
                        </tr>
                        <tr>
                            <td>Price</td>
                            <td>Rs. 239,999</td>
                            <td>Rs. 404,999 &ndash; Rs. 509,999</td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <section className="info-grid">
                <div className="card">
                    <h2>Top Categories</h2>
                    <ol className="category-list">
                        <li><span className="item">1.</span> Flagship Phones</li>
                        <li><span className="item">2.</span> Mid-range Devices</li>
                        <li><span className="item">3.</span> Budget Performers</li>
                        <li><span className="item">4.</span> Gaming Phones (High Performance)</li>
                    </ol>
                </div>

                <div className="card">
                    <h2>Recently Reviewed</h2>
                    <ul className="reviewed-list">
                        <li><Link to="/specs/xiaomi">Xiaomi 17 Pro Max</Link></li>
                        <li><Link to="/specs/realme">Realme GT 7</Link></li>
                        <li><Link to="/specs/infinix">Infinix GT 30 Pro</Link></li>
                        <li><Link to="/specs/samsung">Samsung Galaxy S25 Ultra</Link></li>
                    </ul>
                </div>
            </section>

            <div className="cta-banner">
                <p>
                    To get the latest updates and exclusive early reviews, make sure to{' '}
                    <Link to="/registration">register your email</Link>
                    {' '}with us today! We promise not to spam your inbox.
                </p>
            </div>

            <section className="faq">
                <h2>Frequently Asked Questions</h2>

                <div className="faq-item">
                    <span className="question">Q: How often is PixelRate data updated?</span>
                    <p className="answer">A: Our spec database is updated daily.</p>
                </div>

                <div className="faq-item">
                    <span className="question">Q: Are the reviews truly unbiased?</span>
                    <p className="answer">
                        A: Yes. We maintain strict editorial independence. We do not accept
                        payment or favorable consideration in exchange for positive reviews.
                    </p>
                </div>

                <div className="faq-item">
                    <span className="question">Q: How can I submit a new device specification?</span>
                    <p className="answer">
                        A: Please use the form on our{' '}
                        <Link to="/contact">Contact Us</Link>
                        {' '}page and select the &ldquo;Spec Submission&rdquo; inquiry type.
                    </p>
                </div>
            </section>
        </div>
    );
};

export default Home;
