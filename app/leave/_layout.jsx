import { Stack, useRouter } from "expo-router";
import { getScreenOptions } from "@/components/navigationOptions";

export default function LeaveLayout() {
    const router = useRouter();

    return (
        <Stack
            screenOptions={{
                headerShown: true,
                ...getScreenOptions(router),
            }}
        >
            <Stack.Screen
                name="applyLeave"
                options={{ title: "Apply Leave" }}
            />
        </Stack>
    );
}
