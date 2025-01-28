import {
    View,
    Text,
    SafeAreaView,
    Platform,
    TouchableOpacity,
    TextInput,
} from "react-native";
import React, { useState } from "react";
import MyLeave from "../../components/leave/MyLeave";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import DynamicTable from "../../components/leave/DynamicTable";
import { router } from "expo-router";
import dayjs from "dayjs";
import ModalDatePicker from "@/components/ModalDatePicker";

const leave = () => {
    const [date, setDate] = useState(dayjs());
    const [modalVisible, setModalVisible] = useState(false);
    const [activeButton, setActiveButton] = useState("request");
    const role = "manager";

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
        { date: "2024-11-16", duration: 75, status: "Approved" },
    ];

    return (
        <SafeAreaView
            style={{
                flex: 1,
                marginTop: Platform.OS === "ios" ? 15 : 0,
            }}
        >
            {/* Leave Status */}
            {role === "manager" && (
                <View className="flex-row items-center justify-center p-2 mx-4 mb-4 bg-blue-100 border border-blue-300 rounded-full">
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => setActiveButton("approval")}
                        className={`flex-row items-center justify-center gap-1 w-1/2 py-2 rounded-full ${
                            activeButton === "approval" && "bg-blue-600"
                        }`}
                    >
                        <Text
                            className={`text-lg font-semibold text-center ${
                                activeButton === "approval"
                                    ? "text-white"
                                    : "text-gray-600"
                            }`}
                        >
                            Approval
                        </Text>
                        <View className="flex items-center justify-center h-6 px-2 bg-red-600 rounded-full">
                            <Text className="font-semibold text-white">
                                {1}
                            </Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => setActiveButton("request")}
                        className={`flex-row items-center justify-center w-1/2 py-2 rounded-full ${
                            activeButton === "request" && "bg-blue-600"
                        }`}
                    >
                        <Text
                            className={`text-lg font-semibold text-center ${
                                activeButton === "request"
                                    ? "text-white"
                                    : "text-gray-600"
                            }`}
                        >
                            Request
                        </Text>
                    </TouchableOpacity>
                </View>
            )}

            {activeButton === "request" ? (
                <>
                    <View
                        className={`flex-1 ${
                            Platform.OS === "ios" ? "mb-14" : "mb-24"
                        }`}
                    >
                        <MyLeave />
                        <View className="flex-row items-center justify-center gap-3 px-4 py-4">
                            <Text className="text-lg font-semibold">
                                Leave info.
                            </Text>
                            <TouchableOpacity
                                activeOpacity={0.6}
                                className="bg-[#E3E5E4] rounded-full py-2 px-3.5 w-32 flex-row items-center border border-gray-300"
                                onPress={() => setModalVisible(true)} // Open modal
                            >
                                <TextInput
                                    placeholder={date.format("YYYY-MMM")} // Show selected year
                                    placeholderTextColor="#4b5563"
                                    numberOfLines={1}
                                    editable={false}
                                    style={{
                                        flex: 1,
                                        paddingRight: 5,
                                        // fontSize: 13,
                                    }}
                                />
                                <AntDesign
                                    name="calendar"
                                    size={15}
                                    color="#4b5563"
                                />
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
                                        flex: 1,
                                        paddingRight: 10,
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

                    {/* ModalDatePicker */}
                    <ModalDatePicker
                        visible={modalVisible}
                        initialDate={date}
                        onClose={() => setModalVisible(false)}
                        onSelectDate={(selectedDate) => setDate(selectedDate)}
                    />

                    {/* Bottom Buttons */}
                    <View
                        className="absolute bottom-0 items-center w-full h-24 px-4 bg-white"
                        style={{
                            shadowColor: "#2563eb",
                            shadowOffset: { width: 0, height: -2 },
                            shadowOpacity: 0.1,
                            shadowRadius: 5,
                            elevation: 10,
                            zIndex: 1,
                        }}
                    >
                        <TouchableOpacity
                            activeOpacity={0.9}
                            className="bg-blue-600 w-full rounded-full py-3.5 px-5 mt-4"
                            onPress={() => {
                                router.push("leave/applyLeave");
                            }}
                        >
                            <Text className="text-lg font-semibold text-center text-white">
                                REQUEST LEAVE
                            </Text>
                        </TouchableOpacity>
                    </View>
                </>
            ) : (
                ""
            )}
        </SafeAreaView>
    );
};

export default leave;
