import React from 'react';
import { View, Button, Alert, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useLocalSearchParams, router } from 'expo-router';

export default function DeleteServiceScreen() {
    const { id } = useLocalSearchParams();

    const deleteService = async () => {
        const token = await AsyncStorage.getItem('token');
        await axios.delete(`https://kami-backend-5rs0.onrender.com/services/${id}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
        Alert.alert('Deleted');
        router.replace('/screens/HomeScreen');
    };

    return (
        <View style={styles.container}>
            <Button title="Confirm Delete" onPress={deleteService} color={'#E91E63'} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 }
});
