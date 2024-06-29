import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { myConfig } from '../config';

const api = axios.create({
    baseURL: myConfig.apiUrl,
});

export const authAdmin = async (data) => {
    try {
        const response = await api.post('/admin/auth/', data, {
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'APIKEY': myConfig.apiKey
            }
        });

        return response;
    } catch (e) {
        console.log(e.message);
    }
};

export const checkAuth = async (token) => {
    try {
        const response = await api.post('/admin/checklogged/', [], {
            headers: {
                'Content-Type': 'application/json',
                'APIKEY': token
            }
        });

        return response;
    } catch (e) {
        return e.response;
    }
};

export const listUsers = async (data) => {
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await api.post('/admin/listusers/', data, {
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'APIKEY': JSON.parse(token)
            }
        });

        return response;
    } catch (e) {
        console.log(e.message);
    }
};

export const listSales = async (data) => {
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await api.post('/admin/listsales/', data, {
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'APIKEY': JSON.parse(token)
            }
        });

        return response;
    } catch (e) {
        console.log(e.message);
    }
};

export const deleteSale = async (data) => {
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await api.post('/admin/deletesale/', data, {
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'APIKEY': JSON.parse(token)
            }
        });

        return response;
    } catch (e) {
        console.log(e.message);
    }
};

export const listEquipments = async (data) => {
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await api.post('/admin/listequipments/', data, {
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'APIKEY': JSON.parse(token)
            }
        });

        return response;
    } catch (e) {
        console.log(e.message);
    }
};

export const listAdmins = async (data) => {
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await api.post('/admin/listadmins/', data, {
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'APIKEY': JSON.parse(token)
            }
        });

        return response;
    } catch (e) {
        console.log(e.message);
    }
};

export const editAdmin = async (data) => {
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await api.post('/admin/editadmin/', data, {
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'APIKEY': JSON.parse(token)
            }
        });

        return response;
    } catch (e) {
        console.log(e.message);
    }
};

export const addAdmin = async (data) => {
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await api.post('/admin/addadmin/', data, {
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'APIKEY': JSON.parse(token)
            }
        });

        return response;
    } catch (e) {
        console.log(e.message);
    }
};

export const deleteAdmin = async (data) => {
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await api.post('/admin/deleteadmin/', data, {
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'APIKEY': JSON.parse(token)
            }
        });

        return response;
    } catch (e) {
        console.log(e.message);
    }
};

export const listProducts = async (data) => {
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await api.post('/admin/listproducts/', data, {
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'APIKEY': JSON.parse(token)
            }
        });

        return response;
    } catch (e) {
        console.log(e.message);
    }
};

export const editProduct = async (data) => {
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await api.post('/admin/editproduct/', data, {
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'APIKEY': JSON.parse(token)
            }
        });

        return response;
    } catch (e) {
        console.log(e.message);
    }
};

export const addProduct = async (data) => {
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await api.post('/admin/addproduct/', data, {
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'APIKEY': JSON.parse(token)
            }
        });

        return response;
    } catch (e) {
        console.log(e.message);
    }
};

export const deleteProduct = async (data) => {
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await api.post('/admin/deleteproduct/', data, {
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'APIKEY': JSON.parse(token)
            }
        });

        return response;
    } catch (e) {
        console.log(e.message);
    }
};

export const listCategories = async (data) => {
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await api.post('/admin/listcategories/', data, {
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'APIKEY': JSON.parse(token)
            }
        });

        return response;
    } catch (e) {
        console.log(e.message);
    }
};

export const editCategories = async (data) => {
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await api.post('/admin/editcategories/', data, {
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'APIKEY': JSON.parse(token)
            }
        });

        return response;
    } catch (e) {
        console.log(e.message);
    }
};

export const deleteCategories = async (data) => {
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await api.post('/admin/deletecategories/', data, {
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'APIKEY': JSON.parse(token)
            }
        });

        return response;
    } catch (e) {
        console.log(e.message);
    }
};

export const addCategories = async (data) => {
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await api.post('/admin/addcategories/', data, {
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'APIKEY': JSON.parse(token)
            }
        });

        return response;
    } catch (e) {
        console.log(e.message);
    }
};

export const addCupom = async (data) => {
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await api.post('/admin/addcupom/', data, {
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'APIKEY': JSON.parse(token)
            }
        });

        return response;
    } catch (e) {
        console.log(e.message);
    }
};

export const editCupom = async (data) => {
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await api.post('/admin/editcupom/', data, {
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'APIKEY': JSON.parse(token)
            }
        });

        return response;
    } catch (e) {
        console.log(e.message);
    }
};

export const deleteCupom = async (data) => {
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await api.post('/admin/deletecupom/', data, {
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'APIKEY': JSON.parse(token)
            }
        });

        return response;
    } catch (e) {
        console.log(e.message);
    }
};

export const listCupom = async (data) => {
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await api.post('/admin/listcupom/', data, {
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'APIKEY': JSON.parse(token)
            }
        });

        return response;
    } catch (e) {
        console.log(e.message);
    }
};

export const getTerms = async () => {
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await api.post('/admin/getterms/', [], {
            headers: {
                'Content-Type': 'application/json',
                'APIKEY': JSON.parse(token)
            }
        });

        return response;
    } catch (e) {
        console.log(e.message);
    }
};

export const editTerms = async (data) => {
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await api.post('/admin/editterms/', data, {
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'APIKEY': JSON.parse(token)
            }
        });

        return response;
    } catch (e) {
        console.log(e.message);
    }
};

export const getTopProducts = async (data) => {
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await api.post('/admin/topproducts/', data, {
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'APIKEY': JSON.parse(token)
            }
        });

        return response;
    } catch (e) {
        console.log(e.message);
    }
};

export const getTopusers = async (data) => {
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await api.post('/admin/topusers/', data, {
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'APIKEY': JSON.parse(token)
            }
        });

        return response;
    } catch (e) {
        console.log(e.message);
    }
};

export const getAvaliacoes = async (data) => {
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await api.post('/admin/listavaliacao/', data, {
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'APIKEY': JSON.parse(token)
            }
        });

        return response;
    } catch (e) {
        console.log(e.message);
    }
};

export const deleteAvaliacao = async (data) => {
    try {
        const token = await AsyncStorage.getItem('token');
        const response = await api.post('/admin/deleteavaliacao/', data, {
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'APIKEY': JSON.parse(token)
            }
        });

        return response;
    } catch (e) {
        console.log(e.message);
    }
};