import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

export function BookingSkeleton() {
  return (
    <Card className="cursor-pointer hover:shadow-lg transition-all duration-300">
      <CardContent className="p-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <Skeleton className="h-6 w-24" />
            <Skeleton className="h-6 w-20 rounded-2xl" />
          </div>
          <Separator className="my-6" />
          <div className="flex gap-4 justify-between">
            <div className="text-sm flex flex-col gap-2 w-full">
              <div className="flex items-center gap-2 justify-between">
                <Skeleton className="h-4 w-32" />
              </div>
              <div className="flex items-center gap-2 justify-between">
                <Skeleton className="h-4 w-28" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>
          </div>
          <div className="text-sm flex gap-4 justify-between items-center mt-4">
            <div className="flex items-center justify-between w-full gap-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
          <Separator className="my-6" />
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-20" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-24" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function BookingsGridSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <BookingSkeleton key={index} />
      ))}
    </div>
  );
} 