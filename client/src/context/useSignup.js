import {useState} from "react"
import {useAuthContext} from "./useAuthContext"

export const useSignup = () => {
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)
    const { dispatch } = useAuthContext()

    const signup = async (f_name, l_name, username, email, password) => {
        setError(null)

        const response = await fetch("/signup", {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({f_name, l_name, email, username, password})
        })

        const json = await response.json()
        if (!response.ok) {
            setSuccess(false)
            setError(json.error)
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

    return { signup, success, error }

}
