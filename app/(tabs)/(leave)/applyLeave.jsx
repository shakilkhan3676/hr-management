import {
    View,
    Text,
    SafeAreaView,
    Platform,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import React, { useState, useCallback, useMemo } from "react";
import { Button, TextInput, TouchableRipple } from "react-native-paper";
import ModalDatePicker from "@/components/ModalDatePicker";
import SelectableBottomSheet from "@/components/SelectableBottomSheet";
import dayjs from "dayjs";
import { Ionicons, FontAwesome } from "@expo/vector-icons";

const categories = [
    { id: 1, name: "Causal Leaves (0/1)", type: "Causal" },
    { id: 2, name: "Duty Leaves (0/0)", type: "Duty" },
    { id: 3, name: "Earned Leaves (06/32)", type: "Earned" },
    { id: 4, name: "Medical/Sick Leaves (0/15)", type: "Medical/Sick" },
    { id: 5, name: "Study Leaves (0/1)", type: "Study" },
];

const ApplyLeave = () => {
    const [formData, setFormData] = useState({
        startDate: dayjs(),
        endDate: dayjs(),
        reason: "",
        category: "Select Leave Category",
    });
    console.log("🚀 ~ ApplyLeave ~ formData:", formData);
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
                    color: "#4b5563",
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
                <SelectableBottomSheet
                    dropDownDataList={categories}
                    defaultSelect={"Select"}
                    title={"Leave Category"}
                    onSelectItem={(item) => {
                        setFormData({
                            ...formData,
                            category: item?.type,
                        });
                    }}
                    isDegree={true}
                    name={"name"}
                    itemContainerStyle={{
                        flexDirection: "row",
                        flexWrap: "wrap",
                        alignItems: "center",
                    }}
                >
                    <TouchableRipple
                        activeOpacity={0.6}
                        className={`h-[50px] rounded-[12px] py-2 px-5 min-w-36 justify-center border border-gray-600 bg-white`}
                        onPress={() => {}}
                    >
                        <>
                            <View className="w-[95px] h-1 bg-white absolute -top-0.5 left-2.5"></View>
                            <Text className="pr-[10px] text-gray-600 text-sm absolute -top-3 left-3.5">
                                Leave Category
                            </Text>
                            <View className="flex-row items-center">
                                <Text
                                    numberOfLines={1}
                                    className={`flex-1 pr-[10px] text-lg text-gray-600`}
                                >
                                    {formData.category}
                                </Text>
                                <FontAwesome
                                    className="absolute top-0 right-0"
                                    name="caret-down"
                                    size={24}
                                    color="#4b5563"
                                />
                            </View>
                        </>
                    </TouchableRipple>
                </SelectableBottomSheet>
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
