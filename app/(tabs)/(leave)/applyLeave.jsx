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
import LeaveCategoryBottomSheet from "@/components/leave/LeaveCategoryBottomSheet";
import dayjs from "dayjs";
import { Ionicons, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import * as DocumentPicker from "expo-document-picker";

const categories = [
    { id: 1, name: "Causal Leaves (0/1)", type: "Causal" },
    { id: 2, name: "Duty Leaves (0/0)", type: "Duty" },
    { id: 3, name: "Earned Leaves (06/32)", type: "Earned" },
    { id: 4, name: "Medical/Sick Leaves (0/15)", type: "Medical" },
    { id: 5, name: "Study Leaves (0/1)", type: "Study" },
];

const FileUploadInput = ({ onSelectFile, fileName, setFormData }) => (
    <View className="mt-1.5">
        <TouchableRipple
            onPress={onSelectFile}
            className="h-[50px] rounded-[12px] py-2 px-3.5 justify-center border border-gray-600 bg-white min-w-36"
        >
            <View className="flex-row items-center gap-3">
                <View className="w-[70px] h-1 bg-white absolute -top-4 left-0"></View>
                <Text className="pr-[10px] text-gray-600 text-sm absolute -top-6 left-0.5">
                    Attachment
                </Text>
                <MaterialIcons name="attach-file" size={24} color="black" />
                <Text numberOfLines={1} className="text-gray-600">
                    {fileName ? fileName : "Upload Medical Document"}
                </Text>
            </View>
        </TouchableRipple>
        {fileName && (
            <View className="flex-row items-center justify-between p-2 rounded-lg">
                <Text
                    className="flex-1 text-sm text-gray-600"
                    numberOfLines={1}
                >
                    {fileName}
                </Text>
                <TouchableOpacity
                    activeOpacity={0.6}
                    onPress={() => {
                        setFormData((prev) => ({
                            ...prev,
                            medicalDocument: null,
                        }));
                    }}
                >
                    <Ionicons name="close-circle" size={20} color="#4b5563" />
                </TouchableOpacity>
            </View>
        )}
    </View>
);

const ApplyLeave = () => {
    const [formData, setFormData] = useState({
        startDate: dayjs(),
        endDate: dayjs(),
        reason: "",
        category: null,
        medicalDocument: null,
    });
    const [errors, setErrors] = useState({
        category: "",
        startDate: "",
        endDate: "",
        reason: "",
        medicalDocument: "",
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

    const handleFilePick = useCallback(async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: "application/pdf",
            });

            if (result.assets && result.assets.length > 0) {
                const file = result.assets[0];
                setFormData((prev) => ({
                    ...prev,
                    medicalDocument: file,
                }));
                setErrors((prev) => ({ ...prev, medicalDocument: "" }));
            }
        } catch (err) {
            console.log("Document picking error:", err);
        }
    }, []);

    const validateForm = () => {
        let tempErrors = {};
        let isValid = true;

        // Category validation
        if (formData.category == null) {
            tempErrors.category = "Please select a leave category";
            isValid = false;
        }

        // Date validation
        if (!formData.startDate) {
            tempErrors.startDate = "Start date is required";
            isValid = false;
        }

        if (!formData.endDate) {
            tempErrors.endDate = "End date is required";
            isValid = false;
        }

        // Reason validation
        if (!formData.reason.trim()) {
            tempErrors.reason = "Please provide a reason for leave";
            isValid = false;
        }

        // Medical document validation
        if (formData.category === "Medical" && !formData.medicalDocument) {
            tempErrors.medicalDocument = "Medical document is required";
            isValid = false;
        }

        setErrors(tempErrors);
        return isValid;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            console.log("🚀 ~ handleSubmit ~ formData:", formData);
        }
    };

    const renderDateInput = useCallback(
        ({ label, fieldName, value }) => (
            <TextInput
                mode="outlined"
                label={label}
                placeholder="dd/mm/yyyy"
                value={dayjs(value).format("DD/MM/YYYY")}
                outlineColor="#4b5563"
                activeOutlineColor="#4b5563"
                textColor="#4b5563"
                style={{
                    backgroundColor: "#fff",
                }}
                outlineStyle={{
                    borderRadius: 12,
                }}
                right={
                    <TextInput.Icon
                        icon="calendar-today"
                        color="#4b5563"
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
                <View>
                    <LeaveCategoryBottomSheet
                        dropDownDataList={categories}
                        title={"Leave Category"}
                        onSelectItem={(item) => {
                            setFormData({
                                ...formData,
                                category: item?.type,
                            });
                            setErrors((prev) => ({ ...prev, category: "" }));
                        }}
                        isDegree={true}
                        name={"name"}
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
                                    Leave Category
                                </Text>
                                <Text className="text-lg text-gray-600">
                                    {formData?.category
                                        ? formData?.category
                                        : "Select Leave Category"}
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
                <View>
                    {renderDateInput({
                        label: "Leave Start Date",
                        fieldName: "startDate",
                        value: formData.startDate,
                    })}
                    {errors.startDate && (
                        <Text className="ml-2 text-sm text-red-500">
                            {errors.startDate}
                        </Text>
                    )}
                </View>

                <View>
                    {renderDateInput({
                        label: "Leave End Date",
                        fieldName: "endDate",
                        value: formData.endDate,
                    })}
                    {errors.endDate && (
                        <Text className="ml-2 text-sm text-red-500">
                            {errors.endDate}
                        </Text>
                    )}
                </View>

                <View className="flex flex-wrap mt-1.5">
                    <Text className="px-4 py-2 font-bold text-center text-gray-600 border border-gray-600 rounded-lg">
                        Total Days: {calculateTotalDays}
                    </Text>
                </View>

                <View>
                    <TextInput
                        mode="outlined"
                        label="Reason"
                        value={formData.reason}
                        multiline={true}
                        outlineColor="#4b5563"
                        activeOutlineColor="#4b5563"
                        textColor="#4b5563"
                        style={{
                            backgroundColor: "#fff",
                            minHeight: 120,
                        }}
                        outlineStyle={{
                            borderRadius: 12,
                        }}
                        onChangeText={(text) => {
                            setFormData((prev) => ({
                                ...prev,
                                reason: text,
                            }));
                            setErrors((prev) => ({ ...prev, reason: "" }));
                        }}
                    />
                    {errors.reason && (
                        <Text className="ml-2 text-sm text-red-500">
                            {errors.reason}
                        </Text>
                    )}
                </View>

                {formData.category === "Medical" && (
                    <View>
                        <FileUploadInput
                            onSelectFile={handleFilePick}
                            fileName={formData.medicalDocument?.name}
                            setFormData={setFormData}
                        />
                        {errors.medicalDocument && (
                            <Text className="ml-2 text-sm text-red-500">
                                {errors.medicalDocument}
                            </Text>
                        )}
                    </View>
                )}

                <Button
                    mode="contained"
                    buttonColor="#2563eb"
                    textColor="white"
                    rippleColor="rgba(0, 0, 0, 0.1)"
                    labelStyle={{
                        fontSize: 16,
                    }}
                    style={{
                        borderRadius: 100,
                        width: "100%",
                        marginVertical: 20,
                    }}
                    contentStyle={{
                        height: 45,
                    }}
                    uppercase
                    onPress={handleSubmit}
                >
                    SUBMIT
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
