import {Formik} from 'formik';
import { Button, TextInput, View, Text, Keyboard, TouchableWithoutFeedback, TouchableOpacity} from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSignup } from '../../hooks/useSignup';

const SignupForm = ({setSignupModalState}) => {
    const { signup, error, isLoading} = useSignup(setSignupModalState)

    return (
        <View>
            
            <Formik
                // Set initial values to current workout values
                initialValues={{email: "", password: ""}} 
                onSubmit={ async (values) => {
                    await signup(values.email, values.password)
                }}
            >

                {(formikProps) => (
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} touchSoundDisabled={true}>                   
                        
                        <View className='w-full h-full'>
                        <TouchableOpacity onPress={() => setSignupModalState(false)}>
                            <View className='absolute top-3 left-2 z-10'>
                                <MaterialCommunityIcons name="close-circle-outline" size={24} color="white" />
                            </View>
                        </TouchableOpacity>
                        <View className='mt-56'>
                            <TextInput 
                                placeholder="Email"
                                placeholderTextColor='white'
                                onChangeText={formikProps.handleChange("email")}
                                value={formikProps.values.email}
                                className='border m-3 border-gray-400 rounded text-white p-2'
                                onSubmitEditing={Keyboard.dismiss}
                            />
                            <TextInput 
                                placeholder="Password"
                                placeholderTextColor='white'
                                onChangeText={formikProps.handleChange("password")}
                                value={formikProps.values.password}
                                className='border border-gray-400 m-3 rounded text-white p-2 mb-10'
                            />
                            <Button disabled={isLoading} title="Signup" color="black" onPress={formikProps.handleSubmit}></Button>
                            {error && <View className='p-5 m-5 bg-red-100 rounded-md border-2 border-red-400 items-center'><Text>{error}</Text></View>}
                        </View>
                    </View>        
                    </TouchableWithoutFeedback>
                )}
            </Formik>
        </View>        
    )
}

export default SignupForm;
