import React from "react";
import "./Home.css";

function Home() {
    return (
        <div className="home-container">
            <section className="hero-section">
            </section>
            <section className="features-section">
                <div className="feature-box">
                    <h2 className="feature-heading">Discover</h2>
                    <p className="feature-description">Find new restaurants around you.</p>
                </div>
                <div className="feature-box">
                    <h2 className="feature-heading">Rate</h2>
                    <p className="feature-description">Rate and review your favorite places.</p>
                </div>
                <div className="feature-box">
                    <h2 className="feature-heading">Share</h2>
                    <p className="feature-description">Share your experiences with other users.</p>
                </div>
            </section>
        </div>
    );
}

export default Home;
