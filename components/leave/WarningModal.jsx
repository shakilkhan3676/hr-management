// components/WarningModal.jsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Modal } from "react-native";
import { Button } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

const WarningModal = ({ visible, onCancel, onDiscard }) => {
    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    <View style={styles.iconContainer}>
                        <AntDesign name="warning" size={50} color="#6b7280" />
                    </View>

                    <Text style={styles.title}>
                        Wait! You have Unsaved changes
                    </Text>
                    <Text style={styles.message}>
                        If you go back now, any selection you made will be lost.
                        Do you want to stay and finish or exit without saving?
                    </Text>

                    <View style={styles.buttonContainer}>
                        <Button
                            mode="contained"
                            buttonColor={Colors.light.primaryButton}
                            textColor="white"
                            rippleColor="rgba(0, 0, 0, 0.1)"
                            labelStyle={styles.buttonLabel}
                            onPress={onCancel}
                            style={{
                                borderWidth: 0.5,
                                borderColor: Colors.light.primaryButton,
                            }}
                        >
                            Stay & Continue
                        </Button>
                        <Button
                            mode="contained"
                            buttonColor={Colors.light.lightGrayishGreen}
                            textColor="#111827"
                            rippleColor="rgba(0, 0, 0, 0.1)"
                            labelStyle={styles.buttonLabel}
                            onPress={onDiscard}
                            style={{
                                borderWidth: 0.5,
                                borderColor: Colors.light.grayButtonBorder,
                            }}
                        >
                            I want to exit
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
        backgroundColor: "white",
        borderRadius: 16,
        padding: 24,
        width: "85%",
        alignItems: "center",
        gap: 16,
    },
    title: {
        fontSize: 16,
        fontWeight: "800",
        color: "#111827",
    },
    message: {
        fontSize: 14,
        textAlign: "center",
        color: "#6b7280",
    },
    buttonContainer: {
        flexDirection: "col",
        width: "100%",
        gap: 14,
    },
    buttonLabel: {
        fontSize: 15,
        fontWeight: "600",
        marginHorizontal: 0,
    },
});

export default WarningModal;
