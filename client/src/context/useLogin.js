import {useState} from "react"
import {useAuthContext} from "./useAuthContext"

export const useLogin = () => {
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)
    const { dispatch } = useAuthContext()
    
    const login = async (username, password) => {
        setError(null)

        const response = await fetch("/login", {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username, password})
        })
 
        const json = await response.json()
        if (!response.ok) {
            setError(json.error)
            setSuccess(false)
          }
          if (response.ok) {
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(json))
      
            // update the auth context
            dispatch({type: 'LOGIN', payload: json})
      
            // update loading state
            setSuccess(true)
          }
    }

    return { login, success, error }

}
