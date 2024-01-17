import { useState } from "react";
import {Formik} from 'formik';
import { TextInput, View, Text, TouchableOpacity } from "react-native";
import { useNutritionContext } from '../../hooks/useNutritionContext';
import { EvilIcons } from '@expo/vector-icons';
import FoodSearchItem from './FoodSearchItem';

const CreateFoodItemForm = ({setAddModal}) => {
    const {nutrition, dispatch} = useNutritionContext();
    const [error, setError] = useState(false);
    

    return (
        <View>
            <Formik
                initialValues={{searchItem: ''}}
                onSubmit={ async (values) => {
                    
                    const response = await fetch(`http://10.0.2.2:3000/api/GymPal/nutrition/search?query=${values.searchItem}`,{
                        method:'GET',
                        }
                    )
                    
                    const json = await response.json();

                    if (!response.ok){
                        setError(true)
                    }

                    if(response.ok){
                        let foodArray = [];

                        setError(false)
                        for (let i = 0; i < json.length; i++){
                            let foodObject = {};
                            const fdcId = json[i].fdcId;
                            const description = json[i].description
                            let currObject = Object.assign(foodObject, {'fdcId': fdcId})
                            currObject = Object.assign(currObject, {'description': description})
                            
                            
                            for (let j = 0; j < json[i].foodNutrients.length; j++){
                                if (json[i].foodNutrients[j].nutrientId === 1003){
                                    const protein = json[i].foodNutrients[j];
                                    currObject = Object.assign(currObject, {protein})
                                } if (json[i].foodNutrients[j].nutrientId === 1004){
                                    const fat = json[i].foodNutrients[j];
                                    currObject = Object.assign(currObject, {fat})
                                } if (json[i].foodNutrients[j].nutrientId === 1008){
                                    const calories = json[i].foodNutrients[j];
                                    currObject = Object.assign(currObject, {calories})
                                }
                            }
                            foodArray.push(currObject)
                        }
                        
                        dispatch({type: 'SEARCH_NUTRITION', payload: foodArray})
                    }
            }}>

            {(formikProps) => (
                <View>
                    <TextInput 
                        placeholder={error ? "Please Input A Search" : "Search..."}
                        placeholderTextColor='white'
                        onChangeText={formikProps.handleChange('searchItem')}
                        value={formikProps.values.searchItem}
                        className={`border m-3 mt-4 mt p-2 rounded text-white ${error ? 'border-red-200' : 'border-gray-300'}`}
                        onSubmitEditing={formikProps.handleSubmit}
                    />
                    <TouchableOpacity className='absolute right-5 top-6' onPress={formikProps.handleSubmit}><EvilIcons name="search" size={24} color="white" /></TouchableOpacity>
                    <View>
                        {nutrition && nutrition.map((food) => (
                            <FoodSearchItem key={food.fdcId} food={food} />
                            )
                        )}
                    </View>
                </View>
            )}
            </Formik>
        </View>
    )
}

export default CreateFoodItemForm;