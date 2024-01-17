import { NutritionContext } from "../context/NutritionContext";
import { useContext } from "react";

export const useNutritionContext = () => {
    const context = useContext(NutritionContext);

    if (!context){
        throw Error('useNutritionContext must be used inside a NutritionContextProvider')
    }
    return context;
}