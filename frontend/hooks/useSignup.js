import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import * as SecureStore from 'expo-secure-store';

export const useSignup = (setState) => {
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const {dispatch} = useAuthContext()

    const signup = async (email, password) => {
        setIsLoading(true)
        setError(null)

        const response = await fetch(`http://10.0.2.2:3000/api/GymPal/user/signup`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}, 
            body: JSON.stringify({email, password})
        })

        const json = await response.json()
        if (!response.ok){
            setIsLoading(false)
            setError(json.error)
        }
        if (response.ok){
            // save jwt into local storage
            await SecureStore.setItemAsync('user', JSON.stringify(json))
            // update
            dispatch({type: 'LOGIN', payload: json})

            setIsLoading(false)
            setState(false)
        }
    }
    return {signup, isLoading, error}
}
