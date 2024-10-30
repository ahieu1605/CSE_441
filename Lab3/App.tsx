import React from 'react';
import { SafeAreaView, StatusBar } from 'react-native';
import Product_Add from './Products/Product_Add'; // Assuming the path is correct

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f8f8f8' }}>
      <StatusBar barStyle="dark-content" />
      <Product_Add />
    </SafeAreaView>
  );
}
