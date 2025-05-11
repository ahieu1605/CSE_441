import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View, Image, StatusBar, TouchableOpacity } from 'react-native';
import { Card, Text, Button } from 'react-native-paper';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

type ProductData = {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    brand: string;
    category: string;
    images: string[];
};

const ProductList = () => {
    const [data, setData] = useState<ProductData[]>([]);
    const [selectedId, setSelectedId] = useState<number | undefined>();
    const filePath = 'https://dummyjson.com/products/';

    useEffect(() => {
        fetch(filePath)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((d) => {
                setData(d.products);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const ProductItem = ({ item, onPress, backgroundColor }: { item: ProductData; onPress: () => void; backgroundColor: string }) => (
        <TouchableOpacity onPress={onPress} style={[styles.item, { backgroundColor }]}>
            <Card>
                <View style={styles.row}>
                    <Image source={{ uri: item.images[0] }} style={styles.image} />

                    <View style={styles.infoContainer}>
                        <Card.Content>
                            <Text style={styles.title}>Title: {item.title}</Text>
                            <Text>Description: {item.description}</Text>
                            <Text>Price: ${item.price}</Text>
                            <Text style={styles.discount}>Discount: {item.discountPercentage}% off</Text>
                            <Text>Rating: {item.rating}</Text>
                            <Text>Stock: {item.stock}</Text>
                            <Text>Brand: {item.brand}</Text>
                            <Text>Category: {item.category}</Text>
                        </Card.Content>
                        <Card.Actions style={styles.actions}>
                            <Button mode="contained" style={styles.button}>DETAIL</Button>
                            <Button mode="contained" style={styles.button}>ADD</Button>
                            <Button mode="contained" style={styles.button}>DELETE</Button>
                        </Card.Actions>
                    </View>
                </View>
            </Card>
        </TouchableOpacity>
    );


    const renderItem = ({ item }: { item: ProductData }) => {
        const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
        const onPress = () => setSelectedId(item.id === selectedId ? undefined : item.id);

        return (
            <ProductItem item={item} onPress={onPress} backgroundColor={backgroundColor} />
        );
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={data}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id.toString()}
                    extraData={selectedId}
                    showsVerticalScrollIndicator={true}
                />
            </SafeAreaView>
        </SafeAreaProvider>
    );
};

const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    discount: {
        color: 'green',
    },
    row: {
        flexDirection: 'row',
        padding: 15,
        alignItems: 'flex-start',
    },

    infoContainer: {
        flex: 1.5,
        marginLeft: 8,
        justifyContent: 'space-between',
    },

    image: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        borderRadius: 8,
    },

    actions: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'nowrap',
        marginTop: 10,
        gap: 5,
    },

    button: {
        backgroundColor: '#007AFF',
        marginRight: 8,
    },
});

export default ProductList;