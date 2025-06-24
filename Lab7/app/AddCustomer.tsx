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
import { addCustomer } from "../api/kamiApi";

export default function AddCustomer() {
    const [customerName, setCustomerName] = useState("");
    const [phone, setPhone] = useState("0");
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
                <TouchableOpacity
                    onPress={() => router.replace("/(tabs)/CustomerScreen")}
                >
                    <MaterialIcons name="arrow-back" size={28} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Customer</Text>
            </View>
            <View style={styles.container}>
                <Text style={styles.labelText}>
                    Customer name <Text style={{ color: "red" }}>*</Text>
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Input a customer name"
                    placeholderTextColor="#bdbdbd"
                    value={customerName}
                    onChangeText={(text) => setCustomerName(text)}
                />
                <Text style={styles.labelText}>
                    Phone <Text style={{ color: "red" }}>*</Text>
                </Text>
                <TextInput
                    style={styles.input}
                    placeholder="0"
                    placeholderTextColor="#bdbdbd"
                    value={phone}
                    onChangeText={(text) => setPhone(text)}
                    keyboardType="numeric"
                />
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        if (customerName === "") {
                            Alert.alert("Please input the name");
                        } else {
                            addCustomer(customerName, phone).then((rp) => {
                                console.log(rp);
                                if (!rp) {
                                    Alert.alert("Failed", "Adding customer was unsuccessful!");
                                } else {
                                    Alert.alert("Success", "Customer added!", [
                                        {
                                            text: "OK",
                                            onPress: () => router.replace("/(tabs)/CustomerScreen"),
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
        justifyContent: "space-between",
        paddingTop: 40,
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
