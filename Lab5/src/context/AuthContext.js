import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { Alert } from "react-native";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState({});
    const [services, setServices] = useState([]);

    const login = async (phone, password) => {
        try {
            const authRes = await axios.post('https://kami-backend-5rs0.onrender.com/auth', { phone, password })
            const userInfo = authRes.data;
            console.log(authRes);
            
            setUserInfo(userInfo);
            await AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
            console.log(userInfo);
        } catch (error) {
            Alert.alert("Login Failed", "Please try again.");
        }
    };

    const loadService = async() => {
        try {
            const serRes = await axios.get('https://kami-backend-5rs0.onrender.com/services')
            const ser = serRes.data;
            setServices(ser);
            await AsyncStorage.setItem('services',JSON.stringify(ser)); 
        } catch (error) {
            Alert.alert("Login Failed", "Please try again.");
        }
    }

    useEffect(() => {
        console.log("Updated services:", services);
    }, [services]);

    return (
        <AuthContext.Provider value={{ 
            userInfo, 
            login, 
            services,
            loadService
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
