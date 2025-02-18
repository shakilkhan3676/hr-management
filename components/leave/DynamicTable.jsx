import React, { useCallback } from "react";
import { ScrollView, View, Text, TouchableOpacity } from "react-native";
import { Entypo, Feather } from "@expo/vector-icons";

const TableHeader = React.memo(({ onSearch }) => (
    <View className="flex-row items-center justify-between px-5 py-3 bg-blue-100 h-14 gap23 rounded-tr-2xl rounded-tl-2xl">
        <Text className="text-lg font-bold text-blue-800 w-[35%]">Period</Text>
        <Text className="text-lg font-bold text-blue-800 w-[20%]">Days</Text>
        <Text className="text-lg text-center font-bold text-blue-800 w-[30%]">
            Status
        </Text>
        <Text className="w-[15%]"></Text>
    </View>
));

const TableRow = React.memo(({ item, isLast, onMorePress }) => (
    <View>
        <View className="flex-row items-center py-1.5 px-5">
            <Text className="w-[35%] text-base">
                {`${item.date}\n`}
                <Text className="text-sm text-gray-500">{item.date}</Text>
            </Text>
            <Text className="w-[20%]">{item.duration} Days</Text>
            <View className="px-2 text-center w-[30%]">
                <Text
                    className={`px-3 py-1 rounded-full border text-center ${
                        item.status === "Approved"
                            ? "text-emerald-600 bg-emerald-100 border-emerald-200"
                            : item.status === "Rejected"
                            ? "text-red-600 bg-red-100 border-red-200"
                            : "text-amber-600 bg-amber-100 border-amber-200"
                    }`}
                >
                    {item.status}
                </Text>
            </View>
            <TouchableOpacity
                activeOpacity={0.6}
                className="w-[15%]"
                onPress={() => onMorePress(item)}
            >
                <Entypo
                    className="text-right"
                    name="dots-three-vertical"
                    size={20}
                    color="#6b7280"
                />
            </TouchableOpacity>
        </View>
        {!isLast && <View className="border-b border-gray-200" />}
    </View>
));

const DynamicTable = ({ data }) => {
    const handleSearch = useCallback(() => {
        console.log("Search pressed");
    }, []);

    const handleMorePress = useCallback((item) => {
        console.log("More options pressed for:", item);
    }, []);

    return (
        <>
            <TableHeader onSearch={handleSearch} />
            <ScrollView showsVerticalScrollIndicator={false}>
                {data.map((item, index) => (
                    <TableRow
                        key={item.id || index}
                        item={item}
                        isLast={index === data.length - 1}
                        onMorePress={handleMorePress}
                    />
                ))}
            </ScrollView>
        </>
    );
};

export default React.memo(DynamicTable);
