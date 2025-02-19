import { Stack, useRouter } from "expo-router";
import {
    getScreenOptions,
    HeaderProfileOptions,
} from "@/components/navigationOptions";
import { Text, TouchableOpacity } from "react-native";

export default function HomeLayout() {
    const router = useRouter();

    return (
        <Stack
            screenOptions={{
                headerShown: true,
                ...getScreenOptions(router),
            }}
        >
            <Stack.Screen
                name="index"
                options={{
                    title: "",
                    headerLeft: () => <HeaderProfileOptions router={router} />,
                }}
            />
            <Stack.Screen
                name="profile"
                options={{ title: "Profile", headerShown: false }}
            />
            <Stack.Screen
                name="notifications"
                options={{ title: "Notifications" }}
            />
        </Stack>
    );
}
