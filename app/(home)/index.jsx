import React from "react";
import { Colors } from "@/constants/Colors";
import {
    Text,
    View,
    Platform,
    ScrollView,
    Dimensions,
    Image,
} from "react-native";
import ProfileCard from "@/components/home/ProfileCard";
import CategoryCard from "@/components/home/CategoryCard";
import ArrowIcon from "@/assets/icons/arrow-half-circle.svg";
import LeaveIcon from "@/assets/icons/calendar-clock.svg";
import EmployeeIcon from "@/assets/icons/briefcase.svg";
import AttendanceIcon from "@/assets/icons/clock.svg";
import PaySlipIcon from "@/assets/icons/wallet-arrow.svg";
import { router } from "expo-router";
import CustomTabBar from "@/components/CustomTabBar";
import Header from "@/components/Header";
import { HeaderProfileOptions } from "@/components/navigationOptions";
import { TouchableRipple } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

export default function Index() {
    const categories = [
        {
            id: 1,
            name: "Leave",
            router: "(leave)",
            icon: LeaveIcon,
        },
        {
            id: 2,
            name: "Attendance",
            router: "(attendance)",
            icon: AttendanceIcon,
        },
        {
            id: 3,
            name: "Employee visit",
            router: "employeeVisit",
            icon: EmployeeIcon,
        },
        {
            id: 4,
            name: "Pay Slip",
            router: "paySlip",
            icon: PaySlipIcon,
        },
    ];

    return (
        <SafeAreaView
            className={`flex-1 bg-[${Colors.light.background}]`}
            style={{ flex: 1 }}
        >
            <Header
                headerLeft={
                    <>
                        <TouchableRipple
                            activeOpacity={0.6}
                            onPress={() => console.log("Pressed")}
                            borderless={true}
                            className="flex items-center justify-center mr-3 border border-gray-300 rounded-full w-14 h-14"
                        >
                            <Image
                                source={require("@/assets/images/profile.jpeg")}
                                className="w-full h-full rounded-full"
                                style={{ objectFit: "cover" }}
                            />
                        </TouchableRipple>
                        <View className="w-200">
                            <Text className="font-semibold">710003676</Text>
                            <Text className="text-lg font-bold">
                                Md Shakil Khan
                            </Text>
                        </View>
                    </>
                }
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ gap: 16, paddingBottom: 80 }} // Add padding bottom for tab bar
            >
                <ProfileCard />

                {/* History */}
                <View className="p-4 mx-4 bg-white rounded-xl">
                    <View className="flex-row items-center gap-3">
                        <ArrowIcon />
                        <Text className="text-black ">Punch in at</Text>
                    </View>
                    <View className="mt-2 ">
                        <Text className="text-lg font-semibold">
                            07:33 AM |
                            <Text className="text-sm text-gray-500">
                                {" "}
                                Wed, 11th Mar, 2020
                            </Text>
                        </Text>
                        <Text className="text-sm text-gray-500">
                            Today's Time: 04:33hr
                        </Text>
                    </View>
                </View>

                {/* Category Section */}
                <View className="flex-row flex-wrap gap-4 mx-4">
                    {categories.map((category) => (
                        <CategoryCard
                            key={category.id}
                            category={category}
                            width={width}
                            onPress={() => {
                                console.log("Pressed", category.name);
                                router.push(category.router);
                            }}
                        />
                    ))}
                </View>
            </ScrollView>

            {/* Custom Tab Bar at the Bottom */}
            <CustomTabBar />
        </SafeAreaView>
    );
}
