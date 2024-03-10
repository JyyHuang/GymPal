import { useState } from "react";
import {Formik} from 'formik';
import { TextInput, View, TouchableOpacity } from "react-native";
import { EvilIcons } from '@expo/vector-icons';
import FoodSearchItem from './FoodSearchItem';
import { useAuthContext} from '../../hooks/useAuthContext'

const CreateFoodItemForm = ({setAddModal}) => {
    const [searchItems, setSearchItems] = useState([]);
    const [error, setError] = useState(false);
    const {user} = useAuthContext();
    
    let foodArray = [];

    return (
        <View>
            <Formik
                initialValues={{searchItem: ''}}
                onSubmit={ async (values) => {
                    if (!user){
                        setError("Please log in")
                        return;
                    }
                    const response = await fetch(`http://10.0.2.2:3000/api/GymPal/nutrition/search?query=${values.searchItem}`,{
                        method:'GET',

                        headers: {
                            'Authorization': `Bearer ${user.token}`
                        }
                        }
                    )
                    
                    const json = await response.json();
                    
                    if (!response.ok){
                        setError(true)
                    }

                    if(response.ok){

                        setError(false)
                        for (let i = 0; i < json.length; ++i){
                            let foodObject = {};
                            const fdcId = json[i].fdcId;
                            const description = json[i].description
                            const servingSize = json[i].servingSize
                            const servingSizeUnit = json[i].servingSizeUnit
                            let currObject = Object.assign(foodObject, {'fdcId': fdcId})
                            currObject = Object.assign(currObject, {'description': description})
                            currObject = Object.assign(currObject, {'servingSize': servingSize})
                            currObject = Object.assign(currObject, {'servingSizeUnit': servingSizeUnit})
                            
                            
                            for (let j = 0; j < json[i].foodNutrients.length; ++j){
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
                        setSearchItems(foodArray)
                    }
            }}>

            {(formikProps) => (
                <View>
                    <TextInput 
                        placeholder={error ? "Please Input A Valid Search" : "Search..."}
                        placeholderTextColor='white'
                        onChangeText={formikProps.handleChange('searchItem')}
                        value={formikProps.values.searchItem}
                        className={`border m-3 mt-4 mt p-2 rounded text-white ${error ? 'border-red-200' : 'border-gray-300'}`}
                        onSubmitEditing={formikProps.handleSubmit}
                    />
                    <TouchableOpacity className='absolute right-5 top-6' onPress={formikProps.handleSubmit}><EvilIcons name="search" size={24} color="white" /></TouchableOpacity>
                    <View>
                        {searchItems && searchItems.map((food) => (
                            <FoodSearchItem key={food.fdcId} food={food} setAddModal={setAddModal}/>
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
