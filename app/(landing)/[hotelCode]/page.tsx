import React from "react";
import { Metadata } from "next";
import { getHotelByCode } from "@/actions/HotelActions";
import { HotelGallery } from "@/components/hotel/HotelGallery";
import { HotelBookingCard } from "@/components/hotel/HotelBookingCard";
import { HotelAmenities } from "@/components/hotel/HotelAmenities";
import { HotelRules } from "@/components/hotel/HotelRules";
import { Separator } from "@/components/ui/separator";
import { Clock, MapPin, Phone } from "lucide-react";

interface PageProps {
  params: { hotelCode: string };
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const hotel = await getHotelByCode(params.hotelCode);

  if (hotel.status !== 200) {
    return {
      title: "Hotel Not Found",
      description: "The requested hotel could not be found.",
    };
  }

  const { data } = hotel;

  return {
    title: data.hotelName,
    description: data.description,
    openGraph: {
      title: data.hotelName,
      description: data.description,
      images: data.hotelImages,
    },
    twitter: {
      card: "summary_large_image",
      title: data.hotelName,
      description: data.description,
      images: data.hotelImages[0],
    },
    keywords: [
      data.hotelName,
      "hotel",
      "booking",
      "accommodation",
      ...data.amenities,
      data.location,
    ],
    alternates: {
      canonical: `/hotel/${data.code}`,
    },
  };
}

export default async function HotelPage({ params }: PageProps) {
  const hotel = await getHotelByCode(params.hotelCode);

  if (hotel.status === 404) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Hotel Not Found</h1>
          <p className="text-muted-foreground">
            The hotel you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>
      </div>
    );
  }

  if (hotel.status === 500) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">Something went wrong</h1>
          <p className="text-muted-foreground">Please try again later.</p>
        </div>
      </div>
    );
  }

  if (hotel.status === 200) {
    const { data } = hotel;
    const checkInTime = `${Math.floor(data.rules.checkInTime / 60)}:${String(
      data.rules.checkInTime % 60
    ).padStart(2, "0")}`;
    const checkOutTime = `${Math.floor(data.rules.checkOutTime / 60)}:${String(
      data.rules.checkOutTime % 60
    ).padStart(2, "0")}`;

    return (
      <div className="min-h-screen bg-background">
        {/* Hero Section with Gallery */}
        <HotelGallery images={data.hotelImages} hotelName={data.hotelName} />

        <main className="container mx-auto px-4 py-8 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Hotel Info */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-4xl font-bold mb-4">{data.hotelName}</h1>
                  <div className="flex items-center text-muted-foreground gap-2">
                    <MapPin className="w-4 h-4" />
                    <span>{data.address}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Check-in</p>
                      <p className="font-medium">{checkInTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Check-out</p>
                      <p className="font-medium">{checkOutTime}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm text-muted-foreground">Contact</p>
                      <p className="font-medium">{data.contactNumber}</p>
                    </div>
                  </div>
                </div>

                <p className="text-lg leading-relaxed">{data.description}</p>
              </div>

              <Separator />

              {/* Amenities Section */}
              <HotelAmenities amenities={data.amenities} />

              <Separator />

              {/* Rules Section */}
              <HotelRules rules={data.rules} />

              <Separator />

              {/* Management Section */}
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold">Hotel Management</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {data.managers.map(
                    (manager: { name: string }, index: number) => (
                      <div
                        key={index}
                        className="p-4 rounded-lg border bg-card"
                      >
                        <p className="text-sm text-muted-foreground">Manager</p>
                        <p className="font-medium">{manager.name}</p>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Booking Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                <HotelBookingCard
                  hotelId={data.id}
                  maxGuests={data.rules.maxPeopleInOneRoom}
                  checkInTime={checkInTime}
                  checkOutTime={checkOutTime}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}
