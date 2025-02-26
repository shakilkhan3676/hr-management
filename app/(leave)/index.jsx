import {
    View,
    Text,
    Platform,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import React, { useState } from "react";
import { router } from "expo-router";
import MyLeave from "@/components/leave/MyLeave";
import DynamicTable from "@/components/leave/DynamicTable";
import SelectableBottomSheet from "@/components/SelectableBottomSheet";
import ModalYearPicker from "@/components/ModalYearPicker";
import LeaveCard from "@/components/leave/LeaveCard";
import SliderIcon from "@/assets/icons/settings-sliders.svg";
import { Badge, Button, TouchableRipple } from "react-native-paper";
import {
    Feather,
    Ionicons,
    AntDesign,
    MaterialIcons,
} from "@expo/vector-icons";
import dayjs from "dayjs";
import CustomDropdownButton from "@/components/CustomDropdownButton";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";

const leave = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [activeButton, setActiveButton] = useState("request");
    const [filterValue, setFilterValue] = useState({
        year: "This Year",
        type: "All",
    });
    const [showClearFilter, setShowClearFilter] = useState(false);
    const [sortingValue, setSortingValue] = useState(null);
    console.log("🚀 ~ leave ~ sortingValue:", sortingValue);
    const [currentStatus, setCurrentStatus] = useState("All");
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

    const sortingData = [
        {
            icon: <MaterialIcons name="check" size={24} color="#4b5563" />,
            label: "Approved",
        },
        {
            icon: <MaterialIcons name="clear" size={24} color="#4b5563" />,
            label: "Rejected",
        },
        {
            icon: (
                <MaterialIcons
                    name="check-box-outline-blank"
                    size={24}
                    color="#4b5563"
                />
            ),
            label: "Select",
        },
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
        <SafeAreaView style={{ flex: 1 }}>
            <Header title="Leave" />
            {/* Leave Status */}
            {role === "manager" && (
                <View
                    style={{
                        backgroundColor: Colors.light.groupButtonContainer,
                        borderColor: Colors.light.groupButtonContainerBorder,
                    }}
                    className="flex-row items-center justify-center p-2 mx-4 mb-4 border rounded-full"
                >
                    <Button
                        mode="contained"
                        buttonColor={
                            activeButton === "approval"
                                ? `${Colors.light.primaryButton}`
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
                                ? `${Colors.light.primaryButton}`
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
                                className={`rounded-full py-2 px-3.5 min-w-32 flex-row items-center border ${
                                    filterValue.year !== "This Year"
                                        ? "bg-[#8097B0] border-[#8097B0]"
                                        : "bg-[#E3E5E4] border-gray-300"
                                }`}
                                onPress={() => setModalVisible(true)} // Open modal
                            >
                                <Text
                                    numberOfLines={1}
                                    className={`flex-1 pr-[10px] text-center ${
                                        filterValue.year !== "This Year"
                                            ? "text-white"
                                            : "text-[#4b5563]"
                                    }`}
                                >
                                    {filterValue.year}
                                </Text>
                                <AntDesign
                                    name="calendar"
                                    size={15}
                                    color={
                                        filterValue.year !== "This Year"
                                            ? "white"
                                            : "#4b5563"
                                    }
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
                                    className={`rounded-full py-2 px-3.5 min-w-36 flex-row items-center border ${
                                        filterValue.type !== "All"
                                            ? "bg-[#8097B0] border-[#8097B0]"
                                            : "bg-[#E3E5E4] border-gray-300 "
                                    }`}
                                    // onPress={handlePresentModalPress}
                                >
                                    <Text
                                        numberOfLines={1}
                                        className={`flex-1 pr-[10px] text-center ${
                                            filterValue.type !== "All"
                                                ? "text-white"
                                                : "text-[#4b5563]"
                                        }`}
                                    >
                                        {filterValue.type}
                                    </Text>
                                    <Ionicons
                                        name="chevron-down"
                                        size={17}
                                        color={
                                            filterValue.type !== "All"
                                                ? "white"
                                                : "#4b5563"
                                        }
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
                            shadowColor: Colors.light.primaryButton,
                            shadowOffset: { width: 0, height: -2 },
                            shadowOpacity: 0.1,
                            shadowRadius: 5,
                            elevation: 10,
                            zIndex: 1,
                        }}
                    >
                        <Button
                            mode="contained"
                            buttonColor={Colors.light.primaryButton}
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
                        <View className="relative flex-row items-center justify-between mx-4 border-b-2 border-gray-300">
                            {/* Tabs */}
                            {["All", "Pending", "Rejected"].map((status) => (
                                <TouchableOpacity
                                    key={status}
                                    activeOpacity={0.6}
                                    className="relative flex items-center justify-center w-1/4"
                                    onPress={() => setCurrentStatus(status)}
                                >
                                    <Text
                                        className={`text-lg ${
                                            currentStatus === status
                                                ? "text-blue-800 font-semibold"
                                                : "text-gray-600"
                                        }`}
                                    >
                                        {status}
                                    </Text>

                                    {/* Active Tab Indicator - Positioned on top of parent border */}
                                    {currentStatus === status && (
                                        <View className="absolute bottom-[-8px] left-0 right-0 h-[2px] bg-blue-800" />
                                    )}
                                </TouchableOpacity>
                            ))}

                            {/* Search Icon (No Border) */}
                            <View className="w-[12.5%] flex items-center">
                                <TouchableRipple
                                    onPress={() =>
                                        console.log("Search Pressed")
                                    }
                                    borderless={true}
                                    style={{
                                        borderRadius: 100,
                                        padding: 6,
                                    }}
                                >
                                    <Feather
                                        name="search"
                                        size={26}
                                        color="#1e40af"
                                    />
                                </TouchableRipple>
                            </View>

                            {/* Filter Dropdown (No Border) */}
                            <View className="w-[12.5%] flex items-center">
                                <CustomDropdownButton
                                    value={sortingValue}
                                    data={sortingData}
                                    onChange={(item) => {
                                        if (item.label === "Select") {
                                            router.push({
                                                pathname: "select",
                                                params: {
                                                    pendingLeave:
                                                        JSON.stringify(
                                                            sampleData
                                                        ),
                                                },
                                            });
                                            setSortingValue(null);
                                        } else {
                                            setSortingValue(item.label);
                                        }
                                    }}
                                    buttonStyle={{
                                        width: 35,
                                        height: 35,
                                        paddingHorizontal: 0,
                                        backgroundColor: "transparent",
                                        borderWidth: 0,
                                    }}
                                    containerWidth={135}
                                    containerPosition={135}
                                >
                                    <TouchableRipple className="p-2">
                                        <SliderIcon height={22} width={22} />
                                    </TouchableRipple>
                                </CustomDropdownButton>
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
