import React, { useState } from "react";
import {
    View,
    Modal,
    StyleSheet,
    TouchableOpacity,
    Text,
    Pressable,
} from "react-native";
import { Button } from "react-native-paper";
import dayjs from "dayjs";
import { Ionicons } from "@expo/vector-icons";

const ModalYearPicker = ({ visible, onClose, initialYear, onSelectYear }) => {
    const [selectedYear, setSelectedYear] = useState(initialYear);

    const currentYear = dayjs().year();
    // State for dynamic year range
    const [yearRange, setYearRange] = useState({
        startYear: currentYear - 4,
        endYear: currentYear + 7,
    });

    const years = Array.from(
        { length: yearRange.endYear - yearRange.startYear + 1 },
        (_, i) => yearRange.startYear + i
    );

    // Handle back/forward navigation
    const handleBackward = () => {
        setYearRange((prev) => ({
            startYear: prev.startYear - 12,
            endYear: prev.endYear - 12,
        }));
    };

    const handleForward = () => {
        setYearRange((prev) => ({
            startYear: prev.startYear + 12,
            endYear: prev.endYear + 12,
        }));
    };

    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <View style={styles.yearPickerContainer}>
                        <View style={styles.header}>
                            <Pressable className="p-2" onPress={handleBackward}>
                                <Ionicons name="chevron-back" size={24} />
                            </Pressable>
                            <Text style={styles.headerTitle}>
                                {yearRange.startYear} - {yearRange.endYear}
                            </Text>
                            <Pressable className="p-2" onPress={handleForward}>
                                <Ionicons name="chevron-forward" size={24} />
                            </Pressable>
                        </View>
                        <View style={styles.yearsGrid}>
                            {years.map((year) => (
                                <TouchableOpacity
                                    activeOpacity={0.8}
                                    key={year}
                                    style={[
                                        styles.yearButton,
                                        currentYear === year &&
                                            styles.currentYearButton,
                                        selectedYear === year &&
                                            styles.selectedYearButton,
                                    ]}
                                    onPress={() => setSelectedYear(year)}
                                >
                                    <Text
                                        style={[
                                            styles.yearText,
                                            selectedYear === year &&
                                                styles.selectedYearText,
                                        ]}
                                    >
                                        {year}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                    <View style={styles.buttonContainer}>
                        <Button
                            mode="contained"
                            buttonColor="#09509E"
                            textColor="white"
                            rippleColor="rgba(0, 0, 0, 0.1)"
                            style={styles.button}
                            labelStyle={styles.buttonLabel}
                            onPress={() => {
                                onSelectYear(selectedYear);
                                onClose();
                            }}
                        >
                            Select
                        </Button>
                        <Button
                            mode="contained"
                            buttonColor="#e5e7eb"
                            textColor="#111827"
                            rippleColor="rgba(0, 0, 0, 0.1)"
                            style={styles.button}
                            labelStyle={styles.buttonLabel}
                            onPress={() => {
                                setSelectedYear(initialYear);
                                onClose();
                            }}
                        >
                            Close
                        </Button>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        width: "90%",
        backgroundColor: "white",
        borderRadius: 10,
        padding: 20,
        alignItems: "center",
    },
    yearPickerContainer: {
        width: "100%",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingBottom: 20,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#111827",
    },
    yearsGrid: {
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        justifyContent: "center",
        gap: 8,
    },
    yearButton: {
        width: "30%",
        aspectRatio: 2.2,
        borderRadius: 8,
        backgroundColor: "#fff",
        borderWidth: 1,
        borderColor: "#e5e7eb",
        alignItems: "center",
        justifyContent: "center",
    },
    selectedYearButton: {
        backgroundColor: "#09509E",
        borderColor: "#09509E",
    },
    yearText: {
        fontSize: 16,
        color: "#374151",
        fontWeight: "500",
    },
    selectedYearText: {
        color: "#fff",
    },
    buttonContainer: {
        flexDirection: "row",
        marginTop: 40,
        gap: 12,
        width: "75%",
    },
    button: {
        borderRadius: 10,
        flex: 1,
    },
    buttonLabel: {
        fontSize: 14,
        fontWeight: "bold",
        padding: 2,
    },
    currentYearButton: {
        borderColor: "#09509E",
        borderWidth: 1.5,
    },
});

export default ModalYearPicker;
