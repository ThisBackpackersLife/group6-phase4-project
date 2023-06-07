import React, { useState, useEffect } from "react";
import httpClient from "./httpClient";

function UserPage({user}) {

    const [data, setUserData] = useState("") 

    const logOutUser = async () => {
        await httpClient.delete("//localhost:5555/logout")
        window.location.href = "/"
    }

    useEffect(() => {
        (async () => {
            try {
                const response = await httpClient.get(`//localhost:5555/user/${user.id}`)
                setUserData(response.data)
            }
            catch (error) {
                console.log("Not authenticated")
            }
        }) ()
    }, [user])

    console.log(data)

    return (
        <div className="user-container">
            <div className="left-div">
                <h2>{data.username}</h2>
                <h3>{data.email}</h3>
                <button onClick={() => logOutUser()}>Log Out</button>
            </div>
            <div className="right-div">

            </div>
        </div>
    );
}

export default UserPage;
