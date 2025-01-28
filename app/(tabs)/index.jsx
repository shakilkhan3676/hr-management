import { Colors } from "@/constants/Colors";
import { Text, View, SafeAreaView, Platform, ScrollView } from "react-native";
import ProfileCard from "@/components/home/ProfileCard";

export default function Index() {
    return (
        <SafeAreaView
            className={`flex-1 bg-[${Colors.light.background}]`}
            style={{
                flex: 1,
                marginTop: Platform.OS === "ios" ? 12 : 0,
            }}
        >
            <ScrollView showsVerticalScrollIndicator={false}>
                <ProfileCard />
            </ScrollView>
        </SafeAreaView>
    );
}
