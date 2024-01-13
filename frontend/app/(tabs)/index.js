import { FontAwesome5 } from '@expo/vector-icons';
import { View, ScrollView, TouchableOpacity, Modal, Text } from "react-native";
import { useEffect, useRef, useState } from "react";
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CreateWorkoutForm from '../components/CreateWorkoutForm';
import { useWorkoutContext } from '../../hooks/useWorkoutContext';

// components
import WorkoutInfo from '../components/WorkoutInfo';

const WorkoutsPage = () => {
    const {workouts, dispatch} = useWorkoutContext();
    const [modal, setModal] = useState(false);


    // render workouts when first renders
    useEffect(() => {
        const fetchWorkouts = async () => {
            try{
                const response = await fetch('http://10.0.2.2:3000/api/GymPal/workouts/');
                const workoutsJson = await response.json();

                if (response.ok)
                {
                    dispatch({type: 'SET_WORKOUTS', payload: workoutsJson})
                }
            }
            catch(err) {
                console.log(err)
            }
        }

        fetchWorkouts();
    }, [dispatch]);

    const scrollRef = useRef();
    const onPressTouch = () => {
        scrollRef.current?.scrollTo({
          y: 0,
          animated: true,
        });
    }

    return (
            <View className='flex-1 bg-neutral-800'>
                    
                <Modal visible={modal} animationType='fade' transparent={true}>
                    <View className='flex-1 bg-[#000000aa]'>
                        <View className='m-5 bg-white rounded-2xl mt-40'>
                            <TouchableOpacity onPress={() => setModal(false)}>
                                <View className='items-center mt-2'>
                                    <MaterialCommunityIcons name="close-circle-outline" size={24} color="black" />
                                </View>
                            </TouchableOpacity>
                            <CreateWorkoutForm setModal={setModal}/>
                        </View>
                    </View>
                </Modal>
                
                <ScrollView ref={scrollRef}>

                    <TouchableOpacity onPress={() => setModal(true)}>
                        <View className='absolute right-2 top-2'>
                            <MaterialIcons name="add-circle-outline" size={24} color="white" />
                        </View>
                    </TouchableOpacity>

                    <View className="mt-8"></View>
                    {workouts && workouts.map((workout) => (
                        <WorkoutInfo key={workout._id} workout={workout} />
                    ))}

                </ScrollView>

                <TouchableOpacity onPress={onPressTouch}>
                    <View className='absolute right-10 bottom-10'>
                        <FontAwesome5 name="arrow-circle-up" size={26} color='white'/>
                    </View>
                </TouchableOpacity>

            </View>
    );
};

export default WorkoutsPage;