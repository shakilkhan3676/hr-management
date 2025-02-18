// navigationOptions.js
import {
    Image,
    Text,
    TouchableOpacity,
    useColorScheme,
    View,
} from "react-native";
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
        // headerLeft: () => (
        //     <TouchableOpacity
        //         onPress={() => router.canGoBack() && router.back()}
        //         activeOpacity={0.6}
        //         style={{ justifyContent: "center" }}
        //         className="flex items-center justify-center w-10 h-10 border border-gray-300 rounded-full"
        //     >
        //         <Ionicons name="chevron-back" size={22} color="#171621" />
        //     </TouchableOpacity>
        // ),
        headerRight: () => (
            <TouchableOpacity
                activeOpacity={0.6}
                style={{ justifyContent: "center" }}
                className="flex items-center justify-center w-10 h-10 bg-white border border-gray-300 rounded-full"
                onPress={() => router.push("notifications")}
            >
                <BellIcon />
                <View className="absolute w-3 h-3 bg-red-500 border-2 border-white rounded-full top-2 right-2" />
            </TouchableOpacity>
        ),
    };
};

export const HeaderProfileOptions = (router) => {
    return (
        <>
            <TouchableOpacity
                activeOpacity={0.6}
                className="flex items-center justify-center mr-3 border border-gray-300 rounded-full w-14 h-14"
            >
                <Image
                    source={require("@/assets/images/profile.jpeg")}
                    className="w-full h-full rounded-full"
                    style={{ objectFit: "cover" }}
                />
            </TouchableOpacity>
            <View>
                <Text className="font-semibold">710003676</Text>
                <Text className="text-lg font-bold">Md Shakil Khan</Text>
            </View>
        </>
    );
};
