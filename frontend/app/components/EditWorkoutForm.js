import { useState } from "react";
import {Formik} from 'formik';
import { Button, TextInput, View, Text } from "react-native";
import { useWorkoutContext } from '../../hooks/useWorkoutContext';
import { useAuthContext} from '../../hooks/useAuthContext'

const EditWorkoutForm = ({workout, setEditModalState}) => {
    
    const {dispatch} = useWorkoutContext();
    const [error, setError] = useState(null);
    const [missingFields, setMissingFields] = useState([])
    const {user} = useAuthContext();

    return(
        <View>
            <Formik
                // Set initial values to current workout values
                initialValues={{workoutName: workout.workoutName, sets: workout.sets, reps: workout.reps, weight: workout.weight}} 
                onSubmit={ async (values) => {
                    if (!user){
                        setError("Please log in")
                        return;
                    }

                    // PATCH request to backend api
                    const response = await fetch('http://10.0.2.2:3000/api/GymPal/workouts/' + workout._id, {
                        method: 'PATCH',
                        body: JSON.stringify(values),
                        headers:{
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${user.token}`
                        }
                    })
                    
                    const workoutJson = await response.json();
                    
                    if (!response.ok){
                        setError(workoutJson.error);
                        setMissingFields(workoutJson.missingFields);
                    }
                    
                    // If response succeeds, dispatch to reducer
                    if (response.ok){
                        setError(null);
                        setMissingFields([]);
                        console.log("Workout Changed", workoutJson)
                        setEditModalState(false);
                        dispatch({type: 'EDIT_WORKOUT', payload: workoutJson})
                    }
            }}>

            {(formikProps) => (
                <View>
                    <TextInput 
                        placeholder="Workout Name"
                        onChangeText={formikProps.handleChange('workoutName')}
                        value={formikProps.values.workoutName}
                        className={`border m-2 mt-10 p-2 rounded text-base text-white ${missingFields.includes("Workout Name") ? 'border-red-200': 'border-gray-300'}`}
                    />

                    <TextInput 
                        placeholder="Sets"
                        onChangeText={formikProps.handleChange('sets')}
                        value={formikProps.values.sets}
                        className={`border ml-2 mr-2 p-2 rounded text-base text-white ${missingFields.includes("Sets") ? 'border-red-200': 'border-gray-300'}`}
                    />

                    <TextInput 
                        placeholder="Reps"
                        onChangeText={formikProps.handleChange('reps')}
                        value={formikProps.values.reps}
                        className={`border mt-2 ml-2 mr-2 p-2 rounded text-base text-white ${missingFields.includes("Reps") ? 'border-red-200': 'border-gray-300'}`}
                    />

                    <TextInput 
                        placeholder="Weight"
                        onChangeText={formikProps.handleChange('weight')}
                        value={formikProps.values.weight}
                        className={`border m-2 p-2 rounded text-base text-white ${missingFields.includes("Weight") ? 'border-red-200': 'border-gray-300'}`}
                    />

                    <Button title="edit" color='black' onPress={formikProps.handleSubmit}></Button>
                    {error && <View className='p-5 m-5 bg-red-100 rounded-md border-2 border-red-400 items-center'><Text className='text-red-500'>{error}</Text></View>}
                </View>
            )}
            </Formik>
        </View>
    )
}

export default EditWorkoutForm;
