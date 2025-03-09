import { api } from "@/lib/api";
import { PaymentStatus } from "@/types";
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





export type RoomStatus = "BOOKED" | "AVAILABLE" | "MAINTENANCE";
export type BookingStatus = "CONFIRMED" | "CANCELLED" | "PENDING" | "COMPLETED";

export type BookingDataInDb = {
    id: string;
    hotelId: string;
    roomId: string;
    customerId: string;
    checkIn: string;
    checkOut: string;
    guests: number;
    status: BookingStatus;
    bookingTime: string;
    updatedAt: string;
    hotel: {
      id: string;
      hotelName: string;
      code: string;
    };
    room: {
      id: string;
      roomNumber: string;
      type: string;
      roomStatus: RoomStatus;
      price: number;
    };
    customer: {
      id: string;
      name: string;
      email: string;
      phoneNumber: string;
    };
    payment: {
      id: string;
      status: PaymentStatus;
      totalAmount: number;
      paidAmount: number;
      transactionId?: string;
    };
  };

  
  
// export const getFilteredHotelBookings = async (
//     hotelId: string,
//     filters: {
//       status?: BookingStatus;
//       timeRange?: "today" | "yesterday" | "thisWeek" | "thisMonth" | "custom";
//       startDate?: Date;
//       endDate?: Date;
//       roomStatus?: RoomStatus;
//       sortBy?: "checkIn" | "checkOut" | "bookingTime";
//       sortOrder?: "asc" | "desc";
//       page?: number;
//       limit?: number;
//       search?: string;
//     },
//     token?: string
//   ) => {
//     try {
//       console.log(
//         `Fetching filtered hotel bookings for hotel ID: ${hotelId} with filters:`,
//         filters
//       );
  
//       // First try to get data from storage
//       const storedBookings = await getHotelBookingsFromStorage(hotelId);
//       console.log(`Stored bookings retrieved`);
//       let bookingsToReturn = storedBookings || [];
  
//       // Construct query parameters for API call
//       const queryParams = new URLSearchParams();
//       if (filters.status) queryParams.append("status", filters.status);
//       if (filters.timeRange) queryParams.append("timeRange", filters.timeRange);
//       if (filters.startDate)
//         queryParams.append(
//           "startDate",
//           filters.startDate.toISOString().split("T")[0]
//         );
//       if (filters.endDate)
//         queryParams.append(
//           "endDate",
//           filters.endDate.toISOString().split("T")[0]
//         );
//       if (filters.roomStatus)
//         queryParams.append("roomStatus", filters.roomStatus);
//       if (filters.sortBy) queryParams.append("sortBy", filters.sortBy);
//       if (filters.sortOrder) queryParams.append("sortOrder", filters.sortOrder);
//       if (filters.page) queryParams.append("page", filters.page.toString());
//       if (filters.limit) queryParams.append("limit", filters.limit.toString());
//       if (filters.search) queryParams.append("search", filters.search);
  
//       // Make API call in background
//       const url = `${API_URL}/api/bookings/hotel/${hotelId}/filter?${queryParams.toString()}`;
//       console.log(`Making API call to: ${url}`);
//       const res = await fetch(url, {
//         method: "GET",
//         headers: getHeaders(token),
//       });
  
//       const apiResponse = await handleResponse(res);
//       const newBookings = apiResponse.data;
//       console.log(`API response received in getFilteredHotelBookings`);
  
//       // If we got new data and it's different from stored data
//       if (
//         newBookings &&
//         (!storedBookings || hasBookingsDataChanged(storedBookings, newBookings))
//       ) {
//         console.log(`New bookings received, updating storage...`);
//         // Update storage
//         await storeHotelBookings(hotelId, newBookings);
//         bookingsToReturn = newBookings;
//       } else {
//         console.log(`No new bookings or data is unchanged.`);
//       }
  
//       return {
//         data: bookingsToReturn,
//         isFromCache: bookingsToReturn === storedBookings,
//       };
//     } catch (error) {
//       console.error("Error getting filtered hotel bookings:", error);
//       throw error;
//     }
//   };

//   export const getHotelRooms = async (hotelId: string, token?: string) => {
//     try {
//       const res = await fetch(`${API_URL}/api/rooms/hotel/${hotelId}`, {
//         method: "GET",
//         headers: getHeaders(token),
//       });
//       if (res.status === 404) {
//         return { error: "Rooms not found" };
//       }
//       return res.json();
//     } catch (error) {
//       console.error("Error getting hotel rooms:", error);
//       throw error;
//     }
//   };