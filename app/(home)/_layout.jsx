import { Stack } from "expo-router";

export default function HomeLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" options={{ title: "Home" }} />
            <Stack.Screen name="profile" options={{ title: "Profile" }} />
            <Stack.Screen
                name="notifications"
                options={{ title: "Notifications" }}
            />
        </Stack>
    );
}
