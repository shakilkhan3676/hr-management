import { Tabs, useRouter } from "expo-router";
import React from "react";
import { Platform, TouchableOpacity, useColorScheme, View } from "react-native";
import HomeIcon from "@/assets/icons/home.svg";
import LeaveIcon from "@/assets/icons/time.svg";
import ApplicationIcon from "@/assets/icons/setting.svg";
import NotificationIcon from "@/assets/icons/notification.svg";
import BellIcon from "@/assets/icons/bell-linear.svg";
import Ionicons from "@expo/vector-icons/Ionicons";

import { HapticTab } from "@/components/HapticTab";
import { Colors } from "@/constants/Colors";

export default function TabLayout() {
    const colorScheme = useColorScheme();
    const router = useRouter();

    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
                headerShown: true,
                tabBarButton: HapticTab,
                tabBarStyle: Platform.select({
                    ios: {
                        // Use a transparent background on iOS to show the blur effect
                        position: "absolute",
                    },
                    default: {
                        height: 60,
                    },
                }),
                tabBarLabelStyle: {
                    fontSize: 12,
                    paddingTop: 2,
                    color: Colors[colorScheme ?? "light"].text,
                },
                headerTitleAlign: "center",
                headerStyle: {
                    backgroundColor: Colors[colorScheme ?? "light"].background,
                },
                headerShadowVisible: false,

                // headerSearchBarOptions: {
                //     showCancelButton: true,
                //     cancelButtonColor: Colors[colorScheme ?? "light"].text,
                //     cancelButtonTextColor: Colors[colorScheme ?? "light"].text,
                // },

                headerLeft: () => (
                    <TouchableOpacity
                        onPress={() => router.canGoBack() && router.back()}
                        activeOpacity={0.6}
                        style={{ justifyContent: "center" }}
                        className="flex items-center justify-center w-10 h-10 p-1 ml-4 border border-gray-300 rounded-full"
                    >
                        <Ionicons
                            name="chevron-back"
                            size={22}
                            color="#171621"
                        />
                    </TouchableOpacity>
                ),
                headerRight: () => (
                    <TouchableOpacity
                        // onPress={() => router.canGoBack() && router.back()}
                        activeOpacity={0.6}
                        style={{ justifyContent: "center" }}
                        className="flex items-center justify-center w-10 h-10 p-1 mr-4 border border-gray-300 rounded-full bg-whit"
                    >
                        <BellIcon />
                        <View className="absolute w-3 h-3 bg-red-500 border-2 border-white rounded-full top-2 right-2" />
                    </TouchableOpacity>
                ),
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
                    headerShown: false,
                    tabBarIcon: () => <HomeIcon name="house.fill" />,
                }}
            />
            <Tabs.Screen
                name="leave"
                options={{
                    title: "Leave",
                    tabBarIcon: () => <LeaveIcon name="leave.fill" />,
                    tabBarStyle: {
                        display: "none",
                    },
                }}
            />
            <Tabs.Screen
                name="applications"
                options={{
                    title: "Applications",
                    tabBarIcon: () => (
                        <ApplicationIcon name="applications.fill" />
                    ),
                    tabBarStyle: {
                        display: "none",
                    },
                }}
            />
            <Tabs.Screen
                name="notification"
                options={{
                    title: "Notification",
                    tabBarIcon: () => (
                        <NotificationIcon name="notification.fill" />
                    ),
                    tabBarStyle: {
                        display: "none",
                    },
                }}
            />
        </Tabs>
    );
}
