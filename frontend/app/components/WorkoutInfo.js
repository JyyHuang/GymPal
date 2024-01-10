import { View, Text } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const WorkoutInfo = ({workout}) => {
    return (
        <View className="flex-1 items-center m-5 justify-center bg-neutral-600 p-5 rounded-2xl box-border">
            <View className="absolute top-2 left-2">
                <MaterialCommunityIcons name={"arm-flex-outline"} size={30} color='black'/>
            </View>
            <Text className="text-xl font-semibold text-stone-200">{workout.workoutName}</Text>
            <Text className="text-base text-stone-200">Sets: {workout.sets}</Text>
            <Text className="text-base text-stone-200">Reps: {workout.reps}</Text>
            <Text className="text-base text-stone-200">Weight (lbs): {workout.weight}</Text>
        </View>
        
    )
}

export default WorkoutInfo;