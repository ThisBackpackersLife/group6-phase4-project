import React, { useState, useEffect } from "react";
import httpClient from "./httpClient";
import "./profile.css";
import ReviewBox from "./ReviewBox";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function UserPage({user, displayStars, data, deleteReview}) {

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
                    {data.avatar != null ? (
                        <img className="user-image" src={data.avatar}></img>
                    ):(
                        <img className="user-image" src="https://vdostavka.ru/wp-content/uploads/2019/05/no-avatar.png"></img>
                    )}
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
                            <button className="sort-btn"> Date </button>
                            <button className="sort-btn">Rating</button>
                        </div>
                        {
                            data.reviews.map((review, index) => {
                                return (
                                    <div className="review-div">
                                        <div>
                                            <ReviewBox
                                                key={index}
                                                review = {data.reviews[index]}
                                                displayStars = {displayStars}
                                                deleteReview = {deleteReview}
                                            />
                                        </div>
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
