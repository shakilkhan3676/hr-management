import { Stack } from "expo-router";

export default function AttendanceLayout() {
    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" options={{ title: "Attendance" }} />
            <Stack.Screen name="punchLogs" options={{ title: "Punch Logs" }} />
            <Stack.Screen
                name="timeTracking"
                options={{ title: "Time Tracking" }}
            />
            <Stack.Screen name="Schedule" options={{ title: "Schedule" }} />
            <Stack.Screen
                name="absentList"
                options={{ title: "Absent List" }}
            />
            <Stack.Screen
                name="manualAttendance"
                options={{ title: "Manual Attendance" }}
            />
        </Stack>
    );
}
