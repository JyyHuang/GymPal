const { Tabs } = require("expo-router")
import { WorkoutContextProvider } from '../../context/WorkoutContext';
import { NutritionContextProvider } from '../../context/NutritionContext';
import { AuthContextProvider } from '../../context/AuthContext';
import Ionicons from '@expo/vector-icons/Ionicons';
import {SafeAreaView } from 'react-native-safe-area-context';


const TabsLayout = () => {
    return (

        <AuthContextProvider>
            <WorkoutContextProvider>
                <NutritionContextProvider>
                    <SafeAreaView></SafeAreaView>
                        <Tabs>
                            <Tabs.Screen 
                                name="index"
                                options={{
                                    headerTitle: "Account",
                                    headerStyle: {
                                        backgroundColor:'black',
                                        
                                    },
                                    headerTitleStyle: {
                                        color:'white'
                                    },
                                    title: "Account",
                                    tabBarActiveBackgroundColor:'black',
                                    tabBarInactiveBackgroundColor: 'black',
                                    tabBarActiveTintColor:'white',
                                    tabBarInactiveTintColor:'gray',
                                    tabBarHideOnKeyboard: true,
                                    tabBarIcon: ({focused}) => {
                                        const iconName = focused ? 'person' : 'person-outline';
                                        return <Ionicons name={iconName} size={24} color='white'/>}
                                }}
                                />
                            <Tabs.Screen name="workouts"  
                                options={{
                                    headerTitle: "Workouts",
                                    headerStyle: {
                                        backgroundColor:'black',
                                        
                                    },
                                    headerTitleStyle: {
                                        color:'white'
                                    },
                                    title: "Workouts",
                                    tabBarActiveBackgroundColor:'black',
                                    tabBarInactiveBackgroundColor: 'black',
                                    tabBarActiveTintColor:'white',
                                    tabBarInactiveTintColor:'gray',
                                    tabBarHideOnKeyboard: true,
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
                                    tabBarHideOnKeyboard: true,
                                    tabBarIcon: ({focused}) => {
                                        const iconName = focused ? 'nutrition' : 'nutrition-outline';
                                        return <Ionicons name={iconName} size={24} color='white'/>}
                                    }}>
                        </Tabs.Screen>
                    </Tabs>
                </NutritionContextProvider>
            </WorkoutContextProvider>
        </AuthContextProvider>
    );
};

export default TabsLayout;
