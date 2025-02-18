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
                options={{
                    title: "Notifications",

                    headerRight: () => (
                        <TouchableOpacity
                            activeOpacity={0.6}
                            className="flex items-center justify-center px-4 py-1.5 border border-gray-600 rounded-lg"
                            onPress={() => router.push("notifications")}
                        >
                            <Text className="">Clear All</Text>
                        </TouchableOpacity>
                    ),
                }}
            />
        </Stack>
    );
}
