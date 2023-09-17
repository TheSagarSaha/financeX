import React, { useEffect, useState } from "react"
import "./profile.css"
import ProfileData from "./profileDetails"

const Profile = () => {
    const [name, setName] = useState("")
    const [show, setShow] = useState(false)

    useEffect(() => {

        
        const fetchData = async () => {
            const getUser = JSON.parse(localStorage.getItem("user"))
            console.log(getUser["username"]);
            const username = getUser["username"]
            if(username) {
                const response = await fetch("/profile", {
                    method: 'POST',
                    headers: {"Content-Type": "application/json"},
                    body: JSON.stringify({username})  
                })
                const json = await response.json()
                if (json.msg !== "null") {
                    setName(json.msg)
                    setShow(true)
                }
            }
        }
        fetchData()
    }, []) 

    return(
        <div className="profile">
            <h1>Hi, {name} </h1>
            <label style={show ? {"display":"none"} : {"color":"red"}}><i class="bi bi-exclamation-octagon-fill"></i></label>
            {show ? <ProfileData /> : " Looks like you are not authorized to view this page. Please try to login again."}
        </div>
    )
}

export default Profile
