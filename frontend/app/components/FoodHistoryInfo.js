import { View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DeleteModal from "./DeleteModal";
import { useState } from "react";
import { useNutritionContext } from "../../hooks/useNutritionContext"

const FoodHistoryInfo = ( {n} ) => {
    const {dispatch} = useNutritionContext();
    const [deleteModalState, setDeleteModalState] = useState(false);

    console.log(n._id);
    const deleteNutrition = async () => {
        try{
            const response = await fetch('http://10.0.2.2:3000/api/GymPal/nutrition/' + n._id, {
                method: "DELETE"
            })
            const json = await response.json();
            console.log(json);

            if (response.ok){
                dispatch({type:"DELETE_NUTRITION", payload: json})
            }
        } catch (error){
            console.log(error);
        }
    }

    return (
        <View>
            <DeleteModal deleteModalState={deleteModalState} setDeleteModalState={setDeleteModalState} deleteFunction={deleteNutrition}/>

            <View className="m-3">
                <View className="flex-row flex-wrap bg-neutral-800 p-5 rounded-xl justify-evenly">
                    <View className="absolute right-2 top-2">
                        <TouchableOpacity onPress={() => {setDeleteModalState(true)}}>
                            <MaterialCommunityIcons name="minus-circle-outline" size={20} color="white" />
                        </ TouchableOpacity>
                    </View>
                    <View className='basis-full items-center mb-3'>
                        <Text className="text-white">{n.foodName}</Text>
                    </View>
                    <Text className="text-white">Calories: {n.calories}</Text>
                    <Text className="text-white">Protein: {n.protein}</Text>
                    <Text className="text-white">Fat: {n.fat}</Text>
                </View>
            </View>
        </View>
    )

}

export default FoodHistoryInfo;