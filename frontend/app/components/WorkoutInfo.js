import { View, Text, TouchableOpacity } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useWorkoutContext } from "../../hooks/useWorkoutContext";
import { useState } from "react";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditModal";
import { useAuthContext} from '../../hooks/useAuthContext'

// Workout card component
const WorkoutInfo = ({workout}) => {
    const {dispatch} = useWorkoutContext();
    const [deleteModalState, setDeleteModalState] = useState(false);
    const [editModalState, setEditModalState] = useState(false);
    const {user} = useAuthContext();

    const deleteWorkout = async () => {
        if (!user){
            return;
        }
        const response = await fetch('http://10.0.2.2:3000/api/GymPal/workouts/' + workout._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        });

        const workoutJson = await response.json();
        
        if(response.ok){
            dispatch({type: 'DELETE_WORKOUT', payload: workoutJson});
        }

    }

    return (
        <TouchableOpacity className="flex-1 items-center m-5 justify-center bg-black p-5 rounded-2xl box-border" onPress={() => setEditModalState(true)}>
            
            <EditModal editModalState={editModalState} setEditModalState={setEditModalState} workout={workout}/>
            
            <DeleteModal deleteModalState={deleteModalState} setDeleteModalState={setDeleteModalState} deleteFunction={deleteWorkout}/>
            
            <View className="absolute top-2 left-2">
                <MaterialCommunityIcons name={"arm-flex-outline"} size={30} color='white'/>
            </View>
            <Text className="text-xl font-semibold text-white">{workout.workoutName}</Text>
            <Text className="text-base text-white">Sets: {workout.sets}</Text>
            <Text className="text-base text-white">Reps: {workout.reps}</Text>
            <Text className="text-base text-white">Weight (lbs): {workout.weight}</Text>
            <TouchableOpacity className='absolute top-2 right-2' onPress={() => setDeleteModalState(true)}>
                <View>
                    <MaterialCommunityIcons name="minus-circle-outline" size={24} color="white" />
                </View>
            </TouchableOpacity>
        </TouchableOpacity>
        
    )
}

export default WorkoutInfo;
