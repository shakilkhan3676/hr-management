import React, { useRef, useCallback, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { Button } from "react-native-paper";
import { router } from "expo-router";
import LottieView from "lottie-react-native";
import success from "@/assets/lottie/success.json";
import { Colors } from "@/constants/Colors";

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
                            <LottieView
                                source={success}
                                style={{
                                    width: 200,
                                    height: 200,
                                }}
                                autoPlay
                                loop={true}
                            />
                        </View>
                        <View style={{ marginTop: 150 }}>
                            <Text style={styles.title}>
                                Hooray, successfully requested time off
                            </Text>
                            <Text style={styles.message}>
                                Now, just wait approval from your team lead 💪
                            </Text>
                        </View>

                        <Button
                            mode="contained"
                            buttonColor={Colors.light.primaryButton}
                            textColor="white"
                            rippleColor="rgba(0, 0, 0, 0.1)"
                            labelStyle={{ fontSize: 16 }}
                            style={styles.button}
                            contentStyle={{ height: 45 }}
                            onPress={handleModalClose}
                        >
                            BACK TO HOME
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
        paddingHorizontal: 24,
        paddingBottom: 24,
        alignItems: "center",
    },
    iconContainer: {
        position: "absolute",
        top: -20,
    },
    title: {
        fontSize: 22,
        fontWeight: "600",
        color: "#111827",
        marginBottom: 12,
        textAlign: "center",
    },
    message: {
        fontSize: 14,
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
