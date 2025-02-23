import React, { useRef, useCallback, useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import DateTimePicker from "react-native-ui-datepicker";
import { Button } from "react-native-paper";
import { Colors } from "@/constants/Colors";

const ModalRangeDatePicker = ({
    title,
    itemContainerStyle,
    visible,
    onClose,
    onSelectDate,
}) => {
    const bottomSheetRef = useRef(null);
    const [startDate, setStartDate] = useState(undefined);
    const [endDate, setEndDate] = useState(undefined);

    const openBottomSheet = useCallback(() => {
        bottomSheetRef.current?.present();
    }, []);

    const handleModalClose = useCallback(() => {
        bottomSheetRef.current?.close();
    }, []);

    const renderBackdrop = useCallback(
        () => (
            <TouchableOpacity
                style={styles.overlay}
                activeOpacity={1}
                onPress={handleModalClose}
            />
        ),
        [handleModalClose]
    );

    useEffect(() => {
        if (visible) {
            openBottomSheet();
        } else {
            handleModalClose();
        }
    }, [visible]);

    return (
        <BottomSheetModal
            ref={bottomSheetRef}
            snapPoints={["65%", "65%"]}
            onDismiss={onClose}
            backdropComponent={renderBackdrop}
        >
            <View style={styles.modalContainer}>
                {title && <Text style={styles.title}>{title}</Text>}

                <BottomSheetScrollView
                    contentContainerStyle={[
                        styles.scrollContent,
                        itemContainerStyle,
                    ]}
                    keyboardShouldPersistTaps="handled"
                >
                    <DateTimePicker
                        mode="range"
                        startDate={startDate}
                        endDate={endDate}
                        displayFullDays={true}
                        onChange={({ startDate, endDate }) => {
                            console.log("🚀 ~ Date:", startDate, endDate);
                            setStartDate(startDate);
                            setEndDate(endDate);
                        }}
                        selectedItemColor={Colors.light.primaryButton}
                        dayContainerStyle={{
                            borderRadius: 100,
                            height: 40,
                            width: 40,
                        }}
                    />
                    <View style={styles.buttonContainer}>
                        <Button
                            mode="contained"
                            buttonColor="#e5e7eb"
                            textColor="#111827"
                            rippleColor="rgba(0, 0, 0, 0.1)"
                            style={styles.cancelButton}
                            labelStyle={styles.buttonLabel}
                            onPress={onClose}
                        >
                            Cancel
                        </Button>
                        <Button
                            mode="contained"
                            buttonColor={Colors.light.primaryButton}
                            textColor="white"
                            rippleColor="rgba(0, 0, 0, 0.1)"
                            style={styles.button}
                            labelStyle={styles.buttonLabel}
                            onPress={() => {
                                onSelectDate(startDate, endDate);
                                onClose();
                            }}
                        >
                            Submit
                        </Button>
                    </View>
                </BottomSheetScrollView>
            </View>
        </BottomSheetModal>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 18,
        fontWeight: "600",
        color: "#333333",
        paddingHorizontal: 20,
        paddingBottom: 10,
    },
    modalContainer: {
        flex: 1,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    scrollContent: {
        flex: 1,
        paddingHorizontal: 20,
    },
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "flex-end",
        gap: 10,
        // backgroundColor: "red",
    },
    button: {
        borderRadius: 9999,
        borderWidth: 1,
        borderColor: Colors.light.primaryButton,
    },
    cancelButton: {
        borderRadius: 9999,
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: "#333333",
    },
    buttonLabel: {
        fontSize: 14,
        marginVertical: 6,
        marginHorizontal: 30,
    },
});

export default ModalRangeDatePicker;
