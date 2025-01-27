import { View, Text, FlatList } from "react-native";
import React from "react";

const LeaveCard = ({ leaveType, leaveAmount, remainingLeave, index }) => {
    const colorStyles = {
        0: "bg-sky-100 border-sky-200",
        1: "bg-green-100 border-green-200",
        2: "bg-pink-100 border-pink-200",
        3: "bg-amber-100 border-amber-200",
        4: "bg-purple-100 border-purple-200",
        5: "bg-red-100 border-red-200",
        6: "bg-orange-100 border-orange-200",
        7: "bg-purple-100 border-purple-200",
    };

    return (
        <View
            className={`flex items-center justify-center h-20 p-1 ${colorStyles[index]} border rounded-xl w-36 gap-1`}
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
        <View>
            <FlatList
                data={totalLeave}
                renderItem={({ item, index }) => (
                    <LeaveCard {...item} index={index} />
                )}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                // keyExtractor={(item) => item.leaveType}
                contentContainerStyle={{ gap: 12, paddingHorizontal: 16 }}
            />
        </View>
    );
};

export default MyLeave;
