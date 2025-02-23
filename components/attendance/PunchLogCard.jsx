import { View, Text } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";

const PunchLogCard = () => {
    return (
        <View
            style={{
                borderWidth: 1,
                borderColor: Colors.light.grayButtonBorder,
            }}
            className="gap-0.5 p-4 bg-white rounded-2xl"
        >
            <Text>710003676</Text>
            <Text className="text-xl font-semibold">Md. Shakil Khan</Text>
            <View className="flex-row items-center justify-between gap-3">
                <Text className="flex-shrink text-sm text-gray-600">
                    Jan 30, 2025, 9:07:32 AM Jan 30
                </Text>
                <Text className="px-3 py-1 text-gray-400 rounded-full bg-slate-100">
                    Bio-metric
                </Text>
            </View>
        </View>
    );
};

export default PunchLogCard;
