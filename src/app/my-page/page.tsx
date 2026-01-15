"use client";

import Link from "next/link";
import {
  Settings,
  TrendingUp,
  BookOpen,
  Target,
  Award,
  Calendar,
  BarChart3,
  Activity,
} from "lucide-react";

export default function MyPageDashboard() {
  return (
    <div className="bg-[#0b0b0b] min-h-screen">
      {/* 헤더 */}
      <header className="sticky top-0 z-40 bg-black border-b border-gray-900">
        <div className="px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">마이페이지</h1>
        </div>
      </header>

      <main className="px-8 py-12">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* 프로필 섹션 */}
          <div className="bg-[#0d0d0d] border border-gray-900 rounded-xl p-8">
            <div className="flex items-start gap-6">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-3xl text-white font-bold">J</span>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white mb-1">
                  2215 조성현
                </h2>
              </div>
            </div>
          </div>

          {/* 통계 카드 */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-[#0d0d0d] border border-gray-900 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Target className="text-green-400" size={20} />
                <h3 className="text-gray-400 text-sm">해결한 문제</h3>
              </div>
              <div className="text-3xl font-bold text-white">5</div>
              <p className="text-gray-500 text-xs mt-2">전체 10문제 중</p>
            </div>

            <div className="bg-[#0d0d0d] border border-gray-900 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="text-blue-400" size={20} />
                <h3 className="text-gray-400 text-sm">정답률</h3>
              </div>
              <div className="text-3xl font-bold text-white">100%</div>
              <p className="text-gray-500 text-xs mt-2">지난주 대비 +15%</p>
            </div>

            <div className="bg-[#0d0d0d] border border-gray-900 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Award className="text-yellow-400" size={20} />
                <h3 className="text-gray-400 text-sm">점수</h3>
              </div>
              <div className="text-3xl font-bold text-white">3,200</div>
              <p className="text-gray-500 text-xs mt-2">랭킹 #3</p>
            </div>
          </div>

          {/* 학습 분석 */}
          <div className="grid grid-cols-1 gap-6">
            {/* 주간 활동 차트 */}
            <div className="bg-[#0d0d0d] border border-gray-900 rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white font-bold flex items-center gap-2">
                  <BarChart3 size={20} className="text-blue-400" />
                  주간 활동
                </h3>
                <span className="text-xs text-gray-500">최근 7일</span>
              </div>
              <div className="space-y-3">
                {[
                  { day: "월", solved: 1, max: 10 },
                  { day: "화", solved: 0, max: 10 },
                  { day: "수", solved: 1, max: 10 },
                  { day: "목", solved: 1, max: 10 },
                  { day: "금", solved: 2, max: 10 },
                  { day: "토", solved: 0, max: 10 },
                  { day: "일", solved: 0, max: 10 },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <span className="text-gray-400 text-sm w-6">
                      {item.day}
                    </span>
                    <div className="flex-1 bg-gray-800 rounded-full h-6 relative overflow-hidden">
                      <div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-end pr-2"
                        style={{ width: `${(item.solved / item.max) * 100}%` }}
                      >
                        {item.solved > 0 && (
                          <span className="text-white text-xs font-bold">
                            {item.solved}
                          </span>
                        )}
                      </div>
                    </div>
                    <span className="text-gray-500 text-xs w-8">
                      /{item.max}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 학습 패턴 분석 */}
          </div>

          {/* 상세 통계 */}
          <div className="grid grid-cols-1 gap-6">
            {/* 난이도별 통계 */}
            <div className="bg-[#0d0d0d] border border-gray-900 rounded-lg p-6">
              <h3 className="text-white font-bold mb-6">난이도별 통계</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-green-400 text-sm">쉬움</span>
                    <span className="text-white text-sm">2/3</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: "67%" }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-yellow-400 text-sm">중간</span>
                    <span className="text-white text-sm">3/4</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className="bg-yellow-500 h-2 rounded-full"
                      style={{ width: "75%" }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-red-400 text-sm">어려움</span>
                    <span className="text-white text-sm">0/3</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className="bg-red-500 h-2 rounded-full"
                      style={{ width: "0%" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 최근 활동 */}
        </div>
      </main>
    </div>
  );
}
