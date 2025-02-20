import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import React from "react";
import { Entypo, MaterialIcons } from "@expo/vector-icons";

const SelectableLeaveCard = ({ isSelected }) => {
    return (
        <View
            className={`flex p-4 rounded-2xl ${
                isSelected ? "bg-[#C8DCE3]" : "bg-white"
            }`}
        >
            <View className="flex-row items-center gap-3 pb-2 border-b border-gray-300">
                {isSelected ? (
                    <View className="items-center justify-center w-16 h-16 bg-green-900 border border-green-900 rounded-full">
                        <MaterialIcons name="check" size={35} color="white" />
                    </View>
                ) : (
                    <Image
                        className="w-16 h-16 border border-gray-300 rounded-full"
                        source={require("@/assets/images/profile.jpeg")}
                        style={{ objectFit: "cover" }}
                    />
                )}
                <View>
                    <Text className="text-lg font-bold text-gray-600">
                        Md Shakil Khan
                    </Text>
                    <Text className="text-gray-600">710003676</Text>
                </View>
                <TouchableOpacity
                    activeOpacity={0.6}
                    className="absolute p-2 -top-2 -right-4"
                >
                    <Entypo
                        name="dots-three-vertical"
                        size={24}
                        color="#6b7280"
                    />
                </TouchableOpacity>
            </View>
            <View className="flex-row items-center gap-3 py-2 border-b border-gray-300">
                <View className="w-[38%] gap-1 bg-red-20">
                    <Text className="text-gray-500 ">Start</Text>
                    <Text className="font-semibold text-gray-600">
                        12 June 2024
                    </Text>
                </View>
                <View className="w-[38%] gap-1 bg-red-20">
                    <Text className="text-gray-500 ">End</Text>
                    <Text className="font-semibold text-gray-600">
                        12 June 2024
                    </Text>
                </View>
                <View className="gap-1">
                    <Text className="text-gray-500 ">Days</Text>
                    <Text className="font-semibold text-gray-600">105</Text>
                </View>
            </View>
            <Text className="p-0.5 mt-3 mb-2 text-sm font-bold text-center text-green-600 rounded-full bg-[#D9FFDD]">
                Medical Leave
            </Text>
            <Text>
                I am writing to request a casual leave for August 25th, 2024, to
                attend to some family matters. I would greatly appreciate the
                opportunity to take some time off to rest.
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    selectedCard: {
        backgroundColor: "#C8DCE3", // Light blue background when selected
    },
});

export default SelectableLeaveCard;
