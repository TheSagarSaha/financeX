import React, { useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "./signup.css"
import { useNavigate } from "react-router-dom"

const Signup = () => {

    const navigate = useNavigate();
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [username, setUsername] = useState("")
    const [income, setIncome] = useState("")
    const [expense, setExpense] = useState("")
    const [result, setResult] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        const credentials = {name, email, password, username, income, expense}
        const response = await fetch("/signup", {
            method: "POST",
            headers: { 
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
        })
        const json = await response.json()
        if(json.msg === "success") {
            navigate("/profile")
        } else {
            setResult("Opps! Please Enter All Values Correctly and Try Again")
        }    
    }

    return(
        <div className="signup">
            <h1>FinancifyX Signup</h1>
            <p>Sign up here if you don't already have an account. If you already have an account, please sign in <a href="/login">here</a>.</p>
            <br />
            <form onSubmit={handleSubmit}>
                <div className="form-row ">
                    <div className="form-group col-md-5 customStyle">
                        <label>Name</label>
                        <input type="text" value={name} className="form-control" placeholder="Enter Name" onChange={e => setName(e.target.value)}/>
                    </div>
                    <div className="form-group col-md-5 customStyle">
                        <label>Email</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="form-control" placeholder="Enter Email" />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group col-md-5 customStyle">
                        <label>Username</label>
                        <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="form-control"placeholder="Enter Username" />
                    </div>
                    <div className="form-group col-md-5 customStyle">
                        <label>Password</label>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)}className="form-control" placeholder="Enter Password" />
                    </div>
                </div>
                <div className="form-group" style={{"margin": "0px 10.5% 0 2%"}}>
                    <label>Address</label>
                    <input type="text" className="form-control" placeholder="Enter Full Address" />
                </div>
                <div className="form-row">
                    <div className="form-group col-md-5 customStyle">
                        <label>Income</label>
                        <input type="number" value={income} onChange={e => setIncome(e.target.value)} className="form-control" placeholder="Enter Starting Income" />
                    </div>
                    <div className="form-group col-md-5 customStyle">
                        <label>Expense</label>
                        <input type="number" value={expense} onChange={e => setExpense(e.target.value)} className="form-control" placeholder="Enter Starting Expense" />
                    </div>
                </div>

                <button type="submit" style={{"marginLeft": "2%", "width": "130px"}} className="btn btn-primary">Sign Up  <i style={{"marginLeft":"5px"}} class="bi bi-person-plus-fill"></i> </button>
            </form>
            <h5>{result}</h5>
        </div>
    )   
}

export default Signup
