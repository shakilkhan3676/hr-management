import {
    View,
    Text,
    SafeAreaView,
    Platform,
    Dimensions,
    ScrollView,
} from "react-native";
import React, { useState } from "react";
import { Badge, Button } from "react-native-paper";
import CategoryCard from "@/components/home/CategoryCard";
import { router } from "expo-router";
import PunchIcon from "@/assets/icons/time-past.svg";
import TimeTrackIcon from "@/assets/icons/hourglass-end.svg";
import ScheduleIcon from "@/assets/icons/calendar-clock.svg";
import LeaveIcon from "@/assets/icons/leave.svg";
import ManualIcon from "@/assets/icons/calendar-exclamation.svg";
import ManualLeaveCard from "../../components/attendance/ManualLeaveCard";

const index = () => {
    const [activeButton, setActiveButton] = useState("attendance");
    const { width } = Dimensions.get("window");

    const categories = [
        {
            id: 1,
            name: "Punch Logs",
            router: "(attendance)",
            icon: PunchIcon,
        },
        {
            id: 2,
            name: "Time Tracking",
            router: "(attendance)",
            icon: TimeTrackIcon,
        },
        {
            id: 3,
            name: "Schedule",
            router: "(attendance)",
            icon: ScheduleIcon,
        },
        {
            id: 4,
            name: "Absent List",
            router: "(attendance)",
            icon: LeaveIcon,
        },
        {
            id: 5,
            name: "Manual Attendance",
            router: "(attendance)",
            icon: ManualIcon,
        },
    ];

    return (
        <SafeAreaView
            style={{
                flex: 1,
                marginTop: Platform.OS === "ios" ? 15 : 0,
            }}
        >
            <View className="flex-row items-center justify-center p-2 mx-4 mb-4 bg-blue-100 border border-blue-300 rounded-full">
                <Button
                    mode="contained"
                    buttonColor={
                        activeButton === "approval" ? "#2563eb" : "transparent"
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
                            ? "#2563eb"
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
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        gap: 16,
                        padding: 16,
                    }}
                >
                    <ManualLeaveCard />
                    <ManualLeaveCard />
                    <ManualLeaveCard />
                </ScrollView>
            )}
        </SafeAreaView>
    );
};

export default index;
