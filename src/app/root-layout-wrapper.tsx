"use client";

import Header from "@/components/Header";

export function RootLayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      <div>{children}</div>
    </div>
  );
}
