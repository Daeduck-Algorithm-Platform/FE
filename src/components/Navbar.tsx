"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white border-b border-gray-200 px-8 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-500">
          CodeTest
        </Link>
        <div className="flex gap-8">
          <Link
            href="/problems"
            className={`text-base transition-colors ${
              pathname === "/problems"
                ? "text-blue-500 font-semibold"
                : "text-gray-700 font-normal hover:text-blue-500"
            }`}
          >
            문제
          </Link>
          <Link
            href="/submissions"
            className={`text-base transition-colors ${
              pathname === "/submissions"
                ? "text-blue-500 font-semibold"
                : "text-gray-700 font-normal hover:text-blue-500"
            }`}
          >
            제출 기록
          </Link>
          <Link
            href="/ranking"
            className={`text-base transition-colors ${
              pathname === "/ranking"
                ? "text-blue-500 font-semibold"
                : "text-gray-700 font-normal hover:text-blue-500"
            }`}
          >
            랭킹
          </Link>
        </div>
      </div>
    </nav>
  );
}
