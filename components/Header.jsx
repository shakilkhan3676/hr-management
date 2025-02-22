import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { TouchableRipple } from "react-native-paper";
import BellIcon from "@/assets/icons/bell-linear.svg";

const Header = ({
    title,
    headerLeft,
    headerRight,
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
        <View style={[styles.container]}>
            <View style={styles.header}>
                <View style={styles.leftContainer}>
                    {headerLeft
                        ? headerLeft
                        : showBack && (
                              <TouchableRipple
                                  onPress={handleBack}
                                  borderless={true}
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

                <Text style={styles.title} numberOfLines={1}>
                    {title}
                </Text>

                <View style={styles.rightContainer}>
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
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        // backgroundColor: "#fff",
        // borderBottomWidth: 1,
        // borderBottomColor: "#e5e7eb",
        bottom: Platform.OS === "ios" ? 6 : 0,
    },
    header: {
        minHeight: 44,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 16,
        paddingVertical: Platform.OS === "ios" ? 4 : 4,
        marginBottom: Platform.OS === "ios" ? 4 : 12,
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
        fontSize: 20,
        fontWeight: "500",
        textAlign: "center",
        color: "#000",
    },
});

export default Header;
