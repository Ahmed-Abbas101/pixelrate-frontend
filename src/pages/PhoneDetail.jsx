import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { phoneApi } from '../services/api';

const PhoneDetail = () => {
    const { brand } = useParams();

    const [phones, setPhones] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError]     = useState('');

    useEffect(() => {
        phoneApi
            .search({ brand })
            .then((data) => {
                setPhones(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, [brand]);

    const brandLabel = brand
        ? brand.charAt(0).toUpperCase() + brand.slice(1)
        : '';

    if (loading) {
        return (
            <div className="container loading">
                <div className="loading-spinner" />
                <p>Loading {brandLabel} phones from our database&hellip;</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="container">
                <div className="alert alert-error">
                    Could not load phones: {error}
                </div>
                <Link to="/live-prices" className="phone-detail-back">&larr; Back to Live Prices</Link>
            </div>
        );
    }

    if (phones.length === 0) {
        return (
            <div className="container">
                <h1 className="not-found">No phones found for &ldquo;{brandLabel}&rdquo;</h1>
                <p className="text-center text-muted">
                    We do not have any devices from this brand in our database yet.
                </p>
                <div className="text-center mt-4">
                    <Link to="/live-prices" className="btn btn-primary">Browse all phones</Link>
                </div>
            </div>
        );
    }

    const [primary, ...rest] = phones;

    return (
        <div className="container">
            <Link to="/live-prices" className="phone-detail-back">&larr; Back to Live Prices</Link>

            <div className="phone-detail">
                <img
                    className="phone-detail-image"
                    src={`https://placehold.co/400x400/f9fafb/e53e3e?text=${encodeURIComponent(primary.brand)}`}
                    alt={`${primary.brand} ${primary.model}`}
                />
                <div>
                    <span className="badge">{primary.brand}</span>
                    <h1 style={{ marginTop: '12px' }}>{primary.model}</h1>
                    <p className="price-tag">Rs. {primary.price.toLocaleString()}</p>
                    <p className="text-muted">
                        The {primary.brand} {primary.model} is part of our curated spec catalogue.
                        All figures below are pulled directly from our MongoDB database.
                    </p>

                    <table className="table spec-table">
                        <tbody>
                            <tr><th>Processor</th><td>{primary.processor}</td></tr>
                            <tr><th>RAM</th><td>{primary.ram}</td></tr>
                            <tr><th>Camera</th><td>{primary.camera}</td></tr>
                            <tr><th>Stock</th><td>{primary.stock} units</td></tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {rest.length > 0 && (
                <div className="mt-6">
                    <h2 className="section-title">More from {primary.brand}</h2>
                    <div className="live-grid">
                        {rest.map((p) => (
                            <div key={p._id} className="phone-card">
                                <img
                                    className="thumb"
                                    src={`https://placehold.co/200x200/f9fafb/e53e3e?text=${encodeURIComponent(p.brand)}`}
                                    alt={`${p.brand} ${p.model}`}
                                />
                                <h3>{p.model}</h3>
                                <p className="brand-tag">{p.brand}</p>
                                <p className="price">Rs. {p.price.toLocaleString()}</p>
                                <p className="spec-row">RAM: {p.ram}</p>
                                <p className="spec-row">Camera: {p.camera}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PhoneDetail;
