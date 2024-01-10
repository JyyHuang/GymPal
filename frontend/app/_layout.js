const { Stack } = require("expo-router")

const RootLayout = () => {
    return (
    <Stack>
        <Stack.Screen name="(tabs)" options={{headerShown: false}}></Stack.Screen>
    </Stack>
    );
};

export default RootLayout;