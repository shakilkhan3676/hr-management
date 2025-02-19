import React, { useState, useCallback, useRef } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Modal,
    StyleSheet,
    Pressable,
    Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { TouchableRipple } from "react-native-paper";

const CustomDropdownButton = ({
    buttonStyle,
    containerWidth = 50,
    containerPosition = 0,
    value,
    data,
    onChange,
    buttonText = "Select Option",
    children,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [dropdownLayout, setDropdownLayout] = useState(null);
    const buttonRef = useRef();
    const fadeAnim = useRef(new Animated.Value(0)).current;

    // Get button position
    const measureButton = () => {
        buttonRef.current?.measureInWindow((x, y, width, height) => {
            setDropdownLayout({ x, y, width, height });
        });
    };

    const handleOpen = useCallback(() => {
        measureButton();
        setIsOpen(true);
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
        }).start();
    }, []);

    const handleClose = useCallback(() => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }).start(() => setIsOpen(false));
    }, []);

    const handleSelect = useCallback(
        (item) => {
            onChange(item);
            handleClose();
        },
        [onChange]
    );

    return (
        <View>
            <TouchableRipple
                ref={buttonRef}
                onPress={handleOpen}
                borderless={true}
                style={[styles.button, buttonStyle]}
            >
                {children && React.isValidElement(children) ? (
                    React.cloneElement(children, { onPress: handleOpen })
                ) : (
                    <View style={styles.buttonTextContainer}>
                        <Text style={(styles.buttonText, buttonStyle)}>
                            {data.find((item) => item?.label === value)
                                ?.label || buttonText}
                        </Text>
                        <Ionicons
                            name="chevron-down"
                            size={17}
                            color={buttonStyle?.color || "#4b5563"}
                        />
                    </View>
                )}
            </TouchableRipple>

            {isOpen && dropdownLayout && (
                <Modal
                    transparent
                    visible={isOpen}
                    onRequestClose={handleClose}
                >
                    <Pressable style={styles.overlay} onPress={handleClose}>
                        <Animated.View
                            style={[
                                styles.dropdown,
                                {
                                    top:
                                        dropdownLayout.y +
                                        dropdownLayout.height +
                                        9,
                                    left: dropdownLayout.x - containerPosition,
                                    width:
                                        dropdownLayout.width + containerWidth,
                                    opacity: fadeAnim,
                                    transform: [
                                        {
                                            translateY: fadeAnim.interpolate({
                                                inputRange: [0, 1],
                                                outputRange: [-20, 0],
                                            }),
                                        },
                                    ],
                                },
                            ]}
                        >
                            {data.map((item) => (
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    key={item?.label}
                                    style={[
                                        styles.item,
                                        value === item?.label &&
                                            styles.selectedItem,
                                    ]}
                                    onPress={() => handleSelect(item)}
                                >
                                    {item.icon}
                                    <Text
                                        style={[
                                            styles.itemText,
                                            value === item?.label &&
                                                styles.selectedItemText,
                                        ]}
                                    >
                                        {item.label}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </Animated.View>
                    </Pressable>
                </Modal>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        height: 35,
        width: 120,
        backgroundColor: "#E3E5E4",
        borderWidth: 1,
        borderColor: "#d1d5db",
        borderRadius: 50,
        paddingHorizontal: 14,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonTextContainer: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 10,
    },
    buttonText: {
        // flex: 1,
        fontSize: 14,
        color: "#4b5563",
        textAlign: "center",
    },
    overlay: {
        flex: 1,
        // backgroundColor: "rgba(0,0,0,0.3)",
    },
    dropdown: {
        position: "absolute",
        backgroundColor: "white",
        borderRadius: 6,
        // iOS shadow
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        // Android shadow
        elevation: 2,
        overflow: "hidden",
        // Optional: add a very light border for iOS
        borderWidth: 0.5,
        borderColor: "rgba(0,0,0,0.1)",
    },
    item: {
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        gap: 14,
        borderBottomWidth: 1,
        borderBottomColor: "#f3f4f6",
    },
    selectedItem: {
        backgroundColor: "#f3f4f6",
    },
    itemText: {
        fontSize: 16,
        color: "#4b5563",
        flex: 1,
    },
    selectedItemText: {
        // color: "#2563eb",
        fontWeight: "600",
    },
});

export default CustomDropdownButton;
