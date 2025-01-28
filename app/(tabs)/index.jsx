import { Colors } from "@/constants/Colors";
import { Text, View, SafeAreaView } from "react-native";

export default function Index() {
    return (
        <SafeAreaView className={`flex-1 bg-[${Colors.light.background}]`}>
            <Text className="p-0 m-0 font-bold text-red-400">
                HR Management System
            </Text>
        </SafeAreaView>
    );
}
