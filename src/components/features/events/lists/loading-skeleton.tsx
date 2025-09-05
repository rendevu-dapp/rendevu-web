import { Skeleton } from "@heroui/react";
import Line from "./item/line";

const EventCardSkeleton = () => {
  return (
    <div className="grid grid-cols-[4px_1fr] gap-1.5 dark:bg-[#181A1B]">
      <Line />
      <div className="flex flex-col gap-1.5">
        <Skeleton className="h-4 w-32" />
        <div className="flex flex-col border border-neutral-200 dark:border-[#343A40] rounded-4xl">
          <div className="flex flex-row items-start justify-between gap-2 p-2.5">
            <div className="flex flex-col gap-2">
              <div className="flex flex-col gap-1">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-3 w-32" />
              </div>
              <div className="flex flex-col items-start gap-2">
                <div className="flex items-center gap-2">
                  <Skeleton className="w-6 h-6 rounded-full" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="w-6 h-6 rounded-lg" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
            </div>
            <Skeleton className="w-16 h-16 rounded-xl" />
          </div>
          <div className="flex flex-row justify-end gap-2 p-2.5">
            <Skeleton className="h-8 w-20 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCardSkeleton;
