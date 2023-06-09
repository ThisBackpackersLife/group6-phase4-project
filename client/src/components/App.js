import React, { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Home from "./Home";
import Sign from "./Sign";
import Restaurants from "./Restaurants";
import Search from "./Search";
import httpClient from "./httpClient";
import UserPage from "./UserPage";
import NotFound from "./NotFound";
import RestaurantDetails from "./RestaurantDetails"

function App() {
    const [user, setUser] = useState("")
    const [data, setUserData] = useState("")
    const [restaurants, setRestaurants] = useState("")
    const [reviews, setReviews] = useState("")
    const [theme, setTheme] = useState('light')
    const [isDarkMode, setDarkMode] = useState(true)

    const toggleTheme = () => {
        if (theme === 'light') {
            setTheme('dark');
            setDarkMode(true)
        } else {
            setTheme('light');
            setDarkMode(false)
        }
    };

    useEffect(() => {
        localStorage.setItem('theme', theme);
        document.body.className = theme;
    }, [theme]);

    useEffect(() => {
        (async () => {
            try {
                const response = await httpClient.get(`//localhost:5555/restaurants`)
                setRestaurants(response.data)
            }
            catch (error) {
                console.log("Not authenticated")
            }
        }) ()
    }, [])

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

    const sortReview = async () => {
        const response = await httpClient.get(`//localhost:5555/sorted/${user.id}`)
        setUserData(response.data)
    }

    const sortReviewByDate = async () => {
        const response = await httpClient.get(`//localhost:5555/sorted_by_date/${user.id}`)
        setUserData(response.data)
    }

    function displayStars(num){
        const rating = []
        for (let i = 0; i < num; i++){
            rating.push("⭐")
        }
        return rating.join("")
    }

    const deleteReview = async (review) => {
        await httpClient.delete(`//localhost:5555/review/${review}`)
        window.location.reload(false)
    }

    const getRestaurant = async (id) => {
        const response = await httpClient.get(`//localhost:5555/restaurant/review/${id}`)
        setReviews(response.data)
    }

    if(restaurants){
        return (
            <div className={`App ${theme}`}>
                <NavBar
                    user = {user}
                    data = {data}
                    toggleTheme = {toggleTheme}
                    isDarkMode = {isDarkMode}
                />
                <Switch>
                    <Route path='/' exact component={Home} />
                    <Route path='/Sign' exact component={Sign} />
                    <Route path='/Restaurants'>
                        <Restaurants
                            restaurants={restaurants}
                        />
                    </Route>
                    <Route path='/Search' exact component={Search} />
                    <Route exact path="/Profile">
                        <UserPage
                            user = {user}
                            displayStars = {displayStars}
                            data = {data}
                            deleteReview = {deleteReview}
                            sortReview = {sortReview}
                            sortReviewByDate = {sortReviewByDate}
                        />
                    </Route>
                    {
                        restaurants.map((restaurant, index) => {
                            return (
                                <Route key={index} exact path={`/restaurant/${restaurant.id}`}>
                                    <RestaurantDetails
                                        key = {index}
                                        restaurant = {restaurant}
                                        deleteReview = {deleteReview}
                                        displayStars = {displayStars}
                                        getRestaurant = {getRestaurant}
                                        reviews = {reviews}
                                        user = {user}
                                    />
                                </Route>
                            )
                        })
                    }
                    <Route exact component={NotFound}/>
                </Switch>
            </div>
        );
    }
}

export default App;
