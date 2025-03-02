import Image from "next/image";
import { GalleryModal } from "./GalleryModal";

interface HotelGalleryProps {
  images: string[];
  hotelName: string;
}

export function HotelGallery({ images, hotelName }: HotelGalleryProps) {
  return (
    <>
      <div className="relative w-full">
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4 h-[70vh]">
          {/* Main Image */}
          <div className="relative w-full h-full overflow-hidden">
            <Image
              src={images[0]}
              alt={`${hotelName} main view`}
              fill
              className="object-cover"
              priority
            />
          </div>

        </div>

        {/* View All Photos Button */}
        <GalleryModal images={images} hotelName={hotelName} />
      </div>
    </>
  );
} 
