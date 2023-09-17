import React from "react"
import { useState } from "react"
import { useLogin } from "../context/useLogin"
import "bootstrap/dist/css/bootstrap.min.css"
import "./login.css"
import { useNavigate } from "react-router-dom"

const Login = () => {

    const [username, setUsername] = useState('')    
    const [password, setPassword] = useState('')
    const [result, setResult] = useState('')
    const navigate = useNavigate();
    const [show, setShow] = useState(false)

    const {login, success, error} = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await login(username,password)
        
    }
    console.log(success, error)

    if (success) {
        console.log("here")
        navigate("/profile")
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
            <h6 style={error ? {"color":"red"}:{"display":"none", "color":"red"}}><i class="bi bi-exclamation-octagon"></i> Incorrect username/password. Please Try Again</h6>
        </div>
    )
}

export default Login
