import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

export default function Product_Add() {
  // State variables for each input field
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [rating, setRating] = useState('');
  const [stock, setStock] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [images, setImages] = useState('');

  // Function to handle the product submission
  const handleSubmit = () => {
    const newProduct = {
      title,
      description,
      price: parseFloat(price), // Convert price to a number
      discountPercentage: parseFloat(discount), // Convert discount to a number
      rating: parseFloat(rating), // Convert rating to a number
      stock: parseInt(stock), // Convert stock to a number
      brand,
      category,
      images: images.split(','), // Handle multiple image URLs as a comma-separated string
    };

    // Fetch POST request to add the product
    fetch('https://dummyjson.com/products/add', {
      method: 'POST', // Use POST method to add data
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct), // Send the new product data as JSON
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the API
        console.log('Product added successfully:', data);
        Alert.alert('Success', 'Product added successfully!');
        
        // Clear the form after submission
        setTitle('');
        setDescription('');
        setPrice('');
        setDiscount('');
        setRating('');
        setStock('');
        setBrand('');
        setCategory('');
        setImages('');
      })
      .catch((error) => {
        console.error('Error adding product:', error);
        Alert.alert('Error', 'Failed to add the product.');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add a Product</Text>

      {/* Input fields for the product */}
      <Text>Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter title"
        value={title}
        onChangeText={setTitle}
      />

      <Text>Description</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter description"
        value={description}
        onChangeText={setDescription}
      />

      <Text>Price</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter price"
        value={price}
        keyboardType="numeric"
        onChangeText={setPrice}
      />

      <Text>Discount Percentage</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter discount percentage"
        value={discount}
        keyboardType="numeric"
        onChangeText={setDiscount}
      />

      <Text>Rating</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter rating"
        value={rating}
        keyboardType="numeric"
        onChangeText={setRating}
      />

      <Text>Stock</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter stock"
        value={stock}
        keyboardType="numeric"
        onChangeText={setStock}
      />

      <Text>Brand</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter brand"
        value={brand}
        onChangeText={setBrand}
      />

      <Text>Category</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter category"
        value={category}
        onChangeText={setCategory}
      />

      <Text>Images</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter images URL(s)"
        value={images}
        onChangeText={setImages}
      />

      <Button title="SUBMIT" onPress={handleSubmit} color="blue" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'blue',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
});
