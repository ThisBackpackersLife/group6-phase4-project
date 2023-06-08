import React from "react";
import ReviewBox from "./ReviewBox";

function RestaurantReview({reviews, displayStars, deleteReview}){
    if (reviews ){
        return (
            <div>
                {reviews.map((review, index) => {
                    return (
                        <div className="review-div">
                            <div>
                                <ReviewBox
                                    key={index}
                                    review = {review}
                                    displayStars = {displayStars}
                                />
                            </div>
                            <br></br>
                            <button onClick={() => deleteReview(review.id)} className="delete-btn">Delete</button>
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default RestaurantReview
