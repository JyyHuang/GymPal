import { FontAwesome5 } from '@expo/vector-icons';
import { View, ScrollView, TouchableOpacity, Text } from "react-native";
import { useEffect, useRef, useState } from "react";

// components
import WorkoutInfo from '../components/WorkoutInfo';

const WorkoutsPage = () => {
    const [workouts, setWorkouts] = useState(null);

    // render workouts when first renders
    useEffect(() => {
        const fetchWorkouts = async () => {
            try{
                const response = await fetch('http://10.0.2.2:3000/api/GymPal/workouts/');
                const workoutJson = await response.json();

                if (response.ok)
                {
                    setWorkouts(workoutJson);
                }
            }
            catch(err) {
                console.log(err)
            }
        }

        fetchWorkouts();
    }, []);

    const scrollRef = useRef();
    const onPressTouch = () => {
        scrollRef.current?.scrollTo({
          y: 0,
          animated: true,
        });
    }

    return (
        <View className='flex-1'>
            <ScrollView ref={scrollRef}>
                {workouts && workouts.map((workout) => (
                    <WorkoutInfo key={workout._id} workout={workout} />
                ))}
                
            </ScrollView>

                <TouchableOpacity onPress={onPressTouch}>
                    <View className='absolute right-10 bottom-10'>
                        <FontAwesome5 name="arrow-circle-up" size={26} color="black" />
                    </View>
                </TouchableOpacity>
        </View>
    );
};

export default WorkoutsPage;