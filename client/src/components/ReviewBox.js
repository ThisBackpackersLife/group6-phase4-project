import React from "react";
import "./profile.css";

function ReviewBox({review, displayStars, deleteReview}) {
    if (review != undefined) {
        return (
            <div>
                <div className="review">
                    <img 
                        className="review-image" 
                        src={review.image} alt="Image not found" 
                    >
                    </img>
                    <div className="rating-div">
                        <h2 className="rating-star">{displayStars(review.rating)}</h2>
                        <p>{review.body}</p>
                    </div>
                </div>
                <button onClick={() => deleteReview(review.id)} className="delete-btn">Delete</button>
            </div>
        );
    }
}

export default ReviewBox;