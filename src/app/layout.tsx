import type { Metadata } from "next";
import "./globals.css";
import { RootLayoutWrapper } from "./root-layout-wrapper";

export const metadata: Metadata = {
  title: "Coding Test Platform",
  description: "Online coding test and practice platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <RootLayoutWrapper>{children}</RootLayoutWrapper>
      </body>
    </html>
  );
}
