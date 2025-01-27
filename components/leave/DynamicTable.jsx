import React from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import Feather from "@expo/vector-icons/Feather";

const DynamicTable = ({ data }) => {
    return (
        <>
            <View className="flex-row items-center justify-between px-5 py-3 bg-blue-200 h-14 gap23 rounded-tr-2xl rounded-tl-2xl">
                <Text className="text-lg font-bold text-blue-600 w-[35%]">
                    Period
                </Text>
                <Text className="text-lg font-bold text-blue-600 w-[20%]">
                    Days
                </Text>
                <Text className="text-lg text-center font-bold text-blue-600 w-[30%]">
                    Status
                </Text>
                <TouchableOpacity activeOpacity={0.5} className="w-[15%]">
                    <Feather
                        className="text-right"
                        name="search"
                        size={24}
                        color="#2563eb"
                    />
                </TouchableOpacity>
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                {data.map((item, index) => (
                    <View key={index}>
                        <View className="flex-row items-center py-1.5 px-5">
                            <Text className="w-[35%] text-base">
                                {`${item.date}\n`}
                                <Text className="text-sm text-gray-500">
                                    {item.date}
                                </Text>
                            </Text>
                            <Text className="w-[20%]">
                                {item.duration} Days
                            </Text>
                            <View className="px-2 text-center w-[30%]">
                                <Text
                                    className={`px-3 py-1 rounded-full border text-center 
                                        ${
                                            item.status === "Approved"
                                                ? "text-emerald-600 bg-emerald-100 border-emerald-200"
                                                : "text-red-600 bg-red-100 border-red-200"
                                        }`}
                                >
                                    {item.status}
                                </Text>
                            </View>
                            <TouchableOpacity
                                activeOpacity={0.6}
                                className="w-[15%]"
                            >
                                <Entypo
                                    className="text-right"
                                    name="dots-three-vertical"
                                    size={20}
                                    color="#6b7280"
                                />
                            </TouchableOpacity>
                        </View>
                        {index < data.length - 1 && (
                            <View className="border-b border-gray-200" />
                        )}
                    </View>
                ))}
            </ScrollView>
        </>
    );
};

export default DynamicTable;
