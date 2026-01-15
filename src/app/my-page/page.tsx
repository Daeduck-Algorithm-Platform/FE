"use client";

import Link from "next/link";
import { Settings, TrendingUp, BookOpen, Target, Award } from "lucide-react";

export default function MyPageDashboard() {
  return (
    <div className="bg-[#0b0b0b] min-h-screen">
      {/* 헤더 */}
      <header className="sticky top-0 z-40 bg-black border-b border-gray-900">
        <div className="px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">마이페이지</h1>
          <button className="p-2 hover:bg-gray-900 rounded-lg transition-colors">
            <Settings size={20} className="text-gray-400" />
          </button>
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
                <h2 className="text-2xl font-bold text-white mb-1">정승우</h2>
                <p className="text-gray-400 text-sm mb-4">@jungseung-woo</p>
                <div className="flex items-center gap-4">
                  <span className="inline-block px-3 py-1 bg-yellow-500/20 text-yellow-400 text-xs rounded">
                    🥇 레벨 15
                  </span>
                  <span className="inline-block px-3 py-1 bg-green-500/20 text-green-400 text-xs rounded">
                    스트릭: 7일
                  </span>
                </div>
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
              <div className="text-3xl font-bold text-white">12</div>
              <p className="text-gray-500 text-xs mt-2">전체 문제의 92%</p>
            </div>

            <div className="bg-[#0d0d0d] border border-gray-900 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <TrendingUp className="text-blue-400" size={20} />
                <h3 className="text-gray-400 text-sm">정답률</h3>
              </div>
              <div className="text-3xl font-bold text-white">85%</div>
              <p className="text-gray-500 text-xs mt-2">지난주 대비 +5%</p>
            </div>

            <div className="bg-[#0d0d0d] border border-gray-900 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <Award className="text-yellow-400" size={20} />
                <h3 className="text-gray-400 text-sm">점수</h3>
              </div>
              <div className="text-3xl font-bold text-white">3,580</div>
              <p className="text-gray-500 text-xs mt-2">랭킹 #4</p>
            </div>

            <div className="bg-[#0d0d0d] border border-gray-900 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <BookOpen className="text-purple-400" size={20} />
                <h3 className="text-gray-400 text-sm">학습 시간</h3>
              </div>
              <div className="text-3xl font-bold text-white">24h</div>
              <p className="text-gray-500 text-xs mt-2">이번 달</p>
            </div>
          </div>

          {/* 학습 분석 */}
          <div className="grid grid-cols-2 gap-6">
            {/* 난이도별 통계 */}
            <div className="bg-[#0d0d0d] border border-gray-900 rounded-lg p-6">
              <h3 className="text-white font-bold mb-6">난이도별 통계</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-green-400 text-sm">쉬움</span>
                    <span className="text-white text-sm">8/8</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className="bg-green-500 h-2 rounded-full"
                      style={{ width: "100%" }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-yellow-400 text-sm">중간</span>
                    <span className="text-white text-sm">3/5</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className="bg-yellow-500 h-2 rounded-full"
                      style={{ width: "60%" }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-red-400 text-sm">어려움</span>
                    <span className="text-white text-sm">1/2</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-2">
                    <div
                      className="bg-red-500 h-2 rounded-full"
                      style={{ width: "50%" }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 언어별 통계 */}
            <div className="bg-[#0d0d0d] border border-gray-900 rounded-lg p-6">
              <h3 className="text-white font-bold mb-6">사용 언어</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Python</p>
                    <p className="text-gray-500 text-sm">8문제</p>
                  </div>
                  <span className="text-green-400 font-bold">67%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">JavaScript</p>
                    <p className="text-gray-500 text-sm">3문제</p>
                  </div>
                  <span className="text-blue-400 font-bold">25%</span>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-white font-medium">Java</p>
                    <p className="text-gray-500 text-sm">1문제</p>
                  </div>
                  <span className="text-orange-400 font-bold">8%</span>
                </div>
              </div>
            </div>
          </div>

          {/* 최근 활동 */}
          <div className="bg-[#0d0d0d] border border-gray-900 rounded-lg p-6">
            <h3 className="text-white font-bold mb-6">최근 활동</h3>
            <div className="space-y-4">
              {[
                {
                  title: "마이크로소프트 로고",
                  status: "해결",
                  time: "2시간 전",
                },
                { title: "감지 계산", status: "미해결", time: "5시간 전" },
                { title: "DNA 헬릭스 2", status: "해결", time: "1일 전" },
              ].map((activity, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between py-3 border-b border-gray-800 last:border-0"
                >
                  <div>
                    <p className="text-white font-medium">{activity.title}</p>
                    <p className="text-gray-500 text-sm">{activity.time}</p>
                  </div>
                  <span
                    className={`inline-block px-3 py-1 rounded text-xs ${
                      activity.status === "해결"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-gray-500/20 text-gray-400"
                    }`}
                  >
                    {activity.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
