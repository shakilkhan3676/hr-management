import { View, Text } from "react-native";
import React from "react";

const ManualLeaveEntryCard = () => {
    return (
        <View className="flex p-4 bg-white rounded-2xl">
            <View className="flex-row items-center justify-between gap-3">
                <Text className="text-gray-600">710003676</Text>
                <Text className="px-4 py-1.5 rounded-full text-amber-600 bg-amber-50">
                    Manual
                </Text>
            </View>
            <View className="flex-row items-center py-2 border-b border-gray-300">
                <View className="w-[50%] gap-1 bg-red-20 flex-row items-center">
                    <Text className="text-lg text-gray-500">Check In</Text>
                    <Text className="text-lg font-semibold text-black">
                        07:20 AM
                    </Text>
                </View>
                <View className="w-[50%] gap-1 bg-red-20 flex-row items-center">
                    <Text className="text-lg text-gray-500">Check Out</Text>
                    <Text className="text-lg font-semibold text-black">
                        04:30 PM
                    </Text>
                </View>
            </View>
            <View className="flex-row items-center py-2 border-b border-gray-300">
                <View className="w-[50%] gap-1 bg-red-20 flex-row items-center">
                    <Text className="text-gray-500 ">Schedule In:</Text>
                    <Text className="text-black ">07:20:00</Text>
                </View>
                <View className="w-[50%] gap-1 bg-red-20 flex-row items-center">
                    <Text className="text-gray-500 ">Schedule Out:</Text>
                    <Text className="text-black ">16:00:00</Text>
                </View>
            </View>
            <View className="flex-row items-center py-2 mb-2 border-b border-gray-300">
                <Text className="text-gray-500 w-[50%]">Jan 30, 2025</Text>
                <View className="w-[50%] gap-1 bg-red-20 flex-row items-center">
                    <Text className="text-gray-500">Status:</Text>
                    <Text className="text-amber-600">Pending</Text>
                </View>
            </View>
            <Text>
                I am writing to request a casual leave for August 25th, 2024, to
                attend to some family matters. I would greatly appreciate the
                opportunity to take some time off to rest.
            </Text>
        </View>
    );
};

export default ManualLeaveEntryCard;
