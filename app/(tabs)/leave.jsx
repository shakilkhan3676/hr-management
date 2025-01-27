import {
    View,
    Text,
    SafeAreaView,
    Platform,
    TouchableOpacity,
    TextInput,
    ScrollView,
} from "react-native";
import React from "react";
import MyLeave from "../../components/leave/MyLeave";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import DynamicTable from "../../components/leave/DynamicTable";

const leave = () => {
    const sampleData = [
        { date: "2024-11-14", duration: 65, status: "Approved" },
        { date: "2024-11-15", duration: 70, status: "Pending" },
        { date: "2024-11-16", duration: 75, status: "Approved" },
        { date: "2024-11-14", duration: 65, status: "Approved" },
        { date: "2024-11-15", duration: 70, status: "Pending" },
        { date: "2024-11-16", duration: 75, status: "Approved" },
        { date: "2024-11-14", duration: 65, status: "Approved" },
        { date: "2024-11-15", duration: 70, status: "Pending" },
        { date: "2024-11-16", duration: 75, status: "Approved" },
        { date: "2024-11-14", duration: 65, status: "Approved" },
        { date: "2024-11-15", duration: 70, status: "Pending" },
        { date: "2024-11-16", duration: 75, status: "Approved" },
        { date: "2024-11-14", duration: 65, status: "Approved" },
        { date: "2024-11-15", duration: 70, status: "Pending" },
        { date: "2024-11-16", duration: 75, status: "Approved" },
        { date: "2024-11-14", duration: 65, status: "Approved" },
        { date: "2024-11-15", duration: 70, status: "Pending" },
        { date: "2024-11-16", duration: 75, status: "Approved" },
        { date: "2024-11-14", duration: 65, status: "Approved" },
        { date: "2024-11-15", duration: 70, status: "Pending" },
        { date: "2024-11-16", duration: 20, status: "Approved" },
    ];

    return (
        <SafeAreaView
            style={{
                flex: 1,
                marginTop: Platform.OS === "ios" ? 15 : 0,
            }}
        >
            <View
                className={`flex-1 ${
                    Platform.OS === "ios" ? "mb-14" : "mb-24"
                }`}
            >
                <MyLeave />
                <View className="flex-row items-center justify-center gap-3 px-4 py-4">
                    <Text className="text-lg font-semibold">Leave info.</Text>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        className="bg-[#E3E5E4] rounded-full py-2 px-3.5 w-32 flex-row items-center border border-gray-300"
                        onPress={() => {}}
                    >
                        <TextInput
                            placeholder="This Year"
                            placeholderTextColor="#4b5563"
                            numberOfLines={1}
                            editable={false}
                            style={{
                                flex: 1,
                                paddingRight: 10,
                            }}
                        />
                        <AntDesign name="calendar" size={15} color="#4b5563" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.6}
                        className="bg-[#E3E5E4] rounded-full py-2 px-3.5 w-32 flex-row items-center border border-gray-300"
                        onPress={() => {}}
                    >
                        <TextInput
                            placeholder="        All"
                            placeholderTextColor="#4b5563"
                            numberOfLines={1}
                            editable={false}
                            style={{
                                flex: 1, // Allows TextInput to take up the available space
                                paddingRight: 10, // Creates space for the icon
                            }}
                        />
                        <Ionicons
                            name="chevron-down"
                            size={17}
                            color="#4b5563"
                        />
                    </TouchableOpacity>
                </View>
                <DynamicTable data={sampleData} />
            </View>

            {/* Bottom Buttons */}
            <View
                className="absolute bottom-0 items-center w-full h-24 px-4 bg-white"
                style={{
                    shadowColor: "#2563eb", // Shadow color
                    shadowOffset: { width: 0, height: -2 }, // Top shadow
                    shadowOpacity: 0.1, // Shadow transparency for iOS
                    shadowRadius: 5, // Shadow blur for iOS
                    elevation: 10, // Higher value for Android shadow
                    zIndex: 1, // Ensures the shadow is above other elements
                }}
            >
                <TouchableOpacity
                    activeOpacity={0.9}
                    className="bg-blue-600 w-full rounded-full py-3.5 px-5 mt-4"
                    onPress={() => {}}
                >
                    <Text className="text-lg font-semibold text-center text-white">
                        REQUEST LEAVE
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default leave;
