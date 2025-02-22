import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { TouchableRipple } from "react-native-paper";
import BellIcon from "@/assets/icons/bell-linear.svg";

const Header = ({
    title,
    titleStyle,
    headerLeft,
    leftContainerStyle,
    backButtonStyle,
    headerRight,
    rightContainerStyle,
    headerContainerStyle,
    onBackPress,
    showBack = true,
}) => {
    const router = useRouter();

    const handleBack = () => {
        if (onBackPress) {
            onBackPress();
        } else {
            router.canGoBack() && router.back();
        }
    };

    return (
        <View style={[styles.container, headerContainerStyle]}>
            <View style={[styles.leftContainer, leftContainerStyle]}>
                {headerLeft
                    ? headerLeft
                    : showBack && (
                          <TouchableRipple
                              onPress={handleBack}
                              borderless={true}
                              style={backButtonStyle}
                              className="p-1.5 border border-gray-300 rounded-full w-11 h-11"
                          >
                              <Ionicons
                                  name="chevron-back"
                                  size={25}
                                  color="#171621"
                              />
                          </TouchableRipple>
                      )}
            </View>

            <Text style={[styles.title, titleStyle]} numberOfLines={1}>
                {title}
            </Text>

            <View style={[styles.rightContainer, rightContainerStyle]}>
                {headerRight ? (
                    headerRight
                ) : (
                    <TouchableRipple
                        onPress={() => router.push("notifications")}
                        borderless={true}
                        className="flex items-center justify-center bg-white border border-gray-300 rounded-full w-11 h-11"
                    >
                        <View className="flex items-center justify-center">
                            <BellIcon />
                            <View className="absolute top-0 right-0 w-3 h-3 bg-red-500 border-2 border-white rounded-full" />
                        </View>
                    </TouchableRipple>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        minHeight: 44,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: Platform.OS === "ios" ? 4 : 4,
        marginBottom: Platform.OS === "ios" ? 4 : 12,
        bottom: Platform.OS === "ios" ? 6 : 0,
    },
    leftContainer: {
        // flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },
    rightContainer: {
        // flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    title: {
        // flex: 2,
        fontSize: 18,
        fontWeight: "500",
        textAlign: "center",
        color: "#000",
    },
});

export default Header;
