import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { Button } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "@/components/Header";

const notifications = () => {
    return (
        <SafeAreaView className="flex-1">
            <Header
                title="Notification (4)"
                headerRight={
                    <Button
                        mode="contained"
                        buttonColor="transparent"
                        textColor="black"
                        rippleColor="rgba(0, 0, 0, 0.1)"
                        style={{
                            width: 75,
                            borderRadius: 8,
                            borderWidth: 1,
                            borderColor: "black",
                        }}
                        labelStyle={{
                            fontSize: 13,
                            marginVertical: 6,
                            marginHorizontal: 0,
                        }}
                        onPress={() => console.log("Pressed")}
                    >
                        Clear All
                    </Button>
                }
            />
            <View>
                <Text>notifications</Text>
            </View>
        </SafeAreaView>
    );
};

export default notifications;
