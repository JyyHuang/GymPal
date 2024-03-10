import * as SecureStore from 'expo-secure-store';
import {createContext, useReducer, useEffect} from 'react'

export const AuthContext = createContext()

export const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                user: action.payload
            }
        case "LOGOUT":
            return {            
                user: null
            }
        default:
            return state;
    } 
}

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    });

    

    useEffect(() => {
        async function getValueFor(key){
            const user = JSON.parse(await SecureStore.getItemAsync(key))  
            if (user){
                dispatch({type: 'LOGIN', payload: user})
            }
        }        
        getValueFor('user')
    }, [])

    return (                         
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}                 
        </AuthContext.Provider>
    )
}
