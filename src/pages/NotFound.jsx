import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="container not-found">
            <h1>404</h1>
            <h2>Page Not Found</h2>
            <p className="text-muted">
                The page you are looking for does not exist or has been moved.
            </p>
            <Link to="/" className="btn btn-primary mt-4">Back to Home</Link>
        </div>
    );
};

export default NotFound;
