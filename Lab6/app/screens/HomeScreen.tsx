import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, Button, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import { router } from 'expo-router';

export default function HomeScreen() {
    const [services, setServices] = useState([]);

    const fetchServices = async () => {
        const response = await axios.get('https://kami-backend-5rs0.onrender.com/services');
        setServices(response.data);
    };

    useEffect(() => {
        fetchServices();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>KAMI SERVICES</Text>
            <Button title="Add New Service" onPress={() => router.push('/screens/AddServiceScreen')} color={'#E91E63'} />
            <FlatList
                data={services}
                keyExtractor={item => item._id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.card}
                        onPress={() => router.push({ pathcardTitle: '/screens/ServiceDetailScreen', params: { id: item._id } })}
                    >
                        <Text style={styles.cardTitle}>{item.cardTitle}</Text>
                        <Text>Price: ${item.price}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#E91E63',
        marginBottom: 20,
        textAlign: 'center'
    },
    card: {
        padding: 16,
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        marginBottom: 12
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333'
    },
});
