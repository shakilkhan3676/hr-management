import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { TouchableRipple } from "react-native-paper";

const CategoryCard = React.memo(({ category, width, onPress }) => (
    <View style={[styles.cardContainer, { width: width / 2 - 21 }]}>
        <TouchableRipple
            onPress={onPress}
            rippleColor="rgba(0, 0, 0, 0.1)"
            style={styles.rippleContainer}
        >
            <View className="gap-4">
                <View className="flex items-center justify-center w-12 h-12 p-2 bg-blue-100 rounded-full">
                    <category.icon />
                </View>
                <Text className="text-lg">{category.name}</Text>
            </View>
        </TouchableRipple>
    </View>
));

const styles = StyleSheet.create({
    cardContainer: {
        borderRadius: 12,
        overflow: "hidden",
    },
    rippleContainer: {
        backgroundColor: "white",
        padding: 16,
    },
});

export default CategoryCard;
