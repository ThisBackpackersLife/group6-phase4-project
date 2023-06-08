import React, { useState, useEffect } from "react";
import httpClient from "./httpClient";
import "./profile.css";
import ReviewBox from "./ReviewBox";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function UserPage({user, displayStars, data, deleteReview, sortReview, sortReviewByDate}) {

    const [change, setChange] = useState(false)
    const [avatar, setAvatar] = useState("")

    const logOutUser = async () => {
        await httpClient.delete("//localhost:5555/logout")
        window.location.href = "/"
    }

    const changeAvatar = async () => {
        try{
            const response = await httpClient.patch(`//localhost:5555/users/${user.id}`, {
                avatar,
            })
            window.location.href = "/profile"
        }
        catch (error) {
            if(error.response.status === 401){
                alert("Invalid")
            }
        }
    }

    const deleteUser = async () => {
        await httpClient.delete(`//localhost:5555/users/${user.id}`)
        window.location.href = "/"
    }

    if(data){
        return (
            <div className="user-container">
                <div className="left-div">
                    <img className="user-image" src={data.avatar}></img>
                    <br></br>
                    <div className="user-info">
                        <h2>{data.username}</h2>
                        <h3>{data.email}</h3>
                    </div>
                    {change != false ? (
                        <div className="btn">
                            <input 
                                type="text" 
                                placeholder="Insert Image Url" 
                                value={avatar}
                                onChange={(e) => setAvatar(e.target.value)}
                            />
                            <button
                                type="button"
                                onClick={()=>{
                                    setChange(false)
                                    changeAvatar()
                                }}
                            >
                                Change Avatar
                            </button>
                        </div>
                    ): (
                        <div className="btn">
                            <button onClick={() => setChange(true)}>Change Avatar</button>
                        </div>
                    )}
                    <br></br>
                    <div className="btn">
                        <button onClick={() => logOutUser()}>Log Out</button>
                    </div>
                    <br></br>
                    <div className="btn">
                        <button onClick={() => deleteUser()}>Delete User</button>
                    </div>
                    <br></br>
                </div>
                <div className="right-div">
                    <div className="review-div">
                            <label>Sort by: </label>
                            <button onClick={() => sortReviewByDate()} className="sort-btn"> Date </button>
                            <button onClick={() => sortReview()} className="sort-btn">Rating</button>
                        </div>
                        {
                            data.reviews.map((review, index) => {
                                return (
                                    <div className="review-div">
                                        <Link  to={`/restaurant/${review.restaurant_id}`} >
                                            <ReviewBox
                                                key={index}
                                                review = {data.reviews[index]}
                                                displayStars = {displayStars}
                                            />
                                        </Link>
                                        <br></br>
                                        <button onClick={() => deleteReview(review.id)} className="sort-btn">Delete</button>
                                    </div>
                                )
                            })
                        }
                    </div>
            </div>
        );
    }
    else {
        <h2>Loading...</h2>
    }
}

export default UserPage;
