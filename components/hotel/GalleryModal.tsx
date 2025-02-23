"use client";

import { useState } from "react";
import Image from "next/image";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

interface GalleryModalProps {
  images: string[];
  hotelName: string;
}

export function GalleryModal({ images, hotelName }: GalleryModalProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <button
        onClick={() => setSelectedImage(images[0])}
        className="absolute bottom-4 right-4 bg-white dark:bg-gray-800 text-black dark:text-white px-4 py-2 rounded-lg shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      >
        View All Photos
      </button>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-7xl w-full h-[90vh] p-0">
          <div className="relative w-full h-full">
            {selectedImage && (
              <Image
                src={selectedImage}
                alt={`${hotelName} full view`}
                fill
                className="object-contain"
              />
            )}
            
            {/* Navigation Buttons */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(image)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    selectedImage === image
                      ? "bg-white w-4"
                      : "bg-white/50 hover:bg-white/75"
                  )}
                />
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
} 