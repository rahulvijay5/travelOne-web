import Calendar from "../_components/CalendarView";
import { BookingDataBulk } from "@/types";

const mockBookings = [
  {
    id: '2a78ba4e-1cf1-4cb8-9466-d99ae080f88e',
    status: 'CANCELLED',
    checkIn: '2025-02-20T05:30:00.000Z',
    checkOut: '2025-02-23T04:30:00.000Z',
    guests: 2,
    room: { roomNumber: '103' },
    customer: { name: 'Alex Johnson' },
    payment: { totalAmount: 2500 }
  },
  {
    id: 'd702ec3a-fd6c-47a5-a986-f8c3459733e3',
    status: 'PENDING',
    checkIn: '2025-02-22T05:30:00.000Z',
    checkOut: '2025-02-23T04:30:00.000Z',
    guests: 2,
    room: { roomNumber: '101' },
    customer: { name: 'Alex Johnson' },
    payment: { totalAmount: 1000 }
  },
  {
    id: '8a7d4bde-80f1-456e-8a88-d6d9397633a1',
    status: 'CONFIRMED',
    checkIn: '2025-02-22T16:58:26.732Z',
    checkOut: '2025-02-23T04:30:00.000Z',
    guests: 1,
    room: { roomNumber: '102' },
    customer: { name: 'Ayush Bhai' },
    payment: { totalAmount: 1500 }
  },
  {
    id: '5c2983e1-c4fd-4468-a5f3-13a1257aaec9',
    status: 'CONFIRMED',
    checkIn: '2025-02-22T17:12:15.364Z',
    checkOut: '2025-02-23T04:30:00.000Z',
    guests: 1,
    room: { roomNumber: '103' },
    customer: { name: 'Ayush Bhai' },
    payment: { totalAmount: 2500 }
  },
  {
    id: '8be2d3a8-4ad8-42a7-83d0-78ca76eb5879',
    status: 'CONFIRMED',
    checkIn: '2025-02-23T05:30:00.000Z',
    checkOut: '2025-02-24T04:30:00.000Z',
    guests: 1,
    room: { roomNumber: '101' },
    customer: { name: 'Ayush Bhai' },
    payment: { totalAmount: 1000 }
  },
  {
    id: '14cbbfd2-9b64-4df1-a9d3-355bacb1a5ad',
    status: 'COMPLETED',
    checkIn: '2025-02-23T05:30:00.000Z',
    checkOut: '2025-02-27T04:30:00.000Z',
    guests: 2,
    room: { roomNumber: '102' },
    customer: { name: 'Alex Johnson' },
    payment: { totalAmount: 1500 }
  }
] as BookingDataBulk[];

export default function BookingsCalendarPage() {
  return <Calendar bookings={mockBookings} />;
}
