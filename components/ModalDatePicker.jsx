import React, { useState } from "react";
import {
    View,
    Text,
    Modal,
    StyleSheet,
    TouchableOpacity,
    Platform,
} from "react-native";
import DateTimePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";

const ModalDatePicker = ({ visible, onClose, onSelectDate, initialDate }) => {
    const [selectedDate, setSelectedDate] = useState(initialDate || dayjs());

    return (
        <Modal
            visible={visible}
            animationType="fade"
            transparent={true}
            onRequestClose={onClose}
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <DateTimePicker
                        mode="single"
                        date={selectedDate}
                        displayFullDays={true}
                        onChange={(params) => setSelectedDate(params.date)}
                        selectedItemColor="#2563eb"
                        dayContainerStyle={{
                            borderRadius: 10,
                            height: 40,
                            width: 40,
                        }}
                    />
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity
                            activeOpacity={0.6}
                            style={styles.selectButton}
                            onPress={() => {
                                onSelectDate(selectedDate);
                                onClose();
                            }}
                        >
                            <Text style={styles.selectButtonText}>Select</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={0.6}
                            style={styles.closeButton}
                            onPress={onClose}
                        >
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Blurry background
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
        justifyContent: "space-between",
    },
    selectButton: {
        backgroundColor: "#2563eb",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal: 5,
    },
    selectButtonText: {
        color: "white",
        fontWeight: "bold",
    },
    closeButton: {
        backgroundColor: "#e5e7eb",
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginHorizontal: 5,
    },
    closeButtonText: {
        color: "#111827",
        fontWeight: "bold",
    },
});

export default ModalDatePicker;
