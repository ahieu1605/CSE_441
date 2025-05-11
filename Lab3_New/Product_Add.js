import React, { useEffect, useState } from 'react';
import { View, TextInput, Alert, ScrollView, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const Product_Add = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [discountPercentage, setDiscountPercentage] = useState('');
    const [rating, setRating] = useState('');
    const [stock, setStock] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [images, setImages] = useState('');

    const handleSubmit = () => {
        fetch('https://dummyjson.com/products/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title,
                description,
                price,
                discountPercentage,
                rating,
                stock,
                brand,
                category,
                images: [images],
            }),
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                Alert.alert('Add successful!');
            })
            .catch(error => {
                console.error(error);
                Alert.alert('Error adding product');
            });
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scroll}>
                <Text style={styles.header}>Add a Product</Text>
                {renderInput('Title', title, setTitle)}
                {renderInput('Description', description, setDescription)}
                {renderInput('Price', price, setPrice)}
                {renderInput(
                    'Discount Percentage',
                    discountPercentage,
                    setDiscountPercentage,
                )}
                {renderInput('Rating', rating, setRating)}
                {renderInput('Stock', stock, setStock)}
                {renderInput('Brand', brand, setBrand)}
                {renderInput('Category', category, setCategory)}
                {renderInput('Images', images, setImages, 'Enter images URL(s)')}
                <Button mode="contained" onPress={handleSubmit} style={styles.button}>
                    SUBMIT
                </Button>
            </ScrollView>
        </SafeAreaView>
    );
};

const renderInput = (
    label,
    value,
    setter,
    placeholder = `Enter ${label.toLowerCase()}`,
) => (
    <>
        <Text style={styles.label}>{label}</Text>
        <TextInput
            value={value}
            onChangeText={setter}
            placeholder={placeholder}
            style={styles.input}
        />
    </>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        backgroundColor: '#fff',
    },
    scroll: {
        paddingBottom: 20,
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 10,
    },
    label: {
        marginTop: 10,
        fontWeight: 'bold',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 8,
        marginTop: 4,
    },
    button: {
        marginTop: 20,
        backgroundColor: '#2196f3',
    },
});

export default Product_Add;