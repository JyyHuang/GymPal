import { Modal, View } from "react-native";
import LoginForm from "./LoginForm";

const LoginModal = ({loginModalState, setLoginModalState}) => {
    return (
        
        <Modal visible={loginModalState} animationType="fade" transparent={true}>
            <View className='flex-1 bg-[#000000aa]'>
                    <LoginForm setLoginModalState={setLoginModalState}></LoginForm>
            </View>
        </Modal>
    )
}

export default LoginModal;