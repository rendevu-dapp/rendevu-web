"use client";

// react
import { Suspense } from "react";

// components
import PoapsArea from "./poaps-area";

export const ManageEventPoapsPage = () => {
  return (
    <main className="min-h-screen dark:bg-[#181A1B]">
      <div className="container max-w-6xl mx-auto pt-14 pb-20 px-4">
        <Suspense fallback={<div className="text-center">Loading...</div>}>
          <PoapsArea />
        </Suspense>
      </div>
    </main>
  );
};
