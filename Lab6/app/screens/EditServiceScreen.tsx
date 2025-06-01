import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, router } from 'expo-router';

export default function EditServiceScreen() {
    const { id } = useLocalSearchParams();
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    useEffect(() => {
        axios.get(`https://kami-backend-5rs0.onrender.com/services/${id}`).then(res => {
            setName(res.data.name);
            setPrice(res.data.price.toString());
        });
    }, []);

    const update = async () => {
        const token = await AsyncStorage.getItem('token');
        await axios.put(`https://kami-backend-5rs0.onrender.com/services/${id}`, {
            name,
            price
        }, {
            headers: { Authorization: `Bearer ${token}` }
        });
        router.back();
    };

    return (
        <View style={styles.container}>
            <TextInput style={styles.input} value={name} onChangeText={setName} />
            <TextInput style={styles.input} value={price} onChangeText={setPrice} keyboardType="numeric" />
            <Button title="Update Service" onPress={update} color={'#E91E63'} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    input: { borderWidth: 1, borderColor: '#ccc', marginBottom: 15, padding: 10, borderRadius: 5 }
});
