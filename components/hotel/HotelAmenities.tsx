"use client";

import { Bath, Mountain, Ratio, Coffee, Wifi, Car, Waves, Utensils } from "lucide-react";

interface HotelAmenitiesProps {
  amenities: string[];
}

const AMENITY_ICONS: Record<string, React.ElementType> = {
  bathtub: Bath,
  mountains: Mountain,
  balcony: Ratio,
  wifi: Wifi,
  parking: Car,
  pool: Waves,
  restaurant: Utensils,
  coffee: Coffee,
};

export function HotelAmenities({ amenities }: HotelAmenitiesProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Amenities</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {amenities.map((amenity) => {
          const Icon = AMENITY_ICONS[amenity.toLowerCase()] || Coffee;
          return (
            <div
              key={amenity}
              className="flex items-center gap-3 p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
            >
              <Icon className="h-5 w-5 text-muted-foreground" />
              <span className="capitalize">{amenity}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
} 
