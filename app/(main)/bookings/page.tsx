"use client"

import { HotelBookingsTabs } from "@/components/HotelBookingsTabs"
import { useHotelStore } from "@/store/hotelStore"

export default function BookingsPage() {
  const hotelId = useHotelStore((state) => state.hotelId)

  if (!hotelId) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
        <p className="text-muted-foreground">Please select a hotel first</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Hotel Bookings</h1>
      <HotelBookingsTabs />
    </div>
  )
} 