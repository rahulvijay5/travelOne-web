import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export function SkeletonHotelCard() {
  return (
    <Card className="p-4 my-4">
      <Skeleton className="h-20 w-full rounded-lg" />
      <div className="space-y-2 mt-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48" />
        </div>
        <div className="flex justify-between items-end">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-6 w-16" />
        </div>
        <div className="flex justify-between items-start">
          <Skeleton className="h-4 w-16" />
          <Skeleton className="h-4 w-40" />
        </div>
      </div>
      <div className="flex justify-between mt-4 gap-2">
        <Skeleton className="h-10 flex-1 rounded-lg" />
        <Skeleton className="h-10 flex-1 rounded-lg" />
      </div>
      <Skeleton className="h-10 w-full mt-2 rounded-lg" />
    </Card>
  );
} 