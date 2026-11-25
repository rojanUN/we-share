import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_URL;

export const api = axios.create({
    baseURL: baseUrl,
    timeout: 10000,
});

api.interceptors.request.use(
    function (req) {
        const token = localStorage.getItem('token');

        if (token) {
            req.headers.Authorization = `Bearer ${token}`;
        }

        if (req.data instanceof FormData) {
            req.headers['Content-Type'] = 'multipart/form-data';
        } else {
            req.headers['Content-Type'] = 'application/json';
        }
        return req;
    },
    function (error) {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    function (response) {
        return response.data;
    },
    function (error) {
        return Promise.reject(error);
    }
);
