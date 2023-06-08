import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import './Restaurants.css';
import httpClient from "./httpClient";

function Restaurants() {
    const [restaurants, setRestaurants] = useState("")

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

    const history = useHistory();

    if (restaurants){
        return (
            <div className="restaurants">
                {restaurants.map((restaurant, index) => (
                    <div 
                        className="restaurant-card" 
                        key={index}
                        onClick={() => history.push(`/restaurant/${restaurant.id}`)}  
                    >
                        <img src={restaurant.image} alt={restaurant.name} />
                        <div className="restaurant-info">
                            <h2>{restaurant.name}</h2>
                            <p>{restaurant.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        );
    }
}

export default Restaurants;


