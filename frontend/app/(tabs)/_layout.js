const { Tabs } = require("expo-router")
import Ionicons from '@expo/vector-icons/Ionicons';
import { WorkoutContextProvider } from '../../context/WorkoutContext';
import { StatusBar } from 'react-native';
import {SafeAreaView } from 'react-native-safe-area-context';


const TabsLayout = () => {

    return (
        
        <WorkoutContextProvider>
            <SafeAreaView><StatusBar></StatusBar></SafeAreaView>
            <Tabs >
                <Tabs.Screen name="index" 
                    options={{
                        headerTitle: "Workouts",
                        headerStyle: {
                            backgroundColor:'black'
                        },
                        headerTitleStyle: {
                            color:'white'
                        },
                        title: "Workouts",
                        tabBarActiveBackgroundColor:'black',
                        tabBarInactiveBackgroundColor: 'black',
                        tabBarActiveTintColor:'white',
                        tabBarInactiveTintColor:'gray',
                        tabBarIcon: ({focused}) => {
                            const iconName = focused ? 'barbell' : 'barbell-outline';
                            return <Ionicons name={iconName} size={24} color='white'/>}
                        }}
                        />
                <Tabs.Screen name="nutrition" 
                    options={{
                        headerTitle: "Nutrition",
                        headerStyle: {
                            backgroundColor:'black'
                        },
                        headerTitleStyle: {
                            color:'white'
                        },
                        title: "Nutrition",
                        tabBarActiveBackgroundColor:'black',
                        tabBarInactiveBackgroundColor: 'black',
                        tabBarActiveTintColor:'white',
                        tabBarInactiveTintColor:'gray',
                        tabBarIcon: ({focused}) => {
                            const iconName = focused ? 'nutrition' : 'nutrition-outline';
                            return <Ionicons name={iconName} size={24} color='white'/>}
                        }}>
                </Tabs.Screen>
            </Tabs>
        </WorkoutContextProvider>
    );
};

export default TabsLayout;