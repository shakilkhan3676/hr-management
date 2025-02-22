import { View, Alert, Platform } from "react-native";
import React, { useEffect, useState } from "react"; // Add useState
import { useNavigation } from "expo-router";
import { Button, TouchableRipple } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";
import SelectableLeaveCard from "@/components/leave/SelectableLeaveCard";
import WarningModal from "@/components/leave/WarningModal";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";

const select = () => {
    const navigation = useNavigation();
    const [selectedItems, setSelectedItems] = useState(new Set());
    const [isSelectionMode, setIsSelectionMode] = useState(false);
    const [showWarningModal, setShowWarningModal] = useState(false);
    const [pendingNavigation, setPendingNavigation] = useState(null);

    const leaveItems = [{ id: "1" }, { id: "2" }, { id: "3" }];

    // Add navigation listener for back button
    useEffect(() => {
        const unsubscribe = navigation.addListener("beforeRemove", (e) => {
            if (!isSelectionMode) {
                return;
            }

            e.preventDefault();
            setShowWarningModal(true);
            setPendingNavigation(e.data.action);
        });

        return unsubscribe;
    }, [navigation, isSelectionMode]);

    const handleDiscard = () => {
        setSelectedItems(new Set());
        setIsSelectionMode(false);
        setShowWarningModal(false);
        if (pendingNavigation) {
            navigation.dispatch(pendingNavigation);
        }
    };

    const handleCancel = () => {
        setShowWarningModal(false);
        setPendingNavigation(null);
    };

    // Handle long press to start selection mode
    const handleSelect = (itemId) => {
        setSelectedItems((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(itemId)) {
                newSet.delete(itemId);
                // Exit selection mode if no items left
                if (newSet.size === 0) {
                    setIsSelectionMode(false);
                }
            } else {
                newSet.add(itemId);
            }
            return newSet;
        });
    };
    const handleLongPress = (itemId) => {
        if (!isSelectionMode) {
            // Start selection mode if not already in it
            setIsSelectionMode(true);
            setSelectedItems(new Set([itemId]));
        } else {
            // If already in selection mode, just add/remove the item
            handleSelect(itemId);
        }
    };

    // Handle normal press
    const handlePress = (itemId) => {
        if (isSelectionMode) {
            handleSelect(itemId);
        }
    };

    // Handle select all
    const handleSelectAll = () => {
        if (selectedItems.size === leaveItems.length) {
            // If all selected, unselect all
            setSelectedItems(new Set());
            setIsSelectionMode(false);
        } else {
            // Select all
            setIsSelectionMode(true);
            setSelectedItems(new Set(leaveItems.map((item) => item.id)));
        }
    };

    return (
        <>
            <SafeAreaView
                className="flex-1"
                style={{ marginBottom: Platform.OS === "ios" ? 50 : 84 }}
            >
                <Header
                    title={
                        isSelectionMode
                            ? `${selectedItems.size} Selected`
                            : "Select Items"
                    }
                    headerRight={
                        <Button
                            mode="contained"
                            buttonColor="transparent"
                            textColor="black"
                            rippleColor="rgba(0, 0, 0, 0.1)"
                            style={{
                                width: 90,
                                borderRadius: 8,
                                borderWidth: 1,
                                borderColor: "black",
                            }}
                            labelStyle={{
                                fontSize: 13,
                                marginVertical: 6,
                                marginHorizontal: 0,
                                paddingHorizontal: 4,
                            }}
                            onPress={handleSelectAll}
                        >
                            {selectedItems.size === leaveItems.length
                                ? "Unselect All"
                                : "Select All"}
                        </Button>
                    }
                />
                <ScrollView
                    className="px-4"
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{
                        paddingVertical: 16,
                        gap: 16,
                    }}
                >
                    {leaveItems.map((item) => (
                        <TouchableRipple
                            key={item.id}
                            onPress={() => handlePress(item.id)}
                            onLongPress={() => handleLongPress(item.id)}
                            borderless={true}
                            rippleColor={"rgba(0, 0, 0, 0.09)"}
                            style={{ borderRadius: 16 }}
                        >
                            <SelectableLeaveCard
                                isSelected={selectedItems.has(item.id)}
                            />
                        </TouchableRipple>
                    ))}
                </ScrollView>
            </SafeAreaView>

            {/* Bottom Buttons - only show when in selection mode */}
            <View
                className="absolute bottom-0 flex-row items-start justify-center w-full h-24 gap-4 px-4 bg-white"
                style={{
                    shadowColor: "#2563eb",
                    shadowOffset: { width: 0, height: -2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 5,
                    elevation: 10,
                    zIndex: 1,
                }}
            >
                <Button
                    mode="contained"
                    buttonColor="#FE6B87"
                    textColor="white"
                    rippleColor="rgba(0, 0, 0, 0.1)"
                    disabled={selectedItems.size === 0}
                    labelStyle={{
                        fontSize: 12,
                        padding: 2,
                        marginHorizontal: 0,
                    }}
                    style={{
                        borderRadius: 50,
                        width: "48%",
                        marginTop: 16,
                    }}
                    onPress={() => {
                        console.log("Reject", Array.from(selectedItems));
                    }}
                >
                    REJECT SELECTED
                </Button>
                <Button
                    mode="contained"
                    buttonColor="#00B894"
                    textColor="white"
                    rippleColor="rgba(0, 0, 0, 0.1)"
                    disabled={selectedItems.size === 0}
                    labelStyle={{
                        fontSize: 12,
                        padding: 2,
                        marginHorizontal: 0,
                    }}
                    style={{
                        borderRadius: 50,
                        width: "48%",
                        marginTop: 16,
                    }}
                    onPress={() => {
                        console.log("Approve", Array.from(selectedItems));
                    }}
                >
                    APPROVE SELECTED
                </Button>
            </View>

            <WarningModal
                visible={showWarningModal}
                onCancel={handleCancel}
                onDiscard={handleDiscard}
            />
        </>
    );
};

export default select;
