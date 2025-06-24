import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    Alert,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Menu, Provider } from "react-native-paper";
import { deleteCustomer, getCustomerById } from "../api/kamiApi";
import { ServiceCart, Transaction } from "../interface/interface";

export default function CustomerDetailScreen() {
    const { id } = useLocalSearchParams();
    const [data, setData] = useState<any>(null);
    const [menuVisible, setMenuVisible] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const load = async () => {
            const detail = await getCustomerById(id as string);
            setData(detail);
        };
        load();
    }, []);

    const handleEdit = () => {
        setMenuVisible(false);
        router.navigate(`/EditCustomerScreen?id=${id}`);
    };

    const handleDelete = () => {
        setMenuVisible(false);
        Alert.alert(
            "Confirm Delete",
            "Are you sure you want to delete this customer?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => {
                        deleteCustomer(id as string)
                            .then(() => {
                                Alert.alert("Deleted successfully");
                                router.replace("/(tabs)/CustomerScreen");
                            })
                            .catch((err) => {
                                console.error(err);
                                Alert.alert("Failed to delete service");
                            });
                    },
                },
            ]
        );
    };

    return (
        <Provider>
            <View style={{ flex: 1 }}>
                {/* Header */}
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => router.replace("/(tabs)/CustomerScreen")}
                    >
                        <MaterialIcons name="arrow-back" size={28} color="#fff" />
                    </TouchableOpacity>

                    <Text style={styles.headerTitle}>Customer Detail</Text>

                    <Menu
                        visible={menuVisible}
                        onDismiss={() => setMenuVisible(false)}
                        anchor={
                            <TouchableOpacity onPress={() => setMenuVisible(true)}>
                                <MaterialIcons name="menu" size={28} color="#fff" />
                            </TouchableOpacity>
                        }
                    >
                        <Menu.Item onPress={handleEdit} title="Edit" />
                        <Menu.Item onPress={handleDelete} title="Delete" />
                    </Menu>
                </View>

                <ScrollView style={styles.container}>
                    {/* General Information */}
                    {data && (
                        <>
                            {/* General Information */}
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>General information</Text>
                                <View style={styles.infoRow}>
                                    <Text>Name:</Text>
                                    <Text>{data.name}</Text>
                                </View>
                                <View style={styles.infoRow}>
                                    <Text>Phone:</Text>
                                    <Text>{data.phone}</Text>
                                </View>
                                <View style={styles.infoRow}>
                                    <Text>Total spent:</Text>
                                    <Text style={{ color: "red", fontWeight: "bold" }}>
                                        {data.totalSpent.toLocaleString("vi-VN")} đ
                                    </Text>
                                </View>
                                <View style={styles.infoRow}>
                                    <Text>Loyalty:</Text>
                                    <Text>{data.loyalty}</Text>
                                </View>
                            </View>

                            {/* Transaction History */}
                            <View style={styles.section}>
                                <Text style={styles.sectionTitle}>Transaction history</Text>
                                {data.transactions?.map((tx: Transaction) => (
                                    <View key={tx._id} style={styles.transactionCard}>
                                        <Text style={styles.transactionId}>
                                            {tx.id} - {formatDate(tx.createdAt)}
                                        </Text>
                                        {tx.services.map((sv: ServiceCart) => (
                                            <Text key={sv._id} style={styles.transactionService}>
                                                - {sv.name}
                                            </Text>
                                        ))}
                                        <Text style={styles.transactionPrice}>
                                            {tx.price.toLocaleString("vi-VN")} đ
                                        </Text>
                                    </View>
                                ))}
                            </View>
                        </>
                    )}
                </ScrollView>
            </View>
        </Provider>
    );
}

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();
    const hh = String(date.getHours()).padStart(2, "0");
    const mi = String(date.getMinutes()).padStart(2, "0");
    return `${dd}/${mm}/${yyyy} ${hh}:${mi}`;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: "#fff",
    },
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
    },
    section: {
        marginBottom: 24,
    },
    sectionTitle: {
        fontWeight: "bold",
        fontSize: 16,
        marginBottom: 12,
        color: "tomato",
    },
    infoRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    transactionCard: {
        backgroundColor: "#fff",
        padding: 12,
        borderRadius: 10,
        marginBottom: 12,
        elevation: 2,
    },
    transactionId: {
        fontWeight: "bold",
        marginBottom: 4,
    },
    transactionService: {
        fontSize: 14,
    },
    transactionPrice: {
        textAlign: "right",
        marginTop: 4,
        color: "red",
        fontWeight: "bold",
    },
});
