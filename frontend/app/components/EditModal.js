import { Modal, Text, TouchableOpacity, View } from "react-native";
import EditWorkoutForm from "./EditWorkoutForm";
import { MaterialCommunityIcons } from '@expo/vector-icons';


const EditModal = ({editModalState, setEditModalState, workout}) => {
    return (
        
        <Modal visible={editModalState} animationType="fade" transparent={true}>
            <View className='flex-1 bg-[#000000aa] justify-center'>
                <View className='m-5 bg-black rounded-2xl box-border justify-center'>
                    <View className="absolute top-2 left-2">
                        <MaterialCommunityIcons name={"arm-flex-outline"} size={30} color='white'/>
                    </View>
                    <TouchableOpacity onPress={() => setEditModalState(false)}>
                        <View className='absolute top-2 right-2'>
                            <MaterialCommunityIcons name="close-circle-outline" size={24} color="white" />
                        </View>
                    </TouchableOpacity>
                    <EditWorkoutForm workout={workout} setEditModalState={setEditModalState}/>
                </View>
            </View>
        </Modal>
    )
}

export default EditModal;