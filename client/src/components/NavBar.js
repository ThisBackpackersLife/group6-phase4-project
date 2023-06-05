import React from "react";
import {Link} from "react-router-dom"
import "./App.css"
import Logo from "../Images/logo.png"
import UserIcon from "../Images/UserIcon.png"

function NavBar() {

    return (
        <header>
            <nav className = "nav">
                <Link 
                    to= "/" 
                    className="link"
                >
                    <img src={Logo} alt="No Logo Available"></img>
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
                            to="/Sign"
                            className="link"
                        >
                            <img src={UserIcon} alt="No Logo Available"></img>
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default NavBar;