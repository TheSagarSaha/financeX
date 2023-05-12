import React from "react"
import { useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import "./login.css"
import { useNavigate } from "react-router-dom"

const Login = () => {

    const [username, setUsername] = useState('')    
    const [password, setPassword] = useState('')
    const [result, setResult] = useState('')
    const navigate = useNavigate();
    const [show, setShow] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const credentials = {username, password}
        const response = await fetch("/login", {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const json = await response.json()
        if(json.msg === "found") {
            navigate("/profile")
        } else {
            setResult("Incorrect Username or Password. Please Try Again")
            setShow(true)
        }        
    }

    return(
        <div className="login">
            <h1>FinancifyX Login</h1>
            <p>Login here if you have already created an account previously. If you haven't created an account yet, sign up <a href="/signup">here</a>.</p>

            <form onSubmit={handleSubmit}>
                <div class="form-row">
                    <div class="col">
                        <input 
                            type="text" 
                            className="form-control"
                            placeholder="Username" 
                            value={username} 
                            onChange={e => setUsername(e.target.value)}
                        />
                    </div>
                    <div class="col">
                        <input 
                            type="password" 
                            className="form-control" 
                            placeholder="Password" 
                            value={password} 
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                </div>
                <button style={{"width":"100px"}} type="submit" className="btn btn-outline-primary">Login <i class="bi bi-box-arrow-in-right"></i> </button>
            </form>
            <br />
            <h6 style={show ? {"color":"red"}:{"display":"none", "color":"red"}}><i class="bi bi-exclamation-octagon"></i>{result}</h6>
        </div>
    )
}

export default Login
