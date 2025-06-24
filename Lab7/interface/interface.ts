export interface Service {
    _id: string;
    name: string;
    price: number;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Detail {
    _id: string;
    name: string;
    price: number;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
    user: {
        name: string;
    };
}

export interface Customer {
    _id: string;
    name: string;
    phone: string;
    totalSpent: number;
    loyalty: string;
    createdBy: string;
    updatedBy: string;
}

export interface ServiceCart {
    _id: string;
    name: string;
    price: number;
    createdBy: string;
    createdAt: Date;
    updatedAt: Date;
    quantity: number;
}

export interface SelectedService {
    _id: string;
    name: string;
    price: number;
    quantity: number;
    userID: string;
}

export interface Transaction {
    _id: string;
    id: string;
    customer: Customer;
    services: ServiceCart[];
    priceBeforePromotion: number;
    price: number;
    createdBy: Customer;
    status: string;
    createdAt: string;
    updatedAt: Date;
}

export interface User {
    _id: string;
    phone: string;
    name: string;
}
