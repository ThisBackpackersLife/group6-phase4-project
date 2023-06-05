import React from "react";
import "./Sign.css";

function Sign() {

    function Sign(){
        const sign_in_btn = document.querySelector("#sign-in-btn");
        const sign_up_btn = document.querySelector("#sign-up-btn");
        const container = document.querySelector(".container");
    
        if(sign_up_btn){
            sign_up_btn.addEventListener("click", () => {
                container.classList.add("sign-up-mode");
                });
            sign_in_btn.addEventListener("click", () => {
                container.classList.remove("sign-up-mode");
                });
        }
    }

    return (
        <main>
            <div className="container">
                <div className="forms-container">
                    <div className="signin-signup">
                        <form action="#" className="sign-in-form">
                            <h2 className="title">Sign in</h2>
                            <div className="input-field">
                                <i className="fas fa-user"></i>
                                <input
                                    type="text"
                                    placeholder="Username"
                                    
                                />
                            </div>
                            <div className="input-field">
                                <i className="fas fa-lock"></i>
                                <input
                                    type="password"
                                    placeholder="Password"
                                    
                                />
                            </div>
                            <input
                            type="submit"
                            value="Login"
                            className="btn solid"
                            />
                        </form>
                        <form action="#" className="sign-up-form">
                            <h2 className="title">Sign up</h2>
                            <div className="input-field">
                                <i className="fas fa-user"></i>
                                <input
                                    type="text"
                                    placeholder="Username"
                                />
                            </div>
                            <div className="input-field">
                                <i className="fas fa-envelope"></i>
                                <input
                                    type="email"
                                    placeholder="Email"
                                />
                            </div>
                            <div className="input-field">
                                <i className="fas fa-lock"></i>
                                <input
                                    type="password"
                                    placeholder="Password"
                                />
                            </div>
                            <input
                            type="submit"
                            className="btn"
                            value="Sign up"
                            />
                        </form>
                    </div>
                </div>
                <div className="panels-container">
                    <div className="panel left-panel">
                    <div className="content">
                        <h3>New here ?</h3>
                        <button
                        className="btn transparent"
                        id="sign-up-btn"
                        onMouseDown={Sign}
                        >
                        Sign up
                        </button>
                    </div>
                    </div>
                    <div className="panel right-panel">
                        <div className="content">
                            <h3>Already a User ?</h3>
                            <button
                            className="btn transparent"
                            id="sign-in-btn"
                            onMouseDown={Sign}
                            >
                            Sign in
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default Sign;