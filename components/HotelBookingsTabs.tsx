"use client";

import { useCallback, useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useHotelStore } from "@/store/hotelStore";
import { Card, CardContent } from "@/components/ui/card";
import { getBookingsByHotelIdAndStatus } from "@/actions/BookingActions";
import { useAuth } from "@clerk/nextjs";
import { Booking, BookingStatus } from "@/types";
import { Badge } from "./ui/badge";
import { Phone, User } from "lucide-react";
import { Separator } from "./ui/separator";
import { BookingDetailsDialog } from "./BookingDetailsDialog";

export function HotelBookingsTabs() {
  const { getToken } = useAuth();
  const hotelId = useHotelStore((state) => state.hotelId);
  const [activeStatus, setActiveStatus] = useState<BookingStatus>("PENDING");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bookings, setBookings] = useState<Record<BookingStatus, Booking[]>>({
    PENDING: [],
    CONFIRMED: [],
    CANCELLED: [],
    COMPLETED: [],
  });
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const fetchBookings = useCallback(
    async (status: BookingStatus) => {
      if (!hotelId) return;

      try {
        setIsLoading(true);
        setError(null);
        const token = await getToken();
        if (!token) {
          throw new Error("Authentication required");
        }
        const fetchedBookings = await getBookingsByHotelIdAndStatus(
          hotelId,
          status,
          token
        );
        if (fetchedBookings.length === 0) {
          setError("No bookings found");
        }

        setBookings((prev) => ({
          ...prev,
          [status]: fetchedBookings,
        }));
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Failed to fetch bookings"
        );
        console.error("Error fetching bookings:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [hotelId, getToken]
  );

  useEffect(() => {
    if (hotelId && activeStatus) {
      fetchBookings(activeStatus);
    }
  }, [hotelId, activeStatus, fetchBookings]);

  const handleTabChange = (status: string) => {
    setActiveStatus(status as BookingStatus);
  };

  if (!hotelId) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-16rem)]">
        <p className="text-muted-foreground">Please select a hotel first</p>
      </div>
    );
  }

  return (
    <>
      <Tabs
        value={activeStatus}
        onValueChange={handleTabChange}
        className="w-full px-4"
      >
        <TabsList className="grid w-full grid-cols-4 gap-4">
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
                  <Card key={booking.id} onClick={() => setSelectedBooking(booking)} className="cursor-pointer hover:shadow-lg transition-all duration-300">
                    
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="font-medium">
                            Room {booking.room.roomNumber}
                          </span>
                          <Badge
                            variant="outline"
                            className="text-sm rounded-2xl dark:bg-blue-800 bg-blue-200"
                          >
                            {booking.status.toLowerCase()}
                          </Badge>
                        </div>
                        <Separator className="my-6" />
                        {booking.customerId && (
                          <div className="flex gap-4 justify-between">
                            <div className="text-sm flex flex-col gap-2">
                              <div className="flex items-center gap-2 justify-between">
                                <div className="flex items-center gap-2">
                                  <User className="w-4 h-4" />
                                  <div>{booking.customer.name}</div>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 justify-between">
                                <div className="flex items-center gap-2">
                                  <Phone className="w-4 h-4" />
                                  <div>{booking.customer.phoneNumber}</div>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span>Guests</span>
                              <span className="font-medium text-xl h-10 w-10 items-center text-center p-1 rounded-full dark:bg-blue-800 bg-blue-200">
                                {booking.guests}
                              </span>
                            </div>
                          </div>
                        )}
                        <div className="text-sm text-muted-foreground flex gap-4 justify-between items-center">
                          <div className="flex items-center justify-between w-full gap-2">
                            <div className="flex items-end gap-2 justify-between">
                              <div>Check-in:</div>
                              <div className="font-medium text-base">
                                {new Date(booking.checkIn).toLocaleDateString(
                                  "en-GB",
                                  { day: "numeric", month: "short" }
                                )}
                              </div>
                            </div>
                            <div className="flex items-end gap-2 justify-between">
                              <div>Check-out:</div>
                              <div className="font-medium text-base">
                                {new Date(booking.checkOut).toLocaleDateString(
                                  "en-GB",
                                  { day: "numeric", month: "short" }
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Separator className="my-6" />
                      <div className="flex flex-col gap-4 mt-4">
                        {/* <div className="flex justify-between items-center">
                          <div className="text-base font-semibold">
                            Payment Information
                          </div>
                          <Button
                            variant="outline"
                            onClick={() => setSelectedBooking(booking)}
                          >
                            View Details
                          </Button>
                        </div> */}
                        <div className="flex justify-between">
                          <div>Total Amount:</div>
                          <div className="font-medium">
                            ₹{booking.payment.totalAmount.toFixed(2)}
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <div>Status:</div>
                          <div
                            className={`font-medium ${
                              booking.payment.status === "COMPLETED"
                                ? "text-green-600"
                                : "text-red-600"
                            }`}
                          >
                            {booking.payment.status}
                          </div>
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

      {selectedBooking && (
        <BookingDetailsDialog
          booking={selectedBooking}
          isOpen={!!selectedBooking}
          onClose={() => setSelectedBooking(null)}
          onBookingUpdated={() => fetchBookings(activeStatus)}
        />
      )}
    </>
  );
}
