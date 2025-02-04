"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Booking } from "@/types";
import { useAuth } from "@clerk/nextjs";
import { Separator } from "./ui/separator";
import { format } from "date-fns";
import { Badge } from "./ui/badge";
import { Phone, User } from "lucide-react";
import { updateBookingPaymentStatus } from "@/actions/BookingActions";

interface BookingDetailsDialogProps {
  booking: Booking;
  isOpen: boolean;
  onClose: () => void;
  onBookingUpdated: () => void;
}

export function BookingDetailsDialog({
  booking,
  isOpen,
  onClose,
  onBookingUpdated,
}: BookingDetailsDialogProps) {
  const { getToken } = useAuth();
  const [paidAmount, setPaidAmount] = useState(
    booking.payment.paidAmount.toString()
  );
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleUpdateBooking = async (newStatus: "PAID" | "FAILED") => {
    try {
      setIsLoading(true);
      setError(null);
      const token = await getToken();
      if (!token) throw new Error("Authentication required");

      const response = await updateBookingPaymentStatus(
        booking.id,
        parseFloat(paidAmount),
        newStatus,
        token
      );

      if (response?.status === 200) {
        onBookingUpdated();
        onClose();
      } else {
        throw new Error("Failed to update booking");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update booking");
      console.error("Error updating booking:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Booking Details</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Booking Status */}
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">
              Booking #{booking.id.slice(0, 8)}
            </h3>
            <Badge
              variant="outline"
              className="text-sm rounded-2xl dark:bg-blue-800 bg-blue-200"
            >
              {booking.status.toLowerCase()}
            </Badge>
          </div>

          <Separator />

          {/* Room Details */}
          <div className="space-y-2">
            <h4 className="font-medium">Room Information</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-muted-foreground">
                  Room Number:
                </span>
                <p>{booking.room.roomNumber}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">
                  Room Type:
                </span>
                <p>{booking.room.type}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">
                  Price per Night:
                </span>
                <p>₹{booking.room.price}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">
                  Max Occupancy:
                </span>
                <p>{booking.room.maxOccupancy}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Customer Details */}
          <div className="space-y-2">
            <h4 className="font-medium">Customer Information</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{booking.customer.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>{booking.customer.phoneNumber}</span>
              </div>
            </div>
          </div>

          <Separator />

          {/* Booking Details */}
          <div className="space-y-2">
            <h4 className="font-medium">Stay Details</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-sm text-muted-foreground">Check-in:</span>
                <p>{format(new Date(booking.checkIn), "PPP")}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">
                  Check-out:
                </span>
                <p>{format(new Date(booking.checkOut), "PPP")}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">
                  Number of Guests:
                </span>
                <p>{booking.guests}</p>
              </div>
              <div>
                <span className="text-sm text-muted-foreground">
                  Booking Date:
                </span>
                <p>{format(new Date(booking.bookingTime), "PPP")}</p>
              </div>
            </div>
          </div>

          <Separator />

          {/* Payment Details */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Payment Information</h4>

              <div className="text-sm text-muted-foreground flex gap-2 items-center">
                <p>Payment Status:</p>
                <Badge
                  variant="outline"
                  className={`text-sm rounded-2xl ${
                    booking.payment.status === "COMPLETED"
                      ? "dark:bg-green-800 bg-green-200"
                      : "dark:bg-red-800 bg-red-200"
                  }`}
                >{booking.payment.status.toLocaleLowerCase()}</Badge>
              </div>
            </div> <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-muted-foreground">
                    Total Amount:
                  </span>
                  <p className="font-medium">₹{booking.payment.totalAmount}</p>
                </div>
                <div className="">
                  <label className="text-sm text-muted-foreground">
                    Paid Amount:
                  </label>
                  <Input
                    type="number"
                    value={paidAmount}
                    onChange={(e) => setPaidAmount(e.target.value)}
                    placeholder="Enter paid amount"
                    min="0"
                    max={booking.payment.totalAmount}
                  />
                </div>
              </div>
            </div>
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <div className="flex justify-end gap-4">
            <Button
              variant="destructive"
              onClick={() => handleUpdateBooking("FAILED")}
              disabled={isLoading}
            >
              Cancel Booking
            </Button>
            <Button
              onClick={() => handleUpdateBooking("PAID")}
              disabled={isLoading || parseFloat(paidAmount) <= 0}
            >
              Confirm Booking
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
