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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[70vh]">
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

          {/* Side Images Grid */}
          <div className="hidden md:grid grid-cols-2 gap-4">
            {images.slice(1).map((image, index) => (
              <div
                key={index}
                className={`relative w-full overflow-hidden ${
                  index === 0 ? "h-full row-span-2" : "h-full"
                }`}
              >
                <Image
                  src={image}
                  alt={`${hotelName} view ${index + 2}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* View All Photos Button */}
        <GalleryModal images={images} hotelName={hotelName} />
      </div>
    </>
  );
} 
