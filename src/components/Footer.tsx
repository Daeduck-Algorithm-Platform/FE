"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bg-black border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* 브랜드 */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
              Daeduck
            </h3>
            <p className="text-gray-400 text-sm">
              대덕 소프트웨어 알고리즘 플랫폼에서 코딩 테스트를 완벽히
              준비하세요.
            </p>
          </div>

          {/* 제품 */}
          <div>
            <h4 className="text-white font-semibold mb-4">제품</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/problems"
                  className="text-gray-400 hover:text-green-400 text-sm transition-colors"
                >
                  문제 풀이
                </Link>
              </li>
              <li>
                <Link
                  href="/submissions"
                  className="text-gray-400 hover:text-green-400 text-sm transition-colors"
                >
                  제출 기록
                </Link>
              </li>
              <li>
                <Link
                  href="/ranking"
                  className="text-gray-400 hover:text-green-400 text-sm transition-colors"
                >
                  랭킹
                </Link>
              </li>
            </ul>
          </div>

          {/* 학습 */}
          <div>
            <h4 className="text-white font-semibold mb-4">학습</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-green-400 text-sm transition-colors"
                >
                  학습 가이드
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-green-400 text-sm transition-colors"
                >
                  토론 게시판
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-green-400 text-sm transition-colors"
                >
                  채용 정보
                </a>
              </li>
            </ul>
          </div>

          {/* 연락처 */}
          <div>
            <h4 className="text-white font-semibold mb-4">연락처</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="mailto:support@daeduck.com"
                  className="text-gray-400 hover:text-green-400 text-sm transition-colors"
                >
                  support@daeduck.com
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-green-400 text-sm transition-colors"
                >
                  트위터
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-green-400 text-sm transition-colors"
                >
                  깃허브
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 하단 */}
        <div className="border-t border-gray-800 pt-8 flex justify-between items-center text-sm text-gray-400">
          <p>&copy; 2026 Daeduck Platform. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-green-400 transition-colors">
              개인정보처리방침
            </a>
            <a href="#" className="hover:text-green-400 transition-colors">
              이용약관
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
