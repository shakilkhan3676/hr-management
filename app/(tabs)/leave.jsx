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
import { Badge, Button } from "react-native-paper";

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
                    <Button
                        mode="contained"
                        buttonColor={
                            activeButton === "approval"
                                ? "#2563eb"
                                : "transparent"
                        }
                        textColor={
                            activeButton === "approval" ? "white" : "#4b5563"
                        }
                        rippleColor="rgba(0, 0, 0, 0.1)"
                        labelStyle={{
                            fontSize: 16,
                        }}
                        style={{
                            borderRadius: 50,
                            width: "50%",
                        }}
                        icon={() => <Badge size={22}>10</Badge>}
                        contentStyle={{
                            flexDirection: "row-reverse", // This will put the badge after the text
                        }}
                        onPress={() => setActiveButton("approval")}
                    >
                        Approval
                    </Button>

                    <Button
                        mode="contained"
                        buttonColor={
                            activeButton === "request"
                                ? "#2563eb"
                                : "transparent"
                        }
                        textColor={
                            activeButton === "request" ? "white" : "#4b5563"
                        }
                        rippleColor="rgba(0, 0, 0, 0.1)"
                        labelStyle={{
                            fontSize: 16,
                        }}
                        style={{
                            borderRadius: 50,
                            width: "50%",
                        }}
                        onPress={() => setActiveButton("request")}
                    >
                        Request
                    </Button>
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
                                    value={date.format("YYYY-MMM")}
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
                        <Button
                            mode="contained"
                            buttonColor="#2563eb"
                            textColor="white"
                            rippleColor="rgba(0, 0, 0, 0.1)"
                            labelStyle={{
                                fontSize: 16,
                                padding: 4,
                            }}
                            style={{
                                marginTop: 16,
                                borderRadius: 50,
                                width: "100%",
                            }}
                            onPress={() => {
                                router.push("leave/applyLeave");
                            }}
                        >
                            REQUEST LEAVE
                        </Button>
                    </View>
                </>
            ) : (
                ""
            )}
        </SafeAreaView>
    );
};

export default leave;
