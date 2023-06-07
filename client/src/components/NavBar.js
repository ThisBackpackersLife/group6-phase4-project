import React from "react";
import {Link} from "react-router-dom";
import "./App.css";
import Logo from "../Images/logo.png";
import UserIcon from "../Images/UserIcon.png";

function NavBar({user}) {
    return (
        <header>
            <nav className="nav">
                <Link to="/" className="link">
                    <div className="logo-container">
                        <img className="image" src={Logo} alt="Logo"></img>
                        <h3>Culinary Critic</h3>
                    </div>
                </Link>
                <div className="nav-ul">
                    <div className="active">
                        <Link to="/" className="link">
                            Home
                        </Link>
                    </div>
                    <div className="active">
                        <Link to="/search" className="link">
                            Search
                        </Link>
                    </div>
                    <div className="active">
                        <Link to="/restaurants" className="link">
                            Restaurants
                        </Link>
                    </div>
                    {user != "" ? (
                        <div className="active">
                            <Link
                                to="/Profile"
                                className="link"
                            >
                                <img  src={UserIcon} alt="User"></img>
                            </Link>
                        </div>
                    ) : (
                        <div className="active">
                            <Link 
                                to="/Sign"
                                className="link"
                            >
                                <img src={UserIcon} alt="User"></img>
                            </Link>
                        </div>
                    )}
                    <div>
                        <input type="text" placeholder="Search..." className="search-bar" /> {/* Search bar */}
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default NavBar;

