import { Tabs } from "expo-router";
import React from "react";
import { Platform, useColorScheme } from "react-native";
import HomeIcon from "@/assets/icons/home.svg";
import LeaveIcon from "@/assets/icons/time.svg";
import ApplicationIcon from "@/assets/icons/setting.svg";
import NotificationIcon from "@/assets/icons/notification.svg";

import { HapticTab } from "@/components/HapticTab";
import { Colors } from "@/constants/Colors";

export default function TabLayout() {
    const colorScheme = useColorScheme();

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
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: "Home",
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
