import { View,Text } from "react-native";


const CheckLogin = () => {
    return(
        <View className='flex-1 bg-neutral-800'>
            <View className='justify-center items-center flex-1'>
                <Text className='text-white text-lg'>
                    Please Login or Signup
                </Text>
            </View>
        </View>
    )
}

export default CheckLogin;
