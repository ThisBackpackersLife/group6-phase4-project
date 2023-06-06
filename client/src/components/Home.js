import React from "react";
import './Home.css';

const Home = () => {
    return (
        <div>
            {/* Hero section */}
            <div className="hero-section">
            </div>

            {/* Features section */}
            <div className="features-section">
                <div className="feature-card">
                    <h2>Discover</h2>
                    <p>Find the best restaurants around you.</p>
                </div>
                <div className="feature-card">
                    <h2>Rate</h2>
                    <p>Rate your experiences and help others make informed choices.</p>
                </div>
                <div className="feature-card">
                    <h2>Share</h2>
                    <p>Share your culinary adventures with the world.</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
