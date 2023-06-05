import React from "react";
import {Link} from "react-router-dom"
import "./App.css"
import Logo from "../Images/logo.png"

const linkStyles = {
    color: "inherit",
    textDecoration: "none",
};


function NavBar() {

    return (
        <header>
            <nav className = "nav">
                <img src={Logo}></img>
                <h3>Culinary Critic</h3>
                <ul className="nav-ul">
                    <li className="active">
                        <Link 
                            to="/"
                            style={linkStyles}
                        >
                            Home
                        </Link>
                    </li>
                    <li className="active">
                        <Link 
                            to="/Sign"
                            style={linkStyles}
                        >
                            Sign
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
}

export default NavBar;