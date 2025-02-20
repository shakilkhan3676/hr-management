import { Stack, useRouter } from "expo-router";
import { getScreenOptions } from "@/components/navigationOptions";
import { Text, TouchableOpacity } from "react-native";

export default function LeaveLayout() {
    const router = useRouter();

    return (
        <Stack
            screenOptions={{
                ...getScreenOptions(router),
            }}
        >
            <Stack.Screen name="index" options={{ title: "Leave" }} />
            <Stack.Screen
                name="applyLeave"
                options={{ title: "Apply Leave" }}
            />
            <Stack.Screen
                name="select"
                options={{
                    title: "Selected",
                }}
            />
        </Stack>
    );
}
