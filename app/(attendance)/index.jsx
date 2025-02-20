import { View, Text, StyleSheet, Dimensions, ScrollView ,SafeAreaView} from "react-native";
import React from "react";
import { Badge, Button } from "react-native-paper";
import AttendanceCatCard from "../../components/home/AttendanceCatCard";
import clock from "../../assets/AttendaceIocns/clock.svg";
import time from "../../assets/AttendaceIocns/time.svg";
import schedule from "../../assets/AttendaceIocns/schedule.svg";
import absent from "../../assets/AttendaceIocns/absent.svg";
import manual from "../../assets/AttendaceIocns/manual.svg";
const { width } = Dimensions.get("window");
import { router } from "expo-router";
const attendance = () => {
  const [activeButton, setActiveButton] = React.useState("approval");

  const categories = [
    {
      id: 1,
      name: "Punch Logs",
      router: "punchLogs",
      icon: clock,
    },
    {
      id: 2,
      name: "Time Tracking",
      router: "timeTracking",
      icon: time,
    },
    {
      id: 3,
      name: "Schedule",
      router: "schedule",
      icon: schedule,
    },
    {
      id: 4,
      name: "Absent List",
      router: "absentList",
      icon: absent,
    },
    {
      id: 5,
      name: "Manual Attendance",
      router: "manualAttendance",
      icon: manual,
    },
  ];

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={styles.container}>
          <Button
            mode="contained"
            buttonColor={
              activeButton === "approval" ? "#2563eb" : "transparent"
            }
            textColor={activeButton === "approval" ? "white" : "#4b5563"}
            rippleColor="rgba(0, 0, 0, 0.1)"
            labelStyle={{
              fontSize: 16,
            }}
            style={{
              borderRadius: 50,
              width: "50%",
            }}
            icon={() => <Badge size={22}>4</Badge>}
            contentStyle={{
              flexDirection: "row-reverse", // This will put the badge after the text
            }}
            onPress={() => setActiveButton("approval")}
          >
            Approval
          </Button>

          <Button
            mode="contained"
            buttonColor={activeButton === "request" ? "#2563eb" : "transparent"}
            textColor={activeButton === "request" ? "white" : "#4b5563"}
            rippleColor="rgba(0, 0, 0, 0.1)"
            labelStyle={{
              fontSize: 16,
            }}
            style={{
              borderRadius: 50,
              width: "50%",
            }}
            onPress={() => setActiveButton("request")}
          >
            My Attendace
          </Button>
        </View>

        {/* Category Section */}
        <View className="flex-row flex-wrap gap-4 mx-4 pt-3">
          {categories?.map((category) => (
            <AttendanceCatCard
              key={category.id}
              category={category}
              width={width}
              onPress={() => {
                router.push(category.router);
              }}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default attendance;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderColor: "#82BDF7",
    borderWidth: 1,
    borderRadius: 50,
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
});
