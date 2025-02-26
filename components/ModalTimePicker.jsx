import React, { useState } from "react";
import { View, Platform, Modal, StyleSheet } from "react-native";
import RNDateTimePicker from "@react-native-community/datetimepicker";
import { Button } from "react-native-paper";
import dayjs from "dayjs";
import { Colors } from "@/constants/Colors";

const ModalTimePicker = ({ visible, onClose, value, onSelectTime }) => {
    const [selectedTime, setSelectedTime] = useState(value || dayjs().toDate());

    const handleTimeChange = (event, time) => {
        if (event.type === "set" && time) {
            setSelectedTime(time); // Store in temp state
        }
        if (Platform.OS === "android") {
            onSelectTime(time);
        }
    };

    const handleConfirm = () => {
        onSelectTime(selectedTime);
    };

    return (
        <View>
            {/* iOS Modal */}
            {Platform.OS === "ios" && visible && (
                <Modal
                    animationType="fade"
                    transparent={true}
                    onRequestClose={onClose}
                >
                    <View style={styles.modalBackground}>
                        <View style={styles.modalContainer}>
                            <RNDateTimePicker
                                value={selectedTime}
                                mode="time"
                                display="spinner"
                                onChange={handleTimeChange}
                            />
                            <View style={styles.buttonContainer}>
                                <Button
                                    mode="contained"
                                    buttonColor="#e5e7eb"
                                    textColor="#111827"
                                    style={styles.button}
                                    labelStyle={styles.buttonLabel}
                                    onPress={onClose}
                                >
                                    Close
                                </Button>
                                <Button
                                    mode="contained"
                                    buttonColor={Colors.light.primaryButton}
                                    textColor="white"
                                    style={styles.button}
                                    labelStyle={styles.buttonLabel}
                                    onPress={handleConfirm} // Select time manually
                                >
                                    Select
                                </Button>
                            </View>
                        </View>
                    </View>
                </Modal>
            )}

            {/* Android Picker */}
            {Platform.OS === "android" && visible && (
                <RNDateTimePicker
                    value={selectedTime}
                    mode="time"
                    display="clock"
                    onChange={handleTimeChange}
                />
            )}
        </View>
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
    buttonContainer: {
        flexDirection: "row",
        marginTop: 20,
        gap: 10,
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
});

export default ModalTimePicker;
