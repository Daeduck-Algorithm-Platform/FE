"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";

export function RootLayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // 로그인 관련 페이지에서는 헤더 숨김
  const hideHeader = pathname?.startsWith("/login");

  return (
    <div>
      {!hideHeader && <Header />}
      <div>{children}</div>
    </div>
  );
}
