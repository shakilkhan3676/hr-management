import { View, Text, ScrollView } from "react-native";
import React, { useState, useCallback } from "react";
import { Button, TextInput, TouchableRipple } from "react-native-paper";
import ModalDatePicker from "@/components/ModalDatePicker";
import LeaveCategoryBottomSheet from "@/components/leave/LeaveCategoryBottomSheet";
import dayjs from "dayjs";
import { FontAwesome } from "@expo/vector-icons";
import SuccessSubmitBottomSheet from "@/components/leave/SuccessSubmitBottomSheet";
import { Colors } from "@/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";
import ModalTimePicker from "../../components/ModalTimePicker";

const categories = [
    { id: 1, name: "Causal Leaves (0/1)", type: "Causal" },
    { id: 2, name: "Duty Leaves (0/0)", type: "Duty" },
    { id: 3, name: "Earned Leaves (06/32)", type: "Earned" },
    { id: 4, name: "Medical/Sick Leaves (0/15)", type: "Medical" },
    { id: 5, name: "Study Leaves (0/1)", type: "Study" },
];

const applyManualAttendance = () => {
    const [formData, setFormData] = useState({
        date: null,
        reason: "",
        category: null,
        medicalDocument: null,
        inTime: null,
        outTime: null,
    });

    const [errors, setErrors] = useState({});
    const [modalVisible, setModalVisible] = useState(false);
    const [activeField, setActiveField] = useState(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);

    const updateFormData = (field, value) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
        setErrors((prev) => ({
            ...prev,
            [field]: "",
        }));
    };

    const handleSelect = useCallback((field, value) => {
        updateFormData(field, value);
        setModalVisible(false);
        setShowTimePicker(false);
    }, []);

    const validateForm = () => {
        const tempErrors = {};
        let isValid = true;

        ["category", "date", "inTime", "outTime", "reason"].forEach((field) => {
            if (!formData[field]?.trim()) {
                tempErrors[field] = `Please provide a valid ${field}`;
                isValid = false;
            }
        });

        if (formData.category === "Medical" && !formData.medicalDocument) {
            tempErrors.medicalDocument = "Medical document is required";
            isValid = false;
        }

        setErrors(tempErrors);
        return isValid;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            console.log("Form submitted:", formData);
            setShowSuccess(true);
        }
    };

    const renderInput = ({ label, field, placeholder, isTime = false }) => (
        <View>
            <TextInput
                mode="outlined"
                label={label}
                placeholder={placeholder}
                value={
                    formData[field]
                        ? isTime
                            ? dayjs(formData[field]).format("h:mm A")
                            : dayjs(formData[field]).format("DD/MM/YYYY")
                        : placeholder
                }
                outlineColor="#4b5563"
                activeOutlineColor="#4b5563"
                textColor="#4b5563"
                style={{ backgroundColor: "#fff" }}
                outlineStyle={{ borderRadius: 12 }}
                right={
                    <TextInput.Icon
                        icon={isTime ? "clock-outline" : "calendar-today"}
                        color="#4b5563"
                        size={24}
                        onPress={() => {
                            setActiveField(field);
                            isTime
                                ? setShowTimePicker(true)
                                : setModalVisible(true);
                        }}
                    />
                }
                editable={false}
            />
            {errors[field] && (
                <Text className="ml-2 text-sm text-red-500">
                    {errors[field]}
                </Text>
            )}
        </View>
    );

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Header title="Apply Manual Attendance" />
            <ScrollView
                contentContainerStyle={{
                    marginHorizontal: 16,
                    gap: 16,
                    paddingTop: 5,
                }}
                showsVerticalScrollIndicator={false}
            >
                {/* Leave Category */}
                <View>
                    <LeaveCategoryBottomSheet
                        dropDownDataList={categories}
                        title="Leave Category"
                        onSelectItem={(item) =>
                            updateFormData("category", item?.type)
                        }
                        isDegree={true}
                        name="name"
                        itemContainerStyle={{
                            flexDirection: "row",
                            flexWrap: "wrap",
                            alignItems: "center",
                        }}
                    >
                        <TouchableRipple className="h-[50px] rounded-[12px] py-2 px-5 justify-center border border-gray-600 bg-white min-w-36">
                            <View className="flex-row items-center justify-between">
                                <View className="w-[94px] h-1 bg-white absolute -top-4 -left-2"></View>
                                <Text className="pr-[10px] text-gray-600 text-sm absolute -top-6 -left-1">
                                    Work Location
                                </Text>
                                <Text className="text-lg text-gray-600">
                                    {formData?.category ?? "Select Location"}
                                </Text>
                                <FontAwesome
                                    className="absolute top-0 right-0"
                                    name="caret-down"
                                    size={24}
                                    color="#4b5563"
                                />
                            </View>
                        </TouchableRipple>
                    </LeaveCategoryBottomSheet>
                    {errors.category && (
                        <Text className="ml-2 text-sm text-red-500">
                            {errors.category}
                        </Text>
                    )}
                </View>

                {/* Attendance Date */}
                {renderInput({
                    label: "Attendance Date",
                    field: "date",
                    placeholder: "dd/mm/yyyy",
                })}

                {/* Punch In & Out */}
                {renderInput({
                    label: "Punch In",
                    field: "inTime",
                    placeholder: "-:-",
                    isTime: true,
                })}
                {renderInput({
                    label: "Punch Out",
                    field: "outTime",
                    placeholder: "-:-",
                    isTime: true,
                })}

                {/* Reason */}
                <TextInput
                    mode="outlined"
                    label="Reason"
                    value={formData.reason}
                    multiline
                    outlineColor="#4b5563"
                    activeOutlineColor="#4b5563"
                    textColor="#4b5563"
                    style={{ backgroundColor: "#fff", minHeight: 120 }}
                    outlineStyle={{ borderRadius: 12 }}
                    onChangeText={(text) => updateFormData("reason", text)}
                />

                {/* Submit Button */}
                <Button
                    mode="contained"
                    buttonColor={Colors.light.primaryButton}
                    rippleColor="rgba(0, 0, 0, 0.1)"
                    style={{ marginVertical: 20 }}
                    contentStyle={{
                        height: 45,
                    }}
                    onPress={handleSubmit}
                >
                    SUBMIT
                </Button>
            </ScrollView>

            <ModalDatePicker
                visible={modalVisible}
                onSelectDate={(date) => handleSelect(activeField, date)}
                onClose={() => setModalVisible(false)}
            />
            <ModalTimePicker
                visible={showTimePicker}
                onSelectTime={(time) => handleSelect(activeField, time)}
                onClose={() => setShowTimePicker(false)}
            />
            <SuccessSubmitBottomSheet showSuccess={showSuccess} />
        </SafeAreaView>
    );
};

export default applyManualAttendance;
