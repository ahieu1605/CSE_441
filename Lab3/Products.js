import React from "react";
import { useEffect, useState } from "react";
import { Text, View, FlatList } from "react-native";
export default function Products() {
    const [data, setData] = useState([])
    const filePath = "https://dummyjson.com/products/";
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
    });
    return (
        <View><FlatList data={data}
            renderItem={({ item }) => { return (<View><Text>{item.title}</Text></View>); }} /></View>
    );
}
