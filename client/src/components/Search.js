import React, { useState } from "react";
import { restaurantData } from "./Restaurants";
import './Search.css';

const Search = () => {
    const [keyword, setKeyword] = useState('');
    const [cuisine, setCuisine] = useState('');
    const [price, setPrice] = useState('');
    const [diet, setDiet] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = () => {
        const filteredData = restaurantData.filter(restaurant =>
            restaurant.name.toLowerCase().includes(keyword.toLowerCase()) &&
            (cuisine ? restaurant.cuisine === cuisine : true) &&
            (price ? restaurant.price === price : true) &&
            (diet ? restaurant.diet === diet : true)
        );
        setResults(filteredData);
    };

    return (
        <div className="search-page">
            <input 
                type="text" 
                className="search-input"
                placeholder="Search by keyword" 
                value={keyword} 
                onChange={(e) => setKeyword(e.target.value)} 
            />
            <button className="search-button" onClick={handleSearch}>Search</button>

            <h3>Filter Options:</h3>
            <select className="filter-select" value={cuisine} onChange={(e) => setCuisine(e.target.value)}>
                <option value="">--Select Cuisine--</option>
                <option value="Italian">Italian</option>
                <option value="Mexican">Mexican</option>
                <option value="Indian">Indian</option>
                {/* Add more cuisines as needed */}
            </select>
            <select className="filter-select" value={price} onChange={(e) => setPrice(e.target.value)}>
                <option value="">--Select Price Range--</option>
                <option value="$">Cheap</option>
                <option value="$$">Moderate</option>
                <option value="$$$">Expensive</option>
            </select>
            <select className="filter-select" value={diet} onChange={(e) => setDiet(e.target.value)}>
                <option value="">--Select Dietary Restrictions--</option>
                <option value="Vegan">Vegan</option>
                <option value="Vegetarian">Vegetarian</option>
                <option value="Gluten-Free">Gluten-Free</option>
                {/* Add more diets as needed */}
            </select>

            <div className="search-results">
                {/* Display search results */}
                {results.map((restaurant, index) => (
                    <div className="restaurant-card" key={index}>
                        <h2>{restaurant.name}</h2>
                        <p>{restaurant.price}</p>
                        <p>{restaurant.cuisine}</p>
                        <p>{restaurant.diet}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Search;

