import React, { memo, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { MaterialIcons, Feather, AntDesign } from "@expo/vector-icons";

const data = [
    {
        icon: <MaterialIcons name="check" size={24} color="#4b5563" />,
        label: "Approved",
        value: "1",
    },
    {
        icon: <MaterialIcons name="clear" size={24} color="#4b5563" />,
        label: "Rejected",
        value: "2",
    },
    {
        icon: <Feather name="users" size={24} color="#4b5563" />,
        label: "All",
        value: "3",
    },
];

const DropdownComponent = () => {
    const [value, setValue] = useState("3");

    const renderItem = (item) => {
        return (
            <View style={styles.item}>
                {item.icon}
                <Text style={styles.textItem}>{item.label}</Text>
                {item.value === value && (
                    <AntDesign color="green" name="Safety" size={20} />
                )}
            </View>
        );
    };

    return (
        <Dropdown
            style={[
                styles.dropdown,
                value === "1" && styles.approvedSelected,
                value === "2" && styles.rejectedSelected,
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={[
                styles.selectedTextStyle,
                value === "1" && styles.approvedSelected,
                value === "2" && styles.rejectedSelected,
            ]}
            renderLeftIcon={() =>
                value === "1" && (
                    <MaterialIcons name="check" size={20} color="white" />
                )
            }
            iconColor={value === "1" || value === "2" ? "#fff" : "#4b5563"}
            data={data}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="All"
            value={value}
            onChange={(item) => {
                setValue(item.value);
            }}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
            containerStyle={{
                width: 200,
                top: 8,
                borderRadius: 5,
                overflow: "hidden",
            }}
            activeColor="#f3f4f6"
        />
    );
};

export default memo(DropdownComponent);

const styles = StyleSheet.create({
    dropdown: {
        height: 35,
        width: 135,
        backgroundColor: "#E3E5E4",
        borderWidth: 1,
        borderColor: "#d1d5db",
        borderRadius: 50,
        padding: 14,
    },
    approvedSelected: {
        backgroundColor: "#8097B0",
        borderColor: "#8097B0",
        color: "#fff",
    },
    rejectedSelected: {
        backgroundColor: "#f43f5e",
        borderColor: "#f43f5e",
        color: "#fff",
    },
    item: {
        padding: 12,
        paddingHorizontal: 16,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 12,
    },
    textItem: {
        flex: 1,
        fontSize: 16,
        color: "#4b5563",
    },
    placeholderStyle: {
        fontSize: 16,
        textAlign: "center",
        color: "#4b5563",
    },
    selectedTextStyle: {
        fontSize: 14,
        color: "#4b5563",
        textAlign: "center",
    },
});
