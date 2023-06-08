import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import Sign from "./Sign";
import Restaurants from "./Restaurants";
import Search from "./Search";
import httpClient from "./httpClient";
import UserPage from "./UserPage";
import NotFound from "./NotFound"

function App() {
    const [user, setUser] = useState("")
    const [data, setUserData] = useState("")

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

    useEffect(() => {
        (async () => {
            try {
                const response = await httpClient.get(`//localhost:5555/users/${user.id}`)
                setUserData(response.data)
            }
            catch (error) {
                console.log("Not authenticated")
            }
        }) ()
    }, [user])

    function displayStars(num){
        const rating = []
        for (let i = 0; i < num; i++){
            rating.push("⭐")
        }
        return rating.join("")
    }

    const deleteReview = async (review) => {
        await httpClient.delete(`//localhost:5555/review/${review}`)
        window.location.reload()
    }

    return (
        <div>
            <NavBar
                user = {user}
                data = {data}
            />
            <Switch>
                <Route path='/' exact component={Home} />
                <Route path='/Sign' exact component={Sign} />
                <Route path='/Restaurants' exact component={Restaurants} />
                <Route path='/Search' exact component={Search} />
                <Route exact path="/Profile">
                    <UserPage
                        user = {user}
                        displayStars = {displayStars}
                        data = {data}
                        deleteReview = {deleteReview}
                    />
                </Route>
                <Route exact component={NotFound}/>
            </Switch>
        </div>
    );
}

export default App;
