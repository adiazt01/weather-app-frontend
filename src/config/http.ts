import { useAuthStore } from "@/features/auth/stores/auth.store";
import axios from "axios";

const getToken = () => {
    return useAuthStore.getState().user?.token;
};

const http = axios.create({
    baseURL: "http://localhost:3000/api",
    timeout: 1000,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
});

http.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

http.interceptors.response.use(
    (response) => response,
    (error) => {
        return Promise.reject(error);
    }
);

export default http;