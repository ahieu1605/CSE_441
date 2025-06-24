import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function SettingScreen() {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem("token");

            router.replace("/LoginScreen");

            Alert.alert("Logged out", "You have been logged out successfully.");
        } catch (error) {
            Alert.alert("Error", "Logout failed. Please try again.");
            console.error("Logout error:", error);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Setting</Text>
            </View>

            <View style={styles.content}>
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    header: {
        backgroundColor: "#e84c64",
        paddingTop: 48,
        paddingBottom: 16,
        paddingHorizontal: 16,
    },
    headerText: {
        color: "#fff",
        fontSize: 24,
        fontWeight: "bold",
    },
    content: { padding: 16 },
    logoutButton: {
        backgroundColor: "#e84c64",
        paddingVertical: 14,
        borderRadius: 12,
        alignItems: "center",
    },
    logoutText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
});
