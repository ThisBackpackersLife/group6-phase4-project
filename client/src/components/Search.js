import React, { useState } from "react";

const Search = () => {
    const [keyword, setKeyword] = useState('');
    const [cuisine, setCuisine] = useState('');
    const [price, setPrice] = useState('');
    const [diet, setDiet] = useState('');

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
        <div>
            <input 
                type="text" 
                placeholder="Search by keyword" 
                value={keyword} 
                onChange={(e) => setKeyword(e.target.value)} 
            />
            <button onClick={handleSearch}>Search</button>

            <h3>Filter Options:</h3>
            <select value={cuisine} onChange={(e) => setCuisine(e.target.value)}>
                <option value="">--Select Cuisine--</option>
                <option value="Italian">Italian</option>
                <option value="Mexican">Mexican</option>
                <option value="Indian">Indian</option>
                // Add more cuisines as needed
            </select>
            <select value={price} onChange={(e) => setPrice(e.target.value)}>
                <option value="">--Select Price Range--</option>
                <option value="cheap">Cheap</option>
                <option value="moderate">Moderate</option>
                <option value="expensive">Expensive</option>
            </select>
            <select value={diet} onChange={(e) => setDiet(e.target.value)}>
                <option value="">--Select Dietary Restrictions--</option>
                <option value="vegan">Vegan</option>
                <option value="vegetarian">Vegetarian</option>
                <option value="gluten-free">Gluten-Free</option>
                // Add more diets as needed
            </select>
        </div>
    );
};

export default Search;
