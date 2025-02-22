import React, { useRef, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Button } from "react-native";
import { useRouter } from "expo-router";
import DatePickerModal from "./components/attendance/DatePickerModal";
import Header from "@/components/Header";

const AttendanceHeader = ({ pageName }) => {
    const router = useRouter();
    const [modalVisible, setModalVisible] = useState(false);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    // Function to format the date as "19-12 May"
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getDate()}-${date.getMonth() + 1} ${date.toLocaleString(
            "en-US",
            { month: "short" }
        )}`;
    };
    return (
        <View style={styles.container}>
            <Header
                title={pageName}
                titleStyle={{ color: "white" }}
                backButtonStyle={{ backgroundColor: "white" }}
                headerContainerStyle={{ paddingHorizontal: 0 }}
            />

            <TouchableOpacity
                style={styles.monthContainer}
                onPress={() => setModalVisible(true)}
            >
                {startDate && endDate ? (
                    <Text
                        style={{
                            color: "black",
                            fontSize: 10,
                            fontWeight: "500",
                        }}
                    >
                        Selected:{" "}
                        {startDate ? formatDate(startDate) : "Start Date"} -{" "}
                        {endDate ? formatDate(endDate) : "End Date"}
                    </Text>
                ) : (
                    <Text
                        style={{
                            color: "black",
                            fontSize: 10,
                            fontWeight: "500",
                        }}
                    >
                        This Month
                    </Text>
                )}
            </TouchableOpacity>

            <DatePickerModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onConfirm={(startDate, endDate) => {
                    console.log("Selected Dates:", startDate, endDate);
                    setStartDate(startDate);
                    setEndDate(endDate);
                    setModalVisible(false);
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#1680E1",
        paddingHorizontal: 16,
        paddingVertical: 10,
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    leftIcon: {
        flex: 1,
    },
    center: {
        flex: 2,
        alignItems: "center",
    },
    pageName: {
        fontSize: 18,
        fontWeight: "500",
        color: "#fff",
    },
    rightIcon: {
        flex: 1,
        alignItems: "flex-end",
    },
    monthContainer: {
        backgroundColor: "#C1CAC7",
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 40,
        alignSelf: "flex-start",
        marginTop: 5,
    },
});

export default AttendanceHeader;
