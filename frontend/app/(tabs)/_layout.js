const { Tabs } = require("expo-router")
import Ionicons from '@expo/vector-icons/Ionicons';


const TabsLayout = () => {

    return (
        <Tabs>
            <Tabs.Screen name="index" 
                options={{
                    headerTitle: "Workouts",
                    title: "Workouts",
                    tabBarIcon: ({focused}) => {
                        const iconName = focused ? 'barbell' : 'barbell-outline';
                        return <Ionicons name={iconName} size={24} color='black'/>}
                    }}/>
            <Tabs.Screen name="nutrition" 
                options={{
                    headerTitle: "Nutrition",
                    title: "Nutrition",
                    tabBarIcon: ({focused}) => {
                        const iconName = focused ? 'nutrition' : 'nutrition-outline';
                        return <Ionicons name={iconName} size={24} color='black'/>}
                    }}>
            </Tabs.Screen>
        </Tabs>
    );
};

export default TabsLayout;