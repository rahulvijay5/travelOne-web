"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { addDays } from "date-fns";

interface HotelBookingCardProps {
  hotelId: string;
  maxGuests: number;
  checkInTime: string;
  checkOutTime: string;
}

export function HotelBookingCard({
  maxGuests,
  checkInTime,
  checkOutTime,
}: HotelBookingCardProps) {
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState(1);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = () => {
    setIsSearching(true);
    // TODO: Implement room search functionality
    setTimeout(() => {
      setIsSearching(false);
    }, 2000);
  };

  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">Book Your Stay</h3>
        <p className="text-sm text-muted-foreground">
          Select your check-in and check-out dates
        </p>
      </div>

      <div className="space-y-4">
        {/* Check-in Date */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Check-in Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !checkIn && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {checkIn ? format(checkIn, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={checkIn}
                onSelect={setCheckIn}
                initialFocus
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
          <p className="text-xs text-muted-foreground">
            Check-in time: {checkInTime}
          </p>
        </div>

        {/* Check-out Date */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Check-out Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !checkOut && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {checkOut ? format(checkOut, "PPP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={checkOut}
                onSelect={setCheckOut}
                initialFocus
                disabled={(date) =>
                  date < (checkIn ? addDays(checkIn, 1) : new Date())
                }
              />
            </PopoverContent>
          </Popover>
          <p className="text-xs text-muted-foreground">
            Check-out time: {checkOutTime}
          </p>
        </div>

        {/* Number of Guests */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Number of Guests</label>
          <div className="flex items-center justify-between border rounded-md p-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setGuests(Math.max(1, guests - 1))}
              disabled={guests <= 1}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="font-medium">{guests}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setGuests(Math.min(maxGuests, guests + 1))}
              disabled={guests >= maxGuests}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Maximum {maxGuests} guests per room
          </p>
        </div>

        <Button
          className="w-full"
          size="lg"
          onClick={handleSearch}
          disabled={!checkIn || !checkOut || isSearching}
        >
          {isSearching ? "Searching..." : "Search Available Rooms"}
        </Button>
      </div>

      <div className="text-xs text-muted-foreground">
        <p>• Prices include taxes and fees</p>
        <p>• Free cancellation up to 24 hours before check-in</p>
        <p>• Pay at the hotel</p>
      </div>
    </Card>
  );
} 