import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import LeftIcon from "../../assets/AttendaceIocns/LeftIcon.svg";
import BellIcon from "../../assets/AttendaceIocns/BellIcon.svg";
import { useRouter } from "expo-router";
const AttendanceHeader = ({ pageName, onNotificationPress }) => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        {/* Left Icon */}
        <TouchableOpacity
          style={styles.leftIcon}
          onPress={() => router.canGoBack() && router.back()}
        >
          <LeftIcon />
        </TouchableOpacity>

        {/* Page Name */}
        <View style={styles.center}>
          <Text style={styles.pageName}>{pageName}</Text>
        </View>

        {/* Right Notification Icon */}
        <TouchableOpacity
          style={styles.rightIcon}
          onPress={onNotificationPress}
        >
          <BellIcon />
        </TouchableOpacity>
      </View>
{/* {add code here for monnth picker} */}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#1680E1",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftIcon: {
    flex: 1,
  },
  center: {
    flex: 2,
    alignItems: "center",
  },
  pageName: {
    fontSize: 18,
    fontWeight: "500",
    color: "#fff",
  },
  rightIcon: {
    flex: 1,
    alignItems: "flex-end",
  },
});

export default AttendanceHeader;
