import { View, Text, TouchableOpacity, Modal } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import {useNutritionContext} from '../../hooks/useNutritionContext';
import { useState } from "react";
import CreateFoodItemForm from "../components/CreateFoodItemForm";

const nutritionPage = () => {
    const {nutrition, dispatch} = useNutritionContext();
    const [addModal, setAddModal] = useState(false);

    return (
    <View className='flex-1 bg-neutral-800'>
        
        <Modal visible={addModal} animationType='fade' transparent={true}>
            <View className='flex-1 bg-[#000000aa]'>
                <CreateFoodItemForm setAddModal={setAddModal}/>
                <View onTouchEnd={() => {setAddModal(false)}} className='flex-1'></View>
            </View>
        </Modal>

        <View className='flex items-center'>
            <View className='absolute top-24'>
                <TouchableOpacity onPress={() => {setAddModal(true); dispatch({type:"OPEN_SEARCH_MODAL"})}}>
                    <View>
                        <MaterialIcons name="add-circle-outline" size={30} color="white" />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
        <View className='flex-1 justify-center items-center'>
            <View className='border border-white w-full items-center justify-center h-1/2'>
                <Text>s</Text>
            </View>
        </View>
    </View>
    );
};

export default nutritionPage;