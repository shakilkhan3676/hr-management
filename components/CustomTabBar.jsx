import { View, Text, StyleSheet, Platform } from "react-native";
import { useRouter, useSegments } from "expo-router";
import HomeIcon from "@/assets/icons/home.svg";
import LeaveIcon from "@/assets/icons/time.svg";
import ApplicationIcon from "@/assets/icons/setting.svg";
import AIicon from "@/assets/icons/ai.svg";
import { HapticTab } from "@/components/HapticTab";

export default function CustomTabBar() {
    const router = useRouter();
    const segments = useSegments();

    const tabs = [
        {
            route: "(home)",
            icon: <HomeIcon width={24} height={24} />,
            label: "Home",
        },
        {
            route: "(leave)",
            icon: <LeaveIcon width={24} height={24} />,
            label: "Leave",
        },
        {
            route: "(applications)",
            icon: <ApplicationIcon width={24} height={24} />,
            label: "Apps",
        },
        {
            route: "(ai)",
            icon: <AIicon width={24} height={24} />,
            label: "Daffodil AI",
        },
    ];

    return (
        <View style={styles.tabBar}>
            {tabs.map((tab) => {
                const isActive = segments.includes(tab.route);

                return (
                    <HapticTab
                        key={tab.route}
                        style={[styles.tabButton, isActive && styles.activeTab]}
                        onPress={() => router.push(`/${tab.route}`)}
                    >
                        {tab.icon}
                        <Text
                            style={[
                                styles.label,
                                isActive && styles.activeLabel,
                            ]}
                        >
                            {tab.label}
                        </Text>
                    </HapticTab>
                );
            })}
        </View>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "baseline",
        height: Platform.OS === "ios" ? 75 : 60,
        backgroundColor: "#fff",
        borderTopWidth: 0.5,
        borderColor: "#ddd",
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
    },
    tabButton: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
        // backgroundColor: "#f0f0f0",
        paddingVertical: 8.5,
    },
    activeTab: {
        // backgroundColor: "#f0f0f0",
        // borderRadius: 10,
    },
    label: {
        fontSize: 12,
        color: "#6b7280",
        marginTop: 2,
        fontWeight: "600",
    },
    activeLabel: {
        color: "#4b5563",
        fontWeight: "bold",
    },
});
