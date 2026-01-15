"use client";

import Link from "next/link";
import { ArrowUpDown, Shield } from "lucide-react";
import FilterSidebar from "./FilterSidebar";

interface Problem {
  id: string;
  number: number;
  title: string;
  difficulty: "쉬움" | "중간" | "어려움";
  acceptanceRate: number;
  submissionCount: number;
  likes: number;
  solveCount: number;
}

const problems: Problem[] = [
  {
    id: "1",
    number: 1,
    title: "마이크로소프트 로고",
    difficulty: "쉬움",
    acceptanceRate: 52,
    submissionCount: 3500,
    likes: 10,
    solveCount: 3000,
  },
  {
    id: "2",
    number: 2,
    title: "감지 계산",
    difficulty: "중간",
    acceptanceRate: 48,
    submissionCount: 3012,
    likes: 130,
    solveCount: 700,
  },
  {
    id: "3",
    number: 3,
    title: "DNA 헬릭스 2",
    difficulty: "중간",
    acceptanceRate: 23,
    submissionCount: 12,
    likes: 1,
    solveCount: 23,
  },
  {
    id: "4",
    number: 4,
    title: "Contact",
    difficulty: "쉬움",
    acceptanceRate: 120,
    submissionCount: 1313,
    likes: 1012,
    solveCount: 120,
  },
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "쉬움":
      return "text-green-400";
    case "중간":
      return "text-yellow-400";
    case "어려움":
      return "text-red-400";
    default:
      return "text-gray-400";
  }
};

export default function ProblemsMainContent() {
  return (
    <div className="flex bg-black">
      {/* 왼쪽 사이드바 */}
      <FilterSidebar />

      {/* 메인 콘텐츠 */}
      <main className="flex-1 p-6">
        {/* 탭 */}
        <div className="flex gap-4 mb-6 border-b border-gray-700 pb-4">
          <button className="text-green-400 font-semibold text-sm border-b-2 border-green-400 pb-2">
            문제
          </button>
          <button className="text-gray-400 font-semibold text-sm hover:text-gray-300">
            기여
          </button>
          <button className="text-gray-400 font-semibold text-sm hover:text-gray-300">
            랭킹
          </button>
        </div>

        {/* 필터 정보 */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-white font-semibold text-lg">문제</h2>
            <p className="text-gray-400 text-sm mt-1">
              실전에 나오는 문제들을 풀고 실력을 키우세요.
            </p>
          </div>
          <button className="px-4 py-2 rounded bg-green-500 hover:bg-green-600 text-black font-semibold text-sm transition-colors">
            추가하기
          </button>
        </div>

        {/* 문제 테이블 */}
        <div className="rounded border border-gray-700 overflow-hidden">
          {/* 테이블 헤더 */}
          <div className="bg-gray-900 border-b border-gray-700 grid grid-cols-12 gap-4 px-6 py-4 text-sm text-gray-400 font-semibold">
            <div className="col-span-6 flex items-center gap-2 cursor-pointer hover:text-gray-300">
              번호 <ArrowUpDown size={16} />
            </div>
            <div className="col-span-2 flex items-center gap-2 cursor-pointer hover:text-gray-300">
              난이도 <ArrowUpDown size={16} />
            </div>
            <div className="col-span-2 flex items-center gap-2 cursor-pointer hover:text-gray-300">
              정답률 <ArrowUpDown size={16} />
            </div>
            <div className="col-span-2 flex items-center gap-2 cursor-pointer hover:text-gray-300">
              제출 <ArrowUpDown size={16} />
            </div>
          </div>

          {/* 테이블 바디 */}
          {problems.map((problem, index) => (
            <Link key={problem.id} href={`/problems/${problem.id}`}>
              <div
                className={`grid grid-cols-12 gap-4 px-6 py-4 text-sm border-b border-gray-700 hover:bg-gray-900 transition-colors cursor-pointer ${
                  index === 0 ? "bg-red-500 bg-opacity-10" : ""
                }`}
              >
                {/* 번호와 제목 */}
                <div className="col-span-6 flex items-center gap-3">
                  <span className="text-gray-500 w-8">{problem.number}</span>
                  <div className="flex-1">
                    {index === 0 && (
                      <span className="inline-block px-2 py-1 bg-red-500 text-white text-xs rounded mr-2">
                        어려움
                      </span>
                    )}
                    <span className="text-white font-medium hover:text-green-400">
                      {problem.title}
                    </span>
                  </div>
                </div>

                {/* 난이도 */}
                <div
                  className={`col-span-2 ${getDifficultyColor(
                    problem.difficulty
                  )}`}
                >
                  {problem.difficulty}
                </div>

                {/* 정답률 */}
                <div className="col-span-2 text-gray-400">
                  {problem.acceptanceRate}%
                </div>

                {/* 제출 수 */}
                <div className="col-span-2 text-gray-400">
                  {problem.submissionCount}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
