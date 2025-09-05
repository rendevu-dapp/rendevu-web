"use client";

import { Skeleton } from "@heroui/react";

const ManageEventLoadingSkeleton = () => {
  return (
    <main className="min-h-screen dark:bg-[#181A1B]">
      <div className="container max-w-6xl mx-auto pt-14 pb-20 px-4">
        <div className="flex flex-col gap-10">
          {/* Header Skeleton */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <Skeleton className="h-9 w-3/4 md:w-1/2 rounded-xl" />
            <div className="grid grid-cols-2 md:flex md:flex-row md:items-center gap-2">
              <Skeleton className="h-8 w-24 rounded-xl" />
              <Skeleton className="h-8 w-24 rounded-xl" />
            </div>
          </div>

          {/* Event Details Skeleton */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Image Skeleton */}
            <div className="w-full md:col-span-3">
              <Skeleton className="w-full h-[226px] rounded-5xl" />
            </div>
            {/* Details Skeleton */}
            <div className="w-full md:col-span-9 md:content-center">
              <div className="grid grid-cols-1 md:grid-cols-2 md:content-center gap-4">
                {/* Dates and Links Skeleton */}
                <div className="flex flex-col gap-3">
                  <div className="grid grid-cols-[50px_1fr] items-center gap-2">
                    <Skeleton className="w-full h-11 rounded-xl" />
                    <div className="flex flex-col gap-1">
                      <Skeleton className="h-4 w-3/4 rounded-xl" />
                      <Skeleton className="h-4 w-1/2 rounded-xl" />
                    </div>
                  </div>
                  <div className="grid grid-cols-[50px_1fr] items-center gap-2">
                    <Skeleton className="w-full h-11 rounded-xl" />
                    <div className="flex flex-col gap-1">
                      <Skeleton className="h-4 w-3/4 rounded-xl" />
                      <Skeleton className="h-4 w-1/2 rounded-xl" />
                    </div>
                  </div>
                  <div className="grid grid-cols-[50px_1fr] items-center gap-2">
                    <Skeleton className="w-full h-11 rounded-xl" />
                    <div className="flex flex-col gap-1">
                      <Skeleton className="h-4 w-3/4 rounded-xl" />
                      <Skeleton className="h-4 w-1/2 rounded-xl" />
                    </div>
                  </div>
                </div>
                {/* Type, Guests, and Invites Skeleton */}
                <div className="flex flex-col gap-3">
                  <div className="grid grid-cols-[50px_1fr] items-center gap-2">
                    <Skeleton className="w-full h-11 rounded-xl" />
                    <div className="flex flex-col gap-1">
                      <Skeleton className="h-4 w-3/4 rounded-xl" />
                      <Skeleton className="h-4 w-1/2 rounded-xl" />
                    </div>
                  </div>
                  <div className="grid grid-cols-[50px_1fr] items-center gap-2">
                    <Skeleton className="w-full h-11 rounded-xl" />
                    <div className="flex flex-col gap-1">
                      <Skeleton className="h-4 w-3/4 rounded-xl" />
                      <Skeleton className="h-4 w-1/2 rounded-xl" />
                    </div>
                  </div>
                  <div className="grid grid-cols-[50px_1fr] items-center gap-2">
                    <Skeleton className="w-full h-11 rounded-xl" />
                    <div className="flex flex-col gap-1">
                      <Skeleton className="h-4 w-3/4 rounded-xl" />
                      <Skeleton className="h-4 w-1/2 rounded-xl" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* About Skeleton */}
          <div className="w-full border border-neutral-200 dark:border-[#343A40] rounded-4xl">
            <div className="p-7 flex flex-col gap-3">
              <Skeleton className="h-4 w-1/4 rounded-xl" />
              <Skeleton className="h-16 w-full rounded-xl" />
            </div>
          </div>

          {/* Manage Options Skeleton */}
          <div className="w-full flex flex-col gap-4">
            {/* Guest List Skeleton */}
            <div className="w-full py-3 px-3.5 border border-neutral-200 dark:border-[#343A40] rounded-2xl">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div className="flex flex-col gap-1.5">
                  <Skeleton className="h-4 w-24 rounded-xl" />
                  <Skeleton className="h-3 w-16 rounded-xl" />
                </div>
                <Skeleton className="h-8 w-20 rounded-xl" />
              </div>
            </div>
            {/* Self Checkin QR Skeleton */}
            <div className="w-full py-3 px-3.5 border border-neutral-200 dark:border-[#343A40] rounded-2xl">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div className="flex flex-row items-center gap-1.5">
                  <Skeleton className="w-5 h-5 rounded-md" />
                  <Skeleton className="h-4 w-40 rounded-xl" />
                </div>
                <Skeleton className="h-8 w-20 rounded-xl" />
              </div>
            </div>
            {/* Manage POAP Skeleton */}
            <div className="w-full py-3 px-3.5 border border-neutral-200 dark:border-[#343A40] rounded-2xl">
              <div className="flex flex-row items-center justify-between flex-wrap gap-3">
                <div className="flex flex-row gap-1.5">
                  <Skeleton className="w-5 h-5 rounded-md" />
                  <div className="flex flex-col gap-1.5">
                    <Skeleton className="h-4 w-24 rounded-xl" />
                    <Skeleton className="h-3 w-32 rounded-xl" />
                  </div>
                </div>
                <Skeleton className="w-16 h-16 rounded-2xl" />
              </div>
            </div>
            {/* Invite or Share Skeleton */}
            <div className="w-full py-3 px-3.5 border border-neutral-200 dark:border-[#343A40] rounded-2xl">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div className="flex flex-row items-center gap-1.5">
                  <Skeleton className="w-5 h-5 rounded-md" />
                  <Skeleton className="h-4 w-40 rounded-xl" />
                </div>
                <Skeleton className="h-8 w-20 rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ManageEventLoadingSkeleton;
