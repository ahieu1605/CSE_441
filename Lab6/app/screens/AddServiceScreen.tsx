import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { router } from 'expo-router';

export default function AddServiceScreen() {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    const addService = async () => {
        const token = await AsyncStorage.getItem('token');
        await axios.post('https://kami-backend-5rs0.onrender.com/services', { name, price }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        Alert.alert('Success', 'Service added');
        router.back();
    };

    return (
        <View style={styles.container}>
            <TextInput placeholder="Service Name" style={styles.input} onChangeText={setName} />
            <TextInput placeholder="Price" style={styles.input} keyboardType="numeric" onChangeText={setPrice} />
            <Button title="Add Service" onPress={addService} color={'#E91E63'} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, justifyContent: 'center' },
    input: { borderWidth: 1, borderColor: '#ccc', marginBottom: 15, padding: 10, borderRadius: 5 }
});
