"use client";

// react
import { Suspense } from "react";

// features
import { EventsPage } from "@/components/features/events";

export default function Events() {
  return (
    <Suspense>
      <EventsPage />
    </Suspense>
  );
}
