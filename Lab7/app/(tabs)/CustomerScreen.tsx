import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getCustomers } from "../../api/kamiApi";
import { Customer } from "../../interface/interface";

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 16, paddingLeft: 16, paddingRight: 16 },
  card: {
    backgroundColor: "#fff",
    padding: 12,
    marginVertical: 6,
    borderRadius: 8,
    elevation: 3,
  },
  fab: {
    position: "absolute",
    bottom: 30,
    right: 30,
    backgroundColor: "#f45",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
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
    marginLeft: 16,
  },
});

export default function CustomerListScreen() {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const router = useRouter();

  const loadCustomers = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const data = await getCustomers(token);
      setCustomers(data);
    } catch (error) {
      console.error("Error loading customers:", error);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  const renderItem = ({ item }: { item: Customer }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        router.push({
          pathname: "/CustomerDetail",
          params: { id: item._id },
        });
      }}
    >
      <Text>Customer: {item.name}</Text>
      <Text>Phone: {item.phone}</Text>
      <Text style={{ color: "red" }}>
        Total money: {item.totalSpent?.toLocaleString() ?? 0} đ
      </Text>
      <Text style={{ color: "tomato", fontWeight: "bold" }}>
        {item.loyalty}
      </Text>
    </TouchableOpacity>
  );

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Customer</Text>
      </View>

      <View style={styles.container}>
        <FlatList
          data={customers}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
        <TouchableOpacity
          style={styles.fab}
          onPress={() => router.push("../AddCustomer")}
        >
          <Ionicons name="add" size={32} color="#fff" />
        </TouchableOpacity>
      </View>
    </>
  );
}
