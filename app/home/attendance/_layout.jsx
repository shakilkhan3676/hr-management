import { Stack, useRouter } from "expo-router";
import { getScreenOptions } from "@/components/navigationOptions";

export default function AttendanceLayout() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        // headerShown: false,
        ...getScreenOptions(router),
      }}
    >
      <Stack.Screen name="index" options={{ title: "Attendance" }} />
      <Stack.Screen
        name="punchLogs"
        options={{ title: "Punch Logs" }}
      />
      <Stack.Screen name="timeTracking" options={{ title: "Time Tracking" }} />
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
