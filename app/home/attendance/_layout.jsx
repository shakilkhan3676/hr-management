import { Stack, useRouter } from "expo-router";
import { getScreenOptions } from "@/components/navigationOptions";

export default function AttendanceLayout() {
  const router = useRouter();

  const screens = [
    { name: "index", title: "Attendance" },
    { name: "punchLogs", title: "Punch Logs" },
    { name: "timeTracking", title: "Time Tracking" },
    { name: "Schedule", title: "Schedule" },
    { name: "absentList", title: "Absent List" },
    { name: "manualAttendance", title: "Manual Attendance" },
  ];

  return (
    <Stack
      screenOptions={{
        // headerShown: false,
        ...getScreenOptions(router),
      }}
    >
      {screens.map((screen) => (
        <Stack.Screen
          key={screen.name}
          name={screen.name}
          options={{ title: screen.title }}
        />
      ))}
    </Stack>
  );
}