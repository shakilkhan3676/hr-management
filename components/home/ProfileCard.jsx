import React from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import QRCode from "react-native-qrcode-svg";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { Button } from "react-native-paper";

const ProfileCard = () => {
    return (
        <View style={styles.container}>
            <View style={styles.card}>
                {/* Base white overlay gradient */}
                <LinearGradient
                    colors={[
                        "rgba(130, 189, 247, 0.30)",
                        "rgba(255, 255, 255, 0.50)",
                    ]}
                    style={styles.background}
                />
                {/* Radial-like gradient */}
                <LinearGradient
                    colors={[
                        "rgba(130, 189, 247, 0.80)",
                        "rgba(130, 189, 247, 0.30)",
                        "rgba(255, 255, 255, 0.50)",
                    ]}
                    locations={[0, 0.31, 0.855]}
                    start={{ x: 1, y: -0.0957 }}
                    end={{ x: 0, y: 1 }}
                    style={styles.background}
                />

                {/* Content */}
                <View style={styles.header}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.roleText}>Asst. Admin Officer</Text>
                        <Text style={styles.titleText}>Admission Office</Text>
                        <Text style={styles.subtitleText}>Full Time</Text>
                        <Text style={styles.descriptionText}>
                            Dept: Student Administration
                        </Text>
                        <Text style={styles.dateText}>
                            Joining Date: 12-2-2020
                        </Text>
                        <Text style={styles.timeText}>6y -1m -12d</Text>
                    </View>
                </View>

                <View style={styles.qrContainer}>
                    <Button
                        icon={() => (
                            <MaterialCommunityIcons
                                name="pencil-outline"
                                size={14}
                                color="white"
                            />
                        )}
                        mode="contained"
                        buttonColor="#8097B0"
                        textColor="white"
                        rippleColor="rgba(0, 0, 0, 0.1)"
                        labelStyle={{
                            fontSize: 11,
                            marginVertical: 0, // Add this to remove vertical spacing
                            paddingVertical: 4,
                        }}
                        onPress={() => {}}
                    >
                        Update Profile
                    </Button>

                    <View style={styles.qrSection}>
                        <Text style={styles.virtualCardText}>
                            <MaterialCommunityIcons
                                name="qrcode-scan"
                                size={12}
                                color="#666"
                            />
                            {"  "}
                            Virtual Card
                        </Text>
                        <QRCode
                            value="your-qr-code-value"
                            size={80}
                            backgroundColor="transparent"
                        />
                    </View>
                </View>
            </View>

            <Button
                mode="contained"
                buttonColor="#ef4444"
                textColor="white"
                rippleColor="rgba(0, 0, 0, 0.1)"
                labelStyle={{ fontSize: 16, padding: 3 }}
                style={{ marginTop: 16, borderRadius: 50 }}
                onPress={() => console.log("Pressed")}
            >
                Tap to Check Out
            </Button>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        marginHorizontal: 16,
    },
    card: {
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 14,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#87E5FF",
        overflow: "hidden",
        position: "relative",
    },
    background: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
    },
    header: {
        flex: 1,
    },
    titleContainer: {
        marginBottom: 16,
    },
    roleText: {
        fontSize: 12,
        color: "#666",
        marginBottom: 4,
    },
    titleText: {
        fontSize: 15,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 8,
    },
    subtitleText: {
        fontSize: 12,
        color: "#333",
        marginBottom: 4,
    },
    descriptionText: {
        fontSize: 12,
        color: "#666",
        marginBottom: 8,
    },
    dateText: {
        fontSize: 12,
        color: "#666",
        marginBottom: 2,
    },
    timeText: {
        fontSize: 12,
        color: "#666",
    },
    updateButton: {
        backgroundColor: "#8097B0",
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 50,
    },
    buttonText: {
        color: "white",
        fontSize: 12,
    },
    qrContainer: {
        justifyContent: "space-between",
    },
    qrSection: {
        alignItems: "flex-end",
    },
    virtualCardText: {
        fontSize: 12,
        color: "#666",
        marginBottom: 6,
    },
});

export default ProfileCard;
