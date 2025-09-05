"use client";

// next
import { useParams } from "next/navigation";
// react
import { Suspense } from "react";

// components
import GuestListDataTable from "./data-table";
import GuestListSkeleton from "./guest-list-skeleton";

export const GuestListPage = () => {
  // hooks
  const { eventId } = useParams<{ eventId: string }>();

  return (
    <main className="min-h-screen dark:bg-[#181A1B]">
      <div className="container max-w-6xl mx-auto pt-14 pb-20 px-4">
        <Suspense fallback={<GuestListSkeleton />}>
          <GuestListDataTable eventId={eventId} />
        </Suspense>
      </div>
    </main>
  );
};
