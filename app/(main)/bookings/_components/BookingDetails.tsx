import React from 'react';
import { format } from 'date-fns';
import { BookingDataBulk } from '@/types';
import { Calendar, User, Users, CreditCard } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface BookingDetailsProps {
  booking: BookingDataBulk;
}
const BookingDetails: React.FC<BookingDetailsProps> = ({ booking }) => {
  const statusColors = {
    CONFIRMED: 'bg-emerald-500',
    PENDING: 'bg-amber-500',
    CANCELLED: 'bg-red-500',
    COMPLETED: 'bg-indigo-500'
  };
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-lg">Booking Details</h3>
        <Badge variant="outline" className={statusColors[booking.status]}>
          {booking.status}
        </Badge>
      </div>
      <div className="space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <User className="h-4 w-4 text-gray-500" />
          <span>{booking.customer.name}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-gray-500" />
          <span>
            {format(new Date(booking.checkIn), 'MMM dd')} -{' '}
            {format(new Date(booking.checkOut), 'MMM dd, yyyy')}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Users className="h-4 w-4 text-gray-500" />
          <span>{booking.guests} guests</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <CreditCard className="h-4 w-4 text-gray-500" />
          <span>${booking.payment.totalAmount}</span>
        </div>
      </div>
    </div>
  );
};
export default BookingDetails;