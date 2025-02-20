import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button, Divider } from "react-native-paper";
import {
    Ionicons,
    FontAwesome,
    MaterialIcons,
    Feather,
    MaterialCommunityIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";
import QRCode from "react-native-qrcode-svg";

const socialIcons = [
    {
        name: "facebook",
    },
    {
        name: "linkedin",
    },
    {
        name: "twitter",
    },
    {
        name: "github",
    },
    {
        name: "instagram",
    },
];

const profile = () => {
    return (
        <SafeAreaView className="">
            <View className="relative flex items-center bg-blue-200 h-28">
                <TouchableOpacity
                    onPress={() => router.canGoBack() && router.back()}
                    activeOpacity={0.6}
                    style={{ justifyContent: "center" }}
                    className="absolute bottom-0 items-center w-10 h-10 border border-[rgba(255,255,255,0.4)] rounded-full bg-[rgba(255,255,255,0.3)] left-4 top-4"
                >
                    <Ionicons name="chevron-back" size={22} color="#171621" />
                </TouchableOpacity>
                <View className="absolute bottom-0 translate-y-1/2 bg-green-200 rounded-full w-28 h-28"></View>
            </View>

            <View className="items-center pt-8 mx-5 mt-8">
                <Text className="text-xl font-bold text-center text-gray-700">
                    Md Shakil Khan
                </Text>
                <Text className="font-semibold text-center text-gray-500">
                    Junior Software Engineer
                </Text>
                <Text className="text-center text-gray-500">
                    Daffodil International University
                </Text>
                <View className="mt-3 border-2 border-black">
                    <QRCode
                        value="your-qr-code-value"
                        size={125}
                        backgroundColor="transparent"
                        quietZone={8}
                    />
                </View>
            </View>
            <View className="gap-5 py-5 mx-5">
                <Button
                    mode="contained"
                    buttonColor="#2563eb"
                    textColor="white"
                    rippleColor="rgba(0, 0, 0, 0.1)"
                    labelStyle={{ fontSize: 16, padding: 3 }}
                    style={{ borderRadius: 50 }}
                    icon={() => (
                        <FontAwesome
                            name="user-circle-o"
                            size={24}
                            color="white"
                        />
                    )}
                    onPress={() => console.log("Pressed")}
                >
                    Save Contact to Phone
                </Button>

                <Button
                    mode="contained"
                    buttonColor="#d1d5db"
                    textColor="#374151"
                    rippleColor="rgba(0, 0, 0, 0.1)"
                    labelStyle={{ fontSize: 16, padding: 3 }}
                    style={{
                        borderRadius: 50,
                        borderWidth: 0.5,
                        borderColor: "#9ca3af",
                    }}
                    icon={() => (
                        <Ionicons
                            name="share-social-outline"
                            size={24}
                            color="#374151"
                        />
                    )}
                    onPress={() => console.log("Pressed")}
                >
                    Share Profile Link
                </Button>
            </View>
            <View className="gap-3 py-4 mx-5">
                <View className="flex-row items-center gap-3">
                    <MaterialIcons
                        name="mail-outline"
                        size={20}
                        color="#6b7280"
                    />
                    <Text className="text-sm text-gray-500">
                        sm.manager@daffodilvarsity.edu.bd
                    </Text>
                </View>
                <Divider />
                <View className="flex-row items-center gap-3">
                    <Feather name="phone" size={20} color="#6b7280" />
                    <Text className="text-sm text-gray-500">
                        +8801234567890
                    </Text>
                </View>
                <Divider />
                <View className="flex-row items-center gap-3">
                    <MaterialCommunityIcons
                        name="car-outline"
                        size={20}
                        color="#6b7280"
                    />
                    <Text className="text-gray-500 w-[90%] text-sm">
                        Daffodil Smart City (DSC), Birulia, Saver, Dhaka-121
                    </Text>
                </View>
                <Divider />
            </View>
            <View className="flex-row items-center justify-between py-5 mx-5">
                {socialIcons.map((icon) => (
                    <TouchableOpacity
                        key={icon.name}
                        activeOpacity={0.6}
                        className="items-center justify-center w-16 h-16 bg-gray-300 rounded-full"
                        onPress={() => console.log("Pressed")}
                    >
                        <Feather name={icon.name} size={30} color="#6b7280" />
                    </TouchableOpacity>
                ))}
            </View>
        </SafeAreaView>
    );
};

export default profile;
