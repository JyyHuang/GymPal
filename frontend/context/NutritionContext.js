import { createContext, useReducer } from "react";

// State for foods page
export const NutritionContext = createContext();

export const nutritionReducer = (state, action) => {
    switch (action.type) {
        case "SET_NUTRITION":
            return {
                nutrition: action.payload
            }
        case "CREATE_NUTRITION":
            return {
                nutrition: [action.payload, ...state.nutrition]
            }
        case "DELETE_NUTRITION":
            return {
                nutrition: state.nutrition.filter((n) => n._id !== action.payload._id)
            }
        case "DELETE_ALL_NUTRITION":
            return {
                nutrition: []
            }
        default:
            return state;
    }
}

export const NutritionContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(nutritionReducer, {
        nutrition: null
    });

    return (
        <NutritionContext.Provider value={{...state, dispatch}}>
            {children}
        </NutritionContext.Provider>
    )
} 