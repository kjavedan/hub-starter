"use client";

import type * as React from "react";
import { useState } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { tsr } from "@/lib/tsr";

import { ThemeProvider } from "./theme-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <tsr.ReactQueryProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </tsr.ReactQueryProvider>
    </QueryClientProvider>
  );
}
