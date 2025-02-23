"use client";

import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isSameMonth, addMonths, subMonths } from 'date-fns';
import { ChevronLeft, ChevronRight, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Booking } from '@/types';
import BookingDetails from "./BookingDetails";
import { Button } from '@/components/ui/button';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { BookingDataBulk } from "@/types";

interface CalendarProps {
  bookings: BookingDataBulk[];
}
const Calendar: React.FC<CalendarProps> = ({ bookings }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });
  const getBookingsForDate = (date: Date) => {
    return bookings.filter(booking => {
      const checkIn = new Date(booking.checkIn);
      const checkOut = new Date(booking.checkOut);
      return date >= checkIn && date <= checkOut;
    });
  };
  const getStatusColor = (status: Booking['status']) => {
    const colors = {
      CONFIRMED: 'bg-emerald-500',
      PENDING: 'bg-amber-500',
      CANCELLED: 'bg-red-500',
      COMPLETED: 'bg-indigo-500'
    };
    return colors[status];
  };
  const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const previousMonth = () => setCurrentDate(subMonths(currentDate, 1));
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-light text-gray-900">
          Hotel Bookings Calendar
        </h1>
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={previousMonth}
            className="transition-transform hover:scale-105"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-medium text-gray-700">
            {format(currentDate, 'MMMM yyyy')}
          </h2>
          <Button
            variant="outline"
            size="icon"
            onClick={nextMonth}
            className="transition-transform hover:scale-105"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden shadow-lg">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div
            key={day}
            className="bg-gray-50 p-4 text-center text-sm font-medium text-gray-700"
          >
            {day}
          </div>
        ))}
        {days.map((day) => {
          const dayBookings = getBookingsForDate(day);
          
          return (
            <div
              key={day.toString()}
              className={cn(
                'min-h-[120px] bg-white p-2',
                !isSameMonth(day, currentDate) && 'bg-gray-50 text-gray-400',
                'transition-colors duration-200'
              )}
            >
              <div className={cn(
                'text-sm font-medium',
                isToday(day) && 'text-blue-600 font-bold'
              )}>
                {format(day, 'd')}
              </div>
              <div className="mt-2 space-y-1">
                {dayBookings.map((booking) => (
                  <HoverCard key={booking.id}>
                    <HoverCardTrigger>
                      <div
                        className={cn(
                          'text-xs px-2 py-1 rounded-full text-white flex items-center justify-between gap-1 transition-transform hover:scale-105',
                          getStatusColor(booking.status)
                        )}
                      >
                        <span>#{booking.room.roomNumber}</span>
                        <div className="flex items-center">
                          <Users className="h-3 w-3" />
                          <span className="ml-1">{booking.guests}</span>
                        </div>
                      </div>
                    </HoverCardTrigger>
                    <HoverCardContent className="w-80">
                      <BookingDetails booking={booking} />
                    </HoverCardContent>
                  </HoverCard>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default Calendar;