import { ScrollView, View, Text, TouchableOpacity } from "react-native"
import { useNutritionContext } from "../../hooks/useNutritionContext";
import FoodHistoryInfo from "./FoodHistoryInfo";


const FoodHistory = () => {
    const {nutrition} = useNutritionContext();

    return (
        <View className='mt-12'>
            <ScrollView>
            {nutrition && nutrition.map((n) => (
                <FoodHistoryInfo key={n._id} n={n} />
            ))}
            </ScrollView>
        </View> 
    )
}
export default FoodHistory