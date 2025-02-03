export const getBookingsByHotelIdAndStatus = async (hotelId: string, status: string, token: string) => {
    console.log("hotelId, status", hotelId, status)
    const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/bookings/${hotelId}/${status}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
    })
    const data = await response.json()
    console.log("data", data)
    return data
}