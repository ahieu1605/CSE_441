import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Dropdown } from "react-native-element-dropdown";
import {
    getCustomers,
    getServices,
    getUsers,
    postTransaction,
} from "../api/kamiApi";
import {
    Customer,
    SelectedService,
    Service,
    User,
} from "../interface/interface";

export default function AddTransactionScreen() {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [services, setServices] = useState<Service[]>([]);
    const [executors, setExecutors] = useState<User[]>([]);

    const [selectedServices, setSelectedServices] = useState<
        Record<string, SelectedService>
    >({});
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const cs = await getCustomers();
            const sv = await getServices();
            const us = await getUsers();
            setCustomers(cs);
            setServices(sv);
            setExecutors(us);
        };
        fetchData();
    }, []);

    const handleCheckboxChange = (service: Service) => {
        setSelectedServices((prev) => {
            const updated = { ...prev };
            if (updated[service._id]) {
                delete updated[service._id];
            } else {
                updated[service._id] = {
                    ...service,
                    quantity: 1,
                    userID: "",
                };
            }
            return updated;
        });
    };

    const handleQuantityChange = (id: string | number, type: string) => {
        setSelectedServices((prev) => {
            const updated = { ...prev };
            if (updated[id]) {
                updated[id].quantity = Math.max(
                    1,
                    updated[id].quantity + (type === "inc" ? 1 : -1)
                );
            }
            return updated;
        });
    };

    const handlePostTransaction = () => {
        if (!selectedCustomer) {
            Alert.alert("Warning", "Vui lòng chọn khách hàng.");
            return;
        }
        if (Object.keys(selectedServices).length === 0) {
            Alert.alert("Warning", "Vui lòng chọn ít nhất 1 dịch vụ.");
            return;
        }

        const servicesWithoutExecutor = Object.values(selectedServices).filter(
            (item) => !item.userID || item.userID.trim() === ""
        );

        if (servicesWithoutExecutor.length > 0) {
            Alert.alert(
                "Warning",
                "Vui lòng chọn người thực hiện cho tất cả dịch vụ."
            );
            return;
        }
        const servicesPayload = Object.values(selectedServices).map((item) => ({
            _id: item._id,
            quantity: item.quantity,
            userID: item.userID,
        }));

        postTransaction(selectedCustomer, servicesPayload)
            .then((res) => {
                Alert.alert("Success", "Tạo giao dịch thành công!", [
                    {
                        text: "OK",
                        onPress: () => router.back(),
                    },
                ]);
            })
            .catch((error) => {
                if (error.response) {
                    console.error("Server response error data:", error.response.data);
                    const status = error.response.status;
                    const message = error.response.data?.message || "Lỗi từ server";
                    Alert.alert(`Error ${status}`, message);
                } else if (error.request) {
                    Alert.alert("Network error", "Không nhận được phản hồi từ server");
                } else {
                    Alert.alert("Error", error.message || "Lỗi không xác định");
                }
                console.error("postTransaction error:", error);
            });
    };

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => router.replace("/(tabs)/TransactionScreen")}
                >
                    <MaterialIcons name="arrow-back" size={28} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Add Transaction</Text>
            </View>
            <Text style={styles.label}>Customer *</Text>
            <Dropdown
                data={customers.map((c) => ({ label: c.name, value: c._id }))}
                labelField="label"
                valueField="value"
                placeholder="Select customer"
                value={selectedCustomer}
                onChange={(item) => setSelectedCustomer(item.value)}
                style={styles.dropdown}
            />

            <FlatList
                contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
                data={services}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={styles.serviceRow}>
                        <BouncyCheckbox
                            isChecked={!!selectedServices[item._id]}
                            onPress={() => handleCheckboxChange(item)}
                            fillColor="tomato"
                            unFillColor="#fff"
                        />
                        <Text>{item.name}</Text>

                        {selectedServices[item._id] && (
                            <View style={styles.controlGroup}>
                                <TouchableOpacity
                                    onPress={() => handleQuantityChange(item._id, "dec")}
                                >
                                    <Text>-</Text>
                                </TouchableOpacity>
                                <Text>{selectedServices[item._id].quantity}</Text>
                                <TouchableOpacity
                                    onPress={() => handleQuantityChange(item._id, "inc")}
                                >
                                    <Text>+</Text>
                                </TouchableOpacity>
                                {/* Dropdown chọn executor nếu muốn */}
                                <Dropdown
                                    data={executors.map((e) => ({ label: e.name, value: e._id }))}
                                    labelField="label"
                                    valueField="value"
                                    placeholder="Chọn người thực hiện"
                                    value={selectedServices[item._id].userID}
                                    onChange={(selected) =>
                                        setSelectedServices((prev) => ({
                                            ...prev,
                                            [item._id]: {
                                                ...prev[item._id],
                                                userID: selected.value,
                                            },
                                        }))
                                    }
                                    style={styles.executorDropdown}
                                />
                            </View>
                        )}

                        {selectedServices[item._id] && (
                            <Text style={styles.priceText}>
                                Price: {item.price.toLocaleString("vi-VN")} đ
                            </Text>
                        )}
                    </View>
                )}
            />

            <TouchableOpacity
                style={styles.submitBtn}
                onPress={handlePostTransaction}
            >
                <Text style={styles.submitText}>
                    See summary: (
                    {Object.values(selectedServices)
                        .reduce((sum, s) => sum + s.price * s.quantity, 0)
                        .toLocaleString("vi-VN")}{" "}
                    đ)
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#e84c64",
        flexDirection: "row",
        alignItems: "center",
        paddingTop: 40,
        paddingHorizontal: 16,
        paddingBottom: 12,
    },
    headerTitle: {
        color: "#fff",
        fontSize: 20,
        fontWeight: "bold",
    },
    label: {
        fontSize: 16,
        fontWeight: "600",
        margin: 8,
        color: "#333",
    },
    dropdown: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        marginBottom: 20,
        backgroundColor: "#f9f9f9",
    },
    serviceRow: {
        marginBottom: 16,
        paddingBottom: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#e0e0e0",
    },
    controlGroup: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 8,
        gap: 10,
    },
    priceText: {
        marginTop: 4,
        color: "#e84c64",
        fontWeight: "600",
        fontSize: 14,
    },
    submitBtn: {
        backgroundColor: "#e84c64",
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 20,
    },
    submitText: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "700",
    },

    executorDropdown: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 8,
        marginTop: 4,
        backgroundColor: "#f0f0f0",
        width: 180,
    },
});
function setIsSubmitting(arg0: boolean) {
    throw new Error("Function not implemented.");
}
