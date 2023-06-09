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

    // State for editing review
    const [editMode, setEditMode] = useState(false);
    const [editReviewId, setEditReviewId] = useState(null);

    function handleClick(){
        setPost(!post)
    }

    const user_id = user.id
    const restaurant_id = restaurant.id

    const changeAvatar = async () => {
        try{
            await httpClient.post(`//localhost:5555/reviews`, {
                body,
                rating,
                image,
                user_id,
                restaurant_id,
            })
            setEditMode(false);
            setEditReviewId(null);
            getRestaurant(restaurant.id);
        }
        catch (error) {
            alert("Invalid Action")
        }
    }

    // Edit review
    const editReview = async (reviewId) => {
        setEditMode(true);
        setEditReviewId(reviewId);
        const reviewToEdit = reviews.find(review => review.id === reviewId);
        if (reviewToEdit) {
            setBody(reviewToEdit.body);
            setRating(reviewToEdit.rating);
            setImage(reviewToEdit.image);
        }
    };
    

    // Save review after editing
    const saveEditedReview = async () => {
        try {
            await httpClient.patch(`//localhost:5555/review/${editReviewId}`, {
                body,
                rating,
                image
            });
            // Close edit mode and refresh reviews after successful PATCH request
            setEditMode(false);
            setEditReviewId(null);
            getRestaurant(restaurant.id);  
        }
        catch (error) {
            console.error("Error saving edited review: ", error);
        }
    };

    return (
        <div className="res-details">
            <div className="res-img-div">
                <img className="restaurant-image" alt="restaurant" src={restaurant.image}></img>
            </div>
            <div className="res-name">
                <h1 >{restaurant.name}</h1>
                <h2 >{restaurant.address}</h2>
            </div>
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
                    editReview={editReview}  
                />
            )}
            <br></br>
            <div className="review-form">
                {post !== false || editMode ? (
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
                                if (editMode) {
                                    saveEditedReview()
                                } else {
                                    changeAvatar()
                                }
                            }}
                        >
                            {editMode ? "Save Changes" : "Submit Review"}
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
