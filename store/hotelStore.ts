import { create } from 'zustand'
import { securelyGetHotelId, securelyStoreHotelId } from '@/lib/encryption'

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
  initializeFromStorage: () => void
}

export const useHotelStore = create<HotelState>((set) => ({
  hotelId: null,
  hotelCode: null,
  hotelName: null,
  selectedHotel: null,
  setHotelId: (id) => {
    securelyStoreHotelId(id);
    set({ hotelId: id });
  },
  setHotelCode: (code) => set({ hotelCode: code }),
  setHotelName: (name) => {
    localStorage.setItem("hotelName", name);
    set({ hotelName: name });
  },
  setSelectedHotel: (hotel) => {
    if (hotel) {
      localStorage.setItem("hotelName", hotel.name);
      localStorage.setItem("hotelCode", hotel.code);
      securelyStoreHotelId(hotel.id);
      set({
        selectedHotel: hotel,
        hotelId: hotel.id,
        hotelCode: hotel.code,
        hotelName: hotel.name
      });
    } else {
      localStorage.removeItem("hotelName");
      localStorage.removeItem("hotelCode");
      securelyStoreHotelId(null);
      set({
        selectedHotel: null,
        hotelId: null,
        hotelCode: null,
        hotelName: null
      });
    }
  },
  reset: () => {
    localStorage.removeItem("hotelName");
    localStorage.removeItem("hotelCode");
    securelyStoreHotelId(null);
    set({
      hotelId: null,
      hotelCode: null,
      hotelName: null,
      selectedHotel: null
    });
  },
  initializeFromStorage: () => {
    const storedHotelId = securelyGetHotelId();
    const storedHotelName = localStorage.getItem("hotelName");
    const storedHotelCode = localStorage.getItem("hotelCode");
    
    if (storedHotelId && storedHotelName && storedHotelCode) {
      set({
        hotelId: storedHotelId,
        hotelName: storedHotelName,
        hotelCode: storedHotelCode,
        selectedHotel: {
          id: storedHotelId,
          name: storedHotelName,
          code: storedHotelCode
        }
      });
    }
  }
})) 