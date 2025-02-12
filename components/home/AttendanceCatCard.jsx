import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableRipple } from "react-native-paper";

const AttendanceCatCard = React.memo(({ category, width, onPress }) => (
    <View style={[styles.cardContainer, { width: width / 2 - 21 }]}>
        <TouchableRipple
            onPress={onPress}
            rippleColor="rgba(0, 0, 0, 0.1)"
            style={styles.rippleContainer}
        >
            <View className="gap-4">
                <View style={styles.IconContainer}>
                    <category.icon />
                </View>
                <Text className="text-lg ">{category?.name}</Text>
            </View>
        </TouchableRipple>
    </View>
));

const styles = StyleSheet.create({
    cardContainer: {
        borderRadius: 20,
        marginTop:10,
        overflow: "hidden",
    },
    rippleContainer: {
        backgroundColor: "white",
        padding: 16,
    },
    IconContainer: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 48, // 12 * 4 (since Tailwind uses 4px scale)
        height: 48, // 12 * 4
        padding: 8, // 2 * 4
        backgroundColor: "#F1F7FE",
        borderRadius: 24, // Half of width/height for a full circle
      },
});

export default AttendanceCatCard;
