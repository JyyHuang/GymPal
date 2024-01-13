import { useState } from "react";
import {Formik} from 'formik';
import { Button, TextInput, View, Text } from "react-native";
import { useWorkoutContext } from '../../hooks/useWorkoutContext';

const CreateWorkoutForm = ({setModal}) => {
    const {dispatch} = useWorkoutContext();
    const [error, setError] = useState(null);
    const [missingFields, setMissingFields] = useState([])

    return (
        <View>
            <Formik 
                initialValues={{workoutName: '', sets: '', reps: '', weight: ''}} 
                onSubmit={ async (values) => {
                    const response = await fetch('http://10.0.2.2:3000/api/GymPal/workouts/', {
                        method: 'POST',
                        body: JSON.stringify(values),
                        headers:{
                            'Content-Type': 'application/json'
                        }
                    })
                    
                    const workoutJson = await response.json();
                    
                    if (!response.ok){
                        setError(workoutJson.error);
                        setMissingFields(workoutJson.missingFields);

                    }

                    if (response.ok){
                        setError(null);
                        setMissingFields([]);
                        console.log("New workout added!", workoutJson)
                        setModal(false);
                        dispatch({type: 'CREATE_WORKOUT', payload: workoutJson})
                    }
            }}>

            {(formikProps) => (
                <View>
                    <TextInput 
                        placeholder="Workout Name"
                        onChangeText={formikProps.handleChange('workoutName')}
                        value={formikProps.values.workoutName}
                        className={`border m-2 p-2 rounded text-base ${missingFields.includes("Workout Name") ? 'border-red-200': 'border-gray-300'}`}
                    />

                    <TextInput 
                        placeholder="Sets"
                        onChangeText={formikProps.handleChange('sets')}
                        value={formikProps.values.sets}
                        className={`border ml-2 mr-2 p-2 rounded text-base ${missingFields.includes("Sets") ? 'border-red-200': 'border-gray-300'}`}
                    />

                    <TextInput 
                        placeholder="Reps"
                        onChangeText={formikProps.handleChange('reps')}
                        value={formikProps.values.reps}
                        className={`border mt-2 ml-2 mr-2 p-2 rounded text-base ${missingFields.includes("Reps") ? 'border-red-200': 'border-gray-300'}`}
                    />

                    <TextInput 
                        placeholder="Weight"
                        onChangeText={formikProps.handleChange('weight')}
                        value={formikProps.values.weight}
                        className={`border m-2 p-2 rounded text-base ${missingFields.includes("Weight") ? 'border-red-200': 'border-gray-300'}`}
                    />
                    <Button title="add" color='black' onPress={formikProps.handleSubmit}></Button>
                    {error && <View className='p-5 m-5 bg-red-100 rounded-md border-2 border-red-400 items-center'><Text className='text-red-500'>{error}</Text></View>}
                </View>
            )}
            </Formik>
        </View>
    )
}

export default CreateWorkoutForm;