import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { getServiceById, updateService } from "../api/kamiApi";

export default function EditService() {
    const router = useRouter();
    const { id } = useLocalSearchParams();

    const [serviceName, setServiceName] = useState("");
    const [price, setPrice] = useState("0");

    useEffect(() => {
        if (id) {
            getServiceById(id as string)
                .then((res) => {
                    setServiceName(res.name);
                    setPrice(res.price.toString());
                })
                .catch((err) => console.error("Error fetching service:", err));
        }
    }, [id]);

    const handleUpdate = () => {
        if (!serviceName.trim()) {
            Alert.alert("Validation", "Please input the service name.");
            return;
        }

        updateService(id.toString(), serviceName, price)
            .then((rp) => {
                if (!rp) {
                    Alert.alert("Failed", "Service update was unsuccessful!");
                } else {
                    Alert.alert("Success", "Service updated!", [
                        {
                            text: "OK",
                            onPress: () => router.replace("/(tabs)/HomeScreen"),
                        },
                    ]);
                }
            })
            .catch((err) => {
                console.error(err);
                Alert.alert("Error", "Something went wrong!");
            });
    };

    return (
        <View style={{ backgroundColor: "#fff", flex: 1, paddingTop: 50 }}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.replace("/(tabs)/HomeScreen")}>
                    <MaterialIcons name="arrow-back" size={28} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Edit Service</Text>
            </View>

            {/* Form */}
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

                <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                    <Text style={styles.buttonText}>Update</Text>
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
