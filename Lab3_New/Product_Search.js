import React, { useEffect, useState } from 'react';
import { Text, Button, Card } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, TextInput, Alert, FlatList, Image, StyleSheet } from 'react-native';

const Product_Search = () => {
    const [data, setData] = useState([]);
    const [value, setValue] = useState('');

    const searchProduct = () => {
        const query = value.trim();
        const url = query
            ? `https://dummyjson.com/products/search?q=${query}`
            : 'https://dummyjson.com/products/';

        fetch(url)
            .then(response => {
                if (!response.ok) throw new Error('Network response was not OK');
                return response.json();
            })
            .then(d => {
                setData(d.products);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                Alert.alert('Search error', error.message);
            });
    };

    const renderItem = ({ item }) => (
        <Card style={styles.card}>
            <Card.Cover source={{ uri: item.thumbnail }} />
            <Card.Content>
                <Text style={styles.title}>{item.title}</Text>
                <Text>{item.description}</Text>
                <Text style={styles.price}>${item.price}</Text>
                <Text style={styles.discount}>
                    Discount: {item.discountPercentage}% off
                </Text>
                <Text>Rating: {item.rating}</Text>
                <Text>Stock: {item.stock}</Text>
                <Text>Brand: {item.brand}</Text>
                <Text>Category: {item.category}</Text>
            </Card.Content>
        </Card>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Search Products</Text>
            <TextInput
                value={value}
                onChangeText={setValue}
                style={styles.input}
                placeholder="Enter product name"
            />
            <Button mode="contained" onPress={searchProduct} style={styles.button}>
                Search
            </Button>

            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
                contentContainerStyle={{ paddingBottom: 100 }}
            />
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fdfdfd',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginBottom: 12,
    },
    button: {
        marginBottom: 20,
        backgroundColor: '#6200ee',
    },
    card: {
        marginBottom: 16,
    },
    price: {
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 8,
    },
    discount: {
        color: 'green',
        fontWeight: '600',
    },
});
export default Product_Search;