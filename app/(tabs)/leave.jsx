import { View, Text, SafeAreaView, Platform } from "react-native";
import React from "react";
import MyLeave from "../../components/leave/MyLeave";

const leave = () => {
    return (
        <SafeAreaView
            className=""
            style={{ marginTop: Platform.OS === "ios" ? 12 : 0 }}
        >
            <MyLeave />
        </SafeAreaView>
    );
};

export default leave;
