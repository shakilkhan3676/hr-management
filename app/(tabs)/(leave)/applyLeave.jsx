import { View, Text, SafeAreaView, Platform, ScrollView } from "react-native";
import React, { useState, useCallback, useMemo } from "react";
import { Button, TextInput } from "react-native-paper";
import ModalDatePicker from "@/components/ModalDatePicker";
import dayjs from "dayjs";

const categories = [
    { value: "1", label: "Causal Leaves" },
    { value: "2", label: "Duty Leaves" },
    { value: "3", label: "Earned Leaves" },
    { value: "4", label: "Medical/Sick Leaves" },
    { value: "5", label: "Study Leaves" },
];

const ApplyLeave = () => {
    const [formData, setFormData] = useState({
        startDate: dayjs(),
        endDate: dayjs(),
        reason: "",
        category: "3", // Default category
    });
    const [modalVisible, setModalVisible] = useState(false);
    const [activeDateField, setActiveDateField] = useState(null);

    // Calculate total days between dates
    const calculateTotalDays = useMemo(() => {
        const start = dayjs(formData.startDate).startOf("day");
        const end = dayjs(formData.endDate).startOf("day");

        // Ensure at least 1 day is counted
        return Math.max(1, end.diff(start, "day") + 1);
    }, [formData.startDate, formData.endDate]);

    const handleDateSelect = useCallback(
        (selectedDate) => {
            setFormData((prev) => {
                if (activeDateField === "startDate") {
                    // If new start date is after current end date, reset both to selectedDate
                    return dayjs(selectedDate).isAfter(prev.endDate, "day")
                        ? {
                              ...prev,
                              startDate: selectedDate,
                              endDate: selectedDate,
                          }
                        : { ...prev, startDate: selectedDate };
                } else {
                    // Ensure end date is never before start date
                    return dayjs(selectedDate).isBefore(prev.startDate, "day")
                        ? { ...prev, endDate: prev.startDate }
                        : { ...prev, endDate: selectedDate };
                }
            });

            setModalVisible(false);
        },
        [activeDateField]
    );

    const handleDatePress = useCallback((fieldName) => {
        setActiveDateField(fieldName);
        setModalVisible(true);
    }, []);

    const handleCategoryChange = useCallback((item) => {
        setFormData((prev) => ({
            ...prev,
            category: item.value,
        }));
    }, []);

    const renderDateInput = useCallback(
        ({ label, fieldName, value }) => (
            <TextInput
                mode="outlined"
                label={label}
                placeholder="dd/mm/yyyy"
                value={dayjs(value).format("DD/MM/YYYY")}
                outlineColor="#4b5563"
                activeOutlineColor="#4b5563"
                style={{
                    backgroundColor: "#fff",
                }}
                outlineStyle={{
                    borderRadius: 12,
                }}
                right={
                    <TextInput.Icon
                        icon="calendar-today"
                        size={24}
                        onPress={() => handleDatePress(fieldName)}
                    />
                }
                editable={false}
            />
        ),
        [handleDatePress]
    );

    return (
        <SafeAreaView
            style={{ flex: 1, marginTop: Platform.OS === "ios" ? 15 : 5 }}
        >
            <ScrollView
                contentContainerStyle={{
                    marginHorizontal: 16,
                    gap: 16,
                    paddingTop: 5,
                }}
                showsVerticalScrollIndicator={false}
            >
                {renderDateInput({
                    label: "Leave Start Date",
                    fieldName: "startDate",
                    value: formData.startDate,
                })}

                {renderDateInput({
                    label: "Leave End Date",
                    fieldName: "endDate",
                    value: formData.endDate,
                })}

                <View className="flex flex-wrap">
                    <Text className="px-4 py-2 font-bold text-center text-gray-600 border border-gray-600 rounded-lg">
                        Total Days: {calculateTotalDays}
                    </Text>
                </View>

                <TextInput
                    mode="outlined"
                    label="Reason"
                    value={formData.reason}
                    multiline={true}
                    outlineColor="#4b5563"
                    activeOutlineColor="#4b5563"
                    style={{
                        backgroundColor: "#fff",
                        minHeight: 120,
                    }}
                    outlineStyle={{
                        borderRadius: 12,
                    }}
                    onChangeText={(text) =>
                        setFormData((prev) => ({
                            ...prev,
                            reason: text,
                        }))
                    }
                />

                <Button
                    mode="contained"
                    buttonColor={"#d1d5db"}
                    textColor={"#4b5563"}
                    rippleColor="rgba(0, 0, 0, 0.1)"
                    labelStyle={{
                        fontSize: 16,
                    }}
                    style={{
                        borderRadius: 100,
                        width: "100%",
                        marginVertical: 20,
                    }}
                    onPress={() => console.log("Submit:", formData)}
                >
                    Submit Leave Request
                </Button>
            </ScrollView>

            <ModalDatePicker
                visible={modalVisible}
                initialDate={formData[activeDateField]}
                onClose={() => setModalVisible(false)}
                onSelectDate={handleDateSelect}
                minimumDate={
                    activeDateField === "endDate"
                        ? formData.startDate
                        : undefined
                }
            />
        </SafeAreaView>
    );
};

export default ApplyLeave;
