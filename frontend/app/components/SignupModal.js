import { Modal, View } from "react-native";
import SignupForm from "./SignupForm";

const SignupModal = ({signupModalState, setSignupModalState}) => {
    return (
        
        <Modal visible={signupModalState} animationType="fade" transparent={true}>
            <View className='flex-1 bg-[#000000aa]'>
                    <SignupForm setSignupModalState={setSignupModalState}></SignupForm>
            </View>
        </Modal>
    )
}

export default SignupModal;
