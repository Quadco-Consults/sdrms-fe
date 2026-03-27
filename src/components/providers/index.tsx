"use client";

import { ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

interface ProvidersProps {
  children: ReactNode;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        {children}
        <Toaster position="top-right" richColors />
      </QueryClientProvider>
    </SessionProvider>
  );
}
