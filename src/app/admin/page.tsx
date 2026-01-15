"use client";

import { useState } from "react";
import {
  Users,
  BookOpen,
  TrendingUp,
  Activity,
  Settings,
  BarChart3,
  AlertCircle,
  CheckCircle,
  Clock,
  Award,
} from "lucide-react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"overview" | "users" | "problems">(
    "overview"
  );

  return (
    <div className="bg-[#0b0b0b] min-h-screen">
      {/* 헤더 */}
      <header className="sticky top-0 z-40 bg-black border-b border-gray-900">
        <div className="px-8 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">관리자 대시보드</h1>
          <button className="p-2 hover:bg-gray-900 rounded-lg transition-colors">
            <Settings size={20} className="text-gray-400" />
          </button>
        </div>
      </header>

      <main className="px-8 py-12">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* 탭 네비게이션 */}
          <div className="flex gap-2 border-b border-gray-900">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === "overview"
                  ? "text-white border-b-2 border-blue-500"
                  : "text-gray-400 hover:text-gray-300"
              }`}
            >
              전체 현황
            </button>
            <button
              onClick={() => setActiveTab("users")}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === "users"
                  ? "text-white border-b-2 border-blue-500"
                  : "text-gray-400 hover:text-gray-300"
              }`}
            >
              사용자 관리
            </button>
            <button
              onClick={() => setActiveTab("problems")}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === "problems"
                  ? "text-white border-b-2 border-blue-500"
                  : "text-gray-400 hover:text-gray-300"
              }`}
            >
              문제 관리
            </button>
          </div>

          {/* 전체 현황 탭 */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* 주요 지표 카드 */}
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Users className="text-blue-400" size={24} />
                    <TrendingUp className="text-blue-400" size={16} />
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">4</div>
                  <p className="text-blue-300 text-sm">총 사용자</p>
                  <p className="text-blue-400/70 text-xs mt-2">
                    전월 대비 +33%
                  </p>
                </div>

                <div className="bg-gradient-to-br from-green-500/20 to-green-600/20 border border-green-500/30 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-3">
                    <CheckCircle className="text-green-400" size={24} />
                    <TrendingUp className="text-green-400" size={16} />
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">2</div>
                  <p className="text-green-300 text-sm">활성 사용자</p>
                  <p className="text-green-400/70 text-xs mt-2">이번 주 활동</p>
                </div>

                <div className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-3">
                    <BookOpen className="text-purple-400" size={24} />
                    <Activity className="text-purple-400" size={16} />
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">10</div>
                  <p className="text-purple-300 text-sm">전체 문제</p>
                  <p className="text-purple-400/70 text-xs mt-2">
                    평균 완료율 57.5%
                  </p>
                </div>

                <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-3">
                    <Award className="text-yellow-400" size={24} />
                    <TrendingUp className="text-yellow-400" size={16} />
                  </div>
                  <div className="text-3xl font-bold text-white mb-1">23</div>
                  <p className="text-yellow-300 text-sm">총 제출 수</p>
                  <p className="text-yellow-400/70 text-xs mt-2">오늘 +3건</p>
                </div>
              </div>

              {/* 일별 활동 차트 */}
              <div className="bg-[#0d0d0d] border border-gray-900 rounded-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-white font-bold flex items-center gap-2">
                    <BarChart3 size={20} className="text-blue-400" />
                    일별 활동 현황
                  </h3>
                  <select className="bg-gray-900 text-white text-sm px-3 py-1 rounded border border-gray-800">
                    <option>최근 7일</option>
                    <option>최근 30일</option>
                    <option>최근 90일</option>
                  </select>
                </div>
                <div className="space-y-3">
                  {[
                    { date: "1/9", users: 1, submissions: 2 },
                    { date: "1/10", users: 2, submissions: 4 },
                    { date: "1/11", users: 1, submissions: 3 },
                    { date: "1/12", users: 3, submissions: 5 },
                    { date: "1/13", users: 2, submissions: 4 },
                    { date: "1/14", users: 2, submissions: 3 },
                    { date: "1/15", users: 2, submissions: 2 },
                  ].map((item, idx) => (
                    <div key={idx} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-400 text-sm w-16">
                          {item.date}
                        </span>
                        <div className="flex-1 flex gap-2">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-blue-400 text-xs">
                                활성 사용자
                              </span>
                              <span className="text-white text-xs font-bold">
                                {item.users}
                              </span>
                            </div>
                            <div className="bg-gray-800 rounded-full h-2">
                              <div
                                className="bg-blue-500 h-2 rounded-full"
                                style={{ width: `${(item.users / 4) * 100}%` }}
                              />
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-green-400 text-xs">
                                제출 수
                              </span>
                              <span className="text-white text-xs font-bold">
                                {item.submissions}
                              </span>
                            </div>
                            <div className="bg-gray-800 rounded-full h-2">
                              <div
                                className="bg-green-500 h-2 rounded-full"
                                style={{
                                  width: `${(item.submissions / 5) * 100}%`,
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 문제별 통계 */}
              <div className="bg-[#0d0d0d] border border-gray-900 rounded-lg p-6">
                <h3 className="text-white font-bold mb-6">문제별 통계</h3>
                <div className="space-y-3">
                  {[
                    {
                      title: "감지 계산",
                      attempts: 4,
                      success: 4,
                      rate: 100,
                    },
                    {
                      title: "DNA 헬릭스 2",
                      attempts: 4,
                      success: 3,
                      rate: 75,
                    },
                    {
                      title: "스도쿠 체커",
                      attempts: 3,
                      success: 2,
                      rate: 66.7,
                    },
                    {
                      title: "마이크로소프트 로고",
                      attempts: 3,
                      success: 3,
                      rate: 100,
                    },
                    {
                      title: "숫자 나선",
                      attempts: 4,
                      success: 3,
                      rate: 75,
                    },
                  ].map((problem, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between py-3 border-b border-gray-800 last:border-0"
                    >
                      <div className="flex-1">
                        <p className="text-white font-medium mb-1">
                          {problem.title}
                        </p>
                        <p className="text-gray-500 text-sm">
                          시도: {problem.attempts}회 / 성공: {problem.success}회
                        </p>
                      </div>
                      <div className="text-right">
                        <p
                          className={`text-lg font-bold ${
                            problem.rate >= 80
                              ? "text-green-400"
                              : problem.rate >= 60
                              ? "text-yellow-400"
                              : "text-red-400"
                          }`}
                        >
                          {problem.rate}%
                        </p>
                        <p className="text-gray-500 text-xs">정답률</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 사용자 관리 탭 */}
          {activeTab === "users" && (
            <div className="space-y-6">
              {/* 사용자 목록 */}
              <div className="bg-[#0d0d0d] border border-gray-900 rounded-lg overflow-hidden">
                <div className="p-6 border-b border-gray-900">
                  <h3 className="text-white font-bold">전체 사용자</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-900/50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          사용자
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          레벨
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          해결 문제
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          정답률
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          마지막 활동
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          상태
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {[
                        {
                          name: "정승우",
                          level: 15,
                          solved: 5,
                          rate: 100,
                          lastActive: "2시간 전",
                          active: true,
                        },
                        {
                          name: "강은찬",
                          level: 18,
                          solved: 8,
                          rate: 100,
                          lastActive: "5시간 전",
                          active: true,
                        },
                        {
                          name: "조성현",
                          level: 16,
                          solved: 6,
                          rate: 100,
                          lastActive: "1일 전",
                          active: false,
                        },
                        {
                          name: "유재민",
                          level: 12,
                          solved: 4,
                          rate: 75,
                          lastActive: "3일 전",
                          active: false,
                        },
                      ].map((user, idx) => (
                        <tr key={idx} className="hover:bg-gray-900/30">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
                                <span className="text-white font-bold text-sm">
                                  {user.name[0]}
                                </span>
                              </div>
                              <div>
                                <p className="text-white font-medium">
                                  {user.name}
                                </p>
                                <p className="text-gray-500 text-xs">
                                  @{user.name.toLowerCase()}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-yellow-400 font-medium">
                              Lv {user.level}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-white">{user.solved}</span>
                            <span className="text-gray-500">/10</span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-green-400 font-medium">
                              {user.rate}%
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <Clock size={14} className="text-gray-500" />
                              <span className="text-gray-400 text-sm">
                                {user.lastActive}
                              </span>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                                user.active
                                  ? "bg-green-500/20 text-green-400"
                                  : "bg-gray-500/20 text-gray-400"
                              }`}
                            >
                              {user.active ? (
                                <>
                                  <CheckCircle size={12} />
                                  활성
                                </>
                              ) : (
                                <>
                                  <AlertCircle size={12} />
                                  비활성
                                </>
                              )}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* 문제 관리 탭 */}
          {activeTab === "problems" && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-white font-bold">문제 목록</h3>
                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                  + 새 문제 추가
                </button>
              </div>

              <div className="bg-[#0d0d0d] border border-gray-900 rounded-lg overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-900/50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          문제명
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          난이도
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          정답률
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          시도 수
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          상태
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                          작업
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {[
                        {
                          id: 1,
                          title: "감지 계산",
                          difficulty: "쉬움",
                          rate: 100,
                          attempts: 4,
                          active: true,
                        },
                        {
                          id: 2,
                          title: "DNA 헬릭스 2",
                          difficulty: "중간",
                          rate: 75,
                          attempts: 4,
                          active: true,
                        },
                        {
                          id: 3,
                          title: "스도쿠 체커",
                          difficulty: "어려움",
                          rate: 66.7,
                          attempts: 3,
                          active: true,
                        },
                      ].map((problem) => (
                        <tr key={problem.id} className="hover:bg-gray-900/30">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-gray-400 text-sm">
                              #{problem.id}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-white font-medium">
                              {problem.title}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                                problem.difficulty === "쉬움"
                                  ? "bg-green-500/20 text-green-400"
                                  : problem.difficulty === "중간"
                                  ? "bg-yellow-500/20 text-yellow-400"
                                  : "bg-red-500/20 text-red-400"
                              }`}
                            >
                              {problem.difficulty}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-green-400 font-medium">
                              {problem.rate}%
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="text-white">
                              {problem.attempts}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium ${
                                problem.active
                                  ? "bg-green-500/20 text-green-400"
                                  : "bg-gray-500/20 text-gray-400"
                              }`}
                            >
                              {problem.active ? (
                                <>
                                  <CheckCircle size={12} />
                                  활성
                                </>
                              ) : (
                                <>
                                  <AlertCircle size={12} />
                                  비활성
                                </>
                              )}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <button className="text-blue-400 hover:text-blue-300 text-sm mr-3">
                              수정
                            </button>
                            <button className="text-red-400 hover:text-red-300 text-sm">
                              삭제
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
