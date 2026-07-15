import { Routes, Route } from 'react-router-dom';
import './App.css';

import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import About from './pages/About.jsx';
import Contact from './pages/Contact.jsx';
import Registration from './pages/Registration.jsx';
import LivePrices from './pages/LivePrices.jsx';
import PhoneDetail from './pages/PhoneDetail.jsx';
import NotFound from './pages/NotFound.jsx';

const App = () => {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/registration" element={<Registration />} />
                <Route path="/live-prices" element={<LivePrices />} />
                <Route path="/specs/:brand" element={<PhoneDetail />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Layout>
    );
};

export default App;
