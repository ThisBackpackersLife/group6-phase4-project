import React, { useState } from "react";
import RestaurantReview from "./RestaurantReview";
import "./Restaurants.css";
import httpClient from "./httpClient";

function RestaurantDetails({restaurant, displayStars, deleteReview, getRestaurant, reviews, user}){
    const [check, setCheck] = useState(false)
    const [post, setPost] = useState(false)
    const [image, setImage] = useState("")
    const [body, setBody] = useState("")
    const [rating, setRating] = useState(1)

    function handleClick(){
        setPost(!post)
    }

    const user_id = user.id
    const restaurant_id = restaurant.id

    const changeAvatar = async () => {
        try{
            const response = await httpClient.post(`//localhost:5555/reviews`, {
                body,
                rating,
                image,
                user_id,
                restaurant_id,
            })
        }
        catch (error) {
            if(error.response.status === 401){
                alert("Invalid")
            }
        }
    }

    return (
        <div className="res-details">
            <div className="res-img-div">
                <img className="restaurant-image" src={restaurant.image}></img>
            </div>
            <h1 className="res-name">{restaurant.name}</h1>
            {check !== true ? (
                <div className="btn" >
                    <button onClick={() => {
                        setCheck(true)
                        getRestaurant(restaurant.id)
                    }} >Check Reviews</button>
                </div>
            ): (
                <RestaurantReview
                    reviews = {reviews} 
                    displayStars={displayStars}
                    deleteReview={deleteReview}
                />
            )}
            <br></br>
            <div className="review-form">
                {post !== false ? (
                    <div className="review-form-div">
                        <br></br>
                        <br></br>
                        <input 
                            type="number" 
                            min={1}
                            max={5}
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            className="area"
                        />
                        <br></br>
                        <br></br>
                        <input 
                            type="text" 
                            placeholder="Insert Image Url" 
                            value={image}
                            onChange={(e) => setImage(e.target.value)}
                            size={40}
                            className="area"
                        />
                        <br></br>
                        <br></br>
                        <textarea 
                            name='description'
                            placeholder="Insert description Here" 
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            rows="8" cols="50"
                            className="area"
                        />
                        <br></br>
                        <br></br>
                        <button
                            className="submit-btn"
                            type="button"
                            onClick={()=>{
                                handleClick()
                                changeAvatar()
                            }}
                        >
                            Submit Review
                        </button>
                    </div>
                ):(
                    <div className="btn">
                        <button onClick={handleClick}> Write a Review</button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default RestaurantDetails