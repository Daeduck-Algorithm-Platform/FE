"use client";

import Link from "next/link";
import { Star, TrendingUp } from "lucide-react";

const featuredProblems = [
  {
    id: "1",
    title: "마이크로소프트 로고",
    difficulty: "Easy",
    category: ["그래프"],
    acceptanceRate: 52,
    rating: 4.8,
    submissions: 3500,
  },
  {
    id: "2",
    title: "감지 계산",
    difficulty: "Medium",
    category: ["동적계획법"],
    acceptanceRate: 48,
    rating: 4.6,
    submissions: 2800,
  },
  {
    id: "3",
    title: "DNA 헬릭스 2",
    difficulty: "Hard",
    category: ["문자열"],
    acceptanceRate: 23,
    rating: 4.9,
    submissions: 1200,
  },
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "Easy":
      return "text-green-400 bg-green-500 bg-opacity-10";
    case "Medium":
      return "text-yellow-400 bg-yellow-500 bg-opacity-10";
    case "Hard":
      return "text-red-400 bg-red-500 bg-opacity-10";
    default:
      return "text-gray-400 bg-gray-500 bg-opacity-10";
  }
};

export default function FeaturedProblems() {
  return (
    <section className="relative bg-black py-20 overflow-hidden">
      {/* 배경 효과 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-10 top-1/2 left-1/4"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* 섹션 헤더 */}
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-bold text-white mb-2">
              인기 있는 문제들
            </h2>
            <p className="text-gray-400">
              많은 사람들이 도전하고 있는 문제를 풀어보세요
            </p>
          </div>
          <Link
            href="/problems"
            className="px-6 py-2 rounded-lg border border-green-500 text-green-400 hover:bg-green-500 hover:text-black font-semibold transition-all"
          >
            모두 보기 →
          </Link>
        </div>

        {/* 문제 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProblems.map((problem) => (
            <Link key={problem.id} href={`/problems/${problem.id}`}>
              <div className="group h-full p-6 rounded-xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-green-500 hover:border-opacity-50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20 cursor-pointer">
                {/* 헤더 */}
                <div className="mb-4 flex justify-between items-start gap-4">
                  <h3 className="text-lg font-bold text-white flex-1 group-hover:text-green-400 transition-colors">
                    {problem.title}
                  </h3>
                  <div className="flex gap-1">
                    {[...Array(Math.round(problem.rating))].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className="fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </div>

                {/* 난이도 및 카테고리 */}
                <div className="flex gap-2 mb-6 flex-wrap">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(
                      problem.difficulty
                    )}`}
                  >
                    {problem.difficulty}
                  </span>
                  {problem.category.map((cat) => (
                    <span
                      key={cat}
                      className="px-3 py-1 rounded-full text-xs bg-gray-800 text-gray-300"
                    >
                      {cat}
                    </span>
                  ))}
                </div>

                {/* 통계 */}
                <div className="space-y-3 pt-4 border-t border-gray-800">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">정답률</span>
                    <span className="text-green-400 font-semibold">
                      {problem.acceptanceRate}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-400">제출 수</span>
                    <div className="flex items-center gap-1 text-gray-300">
                      <TrendingUp size={14} />
                      {(problem.submissions / 1000).toFixed(1)}k
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
