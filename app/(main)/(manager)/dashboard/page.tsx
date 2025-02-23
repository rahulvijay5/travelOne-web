"use client";

import { useHotelStore } from "@/store/hotelStore";
import { HotelAnalytics } from "@/components/HotelAnalytics";

export default function DashboardPage() {
  const hotelId = useHotelStore((state) => state.hotelId);

  if (!hotelId) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-16rem)]">
        <p className="text-muted-foreground">Please select a hotel first</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto space-y-8">
      <HotelAnalytics hotelId={hotelId} />
    </div>
  );
}