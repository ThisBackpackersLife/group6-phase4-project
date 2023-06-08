import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import httpClient from "./httpClient";
import "./Search.css";

const Search = () => {
  const history = useHistory();
  const [keyword, setKeyword] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [price, setPrice] = useState("");
  const [diet, setDiet] = useState("");
  const [results, setResults] = useState([]);
  const [restaurants, setRestaurants] = useState([]);

  // Fetch restaurants data when component mounts
  useEffect(() => {
    (async () => {
      try {
        const response = await httpClient.get(`//localhost:5555/restaurants`);
        setRestaurants(response.data);
      } catch (error) {
        console.log("Error loading restaurants");
      }
    })();
  }, []);

  const handleSearch = () => {
    const filteredData = restaurants.filter(
      (restaurant) =>
        restaurant.name.toLowerCase().includes(keyword.toLowerCase()) &&
        (cuisine ? restaurant.cuisine === cuisine : true) &&
        (price ? restaurant.price === price : true) &&
        (diet ? restaurant.diet === diet : true)
    );
    setResults(filteredData);
  };

  return (
    <div className="search-container">
      <input
        className="search-input"
        type="text"
        placeholder="Search by keyword"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      <h3>Filter Options:</h3>
      <div className="filter-container">
        <select
          className="filter"
          value={cuisine}
          onChange={(e) => setCuisine(e.target.value)}
        >
          <option value="">--Select Cuisine--</option>
          <option value="Italian">Italian</option>
          <option value="Mexican">Mexican</option>
          <option value="Indian">Indian</option>
        </select>
        <select
          className="filter"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        >
          <option value="">--Select Price Range--</option>
          <option value="cheap">Cheap</option>
          <option value="moderate">Moderate</option>
          <option value="expensive">Expensive</option>
        </select>
        <select
          className="filter"
          value={diet}
          onChange={(e) => setDiet(e.target.value)}
        >
          <option value="">--Select Dietary Restrictions--</option>
          <option value="vegan">Vegan</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="gluten-free">Gluten-Free</option>
        </select>
      </div>

      {/* Display search results */}
      {results.length > 0 ? (
        <div className="restaurants">
          {results.map((restaurant, index) => (
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
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default Search;

