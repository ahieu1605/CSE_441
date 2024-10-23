import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Products from './Products';
import { Text, View } from 'react-native';

function AddProduct() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Add Product Screen</Text>
    </View>
  );
}

function SearchProduct() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Search Product Screen</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        {/* Products Tab */}
        <Tab.Screen name="Products" component={Products} />

        {/* Add Product Tab */}
        <Tab.Screen name="Add Product" component={AddProduct} />

        {/* Search Product Tab */}
        <Tab.Screen name="Search Product" component={SearchProduct} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
