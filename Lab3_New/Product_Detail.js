import React, { useEffect, useState } from 'react';
import { View, ScrollView, StyleSheet, Image } from 'react-native';
import { Text, Card, Button, Title } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const Product_Detail = () => {
    const [data, setData] = useState({});
    const filePath = 'https://dummyjson.com/products/2';

    useEffect(() => {
        fetch(filePath)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(d => {
                setData(d);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Text style={styles.title}>Product Detail</Text>
                <Card style={styles.card}>
                    <Card.Cover source={{ uri: data.thumbnail }} />
                    <Card.Content>
                        <Title style={styles.productTitle}>{data.title}</Title>
                        <Text>Description: {data.description}</Text>
                        <Text>Price: ${data.price}</Text>
                        <Text>Discount: {data.discountPercentage}%</Text>
                        <Text>Rating: {data.rating} stars</Text>
                        <Text>Stock: {data.stock} units</Text>
                        <Text>Brand: {data.brand}</Text>
                        <Text>Category: {data.category}</Text>
                    </Card.Content>
                </Card>

                <View style={styles.buttonContainer}>
                    <Button mode="contained" style={styles.button}>
                        Delete
                    </Button>
                    <Button mode="contained" style={styles.button}>
                        Cancel
                    </Button>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 10,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginVertical: 10,
        textAlign: 'center',
    },
    card: {
        marginVertical: 10,
    },
    productTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 10,
        marginTop: 15,
        paddingHorizontal: 10,
    },
    button: {
        marginLeft: 10,
    },
});

export default Product_Detail;