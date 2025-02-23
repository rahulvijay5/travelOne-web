"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getHotelsByOwnerId } from "@/actions/HotelActions";
import { HotelDetails } from "@/types";
import { SkeletonHotelCard } from "@/components/SkeletonHotelCard";
import Image from "next/image";
import Link from "next/link";
import { getUserIdByClerkId } from "@/actions/Users";

export default function OwnedHotelsPage() {
  const { userId, getToken } = useAuth();
  const [hotels, setHotels] = useState<HotelDetails[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHotels = async () => {
      if (!userId) return;

      try {
        setLoading(true);
        const token = await getToken();
        if (!token) {
          throw new Error("No auth token available");
        }

        try {
          const userIdDB = await getUserIdByClerkId(userId, token);
          const response = await getHotelsByOwnerId(userIdDB, token);
          if (response) {
            setHotels(response);
          } else {
            setError(response.error || "Failed to fetch hotels");
          }
        } catch (error) {
          console.error("Error fetching user ID:", error);
          setError("Failed to fetch user ID");
        }
      } catch (error) {
        console.error("Error fetching hotels:", error);
        setError(`Failed to fetch hotels: ${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, [userId, getToken]);

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Your Hotels</h1>
        <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {[1].map((index) => (
            <SkeletonHotelCard key={index} />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-6">Your Hotels</h1>
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Your Hotels</h1>

      {hotels.length === 0 ? (
        <div className="text-muted-foreground">No hotels found</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {hotels.map((hotel) => (
            <Card key={hotel.id} className="p-4">
              <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                <Image
                  src={hotel.hotelImages[0] || "/placeholder-hotel.jpg"}
                  alt={hotel.hotelName}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl font-bold">{hotel.hotelName}</h2>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-muted-foreground">Hotel Code:</span>
                    <span className="font-semibold">{hotel.code}</span>
                  </div>
                  <div className="flex justify-between items-start mt-1">
                    <span className="text-muted-foreground">Address:</span>
                    <span className="text-right max-w-[70%]">
                      {hotel.address}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Link href={`/o/hotel/${hotel.id}/rules`} className="w-full">
                    <Button className="w-full" variant="outline">
                      Manage Rules
                    </Button>
                  </Link>
                  <Link href={`/o/hotel/${hotel.id}/people`} className="w-full">
                    <Button className="w-full" variant="outline">
                      Manage People
                    </Button>
                  </Link>
                </div>

                <Link
                  href={`/o/hotel/${hotel.id}/rooms`}
                  className="block w-full"
                >
                  <Button className="w-full">Manage Rooms</Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
