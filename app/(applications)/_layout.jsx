import { Stack } from "expo-router";

export default function ApplicationsLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" options={{ title: "Applications" }} />
        </Stack>
    );
}
