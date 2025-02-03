import { create } from 'zustand'

interface HotelState {
  hotelId: string | null
  hotelCode: string | null
  hotelName: string | null
  selectedHotel: {
    id: string
    code: string
    name: string
  } | null
  setHotelId: (id: string) => void
  setHotelCode: (code: string) => void
  setHotelName: (name: string) => void
  setSelectedHotel: (hotel: { id: string; code: string; name: string } | null) => void
  reset: () => void
}

export const useHotelStore = create<HotelState>((set) => ({
  hotelId: null,
  hotelCode: null,
  hotelName: null,
  selectedHotel: null,
  setHotelId: (id) => set({ hotelId: id }),
  setHotelCode: (code) => set({ hotelCode: code }),
  setHotelName: (name) => set({ hotelName: name }),
  setSelectedHotel: (hotel) => {
    if (hotel) {
      set({
        selectedHotel: hotel,
        hotelId: hotel.id,
        hotelCode: hotel.code,
        hotelName: hotel.name
      })
    } else {
      set({
        selectedHotel: null,
        hotelId: null,
        hotelCode: null,
        hotelName: null
      })
    }
  },
  reset: () => set({
    hotelId: null,
    hotelCode: null,
    hotelName: null,
    selectedHotel: null
  })
})) 