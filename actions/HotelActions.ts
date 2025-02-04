import { api } from "@/lib/api";

export const getHotelDetails = async (code: string) => {
    console.log(code)
    const response = await api.get(`/api/hotels/code/${code}`)
    if (response.status == 400) console.log('Hotel Code is required')
    if (response.status == 404) console.log('Hotel not found')
    if(response.status == 200){
        const data = response.data
        return data
    }
    return null
}

export const getHotelsByOwnerId = async (id: string, token: string) => {
    const response = await api.get(`/api/hotels/owner/${id}`,
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        }
    )

    if(response.status == 404) console.log('Hotels not found')
    if(response.status == 200){
        const data = response.data
        console.log(data)
        return data
    }
    return null
}