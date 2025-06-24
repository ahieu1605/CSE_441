import { Tabs } from "expo-router";
import React from "react";
import { Platform } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="HomeScreen"
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="house" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="TransactionScreen"
        options={{
          title: "Transaction",
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="arrow-right-arrow-left" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="CustomerScreen"
        options={{
          title: "Customer",
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="person" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="SettingScreen"
        options={{
          title: "Setting",
          tabBarIcon: ({ color }) => (
            <FontAwesome6 name="gear" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
