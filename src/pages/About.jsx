const About = () => {
    return (
        <div className="container">
            <h1>About PixelRate</h1>

            <div className="mission-vision">
                <h2>Our Mission and Vision</h2>
                <p>
                    Our mission is to empower consumers with <b>accurate</b> and timely mobile
                    phone information. In a market flooded with marketing jargon and confusing
                    spec sheets, we want to be the place where anyone can come and understand
                    what they are actually buying.
                </p>
                <p>
                    Our vision is to become the most trusted mobile phone specifications portal
                    in the region, known for editorial independence, technical depth, and a
                    genuine focus on the user.
                </p>
            </div>

            <h2 className="section-title">Our Dedicated Team</h2>
            <table className="table team-table">
                <thead>
                    <tr>
                        <th>Member</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <img src="https://placehold.co/80x80/2c3e50/ffffff?text=Ahmed" alt="Ahmed Abbas" />
                        </td>
                        <td className="member-details">
                            <p>Ahmed Abbas</p>
                            <span className="role">Chief Editorial</span>
                            <p>Oversees all editorial content and strategic partnerships.</p>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <img src="https://placehold.co/80x80/2c3e50/ffffff?text=Zain" alt="Zain Ali" />
                        </td>
                        <td className="member-details">
                            <p>Zain Ali</p>
                            <span className="role">Lead Engineer</span>
                            <p>Manages our technical database and ensures data integrity across every published spec sheet.</p>
                        </td>
                    </tr>
                </tbody>
            </table>

            <h2 className="section-title">What Happens Behind the Scenes</h2>
            <div className="about-cards">
                <div className="about-card">
                    <p className="label">Testing Lab</p>
                    <p className="desc">Rigorous device checks covering performance, thermals, and real-world battery life.</p>
                </div>
                <div className="about-card">
                    <p className="label">Data Center</p>
                    <p className="desc">Accuracy and updates maintained through a MongoDB-backed spec database.</p>
                </div>
                <div className="about-card">
                    <p className="label">Review Desk</p>
                    <p className="desc">Expert analysis reports written by editors who have personally used every device.</p>
                </div>
            </div>

            <div className="values-grid">
                <div>
                    <h3>Our Core Values</h3>
                    <ul className="values-list">
                        <li>Integrity in Testing</li>
                        <li>Clarity in Reporting</li>
                        <li>User-Centric Approach</li>
                    </ul>
                </div>

                <div>
                    <h3>Affiliations and Partnerships</h3>
                    <ul className="affiliation-list">
                        <li>Mobile Tech Association</li>
                        <li>Digital Rights Foundation</li>
                        <li>Pakistan Telecom Authority</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default About;
