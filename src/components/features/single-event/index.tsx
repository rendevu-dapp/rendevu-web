// react
import { Suspense } from "react";

// components
import EventDetails from "./event-details";
import LoadingSkeleton from "./loading-skeleton";

export const SingleEventPage = () => {
  return (
    <main className="min-h-screen dark:bg-[#181A1B]">
      <div className="container max-w-6xl mx-auto pt-14 pb-20 px-4">
        <Suspense fallback={<LoadingSkeleton />}>
          <EventDetails />
        </Suspense>
      </div>
    </main>
  );
};
