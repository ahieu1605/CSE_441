import { Platform, StyleSheet, View, Text } from 'react-native';
import ProductList from '../Products/ProductList';
import { ScrollView } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView>
      <ProductList />
    </ScrollView>
  );
};
