"use client";

import Link from "next/link";
import { Search } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-black border-b border-gray-700">
      <div className="px-8 py-3 flex justify-between items-center gap-6">
        {/* 왼쪽: 검색 input */}
        <div className="flex gap-8">
          <div className="flex-1 max-w-sm">
            <div className="flex items-center gap-3 bg-white rounded-full py-3 px-8 w-[411px]">
              <input
                type="text"
                placeholder="Daeduck Software Algorithm Platform"
                className="bg-transparent text-black text-sm outline-none flex-1 placeholder-gray-400"
              />
            </div>
          </div>

          {/* 중앙: 검색 아이콘 버튼 */}
          <button className="flex-shrink-0 py-4 px-8 hover:bg-gray-900 rounded-full transition-colors">
            <Search size={20} className="text-white" />
          </button>
        </div>

        {/* 오른쪽: 메뉴 및 버튼 */}
        <div className="flex items-center gap-6 flex-shrink-0">
          <nav className="flex gap-6">
            <Link
              href="/problems"
              className="text-sm text-white hover:text-green-400 transition-colors"
            >
              메일
            </Link>
            <Link
              href="/submissions"
              className="text-sm text-white hover:text-green-400 transition-colors"
            >
              테스트
            </Link>
            <Link
              href="/profile"
              className="text-sm text-white hover:text-green-400 transition-colors"
            >
              프로필
            </Link>
          </nav>

          <button className="px-6 py-2 rounded-full bg-green-400 hover:bg-green-500 text-black font-semibold text-sm transition-colors flex-shrink-0">
            메일
          </button>
        </div>
      </div>
    </header>
  );
}
