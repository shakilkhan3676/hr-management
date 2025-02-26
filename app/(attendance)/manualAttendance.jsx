import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Platform,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import { Button } from "react-native-paper";
import { Colors } from "@/constants/Colors";
import ManualAttendanceEntryCard from "@/components/attendance/ManualAttendanceEntryCard";
import { router } from "expo-router";

const manualAttendance = () => {
    const [currentStatus, setCurrentStatus] = useState("All");

    return (
        <>
            <SafeAreaView
                className="flex-1"
                style={{ marginBottom: Platform.OS === "ios" ? 36 : 70 }}
            >
                <Header title="Manual Attendance" />
                {/* Sorting Header */}
                <View className="relative flex-row items-center justify-between mx-4 border-b-2 border-gray-300">
                    {/* Tabs */}
                    {["All", "Pending", "Rejected"].map((status) => (
                        <TouchableOpacity
                            key={status}
                            activeOpacity={0.8}
                            className="relative flex-row items-center justify-center w-1/3 pb-2"
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
                            {status === "All" && (
                                <Text
                                    numberOfLines={1}
                                    className="px-2 py-0.5 ml-1.5 text-white bg-blue-800 rounded-full flex-shrink"
                                >
                                    120
                                </Text>
                            )}

                            {/* Active Tab Indicator - Positioned on top of parent border */}
                            {currentStatus === status && (
                                <View className="absolute bottom-[-1.5px] left-0 right-0 h-[2px] bg-blue-800" />
                            )}
                        </TouchableOpacity>
                    ))}
                </View>

                <ScrollView
                    contentContainerStyle={{
                        padding: 16,
                        gap: 16,
                    }}
                    showsVerticalScrollIndicator={false}
                >
                    {Array.from({ length: 15 }).map((_, i) => (
                        <ManualAttendanceEntryCard key={i} />
                    ))}
                </ScrollView>
            </SafeAreaView>

            <View className="absolute bottom-0 flex-row items-start justify-center w-full h-20 gap-4 px-4">
                <Button
                    mode="contained"
                    buttonColor={Colors.light.primaryButton}
                    textColor="white"
                    rippleColor="rgba(0, 0, 0, 0.1)"
                    labelStyle={{
                        fontSize: 14,
                        padding: 4,
                    }}
                    style={{
                        borderRadius: 15,
                        width: "100%",
                        // marginTop: 12,
                    }}
                    onPress={() => {
                        router.push("applyManualAttendance");
                    }}
                >
                    ADD MANUAL ENTRY
                </Button>
            </View>
        </>
    );
};

export default manualAttendance;
