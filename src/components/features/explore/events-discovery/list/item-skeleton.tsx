import { Skeleton } from "@heroui/react";

const EventItemSkeleton = () => {
  return (
    <div className="relative h-60 border-none rounded-5xl overflow-hidden dark:bg-[#181A1B]">
      {/* Payment Token Indicator (top-right) */}
      <div className="absolute top-2.5 right-2.5 z-10 bg-[#1A1E22]/60 py-1 px-3 border-1 border-neutral-600/50 rounded-3xl">
        <Skeleton className="h-5 w-12 rounded-full" />
      </div>

      {/* Main Image */}
      <Skeleton className="w-full h-full rounded-t-lg" />

      {/* Footer */}
      <div className="absolute bottom-2 z-10 w-[calc(100%_-_16px)] bg-[#252525]/40 py-4 mx-2 border-1 border-neutral-600 rounded-large">
        <Skeleton className="h-6 w-40 mb-2 ml-4" />
        <Skeleton className="h-3 w-32 ml-4" />
      </div>
    </div>
  );
};

export default EventItemSkeleton;
