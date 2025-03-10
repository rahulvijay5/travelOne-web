import { api } from "@/lib/api";
import { AxiosError } from "axios";

export const getHotelDetails = async (code: string) => {
  console.log(code);
  const response = await api.get(`/api/hotels/code/${code}`);
  if (response.status == 400) console.log("Hotel Code is required");
  if (response.status == 404) console.log("Hotel not found");
  if (response.status == 200) {
    const data = response.data;
    return data;
  }
  return null;
};
export const getHotelAdditionalDetails = async (code: string) => {
  try {
    const res = await api.get(`/api/hotel/code/${code}/additional-data`);
    console.log(res);
    const data = res.data;
    return {
      status: 200,
      data,
    };
  } catch (error) {
    console.error(
      "Error in getting additional data for hotel with code: ",
      code
    );
    return {
      status: 500,
      error: `Error in fetching additional hotel data: ${error}`,
    };
  }
};

export const getHotelByCode = async (code: string) => {
  try {
    const res = await api.get(`/api/hotels/code/${code}`);
    const data = res.data;
    if (!data.id || !data.code || !data.hotelName) {
      console.error("Invalid hotel data received:", data);
      return { status: 500, error: "Invalid hotel data received" };
    }
    return { status: 200, data };
  } catch (error:unknown) {
    if (error instanceof AxiosError){
      if (error.response && error.response.status === 404) {
        return { status: 404, error: "Hotel not found" };
      }
    }

    return { status: 500, error: "Internal server error" };
  }
};


export const getHotelsByOwnerId = async (id: string, token: string) => {
  const response = await api.get(`/api/hotels/owner/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status == 404) console.log("Hotels not found");
  if (response.status == 200) {
    const data = response.data;
    console.log(data);
    return data;
  }
  return null;
};
