import { Modal, View, Text, TouchableOpacity } from "react-native";


const DeleteModal = ({deleteModalState, setDeleteModalState, deleteFunction}) => {
    
    return(
        <Modal visible={deleteModalState} animationType='fade' transparent={true}>
                <View className='flex-1 bg-[#000000aa] justify-center'>
                    <View className='m-5 bg-white rounded'>
                        <View className='mb-5 pt-5'>
                            <Text className='text-center text-base'>Are you sure you want to delete?</Text>
                        </View>
                        <View className='flex-row justify-evenly'>
                            <TouchableOpacity className='border border-r-0.5 border-zinc-400 flex-1 items-center justify-center p-2' onPress={deleteFunction}>
                                    <Text className>Yes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className='border border-l-0.5 border-zinc-400 flex-1 items-center justify-center p-2' onPress={() => setDeleteModalState(false)}>
                                
                                <Text>No</Text>
                                
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
    )
}

export default DeleteModal;