import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import Sign from "./Sign";
import Restaurants from "./Restaurants";
import Search from "./Search";
import httpClient from "./httpClient";
import UserPage from "./UserPage";

function App() {
    const [user, setUser] = useState("")

    useEffect(() => {
        (async () => {
            try {
                const response = await httpClient.get("//localhost:5555/check_session")
                setUser(response.data)
            }
            catch (error) {
                console.log("Not authenticated")
            }
        }) ()
    }, [])

    return (
        <div>
            <NavBar
                user = {user}
            />
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/Sign' exact component={Sign} />
                <Route path='/Restaurants' exact component={Restaurants} />
                <Route path='/Search' exact component={Search} />
                <Route exact path="/Profile">
                    <UserPage
                        user = {user}
                    />
                </Route>
            </Switch>
        </div>
    );
}

export default App;
