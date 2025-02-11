import React, { useRef, useCallback, useState } from "react";
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
                snapPoints={["50%", "60%"]}
                dismissOnPanDown={false}
                dismissOnBackdropPress={true}
                onDismiss={handleModalClose}
                backdropComponent={renderBackdrop}
            >
                <View style={styles.modalContainer}>
                    {title && <Text style={styles.title}>{title}</Text>}

                    <BottomSheetScrollView
                        contentContainerStyle={[
                            styles.scrollContent,
                            { marginTop: 20 },
                            itemContainerStyle,
                        ]}
                        keyboardShouldPersistTaps="handled"
                    >
                        {dropDownDataList.map(renderItem)}

                        {selectedButton?.type === "Medical" && (
                            <View className="bg-[#DDFCE0] py-3 px-5 w-full gap-1 rounded-xl">
                                <MaterialCommunityIcons
                                    name="alert-circle-outline"
                                    size={24}
                                    color="black"
                                />
                                <Text className="text-lg font-bold">
                                    For Medical/Sick Leave
                                </Text>
                                <Text className="text-sm">
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
                            labelStyle={{
                                fontSize: 16,
                            }}
                            style={{
                                borderRadius: 100,
                                width: "100%",
                                marginVertical: 12,
                            }}
                            contentStyle={{
                                height: 45,
                            }}
                            uppercase
                            onPress={handleSubmitItem}
                            disabled={selectedButton == null}
                        >
                            OK
                        </Button>
                    </BottomSheetScrollView>
                </View>
            </BottomSheetModal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // paddingVertical: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: "600",
        color: "#333333",
        paddingHorizontal: 20,
    },
    dropdownButton: {
        paddingHorizontal: 12,
        paddingVertical: 12,
        borderWidth: 0.4,
        borderRadius: 5,
        backgroundColor: "#F1F3F7",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    dropdownText: {
        color: "#686868",
        fontWeight: "400",
        fontSize: 13,
        maxWidth: "98%",
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContainer: {
        flex: 1,
        // width: "100%",
    },
    scrollContent: {
        flex: 1,
        marginHorizontal: 20,
        gap: 14,
    },
    option: {
        // marginBottom: 12,
        // padding: 8,
        // paddingHorizontal: 16,
        borderWidth: 1,
        borderRadius: 6,
        borderColor: "#ccc",
        justifyContent: "center",
        flexDirection: "row",
    },
    optionText: {
        color: "#333333",
        fontSize: 16,
        fontWeight: "400",
    },
    noResults: {
        marginVertical: 10,
        alignItems: "center",
    },
    noResultsText: {
        color: "gray",
    },
});

export default React.memo(LeaveCategoryBottomSheet);
