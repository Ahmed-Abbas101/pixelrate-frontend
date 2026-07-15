import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { phoneApi } from '../services/api';

const LivePrices = () => {
    const [phones, setPhones]         = useState([]);
    const [loading, setLoading]       = useState(true);
    const [error, setError]           = useState('');

    const [searchTerm, setSearchTerm] = useState('');
    const [brandFilter, setBrandFilter] = useState('');
    const [sortOption, setSortOption]   = useState('newest');

    useEffect(() => {
        phoneApi
            .getAll()
            .then((data) => {
                setPhones(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    const brands = ['all', ...Array.from(new Set(phones.map((p) => p.brand))).sort()];

    let visible = phones.filter((p) => {
        const matchesSearch = searchTerm
            ? `${p.brand} ${p.model}`.toLowerCase().includes(searchTerm.toLowerCase())
            : true;
        const matchesBrand = brandFilter && brandFilter !== 'all'
            ? p.brand === brandFilter
            : true;
        return matchesSearch && matchesBrand;
    });

    if (sortOption === 'price-asc')  visible = [...visible].sort((a, b) => a.price - b.price);
    if (sortOption === 'price-desc') visible = [...visible].sort((a, b) => b.price - a.price);
    if (sortOption === 'brand')      visible = [...visible].sort((a, b) => a.brand.localeCompare(b.brand));

    const stockBadge = (stock) => {
        if (stock === 0)  return { label: 'Out of stock', cls: 'out-stock' };
        if (stock <= 10)  return { label: `Low stock (${stock})`, cls: 'low-stock' };
        return { label: `In stock (${stock})`, cls: 'in-stock' };
    };

    if (loading) {
        return (
            <div className="container loading">
                <div className="loading-spinner" />
                <p>Loading market prices from our database&hellip;</p>
            </div>
        );
    }

    return (
        <div className="container">
            <h1>Live Market Prices</h1>
            <p className="text-muted">
                Real-time pricing and specifications pulled from our MongoDB-backed phone database.
            </p>

            {error && (
                <div className="alert alert-error">
                    Could not load phones: {error}
                </div>
            )}

            <div className="live-toolbar">
                <input
                    type="text"
                    placeholder="Search by brand or model..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <select value={brandFilter} onChange={(e) => setBrandFilter(e.target.value)}>
                    {brands.map((b) => (
                        <option key={b} value={b}>
                            {b === 'all' ? 'All Brands' : b}
                        </option>
                    ))}
                </select>

                <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
                    <option value="newest">Newest first</option>
                    <option value="price-asc">Price: low to high</option>
                    <option value="price-desc">Price: high to low</option>
                    <option value="brand">Brand A &rarr; Z</option>
                </select>

                <span className="badge">{visible.length} results</span>
            </div>

            {visible.length === 0 ? (
                <div className="alert alert-info">
                    No phones match your search. Try a different keyword or brand.
                </div>
            ) : (
                <div className="live-grid">
                    {visible.map((p) => {
                        const stock = stockBadge(p.stock);
                        return (
                            <div key={p._id} className="phone-card">
                                <img
                                    className="thumb"
                                    src={`https://placehold.co/200x200/f9fafb/e53e3e?text=${encodeURIComponent(p.brand)}`}
                                    alt={`${p.brand} ${p.model}`}
                                />
                                <h3>{p.model}</h3>
                                <p className="brand-tag">{p.brand}</p>
                                <p className="price">Rs. {p.price.toLocaleString()}</p>
                                <p className="spec-row">Processor: {p.processor}</p>
                                <p className="spec-row">RAM: {p.ram}</p>
                                <p className="spec-row">Camera: {p.camera}</p>
                                <span className={`stock ${stock.cls}`}>{stock.label}</span>
                                <Link to={`/specs/${p.brand.toLowerCase()}`}>
                                    <button className="view-btn" type="button">View Details</button>
                                </Link>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default LivePrices;
