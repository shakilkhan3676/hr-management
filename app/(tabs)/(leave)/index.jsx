import {
    View,
    Text,
    SafeAreaView,
    Platform,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";

import MyLeave from "@/components/leave/MyLeave";
import DynamicTable from "@/components/leave/DynamicTable";
import SelectableBottomSheet from "@/components/SelectableBottomSheet";
import ModalYearPicker from "@/components/ModalYearPicker";
import LeaveCard from "@/components/leave/LeaveCard";
import DropdownComponent from "@/components/DropdownComponent";

import { Badge, Button, TouchableRipple } from "react-native-paper";
import { Feather, Entypo, Ionicons, AntDesign } from "@expo/vector-icons";
import dayjs from "dayjs";

const leave = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [activeButton, setActiveButton] = useState("request");
    const [filterValue, setFilterValue] = useState({
        year: "This Year",
        type: "All",
    });
    const [showClearFilter, setShowClearFilter] = useState(false);

    const role = "manager";
    const sampleData = [
        { date: "2024-11-14", duration: 65, status: "Approved" },
        { date: "2024-11-15", duration: 70, status: "Pending" },
        { date: "2024-11-16", duration: 75, status: "Approved" },
        { date: "2024-11-14", duration: 65, status: "Rejected" },
        { date: "2024-11-15", duration: 70, status: "Pending" },
        { date: "2024-11-16", duration: 75, status: "Rejected" },
        { date: "2024-11-14", duration: 65, status: "Approved" },
        { date: "2024-11-15", duration: 70, status: "Pending" },
        { date: "2024-11-16", duration: 75, status: "Approved" },
        { date: "2024-11-14", duration: 65, status: "Rejected" },
        { date: "2024-11-15", duration: 70, status: "Rejected" },
        { date: "2024-11-16", duration: 75, status: "Approved" },
        { date: "2024-11-14", duration: 65, status: "Approved" },
        { date: "2024-11-15", duration: 70, status: "Pending" },
        { date: "2024-11-16", duration: 75, status: "Approved" },
        { date: "2024-11-14", duration: 65, status: "Rejected" },
        { date: "2024-11-15", duration: 70, status: "Pending" },
        { date: "2024-11-16", duration: 75, status: "Approved" },
        { date: "2024-11-14", duration: 65, status: "Approved" },
        { date: "2024-11-15", duration: 70, status: "Pending" },
        { date: "2024-11-16", duration: 75, status: "Rejected" },
    ];

    const handleClearFilter = () => {
        setFilterValue({
            year: "This Year",
            type: "All",
        });
        setShowClearFilter(false);
    };

    const types = [
        { id: 1, name: "Causal Leaves" },
        { id: 2, name: "Duty Leaves" },
        { id: 3, name: "Earned Leaves" },
        { id: 4, name: "Medical/Sick Leaves" },
        { id: 5, name: "Study Leaves" },
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
                            {/* <Text className="text-lg font-semibold">
                                Leave info.
                            </Text> */}
                            <TouchableOpacity
                                activeOpacity={0.6}
                                className="bg-[#E3E5E4] rounded-full py-2 px-3.5 w-32 flex-row items-center border border-gray-300"
                                onPress={() => setModalVisible(true)} // Open modal
                            >
                                <Text
                                    numberOfLines={1}
                                    style={styles.buttonText}
                                >
                                    {filterValue.year}
                                </Text>
                                <AntDesign
                                    name="calendar"
                                    size={15}
                                    color="#4b5563"
                                />
                            </TouchableOpacity>

                            <SelectableBottomSheet
                                dropDownDataList={types}
                                defaultSelect={"Select"}
                                title={"Leave Category"}
                                onSelectItem={(item) => {
                                    setFilterValue({
                                        ...filterValue,
                                        type: item?.name,
                                    });
                                    setShowClearFilter(true);
                                }}
                                isDegree={true}
                                name={"name"}
                            >
                                <TouchableOpacity
                                    activeOpacity={0.6}
                                    className="bg-[#E3E5E4] rounded-full py-2 px-3.5 w-36 flex-row items-center border border-gray-300"
                                    // onPress={handlePresentModalPress}
                                >
                                    <Text
                                        numberOfLines={1}
                                        style={styles.buttonText}
                                    >
                                        {filterValue.type}
                                    </Text>
                                    <Ionicons
                                        name="chevron-down"
                                        size={17}
                                        color="#4b5563"
                                    />
                                </TouchableOpacity>
                            </SelectableBottomSheet>
                            {showClearFilter && (
                                <TouchableOpacity
                                    activeOpacity={0.6}
                                    className=" py-2 px-3.5 w-30"
                                    onPress={handleClearFilter}
                                >
                                    <Text className="font-semibold text-center text-green-800">
                                        Clear All
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </View>
                        <DynamicTable data={sampleData} />
                    </View>

                    {/* ModalYearPicker */}
                    <ModalYearPicker
                        visible={modalVisible}
                        onClose={() => setModalVisible(false)}
                        initialYear={
                            filterValue.year === "This Year"
                                ? dayjs().year()
                                : filterValue.year
                        }
                        onSelectYear={(selectedYear) => {
                            setFilterValue({
                                ...filterValue,
                                year: selectedYear,
                            });
                            setShowClearFilter(true);
                        }}
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
                                router.push("applyLeave");
                            }}
                        >
                            REQUEST LEAVE
                        </Button>
                    </View>
                </>
            ) : (
                <>
                    <View className={`flex-1`}>
                        <View className="flex-row items-center justify-between gap-2 py-2 mx-4 border-b border-gray-300">
                            <Text className="text-lg font-semibold">
                                Approval info.
                            </Text>
                            <View className="flex-row items-center justify-center gap-2">
                                <DropdownComponent />
                                <TouchableRipple
                                    onPress={() => console.log("Pressed 1")}
                                    borderless={true}
                                    style={{
                                        borderRadius: 100,
                                        padding: 6,
                                    }}
                                >
                                    <Feather
                                        className="text-right text-rose-500"
                                        name="search"
                                        size={24}
                                        color="#1d4ed8"
                                    />
                                </TouchableRipple>
                                <TouchableRipple
                                    onPress={() => console.log("Pressed")}
                                    borderless={true}
                                    style={{
                                        borderRadius: 100,
                                        padding: 6,
                                    }}
                                >
                                    <Entypo
                                        name="sound-mix"
                                        size={22}
                                        color="#4b5563"
                                    />
                                </TouchableRipple>
                            </View>
                        </View>

                        <ScrollView
                            className="mx-4"
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{
                                paddingVertical: 16,
                                gap: 16,
                            }}
                        >
                            <LeaveCard />
                            <LeaveCard />
                            <LeaveCard approved={true} />
                            <LeaveCard />
                            <LeaveCard approved={true} />
                        </ScrollView>
                    </View>
                </>
            )}
        </SafeAreaView>
    );
};

export default leave;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: "center",
        backgroundColor: "grey",
    },
    contentContainer: {
        flex: 1,
        alignItems: "center",
    },
    buttonText: {
        flex: 1,
        paddingRight: 10,
        textAlign: "center",
        color: "#4b5563",
    },
});
