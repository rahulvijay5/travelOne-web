import { api } from "@/lib/api";
import { UpdateRoleRequest, User } from "@/types";
import axios from "axios";

export const searchUsers = async (searchTerm: string, token: string): Promise<User[]> => {
    try {
        // console.log("Making request to backend URL:", backendURL);
        const url = `/api/users/search`;
        // console.log("Full request URL:", backendURL + url);
        
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

export const getUserIdByClerkId = async (clerkId: string, token: string) => {
    const response = await api.get(`/api/users/${clerkId}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    if(response.status == 404) console.log('User not found')
    if(response.status == 200){
        const data = response.data
        return data.id
    }
    return null
}