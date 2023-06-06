import React from "react";
import {Link} from "react-router-dom";
import "./App.css";
import Logo from "../Images/logo.png";
import UserIcon from "../Images/UserIcon.png";

function NavBar() {
    return (
        <header>
            <nav className = "nav">
                <Link 
                    to= "/" 
                    className="link"
                >
                    <div className="logo-container">
                        <img src={Logo} alt="No Logo Available"></img>
                        <h3>Culinary Critic</h3>
                    </div>
            
                </Link>
                <div className="nav-ul">
                    <div className="active0">
                        <Link 
                            to="/"
                            className="link"
                        >
                            Home
                        </Link>
                    </div>
                    <div className="active">
                        <Link 
                            to="/Restaurants" // New Link to Restaurants
                            className="link"
                        >
                            Restaurants
                        </Link>
                    </div>
                    <div className="active">
                        <Link 
                            to="/Sign"
                            className="link"
                        >
                            <img src={UserIcon} alt="User"></img>
                        </Link>
                    </div>
                    <div>
                        <input type="text" placeholder="Search..." className="search-bar" /> {/* Search bar */}
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default NavBar;
