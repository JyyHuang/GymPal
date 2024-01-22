import { View, Text, TouchableOpacity } from "react-native";
import { useNutritionContext } from '../../hooks/useNutritionContext';


const FoodSearchItem = ({food, setAddModal}) => {
    const {dispatch} = useNutritionContext();
    console.log(food)
    const addFoodItem = async () => {
        const response = await fetch(`http://10.0.2.2:3000/api/GymPal/nutrition/`, {
            method: 'POST',
            body: JSON.stringify({"foodName":food.description, "calories":food.calories.value, "protein":food.protein.value, "fat": food.fat.value}),
            headers:{
                'Content-Type': 'application/json'
            }
        }
        )
        const nutritionJson = await response.json()

        if (!response.ok){
            console.log(nutritionJson.error)
        }
        if (response.ok){
            dispatch({type: "CREATE_NUTRITION", payload: nutritionJson})
        }
    }

    return(
                <View className='m-5 flex-1'>
                    <TouchableOpacity onPress={() => {
                        setAddModal(false);
                        addFoodItem()
                    }}>
                        <View className='flex flex-row flex-wrap bg-neutral-800 p-5 rounded-xl'>
                            <View className='flex basis flex-row flex-wrap'>
                                <Text className='text-white'>{food.description}</Text>
                                <View className='flex-row basis-full'>
                                    <Text className='text-white'>Serving: {Math.round((food.servingSize + Number.EPSILON) * 100) / 100} {food.servingSizeUnit}</Text>
                                </View>
                            </View>
                            <View className='basis-full flex-row'>
                                <Text className='text-white'>Calories: {food.calories.value && food.calories.value}</Text>
                                <Text className='text-white'> Protein: {food.protein.value && food.protein.value} {food.protein.unitName}</Text>
                                <Text className='text-white'> Fat: {food.fat.value && food.calories.value} {food.fat.unitName}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
                </View>
                
    )
}

export default FoodSearchItem;