import { Colors } from "@/constants/Colors";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
    return (
        <SafeAreaView className={`flex-1 bg-[${Colors.light.background}]`}>
            <Text className="p-0 m-0 font-bold text-red-400">
                HR Management System
            </Text>
        </SafeAreaView>
    );
}
