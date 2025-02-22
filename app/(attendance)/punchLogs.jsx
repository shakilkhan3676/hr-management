import { View, Text, StatusBar, Button } from "react-native";
import React, { useRef } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AttendanceHeader from "../../components/attendance/AttendanceHeader";

const punchLogs = () => {
    const bottomSheetRef = useRef(null);

    return (
        <SafeAreaView>
            <StatusBar backgroundColor={"#1680E1"} barStyle={"light-content"} />
            <AttendanceHeader pageName="Punch Logs" />
            <Text>punchLogs</Text>
        </SafeAreaView>
    );
};

export default punchLogs;
