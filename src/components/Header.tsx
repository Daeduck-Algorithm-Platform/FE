"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-black border-b border-gray-700">
      <div className="px-8 py-4 flex justify-end items-center gap-6">
        {/* 네비게이션 메뉴 및 버튼 */}
        <nav className="flex gap-6">
          <Link
            href="/problems"
            className="text-sm text-white hover:text-green-400 transition-colors font-medium"
          >
            메인
          </Link>
          <Link
            href="/community"
            className="text-sm text-white hover:text-green-400 transition-colors font-medium"
          >
            커뮤니티
          </Link>
          <Link
            href="/my-page"
            className="text-sm text-white hover:text-green-400 transition-colors font-medium"
          >
            마이페이지
          </Link>
        </nav>

        <button className="px-6 py-2 rounded-lg bg-green-400 hover:bg-green-500 text-black font-semibold text-sm transition-colors">
          로그아웃
        </button>
      </div>
    </header>
  );
}
