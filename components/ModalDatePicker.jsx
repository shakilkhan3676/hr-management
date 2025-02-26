import React, { useState } from "react";
import { View, Modal, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import DateTimePicker from "react-native-ui-datepicker";
import dayjs from "dayjs";
import { Colors } from "@/constants/Colors";

const ModalDatePicker = ({
    visible,
    onClose,
    onSelectDate,
    initialDate,
    minimumDate,
}) => {
    const [selectedDate, setSelectedDate] = useState(
        initialDate || dayjs().startOf("day").toDate()
    );

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
                        minDate={minimumDate}
                        onChange={(params) => {
                            const dateFormat = dayjs(params.date)
                                .startOf("day")
                                .toDate();
                            setSelectedDate(dateFormat);
                        }}
                        selectedItemColor={Colors.light.primaryButton}
                        dayContainerStyle={{
                            borderRadius: 10,
                            height: 40,
                            width: 40,
                        }}
                    />
                    <View style={styles.buttonContainer}>
                        <Button
                            mode="contained"
                            buttonColor={Colors.light.primaryButton}
                            textColor="white"
                            rippleColor="rgba(0, 0, 0, 0.1)"
                            style={styles.button}
                            labelStyle={styles.buttonLabel}
                            onPress={() => {
                                onSelectDate(selectedDate);
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
                            onPress={onClose}
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

export default ModalDatePicker;
