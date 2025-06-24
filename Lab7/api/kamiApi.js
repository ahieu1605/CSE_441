import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const API = "https://kami-backend-5rs0.onrender.com";

export const login = async (phone, password) => {
    const res = await axios.post(`${API}/auth`, { phone, password });
    return res.data;
};

export const getServices = async (token) => {
    const res = await axios.get(`${API}/services`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};

export const addService = async (name, price) => {
    const token = await AsyncStorage.getItem("token");
    const res = await axios.post(
        `${API}/services`,
        { name, price },
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    return res;
};

export const getServiceById = async (id) => {
    try {
        const token = await AsyncStorage.getItem("token");
        const res = await axios.get(`${API}/services/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    } catch (error) {
        console.error("Get Service by ID Failed:", error);
        return null;
    }
};

export const updateService = async (id, name, price) => {
    try {
        const token = await AsyncStorage.getItem("token");
        const response = await fetch(`${API}/services/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ name, price: parseInt(price) }),
        });

        if (!response.ok) return null;

        return await response.json();
    } catch (err) {
        console.error("Update error:", err);
        return null;
    }
};

export const deleteService = async (id) => {
    try {
        const res = await fetch(`${API}/services/${id}`, {
            method: "DELETE",
        });
        return res.ok;
    } catch (err) {
        console.error("Delete failed", err);
        return false;
    }
};

export const getCustomers = async (token) => {
    const res = await axios.get(`${API}/customers`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};

export const addCustomer = async (name, phone) => {
    const token = await AsyncStorage.getItem("token");
    const res = await axios.post(
        `${API}/customers`,
        { name, phone },
        {
            headers: { Authorization: `Bearer ${token}` },
        }
    );
    return res;
};

export const getTransactions = async (token) => {
    const res = await axios.get(`${API}/transactions`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};

export const getTransactionsById = async (id) => {
    try {
        const token = await AsyncStorage.getItem("token");
        const res = await axios.get(`${API}/transactions/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    } catch (error) {
        console.error("Get Transaction by ID Failed:", error);
        return null;
    }
};

export const getCustomerById = async (id) => {
    try {
        const token = await AsyncStorage.getItem("token");
        const res = await axios.get(`${API}/customers/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return res.data;
    } catch (error) {
        console.error("Get Customer by ID Failed:", error);
        return null;
    }
};

export const deleteCustomer = async (id) => {
    try {
        const res = await fetch(`${API}/customers/${id}`, {
            method: "DELETE",
        });
        return res.ok;
    } catch (err) {
        console.error("Delete failed", err);
        return false;
    }
};

export const updateCustomer = async (id, name, phone) => {
    try {
        const token = await AsyncStorage.getItem("token");
        const response = await fetch(`${API}/customers/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ name, phone }),
        });

        if (!response.ok) return null;

        return await response.json();
    } catch (err) {
        console.error("Update error:", err);
        return null;
    }
};

export const postTransaction = async (customerId, services) => {
    try {
        const token = await AsyncStorage.getItem("token");
        const response = await axios.post(
            `${API}/transactions`,
            {
                customerId: customerId,
                services: services,
            },
            {
                headers: { Authorization: `Bearer ${token}` },
            }
        );
        return response.data;
    } catch (error) {
        console.error("postTransaction error:", error);
        throw error;
    }
};

export const getUsers = async (token) => {
    const res = await axios.get(`${API}/users`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return res.data;
};

export const deleteTransactions = async (id) => {
    try {
        const res = await fetch(`${API}/transactions/${id}`, {
            method: "DELETE",
        });
        return res.ok;
    } catch (err) {
        console.error("Delete failed", err);
        return false;
    }
};
