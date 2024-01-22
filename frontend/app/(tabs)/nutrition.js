import { View, Text, TouchableOpacity, Modal, ScrollView, TouchableWithoutFeedback, KeyboardAvoidingView } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import {useNutritionContext} from '../../hooks/useNutritionContext';
import { useState, useEffect } from "react";
import CreateFoodItemForm from "../components/CreateFoodItemForm";

const nutritionPage = () => {
    const {nutrition, dispatch} = useNutritionContext();
    const [addModal, setAddModal] = useState(false);
    let totalCalories = 0;
    let totalProtein = 0;
    let totalFat = 0;
    
    // render nutrition when first renders
    useEffect(() => {
        const fetchNutrition = async () => {
            try{
                const response = await fetch('http://10.0.2.2:3000/api/GymPal/nutrition/',{
                    method:"GET"
                });

                const nutritionJson = await response.json();

                if (response.ok)
                {
                    dispatch({type: "SET_NUTRITION", payload: nutritionJson})
                }
            }
            catch(err) {
                console.log(err)
            }
        }
        fetchNutrition();
    }, [dispatch]);

    {nutrition && nutrition.forEach((n) => {
        totalCalories += n.calories;
        totalFat += n.fat;
        totalProtein += n.protein
        }
    )
    } 

    return (
    <View className='flex-1 bg-neutral-800'>
        
        
        <Modal visible={addModal} animationType='fade' transparent={true}>
            <TouchableWithoutFeedback onPressOut={() => {setAddModal(false)}}>
                <View className='flex-1 bg-[#000000aa]'>
                    <ScrollView>
                        <CreateFoodItemForm setAddModal={setAddModal}/>
                    </ScrollView>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
        
        

        <View className='flex items-center'>
            <View className='absolute top-24'>
                <TouchableOpacity onPress={() => {setAddModal(true)}}>
                    <View>
                        <MaterialIcons name="add-circle-outline" size={30} color="white" />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
        
        <View className='flex-1 justify-center items-center'>
                <View className='items-center'>       
                        <Text className='text-white text-6xl'>{Math.round((totalCalories + Number.EPSILON) * 100) / 100}</Text>
                        <Text className='text-white'>Calories</Text>
                     
                </View>
                
                <View className='flex-row mt-5'>
                    <View className='items-center m-10'>
                        <Text className='text-white text-2xl'>{Math.round((totalProtein + Number.EPSILON) * 100) / 100}</Text>
                        <Text className='text-white'>Protein (g)</Text>
                    </View>


                    <View className='items-center m-10'>
                        <Text className='text-white text-2xl'>{Math.round((totalFat + Number.EPSILON) * 100) / 100}</Text>
                        <Text className='text-white'>Fat (g)</Text>
                    </View>
                </View>
        </View>
        
    </View>
    );
};

export default nutritionPage;