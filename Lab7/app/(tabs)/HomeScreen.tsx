import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { getServices } from "../../api/kamiApi";
import { Service } from "../../interface/interface";

export default function Home() {
  const [services, setServices] = useState<Service[]>([]);
  const [name, setName] = useState<string>("");
  const router = useRouter();

  const loadServices = async () => {
    const token = await AsyncStorage.getItem("token");
    const data = await getServices(token);
    setServices(data);
  };

  const loadUserName = async () => {
    const storedName = await AsyncStorage.getItem("name");
    if (storedName) {
      setName(storedName);
    } else {
      setName("Guest");
    }
  };

  useEffect(() => {
    loadServices();
    loadUserName();
  }, []);

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Hello {name}</Text>
        <TouchableOpacity
        //   onPress={async () => {
        //     await AsyncStorage.clear();
        //     router.replace("/login");
        //   }}
        >
          <MaterialIcons name="person" size={28} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Logo */}
      <Image
        source={require("../../assets/images/icon.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      {/* Title and Add Button */}
      <View style={styles.titleRow}>
        <Text style={styles.title}>Danh sách dịch vụ</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            router.push("../AddScreen");
          }}
        >
          <MaterialIcons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Service List */}
      <FlatList
        data={services}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              router.push({
                pathname: "/DetailScreen",
                params: { id: item._id },
              });
            }}
          >
            <View style={styles.serviceCard}>
              <Text style={styles.serviceName} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={styles.servicePrice}>
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                  maximumFractionDigits: 0,
                }).format(item.price)}
              </Text> 
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    backgroundColor: "#e84c64",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 40,
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  headerText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 20,
    letterSpacing: 1,
  },
  logo: {
    width: 180,
    height: 70,
    alignSelf: "center",
    marginVertical: 10,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 16,
    marginBottom: 8,
    marginTop: 8,
    justifyContent: "space-between",
  },
  title: {
    fontWeight: "bold",
    fontSize: 16,
  },
  addButton: {
    backgroundColor: "#e84c64",
    borderRadius: 20,
    padding: 6,
  },
  serviceCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fafafa",
    borderRadius: 8,
    padding: 14,
    marginHorizontal: 16,
    marginVertical: 5,
    elevation: 2,
  },
  serviceName: {
    fontSize: 15,
    flex: 1,
    fontWeight: "500",
  },
  servicePrice: {
    fontSize: 15,
    color: "black",
    marginLeft: 10,
    fontWeight: "bold",
  },
});
