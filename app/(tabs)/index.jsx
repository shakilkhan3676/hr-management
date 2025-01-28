import { Colors } from "@/constants/Colors";
import { Text, View, SafeAreaView, Platform, ScrollView } from "react-native";
import ProfileCard from "@/components/home/ProfileCard";
import ArrowIcon from "@/assets/icons/arrow-half-circle.svg";

export default function Index() {
    return (
        <SafeAreaView
            className={`flex-1 bg-[${Colors.light.background}]`}
            style={{
                flex: 1,
                marginTop: Platform.OS === "ios" ? 12 : 0,
            }}
        >
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ gap: 16 }}
            >
                <ProfileCard />

                {/* History */}
                <View className="p-4 mx-4 bg-white rounded-xl">
                    <View className="flex-row items-center gap-3">
                        <ArrowIcon />
                        <Text className="text-black ">Punch in at</Text>
                    </View>
                    <View className="mt-2 ">
                        <Text className="text-lg font-semibold">
                            07:33 AM |
                            <Text className="text-sm text-gray-500">
                                {" "}
                                Wed, 11th Mar, 2020
                            </Text>
                        </Text>
                        <Text className="text-sm text-gray-500">
                            Today's Time: 04:33hr
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
