import React from "react";
import { useHistory } from "react-router-dom";
import './Restaurants.css';
import { useState } from "react";

export const restaurantData = [
    { name: "Restaurant 1", image: "/path/to/image1", price: "$$$", cuisine: "Italian", diet: "Vegetarian" },
    { name: "Restaurant 2", image: "/path/to/image2", price: "$$", cuisine: "Mexican", diet: "Vegan" },
    { name: "Restaurant 3", image: "/path/to/image3", price: "$", cuisine: "Indian", diet: "Gluten-Free" },
    // add more restaurant data here
];

function Restaurants() {
    const history = useHistory();

    return (
        <div className="restaurants">
            {restaurantData.map((restaurant, index) => (
                <div 
                    className="restaurant-card" 
                    key={index}
                    onClick={() => history.push(`/restaurant/${restaurant.name}`)}  
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

export default Restaurants;


