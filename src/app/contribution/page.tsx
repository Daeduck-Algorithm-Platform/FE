"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import FilterSidebar from "@/components/FilterSidebar";

interface ContributedProblem {
  id: string;
  number: number;
  title: string;
  difficulty: "쉬움" | "중간" | "어려움";
  createdAt: string;
  status: "승인" | "검수중" | "거절";
}

const contributedProblems: ContributedProblem[] = [
  {
    id: "101",
    number: 1,
    title: "배열의 중앙값 구하기",
    difficulty: "쉬움",
    createdAt: "2024-01-10",
    status: "승인",
  },
  {
    id: "102",
    number: 2,
    title: "정렬된 배열 병합",
    difficulty: "중간",
    createdAt: "2024-01-12",
    status: "검수중",
  },
  {
    id: "103",
    number: 3,
    title: "이진 검색 구현",
    difficulty: "쉬움",
    createdAt: "2024-01-14",
    status: "승인",
  },
  {
    id: "104",
    number: 4,
    title: "그래프 경로 찾기",
    difficulty: "어려움",
    createdAt: "2024-01-13",
    status: "거절",
  },
  {
    id: "105",
    number: 5,
    title: "스택 구현하기",
    difficulty: "중간",
    createdAt: "2024-01-15",
    status: "검수중",
  },
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "쉬움":
      return "text-green-400";
    case "중간":
      return "text-gray-200";
    case "어려움":
      return "text-red-400";
    default:
      return "text-gray-400";
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "승인":
      return "text-green-400";
    case "검수중":
      return "text-yellow-400";
    case "거절":
      return "text-red-400";
    default:
      return "text-gray-500";
  }
};

export default function ContributionPage() {
  return (
    <div className="flex bg-[#0b0b0b] min-h-screen">
      <FilterSidebar />

      <main className="flex-1 px-10 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-start justify-between mb-10">
            <div>
              <h1 className="text-3xl font-bold text-white">기여</h1>
              <p className="text-sm text-gray-400 mt-3">
                문제를 추가 및 수정할 수 있어요.
              </p>
            </div>
            <button className="flex items-center gap-2 bg-green-400 text-black font-bold px-6 py-3 rounded-lg hover:bg-green-500 transition-colors">
              <Plus size={20} />
              추가하기
            </button>
          </div>

          <div className="flex gap-8 text-sm mb-8 border-b border-gray-900">
            <Link
              href="/problems"
              className="text-gray-500 font-bold hover:text-gray-300 pb-4 transition-colors"
            >
              문제
            </Link>
            <Link
              href="/contribution"
              className="text-green-400 font-bold border-b-2 border-green-500 pb-4"
            >
              기여
            </Link>
            <Link
              href="/ranking"
              className="text-gray-500 font-bold hover:text-gray-300 pb-4 transition-colors"
            >
              랭킹
            </Link>
          </div>

          {/* Contributed Problems Table */}
          <div className="rounded-xl border border-gray-900 overflow-hidden bg-[#0d0d0d]">
            <div className="grid grid-cols-[70px,1.4fr,110px,110px,140px,140px] px-6 py-4 text-xs tracking-wide text-gray-500 uppercase border-b border-gray-900 bg-black/30">
              <span>번호</span>
              <span>제목</span>
              <span>난이도</span>
              <span>상태</span>
              <span>생성일</span>
              <span>작업</span>
            </div>

            {contributedProblems.map((problem) => (
              <div
                key={problem.id}
                className="grid grid-cols-[70px,1.4fr,110px,110px,140px,140px] px-6 py-4 text-sm items-center border-b border-gray-900 hover:bg-[#111111] transition-colors"
              >
                <span className="text-gray-500">{problem.number}</span>

                <div className="flex items-center gap-2">
                  <span className="text-white font-medium hover:text-green-400 transition-colors cursor-pointer">
                    {problem.title}
                  </span>
                </div>

                <span
                  className={`font-semibold ${getDifficultyColor(
                    problem.difficulty
                  )}`}
                >
                  {problem.difficulty}
                </span>

                <span
                  className={`font-semibold text-xs ${getStatusColor(
                    problem.status
                  )}`}
                >
                  {problem.status}
                </span>

                <span className="text-gray-400">{problem.createdAt}</span>

                <div className="flex gap-2">
                  <button className="text-xs px-3 py-1 border border-gray-700 rounded hover:border-gray-500 text-gray-400 hover:text-gray-300 transition-colors">
                    수정
                  </button>
                  <button className="text-xs px-3 py-1 border border-gray-700 rounded hover:border-red-500 text-gray-400 hover:text-red-400 transition-colors">
                    삭제
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
