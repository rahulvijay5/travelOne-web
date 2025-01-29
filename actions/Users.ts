import axios from 'axios';

// Use NEXT_PUBLIC_ prefix for client-side access
const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3002';

export type UserRole = 'OWNER' | 'MANAGER' | 'USER';

export interface User {
    id: string;
    email: string;
    mobile?: string;
    name?: string;
    clerkId: string;
    role?: UserRole;
    // Add other user fields as needed
}

export interface UpdateRoleRequest {
    clerkId: string;
    role: UserRole;
}

// Create an axios instance with default config
const api = axios.create({
    baseURL: backendURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const searchUsers = async (searchTerm: string, token: string): Promise<User[]> => {
    try {
        console.log("Making request to backend URL:", backendURL);
        const url = `/api/users/search`;
        console.log("Full request URL:", backendURL + url);
        
        const response = await api.get(url, {
            params: {
                query: searchTerm
            },
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log("Search response:", response.data);
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios error details:', {
                message: error.message,
                status: error.response?.status,
                data: error.response?.data,
                url: error.config?.url
            });
        } else {
            console.error('Non-axios error:', error);
        }
        throw error;
    }
}

export const getUserDetails = async (clerkId: string, token: string): Promise<User> => {
    try {
        const response = await api.get(`/api/users/${clerkId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error fetching user details:', {
                message: error.message,
                status: error.response?.status,
                data: error.response?.data
            });
        }
        throw error;
    }
}

export const updateUserRole = async (request: UpdateRoleRequest, token: string): Promise<User> => {
    try {
        console.log(request,token)
        const response = await api.post('/api/users/update-role', request, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error updating user role:', {
                message: error.message,
                status: error.response?.status,
                data: error.response?.data
            });
        }
        throw error;
    }
} 