import { Stack } from "expo-router";

export default function LeaveLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" options={{ title: "Leave" }} />
            <Stack.Screen
                name="applyLeave"
                options={{ title: "Apply Leave" }}
            />
            <Stack.Screen name="select" options={{ title: "Selected" }} />
        </Stack>
    );
}
