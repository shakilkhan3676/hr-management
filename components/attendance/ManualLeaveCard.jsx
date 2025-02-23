import { View, Text } from "react-native";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Button } from "react-native-paper";
import { Colors } from "@/constants/Colors";
import ManualLeaveEntryCard from "./ManualLeaveEntryCard";

const ManualLeaveCard = ({ approved = false }) => {
    return (
        <View className="flex bg-white rounded-2xl">
            <ManualLeaveEntryCard />
            {approved ? (
                <View className="flex-row items-center justify-between gap-5 p-4 pt-0">
                    <Button
                        mode="contained"
                        buttonColor="#1D1B201F"
                        textColor="#4b5563"
                        rippleColor="rgba(0, 0, 0, 0.1)"
                        icon={() => (
                            <MaterialIcons
                                name="check"
                                size={24}
                                color="#4b5563"
                            />
                        )}
                        labelStyle={{
                            fontSize: 16,
                        }}
                        style={{
                            borderRadius: 100,
                            width: "100%",
                        }}
                        onPress={() => console.log("Pressed")}
                    >
                        Approve
                    </Button>
                </View>
            ) : (
                <View className="flex-row items-center justify-between gap-5 p-4 pt-0">
                    <Button
                        mode="contained"
                        buttonColor={Colors.light.rejectButton}
                        textColor="white"
                        rippleColor="rgba(0, 0, 0, 0.1)"
                        icon={() => (
                            <MaterialIcons
                                name="clear"
                                size={24}
                                color="white"
                            />
                        )}
                        labelStyle={{
                            fontSize: 16,
                        }}
                        style={{
                            borderRadius: 100,
                            width: "40%",
                        }}
                        onPress={() => console.log("Pressed")}
                    >
                        Reject
                    </Button>

                    <Button
                        mode="contained"
                        buttonColor={Colors.light.approveButton}
                        textColor="white"
                        rippleColor="rgba(0, 0, 0, 0.1)"
                        icon={() => (
                            <MaterialIcons
                                name="check"
                                size={24}
                                color="white"
                            />
                        )}
                        labelStyle={{
                            fontSize: 16,
                        }}
                        style={{
                            borderRadius: 100,
                            width: "50%",
                        }}
                        onPress={() => console.log("Pressed")}
                    >
                        Approve
                    </Button>
                </View>
            )}
        </View>
    );
};

export default ManualLeaveCard;
