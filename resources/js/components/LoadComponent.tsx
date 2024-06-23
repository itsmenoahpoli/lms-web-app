import React from "react";
import { LoadingPage } from "@/components/shared";

export const LoadComponent = (Component: React.ComponentType) => {
  return (
    <React.Suspense fallback={<LoadingPage />}>
      <Component />
    </React.Suspense>
  );
};
