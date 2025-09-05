"use client";

// imports
import { Skeleton } from "@heroui/react";

const LoadingSkeleton = () => {
  return (
    <div className="flex flex-col gap-9 dark:bg-[#181A1B]">
      {/* Header Section */}
      <div className="w-full flex flex-col md:flex-row md:justify-between gap-4 md:gap-0">
        <div className="flex flex-col gap-1.5">
          <Skeleton className="h-10 w-48 rounded-lg" />
        </div>
        <div className="flex flex-row flex-wrap gap-2">
          <Skeleton className="h-8 w-32 rounded-full" />
          <Skeleton className="h-8 w-24 rounded-full" />
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-[228px_1fr] lg:grid-cols-[30%_1fr] xl:grid-cols-[25%_1fr] gap-5">
        {/* Left Sidebar */}
        <div className="w-full flex flex-col gap-3">
          {/* Event Image */}
          <Skeleton className="w-full h-[225px] rounded-5xl" />

          {/* Host Card */}
          <div className="w-full border border-neutral-200 dark:border-[#343A40] rounded-2xl p-3">
            <Skeleton className="h-4 w-8 rounded mb-2" />
            <div className="flex flex-row items-center gap-2">
              <Skeleton className="h-8 w-8 rounded-full" />
              <Skeleton className="h-4 w-24 rounded" />
            </div>
          </div>

          {/* Share Button */}
          <div className="w-full border border-neutral-200 dark:border-[#343A40] rounded-2xl p-3">
            <div className="flex flex-row items-center gap-2">
              <Skeleton className="h-5 w-5 rounded" />
              <Skeleton className="h-4 w-20 rounded" />
            </div>
          </div>

          {/* Participants Card */}
          <div className="w-full border border-neutral-200 dark:border-[#343A40] rounded-2xl p-3">
            <Skeleton className="h-4 w-16 rounded mb-2" />
            <div className="flex items-center justify-between gap-2">
              <Skeleton className="h-9 w-9 rounded-full" />
              <Skeleton className="h-6 w-6 rounded-full" />
            </div>
          </div>
        </div>

        {/* Right Content */}
        <div className="w-full flex flex-col gap-6">
          {/* Event Details */}
          <div className="flex flex-col gap-3">
            {/* Date */}
            <div className="grid grid-cols-[50px_1fr] items-center gap-2">
              <Skeleton className="w-full h-11 rounded-xl" />
              <div className="flex flex-col gap-1">
                <Skeleton className="h-4 w-40 rounded" />
                <Skeleton className="h-3 w-32 rounded" />
              </div>
            </div>

            {/* Location */}
            <div className="grid grid-cols-[50px_1fr] items-center gap-2">
              <Skeleton className="w-full h-11 rounded-xl" />
              <div className="flex flex-col gap-1">
                <Skeleton className="h-4 w-24 rounded" />
                <Skeleton className="h-3 w-16 rounded" />
              </div>
            </div>

            {/* Virtual Link */}
            <div className="grid grid-cols-[50px_1fr] items-center gap-2">
              <Skeleton className="w-full h-11 rounded-xl" />
              <div className="flex flex-col gap-1">
                <Skeleton className="h-4 w-20 rounded" />
                <Skeleton className="h-3 w-48 rounded" />
              </div>
            </div>
          </div>

          {/* About Event Card */}
          <div className="w-full border border-neutral-200 dark:border-[#343A40] rounded-4xl p-7">
            <Skeleton className="h-5 w-24 rounded mb-3" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-full rounded" />
              <Skeleton className="h-4 w-3/4 rounded" />
              <Skeleton className="h-4 w-1/2 rounded" />
            </div>
          </div>

          {/* Register Card */}
          <div className="w-full bg-gray-50 rounded-5xl p-8">
            <div className="flex flex-col md:flex-row md:justify-between gap-3">
              <div className="flex flex-col items-start gap-2.5">
                <div className="flex flex-col gap-1">
                  <Skeleton className="h-4 w-16 rounded" />
                  <Skeleton className="h-3 w-40 rounded" />
                </div>
              </div>
              <Skeleton className="h-10 w-20 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingSkeleton;
