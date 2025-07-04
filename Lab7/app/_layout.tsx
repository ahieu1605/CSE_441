import { Stack } from "expo-router";

export default function Layout() {
    return (
        <Stack
            initialRouteName="LoginScreen"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="LoginScreen"></Stack.Screen>
            <Stack.Screen
                name="tabs"
                options={{
                    headerShown: false,
                }}
            />
        </Stack>
    );
}
