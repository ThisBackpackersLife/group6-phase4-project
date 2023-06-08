import React from "react";
import ReviewBox from "./ReviewBox";

function RestaurantReview({reviews, displayStars, deleteReview, editReview}){ 
    if (reviews ){
        return (
            <div>
                {reviews.map((review, index) => {
                    return (
                        <div className="review-div" key={index}>
                            <div>
                                <ReviewBox
                                    review = {review}
                                    displayStars = {displayStars}
                                />
                            </div>
                            <br></br>
                            <button onClick={() => deleteReview(review.id)} className="delete-btn">Delete</button>
                            <button onClick={() => editReview(review.id)} className="edit-btn">Edit</button> {}
                        </div>
                    )
                })}
            </div>
        )
    }
}

export default RestaurantReview

