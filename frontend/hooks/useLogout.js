import * as SecureStore from 'expo-secure-store';
import {useAuthContext} from './useAuthContext'
import {useWorkoutContext} from './useWorkoutContext'
import {useNutritionContext} from './useNutritionContext'

export const useLogout = () => {
    const {dispatch} = useAuthContext()
    const {dispatch: workoutsDispatch} = useWorkoutContext()
    const {dispatch: nutritionDispatch} = useNutritionContext()

    const logout = async () => {
        // delete local storage user
        await SecureStore.deleteItemAsync('user')

        // dispatch
        dispatch({type: 'LOGOUT'})
        workoutsDispatch({type: 'SET_WORKOUTS', payload:  null})
        nutritionDispatch({type: 'SET_NUTRITION', payload:  null})
    }

    return {logout}
}
