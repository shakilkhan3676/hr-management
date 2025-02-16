import { Stack, useRouter } from "expo-router";
import { getScreenOptions } from "@/components/navigationOptions";
import { Platform } from "react-native";

export default function HomeLayout() {
    const router = useRouter();

    const defaultTabBarStyle = Platform.select({
        ios: { position: "absolute" },
        default: { height: 60 },
    });

    return (
        <Stack
            screenOptions={{
                headerShown: false,
                ...getScreenOptions(router),
            }}
        >
            <Stack.Screen
                name="index"
                listeners={({ navigation }) => ({
                    focus: () => {
                        // Show tab bar when index screen is focused
                        navigation.getParent()?.setOptions({
                            headerShown: true,
                            tabBarStyle: defaultTabBarStyle,
                        });
                    },
                })}
            />
            <Stack.Screen
                name="profile"
                options={{
                    title: "Profile",
                    headerShown: true,
                }}
                listeners={({ navigation }) => ({
                    focus: () => {
                        // Hide tab bar when profile screen is focused
                        navigation.getParent()?.setOptions({
                            headerShown: false,
                            tabBarStyle: { display: "none" },
                        });
                    },
                })}
            />
        </Stack>
    );
}
