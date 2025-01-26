import { View, Text, FlatList } from "react-native";
import React from "react";

const LeaveCard = ({ leaveType, leaveAmount, remainingLeave, index }) => {
    const color = {
        0: "sky",
        1: "green",
        2: "pink",
        3: "amber",
        4: "purple",
        5: "red",
        6: "orange",
        7: "purple",
    };
    return (
        <View
            className={`flex items-center justify-center h-20 p-1 bg-${color[index]}-100 border border-${color[index]}-200 rounded-xl w-36`}
        >
            <Text className="text-gray-500">{leaveType}</Text>
            <Text className="text-2xl font-bold text-black">
                {remainingLeave}
                <Text className="text-lg text-gray-500">/{leaveAmount}</Text>
            </Text>
        </View>
    );
};

const MyLeave = () => {
    const totalLeave = [
        {
            leaveType: "Casual Leave",
            leaveAmount: 15,
            remainingLeave: 4,
        },
        {
            leaveType: "Medical Leave",
            leaveAmount: 10,
            remainingLeave: 5,
        },
        {
            leaveType: "Duty Leave",
            leaveAmount: 5,
            remainingLeave: 3,
        },
        {
            leaveType: "Earned Leave",
            leaveAmount: 5,
            remainingLeave: 2,
        },
        {
            leaveType: "Study Leave",
            leaveAmount: 5,
            remainingLeave: 1,
        },
    ];
    return (
        <FlatList
            data={totalLeave}
            renderItem={({ item, index }) => (
                <LeaveCard {...item} index={index} />
            )}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.leaveType}
            contentContainerStyle={{ gap: 12, paddingHorizontal: 12 }}
        />
    );
};

export default MyLeave;
