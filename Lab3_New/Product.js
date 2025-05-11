import React, { useEffect, useState } from 'react';
import { View, FlatList, Image, StyleSheet } from 'react-native';
import { Text, Button, Card } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const Products = () => {
    const [data, setData] = useState([]);
    const filePath = 'https://dummyjson.com/products/';

    useEffect(() => {
        fetch(filePath)
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(d => setData(d.products))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const renderItem = ({ item }) => (
        <Card style={styles.card}>
            <View style={styles.row}>
                <Image source={{ uri: item.thumbnail }} style={styles.image} />
                <View style={styles.details}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text>Description: {item.description}</Text>
                    <Text>Price: ${item.price}</Text>
                    <Text style={styles.discount}>
                        Discount: {item.discountPercentage}% off
                    </Text>
                    <Text>Rating: {item.rating}</Text>
                    <Text>Stock: {item.stock}</Text>
                    <Text>Brand: {item.brand}</Text>
                    <Text>Category: {item.category}</Text>

                    <View style={styles.buttonRow}>
                        <Button mode="contained" style={styles.button}>
                            DETAIL
                        </Button>
                        <Button mode="contained" style={styles.button}>
                            ADD
                        </Button>
                        <Button mode="contained" style={styles.button}>
                            DELETE
                        </Button>
                    </View>
                </View>
            </View>
        </Card>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Text variant="titleLarge" style={styles.header}>
                Product list
            </Text>
            <FlatList
                data={data}
                renderItem={renderItem}
                keyExtractor={item => item.id.toString()}
            />
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10
    },
    card: {
        marginBottom: 10, padding: 10

    },
    row: {
        flexDirection: 'row'
    },
    image: {
        width: 80,
        height: 80,
        marginRight: 10
    },
    details: {
        flex: 1
    },
    title: {
        fontWeight:
            'bold',
        fontSize: 18
    },
    discount: {
        color: 'green'
    },
    buttonRow: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-between',
    },
    button: {
        marginRight: 5
    },
});
export default Products;