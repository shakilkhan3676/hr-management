import { Tabs, useRouter } from "expo-router";
import React from "react";
import { Platform, useColorScheme, View } from "react-native";
import HomeIcon from "@/assets/icons/home.svg";
import LeaveIcon from "@/assets/icons/time.svg";
import ApplicationIcon from "@/assets/icons/setting.svg";
import AIicon from "@/assets/icons/ai.svg";
import {
    getScreenOptions,
    HeaderProfileOptions,
} from "@/components/navigationOptions";
import { HapticTab } from "@/components/HapticTab";
import { Colors } from "@/constants/Colors";

export default function TabLayout() {
    const colorScheme = useColorScheme();
    const router = useRouter();

    return (
        <Tabs
            screenOptions={{
                headerShown: true,
                ...getScreenOptions(router),
                headerLeftContainerStyle: {
                    paddingLeft: 16,
                },
                headerRightContainerStyle: {
                    paddingRight: 16,
                },
                tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
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
                    headerTitleStyle: { display: "none" },
                    headerLeft: () => <HeaderProfileOptions router={router} />,
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
                name="ai"
                options={{
                    title: "Daffodil AI",
                    tabBarIcon: () => <AIicon name="ai.fill" />,
                    tabBarStyle: {
                        display: "none",
                    },
                }}
            />
        </Tabs>
    );
}
