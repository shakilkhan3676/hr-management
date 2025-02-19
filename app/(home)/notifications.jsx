import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { Button } from "react-native-paper";

const notifications = () => {
    return (
        <>
            <Stack.Screen
                options={{
                    title: "Notification (4)",
                    headerRight: () => (
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
                    ),
                }}
            />
            <View>
                <Text>notifications</Text>
            </View>
        </>
    );
};

export default notifications;
