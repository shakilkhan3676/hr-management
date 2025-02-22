import React from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Platform,
    Touchable,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { TouchableRipple } from "react-native-paper";

const Header = ({
    title,
    headerLeft,
    headerRight,
    onBackPress,
    showBack = true,
}) => {
    const insets = useSafeAreaInsets();
    const router = useRouter();

    const handleBack = () => {
        if (onBackPress) {
            onBackPress();
        } else {
            router.canGoBack() && router.back();
        }
    };

    return (
        <View style={[styles.container]}>
            <View style={styles.header}>
                <View style={styles.leftContainer}>
                    {showBack && (
                        <TouchableRipple
                            onPress={handleBack}
                            style={styles.backButton}
                            borderless={true}
                        >
                            <Ionicons
                                name="chevron-back"
                                size={24}
                                color="#171621"
                            />
                        </TouchableRipple>
                    )}
                    {headerLeft}
                </View>

                <Text style={styles.title} numberOfLines={1}>
                    {title}
                </Text>

                <View style={styles.rightContainer}>{headerRight}</View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // backgroundColor: "#fff",
        // borderBottomWidth: 1,
        // borderBottomColor: "#e5e7eb",
    },
    header: {
        minHeight: 44,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    leftContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    rightContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    backButton: {
        padding: 4,
        borderRadius: 100,
        borderWidth: 1.5,
        borderColor: "#DADDDD",
    },
    title: {
        flex: 2,
        fontSize: 20,
        fontWeight: "500",
        textAlign: "center",
        color: "#000",
    },
});

export default Header;
