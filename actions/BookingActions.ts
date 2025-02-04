import { api } from "@/lib/api";
import axios from "axios";

export const getBookingsByHotelIdAndStatus = async (hotelId: string, status: string, token: string) => {
    console.log("hotelId, status", hotelId, status)
    const response = await api.get(`/api/bookings/${hotelId}/${status}`, {
        headers: {
            "Authorization": `Bearer ${token}`
        },
    })
    const data = response.data
    console.log("data", data)
    return data
}

export const updateBookingPaymentStatus = async (bookingId: string, paidAmount: number, status: string, token: string) => {
    try {
        console.log("bookingId ", bookingId, ", paidAmount ", paidAmount, ", status ", status, ", token ", token)
        const response = await api.patch(`/api/bookings/${bookingId}/payment`, 
            { 
                paidAmount,
                status,
                transactionId: "OFFLINE"
            },
            {
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            }
        );

        return response;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Axios error details:', {
                message: error.message,
                status: error.response?.status,
                data: error.response?.data,
                url: error.config?.url
            });
        } else {
            console.error("Error updating booking payment status:", error);
        }
        throw error;
    }
}