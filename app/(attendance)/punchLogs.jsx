import {
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import { AntDesign } from "@expo/vector-icons";
import dayjs from "dayjs";
import ModalRangeDatePicker from "@/components/ModalRangeDatePicker";
import { Colors } from "@/constants/Colors";
import PunchLogCard from "../../components/attendance/PunchLogCard";

const punchLogs = () => {
    const [dateRange, setDateRange] = useState({
        startDate: undefined,
        endDate: undefined,
    });
    console.log("🚀 ~ punchLogs ~ dateRange:", dateRange);
    const [showClearFilter, setShowClearFilter] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const handleClearDateRange = () => {
        setDateRange({
            startDate: undefined,
            endDate: undefined,
        });
        setShowClearFilter(false);
    };

    return (
        <>
            <StatusBar
                backgroundColor={Colors.light.primaryButton}
                barStyle={"light-content"}
            />
            <SafeAreaView style={{ flex: 1 }}>
                {/* Header Section */}
                <View
                    style={{ backgroundColor: Colors.light.primaryButton }}
                    className="px-4 py-2 rounded-b-2xl"
                >
                    <Header
                        title="Punch Logs"
                        titleStyle={{ color: "white" }}
                        backButtonStyle={{ backgroundColor: "white" }}
                        headerContainerStyle={{ paddingHorizontal: 0 }}
                    />
                    <View className="flex-row items-center gap-3 pt-1 pb-2">
                        <TouchableOpacity
                            activeOpacity={0.6}
                            className={`rounded-full py-1 px-3.5 flex-row items-center border ${
                                dateRange.startDate
                                    ? "bg-[#8097B0] border-[#8097B0]"
                                    : "bg-[#E3E5E4] border-gray-300"
                            }`}
                            onPress={() => {
                                setModalVisible(true);
                            }}
                        >
                            <Text
                                numberOfLines={1}
                                className={`flex-shrink pr-[10px] text-center ${
                                    dateRange.startDate
                                        ? "text-white"
                                        : "text-[#4b5563]"
                                }`}
                            >
                                {dateRange.startDate
                                    ? `${dayjs(dateRange.startDate).format(
                                          "D MMM"
                                      )} - ${dayjs(dateRange.endDate).format(
                                          "D MMM"
                                      )}`
                                    : "This Year"}
                            </Text>
                            <AntDesign
                                name="calendar"
                                size={15}
                                color={
                                    dateRange.startDate ? "white" : "#4b5563"
                                }
                            />
                        </TouchableOpacity>

                        {showClearFilter && (
                            <TouchableOpacity
                                activeOpacity={0.6}
                                className=" py-1 px-3.5 w-30"
                                onPress={handleClearDateRange}
                            >
                                <Text className="font-semibold text-center text-white">
                                    Clear All
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>
                </View>

                <ScrollView
                    contentContainerStyle={{
                        padding: 16,
                        gap: 12,
                    }}
                    showsVerticalScrollIndicator={false}
                >
                    {Array.from({ length: 15 }).map((_, i) => (
                        <PunchLogCard key={i} />
                    ))}
                </ScrollView>
            </SafeAreaView>

            {/* Modal Component with State */}
            <ModalRangeDatePicker
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                title="Select Date"
                onSelectDate={(startDate, endDate) => {
                    setDateRange({ startDate, endDate });
                    setShowClearFilter(true);
                }}
            />
        </>
    );
};

export default punchLogs;
