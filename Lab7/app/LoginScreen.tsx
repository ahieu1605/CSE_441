import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { login } from "../api/kamiApi";

export default function Login() {
    const [phone, setPhone] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    const handleLogin = async () => {
        try {
            const result = await login(phone, password);
            await AsyncStorage.setItem("token", result.token);
            router.replace("/(tabs)/HomeScreen");
        } catch (error) {
            Alert.alert("Login Failed", "Please check your credentials");
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <TextInput
                value={phone}
                onChangeText={setPhone}
                placeholder="Phone"
                style={styles.input}
                keyboardType="phone-pad"
            />
            <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                secureTextEntry
                style={styles.input}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        padding: 48,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 48,
        fontWeight: "bold",
        color: "#EF506B",
        marginBottom: 24,
        marginTop: 72,
    },
    input: {
        borderColor: "#EF506B",
        borderWidth: 1,
        width: "100%",
        marginTop: 12,
        borderRadius: 10,
        paddingLeft: 12,
        paddingVertical: 12,
    },
    button: {
        backgroundColor: "#EF506B",
        borderRadius: 10,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        padding: 12,
        marginTop: 16,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#FFF",
    },
});
