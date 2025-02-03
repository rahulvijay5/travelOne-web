"use client"

import { useCallback, useEffect, useState } from "react"
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs"
import { useHotelStore } from "@/store/hotelStore"
import { Card, CardContent } from "@/components/ui/card"
import { getBookingsByHotelIdAndStatus } from "@/actions/BookingActions"
import { useAuth } from "@clerk/nextjs"

// type RoomStatus = "BOOKED" | "AVAILABLE" | "MAINTANENCE"
type BookingStatus = "CONFIRMED" | "CANCELLED" | "PENDING" | "COMPLETED"

interface Booking {
  id: string
  status: BookingStatus
  roomNumber: string
  checkIn: string
  checkOut: string
  guestName?: string
}

export function HotelBookingsTabs() {
  const { getToken } = useAuth();
  const hotelId = useHotelStore(state => state.hotelId);
  const [activeStatus, setActiveStatus] = useState<BookingStatus>("PENDING")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [bookings, setBookings] = useState<Record<BookingStatus, Booking[]>>({
    PENDING: [],
    CONFIRMED: [],
    CANCELLED: [],
    COMPLETED: [],
  })

  const fetchBookings = useCallback(async (status: BookingStatus) => {
    if (!hotelId) return
    
    try {
      setIsLoading(true)
      setError(null)
      const token = await getToken();
      if (!token) {
        throw new Error("Authentication required");
      }
      const fetchedBookings = await getBookingsByHotelIdAndStatus(hotelId, status, token)
      if(fetchedBookings.length === 0){
        setError("No bookings found")
      }

      setBookings(prev => ({
        ...prev,
        [status]: fetchedBookings
      }))
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch bookings')
      console.error('Error fetching bookings:', error)
    } finally {
      setIsLoading(false)
    }
  }, [hotelId, getToken])

  useEffect(() => {
    if (hotelId && activeStatus) {
      fetchBookings(activeStatus)
    }
  }, [hotelId, activeStatus, fetchBookings])

  const handleTabChange = (status: string) => {
    setActiveStatus(status as BookingStatus)
  }

  if (!hotelId) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-16rem)]">
        <p className="text-muted-foreground">Please select a hotel first</p>
      </div>
    )
  }

  return (
    <Tabs value={activeStatus} onValueChange={handleTabChange} className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="PENDING">Pending</TabsTrigger>
        <TabsTrigger value="CONFIRMED">Confirmed</TabsTrigger>
        <TabsTrigger value="CANCELLED">Cancelled</TabsTrigger>
        <TabsTrigger value="COMPLETED">Completed</TabsTrigger>
      </TabsList>

      {Object.entries(bookings).map(([status, statusBookings]) => (
        <TabsContent key={status} value={status}>
          {isLoading ? (
            <div className="flex items-center justify-center h-48">
              Loading...
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-48 text-red-500">
              {error}
            </div>
          ) : statusBookings.length === 0 ? (
            <div className="flex items-center justify-center h-48 text-muted-foreground">
              No {status.toLowerCase()} bookings found
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {statusBookings.map((booking) => (
                <Card key={booking.id}>
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">Room {booking.roomNumber}</span>
                        <span className="text-sm text-muted-foreground">{booking.status}</span>
                      </div>
                      {booking.guestName && (
                        <p className="text-sm">Guest: {booking.guestName}</p>
                      )}
                      <div className="text-sm text-muted-foreground">
                        <p>Check-in: {new Date(booking.checkIn).toLocaleDateString()}</p>
                        <p>Check-out: {new Date(booking.checkOut).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      ))}
    </Tabs>
  )
} 