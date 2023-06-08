import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import './Restaurants.css';

function Restaurants({restaurants}) {

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


