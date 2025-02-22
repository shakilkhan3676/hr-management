import { Stack } from "expo-router";

export default function AttendanceLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Screen name="index" options={{ title: "Attendance" }} />
            <Screen name="punchLogs" options={{ title: "Punch Logs" }} />
            <Screen name="timeTracking" options={{ title: "Time Tracking" }} />
            <Screen name="Schedule" options={{ title: "Schedule" }} />
            <Screen name="absentList" options={{ title: "Absent List" }} />
            <Screen
                name="manualAttendance"
                options={{ title: "Manual Attendance" }}
            />
        </Stack>
    );
}
