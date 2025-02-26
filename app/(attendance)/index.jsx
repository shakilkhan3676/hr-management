import {
    View,
    Text,
    Dimensions,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Badge, Button, TouchableRipple } from "react-native-paper";
import CategoryCard from "@/components/home/CategoryCard";
import { router } from "expo-router";
import PunchIcon from "@/assets/icons/time-past.svg";
import TimeTrackIcon from "@/assets/icons/hourglass-end.svg";
import ScheduleIcon from "@/assets/icons/calendar-clock.svg";
import LeaveIcon from "@/assets/icons/leave.svg";
import ManualIcon from "@/assets/icons/calendar-exclamation.svg";
import SliderIcon from "@/assets/icons/settings-sliders.svg";
import ManualAttendanceCard from "@/components/attendance/ManualAttendanceCard";
import CustomDropdownButton from "@/components/CustomDropdownButton";
import { Feather, MaterialIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";

const index = () => {
    const [activeButton, setActiveButton] = useState("attendance");
    const { width } = Dimensions.get("window");
    const [currentStatus, setCurrentStatus] = useState("All");
    const [sortingValue, setSortingValue] = useState(null);

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

    const categories = [
        {
            id: 1,
            name: "Punch Logs",
            router: "punchLogs",
            icon: PunchIcon,
        },
        {
            id: 2,
            name: "Time Tracking",
            router: "timeTracking",
            icon: TimeTrackIcon,
        },
        {
            id: 3,
            name: "Schedule",
            router: "schedule",
            icon: ScheduleIcon,
        },
        {
            id: 4,
            name: "Absent List",
            router: "absentList",
            icon: LeaveIcon,
        },
        {
            id: 5,
            name: "Manual Attendance",
            router: "manualAttendance",
            icon: ManualIcon,
        },
    ];

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header title="Attendance" />

            {/* Leave Status Header Buttons */}
            <View
                style={{
                    backgroundColor: Colors.light.groupButtonContainer,
                    borderColor: Colors.light.groupButtonContainerBorder,
                }}
                className={`flex-row items-center justify-center p-2 mx-4 mb-4 border rounded-full`}
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
                        activeButton === "attendance"
                            ? `${Colors.light.primaryButton}`
                            : "transparent"
                    }
                    textColor={
                        activeButton === "attendance" ? "white" : "#4b5563"
                    }
                    rippleColor="rgba(0, 0, 0, 0.1)"
                    labelStyle={{
                        fontSize: 16,
                    }}
                    style={{
                        borderRadius: 50,
                        width: "50%",
                    }}
                    onPress={() => setActiveButton("attendance")}
                >
                    My Attendance
                </Button>
            </View>

            {activeButton === "attendance" ? (
                <View className="flex-row flex-wrap gap-4 mx-4">
                    {categories.map((category) => (
                        <CategoryCard
                            key={category.id}
                            category={category}
                            width={width}
                            onPress={() => {
                                console.log("Pressed", category.name);
                                router.push(category.router);
                            }}
                        />
                    ))}
                </View>
            ) : (
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
                                onPress={() => console.log("Search Pressed")}
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
                                onChange={(item) => setSortingValue(item.label)}
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
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{
                            gap: 16,
                            padding: 16,
                        }}
                    >
                        <ManualAttendanceCard />
                        <ManualAttendanceCard />
                        <ManualAttendanceCard />
                    </ScrollView>
                </View>
            )}
        </SafeAreaView>
    );
};

export default index;
