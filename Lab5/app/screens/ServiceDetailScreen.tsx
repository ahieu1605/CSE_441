import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { useLocalSearchParams, router } from 'expo-router';

export default function ServiceDetailScreen() {
    const { id } = useLocalSearchParams();
    const [service, setService] = useState<any>(null);

    useEffect(() => {
        axios.get(`https://kami-backend-5rs0.onrender.com/services/${id}`).then(res => setService(res.data));
    }, []);

    if (!service) return <Text>Loading...</Text>;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{service.name}</Text>
            <Text>Price: ${service.price}</Text>
            <Button title="Edit" onPress={() => router.push({ pathname: '/screens/EditServiceScreen', params: { id } })} color={'#E91E63'} />
            <Button title="Delete" onPress={() => router.push({ pathname: '/screens/DeleteServiceScreen', params: { id } })} color={'#E91E63'} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 20 },
    title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 }
});
