import React, { useEffect, useState } from "react"

const Profile = () => {
    const [data, setData] = useState(null)
    const [name, setName] = useState("")
    const [income, setIncome] = useState("")
    const [expense, setExpense] = useState("")
    const [show, setShow] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("/profile")
            const json = await response.json()
            console.log(json[0].income);
            if (response.ok) {
                setData(json)
                // setName(json.name)
                setIncome(json[0].income)
                setExpense(json.expense)
                setShow(true)
            }
        }
        fetchData()
    }, []) 
    console.log(income);

    return(
        <div className="profile">
            <h1>Profile</h1>
            <h6>{income}</h6>
        </div>
    )
}

export default Profile
