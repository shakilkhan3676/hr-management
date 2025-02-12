import React, { useRef, useCallback, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { Button } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { router } from "expo-router";

const SuccessSubmitBottomSheet = ({ showSuccess }) => {
    const bottomSheetRef = useRef(null);

    const openBottomSheet = useCallback(() => {
        bottomSheetRef.current?.present();
    }, []);

    const handleModalClose = useCallback(() => {
        bottomSheetRef.current?.close();
        setTimeout(() => {
            router.back();
        }, 300);
    }, []);

    const renderBackdrop = useCallback(
        () => <View style={styles.overlay} />,
        [handleModalClose]
    );

    useEffect(() => {
        showSuccess && openBottomSheet();
    }, [showSuccess]);

    return (
        <BottomSheetModal
            ref={bottomSheetRef}
            snapPoints={["50%", "50%"]}
            enableDismissOnClose={true} // Prevent dismiss on backdrop click
            enablePanDownToClose={false}
            backdropComponent={renderBackdrop}
        >
            <View style={styles.modalContainer}>
                <BottomSheetScrollView
                    contentContainerStyle={styles.scrollContent}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Success Content */}
                    <View style={styles.contentContainer}>
                        <View style={styles.iconContainer}>
                            <MaterialIcons
                                name="check-circle"
                                size={80}
                                color="#22c55e"
                            />
                        </View>

                        <Text style={styles.title}>
                            Successfully Submitted!
                        </Text>
                        <Text style={styles.message}>
                            Your leave request has been submitted successfully.
                            You will be notified once it's approved.
                        </Text>

                        <Button
                            mode="contained"
                            buttonColor="#2563eb"
                            textColor="white"
                            rippleColor="rgba(0, 0, 0, 0.1)"
                            labelStyle={{
                                fontSize: 16,
                            }}
                            style={styles.button}
                            contentStyle={{
                                height: 45,
                            }}
                            onPress={handleModalClose}
                        >
                            GO TO HOME
                        </Button>
                    </View>
                </BottomSheetScrollView>
            </View>
        </BottomSheetModal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContainer: {
        flex: 1,
        backgroundColor: "white",
    },
    scrollContent: {
        flexGrow: 1,
    },
    contentContainer: {
        flex: 1,
        padding: 24,
        alignItems: "center",
    },
    iconContainer: {
        marginVertical: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "600",
        color: "#111827",
        marginBottom: 12,
    },
    message: {
        fontSize: 16,
        color: "#6b7280",
        textAlign: "center",
        marginBottom: 32,
        lineHeight: 24,
    },
    button: {
        borderRadius: 100,
        width: "100%",
        marginTop: "auto",
        marginBottom: 20,
    },
});

export default SuccessSubmitBottomSheet;
