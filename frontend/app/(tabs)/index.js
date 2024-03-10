import {useState} from "react"
import { View,Text, TouchableOpacity } from "react-native"
import SignupModal from "../components/SignupModal.js"
import LoginModal from "../components/LoginModal.js";
import {useLogout} from "../../hooks/useLogout.js"
import {useAuthContext} from "../../hooks/useAuthContext.js"

const Account = () => {
    const [signupModalState, setSignupModalState] = useState(false);
    const [loginModalState, setLoginModalState] = useState(false);
    const {logout} = useLogout()
    const {user} = useAuthContext()

    const handleLogout = () => {
        logout()
    }

    return(
        <View className='flex-1 bg-neutral-800' >
            <SignupModal visible={signupModalState} signupModalState={signupModalState} setSignupModalState={setSignupModalState}/>
            <LoginModal visible={loginModalState} loginModalState={loginModalState} setLoginModalState={setLoginModalState} />       

                {user && (<View className='justify-center items-center flex-1' >
                    <Text className='text-white text-lg'>User: {user.email}</Text>
                    <TouchableOpacity className='m-5 w-20 h-10 border border-stone-300 rounded-md justify-center items-center' onPress={handleLogout}>
                        <Text className='text-white text-xl'>
                            Logout
                        </Text>

                    </TouchableOpacity>
                    </View>
                )}
                {!user && (<View className='justify-center items-center flex-1'>
                <TouchableOpacity className='m-5 w-20 h-10 border border-stone-300 rounded-md justify-center items-center' onPress={() => setLoginModalState(true)}>
                    <Text className='text-white text-xl'>
                        Login
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity className='m-5 w-20 h-10 border border-stone-300 rounded-md justify-center items-center' onPress= {() => setSignupModalState(true)}>
                    <Text className='text-white text-xl'>
                        Signup
                    </Text>
                </TouchableOpacity>
                </View>
                )}

       
        </View>
    )
}

export default Account;
