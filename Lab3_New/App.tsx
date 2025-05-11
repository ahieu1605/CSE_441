import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BottomNavigation } from 'react-native-paper';
import { Image, StyleSheet } from 'react-native';

import ProductList from './Product.js';
import Product_Add from './Product_Add.js';
import ProductDetail from './Product_Detail.js';
import ProductSearch from './Product_Search.js';

export default function App() {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'ProductList', title: 'Products' },
    { key: 'Product_Add', title: 'Add' },
    { key: 'ProductSearch', title: 'Search' },
    { key: 'Product_Detail', title: 'Detail' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    ProductList: ProductList,
    Product_Add: Product_Add,
    ProductSearch: ProductSearch,
    Product_Detail: ProductDetail,
  });

  return (
    <SafeAreaProvider>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        renderIcon={({ route }) => {
          const iconMap: { [key: string]: any } = {
            ProductList: require('./assets/list.png'),
            Product_Add: require('./assets/add.png'),
            ProductSearch: require('./assets/search.png'),
            Product_Detail: require('./assets/info.png'),
          };
          return <Image source={iconMap[route.key]} style={styles.icon} />;
        }}
        barStyle={{ backgroundColor: '#f5f2fb' }}
      />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
});