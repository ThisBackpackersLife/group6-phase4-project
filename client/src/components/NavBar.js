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
                    <img src={Logo} alt="Logo"></img>
                    <h3>Culinary Critic</h3>
                </Link>
                <div className="nav-ul">
                    <div className="active">
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
