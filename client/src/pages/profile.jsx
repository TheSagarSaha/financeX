import React, { useEffect, useState } from "react"
import "./profile.css"
import ProfileData from "./profileDetails"

const Profile = () => {
    const [name, setName] = useState("")
    const [show, setShow] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("/profile")
            const json = await response.json()
            console.log(json[0].income);
            if (response.ok) {
                setName(json[0].name)
                setShow(true)
            }
        }
        fetchData()
    }, []) 

    return(
        <div className="profile">
            <h1>Hi, {name} </h1>
            {show ? <ProfileData /> : "Looks like you are not authorized to view this page. Please try to login again"}
        </div>
    )
}

export default Profile
