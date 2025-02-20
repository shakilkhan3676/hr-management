import React, { useState, useCallback } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { Calendar } from "react-native-calendars";

const DatePickerModal = ({ visible, onClose, onConfirm }) => {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [markedDates, setMarkedDates] = useState({});

    // Function to format the date as "19-12 May"
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getDate()}-${date.getMonth() + 1} ${date.toLocaleString('en-US', { month: 'short' })}`;
    };

    const handleDayPress = useCallback((day) => {
        let newMarkedDates = {};

        if (!startDate || (startDate && endDate)) {
            setStartDate(day.dateString);
            setEndDate(null);
            newMarkedDates = {
                [day.dateString]: {
                    startingDay: true,
                    color: "#1680E1",
                    textColor: "white",
                    borderRadius: 10, // Optional: rounded edges
                },
            };
        } else {
            setEndDate(day.dateString);

            let tempDate = new Date(startDate);
            let endDateObj = new Date(day.dateString);

            while (tempDate <= endDateObj) {
                const dateStr = tempDate.toISOString().split("T")[0];
                newMarkedDates[dateStr] = {
                    color: "#EAEBF1", // Light blue for range
                    textColor: "black",
                    borderColor: "blue", // Border color effect
                    borderWidth: 2,
                };

                tempDate.setDate(tempDate.getDate() + 1);
            }

            newMarkedDates[startDate] = {
                startingDay: true,
                color: "#1680E1",
                textColor: "white",
                borderRadius: 10,
            };

            newMarkedDates[day.dateString] = {
                endingDay: true,
                color: "#1680E1",
                textColor: "white",
                borderRadius: 10,
            };
        }

        setMarkedDates(newMarkedDates);
    }, [startDate, endDate]);

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <Text style={styles.title}>Select Date Range</Text>
                    <Calendar
                        markingType="period"
                        markedDates={markedDates}
                        onDayPress={handleDayPress}
                        theme={{
                            todayTextColor: "#1680E1",
                            arrowColor: "#1680E1",
                        }}
                    />
                     <Text style={styles.selectedDates}>
                        Selected: {startDate ? formatDate(startDate) : "Start Date"} - {endDate ? formatDate(endDate) : "End Date"}
                    </Text>
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                            <Text>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.submitButton}
                            onPress={() => onConfirm({ startDate, endDate })}
                        >
                            <Text style={{ color: "white" }}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        width: "90%",
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
    },
    title: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
    selectedDates: {
        fontSize: 16,
        fontWeight: "500",
        textAlign: "center",
        marginVertical: 10,
        color: "#1680E1",
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        marginTop: 16,
        width: "100%",
    },
    cancelButton: {
        paddingVertical: 8,
        borderRadius: 30,
        borderWidth: 1,
        alignItems: "center",
        marginRight: 10,
        width: "35%",
    },
    submitButton: {
        paddingVertical: 8,
        borderRadius: 30,
        backgroundColor: "#1680E1",
        width: "35%",
        alignItems: "center",
    },
});

export default DatePickerModal;
