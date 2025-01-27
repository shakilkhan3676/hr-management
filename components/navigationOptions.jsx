// navigationOptions.js
import { TouchableOpacity, useColorScheme, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import BellIcon from "@/assets/icons/bell-linear.svg";
import { Colors } from "@/constants/Colors";

export const getScreenOptions = (router) => {
    const colorScheme = useColorScheme();

    return {
        headerTitleAlign: "center",
        headerStyle: {
            backgroundColor: Colors[colorScheme ?? "light"].background,
        },
        headerShadowVisible: false,
        headerLeft: () => (
            <TouchableOpacity
                onPress={() => router.canGoBack() && router.back()}
                activeOpacity={0.6}
                style={{ justifyContent: "center" }}
                className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-full"
            >
                <Ionicons name="chevron-back" size={22} color="#171621" />
            </TouchableOpacity>
        ),
        headerRight: () => (
            <TouchableOpacity
                activeOpacity={0.6}
                style={{ justifyContent: "center" }}
                className="flex items-center justify-center w-10 h-10 bg-white border border-gray-300 rounded-full"
            >
                <BellIcon />
                <View className="absolute w-3 h-3 bg-red-500 border-2 border-white rounded-full top-2 right-2" />
            </TouchableOpacity>
        ),
    };
};
