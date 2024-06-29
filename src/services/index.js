import axios from 'axios';
import { myConfig } from '../config';

const api = axios.create({
    baseURL: myConfig.apiUrl,
    headers: {
        'Content-Type': 'application/json',
        'APIKEY': myConfig.apiKey
    }
});

export const listProducts = async (data) => {
    try {
        const response = await api.post('/get/products/', data, {
            body: JSON.stringify(data),
        });

        return response;
    } catch (e) {
        console.log(e.message);
    }
};

export const listCategories = async (data) => {
    try {
        const response = await api.post('/get/categories/', data, {
            body: JSON.stringify(data),
        });

        return response;
    } catch (e) {
        console.log(e.message);
    }
};

export const generatePayment = async (data) => {
    try {
        const response = await api.post('/get/sale/', data, {
            body: JSON.stringify(data),
        });

        return response;
    } catch (e) {
        console.log(e.message);
    }
};

export const checkPayment = async (data) => {
    try {
        const response = await api.post('/get/checkpayment/', data, {
            body: JSON.stringify(data),
        });

        return response;
    } catch (e) {
        console.log(e.message);
    }
};

export const avaliacao = async (data) => {
    try {
        const response = await api.post('/get/avaliacao/', data, {
            body: JSON.stringify(data),
        });

        return response;
    } catch (e) {
        console.log(e.message);
    }
};

export const listSales = async (data) => {
    try {
        const response = await api.post('/get/sales/', data, {
            body: JSON.stringify(data),
        });

        return response;
    } catch (e) {
        console.log(e.message);
    }
};

export const getTerms = async (data) => {
    try {
        const response = await api.post('/get/terms/', data, {
            body: JSON.stringify(data),
        });

        return response;
    } catch (e) {
        console.log(e.message);
    }
};

export const getFeedbacks = async (data) => {
    try {
        const response = await api.post('/get/listavaliacao/', data, {
            body: JSON.stringify(data),
        });

        return response;
    } catch (e) {
        console.log(e.message);
    }
};
