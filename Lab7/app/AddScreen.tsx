import { MaterialIcons } from "@expo/vector-icons";
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
import { addService } from "../api/kamiApi";

export default function AddProduct() {
    const [serviceName, setServiceName] = useState("");
    const [price, setPrice] = useState("0");
    const router = useRouter();

    return (
        <View
            style={{
                backgroundColor: "#fff",
                flex: 1,
                paddingTop: 50,
            }}
        >
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.replace("/(tabs)/HomeScreen")}>
                    <MaterialIcons name="arrow-back" size={28} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Service</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.labelText}>
                    Service name <Text style={{ color: "red" }}>*</Text>
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Input a service name"
                    placeholderTextColor="#bdbdbd"
                    value={serviceName}
                    onChangeText={(text) => setServiceName(text)}
                />
                <Text style={styles.labelText}>
                    Price <Text style={{ color: "red" }}>*</Text>
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="0"
                    placeholderTextColor="#bdbdbd"
                    value={price}
                    onChangeText={(text) => setPrice(text)}
                    keyboardType="numeric"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        if (serviceName === "") {
                            Alert.alert("Please input the name");
                        } else {
                            addService(serviceName, price).then((rp) => {
                                console.log(rp);
                                if (!rp) {
                                    Alert.alert("Failed", "Adding service was unsuccessful!");
                                } else {
                                    Alert.alert("Success", "Service added!", [
                                        {
                                            text: "OK",
                                            onPress: () => router.replace("/(tabs)/HomeScreen"),
                                        },
                                    ]);
                                }
                            });
                        }
                    }}
                >
                    <Text style={styles.buttonText}>Add</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#e84c64",
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 20,
        paddingHorizontal: 16,
        paddingBottom: 12,
    },
    headerTitle: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
        marginLeft: 16,
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
    },
    container: {
        paddingVertical: 5,
        paddingHorizontal: 10,
    },
    textInfo: {
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
    },
    textNormal: {
        fontSize: 16,
    },
    labelText: {
        fontWeight: "bold",
        marginBottom: 4,
        marginTop: 12,
    },
    input: {
        backgroundColor: "#f5f5fa",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 14,
        fontSize: 16,
        marginBottom: 8,
    },
    button: {
        backgroundColor: "#f45b6a",
        borderRadius: 8,
        paddingVertical: 14,
        alignItems: "center",
        marginTop: 20,
    },
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 18,
    },
});
