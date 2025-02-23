export type UserRole = "SUPERADMIN" | "OWNER" | "MANAGER" | "CUSTOMER";

export type RoomStatus = "BOOKED" | "AVAILABLE" | "MAINTANENCE";

export type BookingStatus = "CONFIRMED" | "CANCELLED" | "PENDING" | "COMPLETED";

export type PaymentStatus = "PENDING" | "COMPLETED" | "FAILED";

export interface User {
  id: number;
  name: string;
  phoneNumber: string;
  email: string;
  clerkId: string;
  role: UserRole;
}

export interface UpdateRoleRequest {
  clerkId: string;
  role: UserRole;
}

export interface UserData {
  userId: string;
  name: string;
  email: string;
  phoneNumber: string;
  clerkId: string;
  isOnboarded: boolean;
  currentStay: {
    hotelId: string;
    hotelCode: string;
    hotelName: string;
  } | null;
  role: string;
  lastUpdated: string;
}

export interface HotelFormData {
  hotelName: string;
  description: string;
  location: string;
  address: string;
  totalRooms: number;
  contactNumber: string;
  amenities: string[];
  hotelImages: string[];
  owner: string;
  customAmenity?: string; // Temporary field for UI only, won't be sent to API
}

export interface RoomForm {
  type: string;
  roomNumber: string;
  price: string;
  maxOccupancy: string;
  available: boolean;
  features: string[];
  customFeature: string;
  images: string[];
}

export interface HotelManagerName {
  name: string;
}

export interface HotelRules {
  id: string;
  hotelId: string;
  petsAllowed: boolean;
  maxPeopleInOneRoom: number;
  extraMattressOnAvailability: boolean;
  parking: boolean;
  swimmingPool: boolean;
  swimmingPoolTimings?: string;
  ownRestaurant: boolean;
  checkInTime: string;
  checkOutTime: string;
  guestInfoNeeded: boolean;
  smokingAllowed: boolean;
  alcoholAllowed: boolean;
  eventsAllowed: boolean;
  minimumAgeForCheckIn: number;
}

export interface HotelDetails {
  id: string;
  hotelName: string;
  description: string;
  location: string;
  address: string;
  totalRooms: number;
  code: string;
  contactNumber: string;
  amenities: string[];
  hotelImages: string[];
  createdAt: string;
  updatedAt: string;
  managers: HotelManagerName[];
  rules: HotelRules;
}

export interface Room {
  id: string;
  hotelId: string;
  roomNumber: string;
  type: string;
  price: number;
  maxOccupancy: number;
  available: boolean;
  features: string[];
  images: string[];
}

export interface Payment {
  id: string;
  bookingId: string;
  totalAmount: number;
  paidAmount: number;
  status: PaymentStatus;
  transactionId: string;
}
export interface Booking {
  id: string;
  hotelId: string;
  roomId: string;
  customerId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  bookingTime: string;
  status: BookingStatus;
  room: Room;
  customer: UserData;
  payment: Payment
}

export interface BookingData {
  hotelId: string;
  roomId: string;
  customerId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  status: BookingStatus;
  payment: {
    totalAmount: number;
    paidAmount: number;
    status: "PENDING";
    transactionId: string;
  };
}


export interface RoomBulk {
  id: string;
  type: string;
  roomNumber: string;
}

export interface BookingDataBulk {
  id: string;
  status: 'CONFIRMED' | 'PENDING' | 'CANCELLED' | 'COMPLETED';
  checkIn: string;
  checkOut: string;
  guests: number;
  room: {
    roomNumber: string;
  };
  customer: {
    name: string;
  };
  payment: {
    totalAmount: number;
  };
}