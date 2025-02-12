import React, { useRef, useCallback, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { BottomSheetModal, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { Button } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const LeaveCategoryBottomSheet = ({
    title,
    dropDownDataList = [],
    onSelectItem,
    isDegree,
    name,
    children,
    itemContainerStyle,
}) => {
    const bottomSheetRef = useRef(null);
    const [selectedButton, setSelectedButton] = useState(null);
    const [snapPoints, setSnapPoints] = useState(["60%"]);

    const openBottomSheet = useCallback(() => {
        bottomSheetRef.current?.present();
    }, []);

    const handleModalClose = useCallback(() => {
        bottomSheetRef.current?.close();
    }, []);

    const handleItemSelect = (item) => {
        setSelectedButton(item);
    };

    const handleSubmitItem = () => {
        handleModalClose();
        onSelectItem(selectedButton);
    };

    useEffect(() => {
        if (selectedButton?.type === "Medical") {
            setSnapPoints(["70%"]);
        } else {
            setSnapPoints(["60%"]);
        }
    }, [selectedButton]);

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

    const renderItem = useCallback(
        (item) => (
            <Button
                key={item?.id}
                rippleColor="rgba(0, 0, 0, 0.1)"
                buttonColor={selectedButton === item ? "#8097B0" : "#fff"}
                textColor={selectedButton === item ? "#fff" : "#333333"}
                onPress={() => handleItemSelect(item)}
                style={[
                    styles.option,
                    {
                        borderColor:
                            selectedButton === item ? "#0A2547" : "#ccc",
                        boxShadow:
                            selectedButton === item
                                ? "2px 3px 0px #09509E"
                                : "none",
                        alignItems: isDegree ? "flex-start" : "center",
                    },
                ]}
            >
                {isDegree ? item[name] : item}
            </Button>
        ),
        [isDegree, name, handleItemSelect, selectedButton]
    );

    return (
        <View style={styles.container}>
            {children &&
                React.isValidElement(children) &&
                React.cloneElement(children, { onPress: openBottomSheet })}

            <BottomSheetModal
                ref={bottomSheetRef}
                snapPoints={snapPoints}
                dismissOnPanDown={false}
                dismissOnBackdropPress={true}
                onDismiss={handleModalClose}
                backdropComponent={renderBackdrop}
            >
                <View style={styles.modalContainer}>
                    {title && <Text style={styles.title}>{title}</Text>}

                    <BottomSheetScrollView
                        contentContainerStyle={styles.scrollContent}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View
                            style={[
                                styles.contentContainer,
                                { marginTop: 20 },
                                itemContainerStyle,
                            ]}
                        >
                            {dropDownDataList.map(renderItem)}

                            {selectedButton?.type === "Medical" && (
                                <View style={styles.warningContainer}>
                                    <MaterialCommunityIcons
                                        name="alert-circle-outline"
                                        size={24}
                                        color="black"
                                    />
                                    <Text style={styles.warningTitle}>
                                        For Medical/Sick Leave
                                    </Text>
                                    <Text style={styles.warningText}>
                                        Medical Leave requires a doctor's
                                        certificate. Please attach it before
                                        submission to avoid delays.
                                    </Text>
                                </View>
                            )}

                            <Button
                                mode="contained"
                                buttonColor="#2563eb"
                                textColor="white"
                                rippleColor="rgba(0, 0, 0, 0.1)"
                                labelStyle={{ fontSize: 16 }}
                                style={styles.submitButton}
                                contentStyle={{ height: 45 }}
                                uppercase
                                onPress={handleSubmitItem}
                                disabled={selectedButton == null}
                            >
                                OK
                            </Button>
                        </View>
                    </BottomSheetScrollView>
                </View>
            </BottomSheetModal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {},
    title: {
        fontSize: 18,
        fontWeight: "600",
        color: "#333333",
        paddingHorizontal: 20,
    },
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
        paddingHorizontal: 20,
        paddingBottom: 24,
        gap: 14,
        alignItems: "center",
    },
    option: {
        borderWidth: 1,
        borderRadius: 6,
        borderColor: "#ccc",
        justifyContent: "center",
        flexDirection: "row",
    },
    warningContainer: {
        backgroundColor: "#DDFCE0",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        marginVertical: 10,
    },
    warningTitle: {
        fontSize: 16,
        fontWeight: "bold",
    },
    warningText: {
        fontSize: 14,
    },
    submitButton: {
        borderRadius: 100,
        width: "100%",
        marginTop: "auto",
        marginBottom: 50,
    },
});

export default React.memo(LeaveCategoryBottomSheet);
