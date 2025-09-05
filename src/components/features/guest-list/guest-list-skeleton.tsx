"use client";

import { Skeleton } from "@heroui/react";

const GuestListSkeleton = () => {
  return (
    <div className="flex flex-col gap-3 dark:bg-[#181A1B]">
      <div className="bg-white dark:bg-[#181A1B] rounded-2xl shadow-sm border border-neutral-200 dark:border-[#343A40]">
        {/* Header Skeleton */}
        <div className="relative p-4 md:p-6 border-b border-neutral-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Skeleton className="h-6 w-24 rounded-xl" />
              <Skeleton className="h-5 w-16 rounded-xl" />
            </div>
            <Skeleton className="h-8 w-24 rounded-2xl absolute top-5 right-4 md:right-6" />
          </div>
        </div>
        {/* Table Skeleton */}
        <div className="w-full overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-neutral-200">
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 w-full max-w-1/4">
                  <Skeleton className="h-4 w-16 rounded-xl" />
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  <Skeleton className="h-4 w-16 rounded-xl" />
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                  <Skeleton className="h-4 w-20 rounded-xl" />
                </th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600 md:hidden xl:table-cell">
                  <Skeleton className="h-4 w-24 rounded-xl" />
                </th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 5 }).map((_, index) => (
                <tr key={index} className="border-b border-neutral-200">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Skeleton className="w-10 h-10 rounded-full" />
                      <div className="flex flex-col gap-1">
                        <Skeleton className="h-4 w-32 rounded-xl" />
                        <Skeleton className="h-3 w-24 rounded-xl" />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Skeleton className="h-5 w-16 rounded-full" />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <Skeleton className="w-7 h-7 rounded-full" />
                      <div className="flex gap-2">
                        <Skeleton className="h-4 w-16 rounded-xl" />
                        <Skeleton className="h-3 w-12 rounded-xl" />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 md:hidden xl:table-cell">
                    <Skeleton className="h-4 w-20 rounded-xl" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GuestListSkeleton;
