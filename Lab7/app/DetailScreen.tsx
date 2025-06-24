import { MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    Alert,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { Menu, Provider } from "react-native-paper";
import { deleteService, getServiceById } from "../api/kamiApi";
import { Detail } from "../interface/interface";

export default function DetailScreen() {
    const { id } = useLocalSearchParams();
    const [productDetail, setProductDetail] = useState<Detail | null>(null);
    const [menuVisible, setMenuVisible] = useState(false);

    useEffect(() => {
        if (id) {
            getServiceById(id as string)
                .then((res) => setProductDetail(res))
                .catch((err) => console.error("Error fetching service:", err));
        }
    }, [id]);

    const handleEdit = () => {
        setMenuVisible(false);
        router.navigate(`/EditScreen?id=${id}`);
    };

    const handleDelete = () => {
        setMenuVisible(false);
        Alert.alert(
            "Confirm Delete",
            "Are you sure you want to delete this service?",
            [
                { text: "Cancel", style: "cancel" },
                {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => {
                        deleteService(id as string)
                            .then(() => {
                                Alert.alert("Deleted successfully");
                                router.replace("/(tabs)/HomeScreen");
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

    if (!productDetail) {
        return (
            <View style={styles.container}>
                <Text>Loading service details...</Text>
            </View>
        );
    }

    return (
        <Provider>
            <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => router.replace("/(tabs)/HomeScreen")}
                    >
                        <MaterialIcons name="arrow-back" size={28} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Service</Text>
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
                <View style={styles.container}>
                    <View style={styles.textInfo}>
                        <Text style={styles.label}>Service Name:</Text>
                        <Text style={styles.textNormal}>{productDetail.name}</Text>
                    </View>
                    <View style={styles.textInfo}>
                        <Text style={styles.label}>Price:</Text>
                        <Text style={styles.textNormal}>{productDetail.price}</Text>
                    </View>
                    <View style={styles.textInfo}>
                        <Text style={styles.label}>Creator:</Text>
                        <Text style={styles.textNormal}>{productDetail.user.name}</Text>
                    </View>
                    <View style={styles.textInfo}>
                        <Text style={styles.label}>Time:</Text>
                        <Text style={styles.textNormal}>
                            {new Date(productDetail.createdAt).toLocaleString()}
                        </Text>
                    </View>
                    <View style={styles.textInfo}>
                        <Text style={styles.label}>Final update:</Text>
                        <Text style={styles.textNormal}>
                            {new Date(productDetail.updatedAt).toLocaleString()}
                        </Text>
                    </View>
                </View>
            </SafeAreaView>
        </Provider>
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
        marginBottom: 8,
    },
    textNormal: {
        fontSize: 16,
    },
});
