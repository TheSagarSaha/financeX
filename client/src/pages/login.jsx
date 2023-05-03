import React from "react"
import { useState } from "react"

const Login = () => {

    const [username, setUsername] = useState('')    
    const [password, setPassword] = useState('')
    const [result, setResult] = useState('')

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
        setResult(json.msg)
    }

    return(
        <div className="login">
            <h1>LoginPage</h1>
            <form onSubmit={handleSubmit}>
                <label>username:</label>
                <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
                <label>password:</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
                <button type="submit">Login</button>
            </form>
            <p>{result}</p>
        </div>
    )
}

export default Login
