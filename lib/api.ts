import axios from 'axios';
const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3002';
export const api = axios.create({
    baseURL: backendURL,
    headers: {
        'Content-Type': 'application/json',
    },
});