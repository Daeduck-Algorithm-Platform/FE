"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpDown } from "lucide-react";
import FilterSidebar from "@/components/FilterSidebar";

interface Problem {
  id: string;
  number: number;
  title: string;
  status: "해결" | "미해결" | "실패" | "확인";
  difficulty: "쉬움" | "중간" | "어려움";
  attempts: number;
  solvedCount: number;
  score: number;
  solvers: string[];
}

interface Filters {
  keyword: string;
  difficultyMin: string;
  difficultyMax: string;
  status: string;
  record: string;
}

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

const getStatusColor = (status: string) => {
  switch (status) {
    case "해결":
      return "text-green-400";
    case "미해결":
      return "text-gray-400";
    case "실패":
      return "text-red-400";
    case "확인":
      return "text-blue-400";
    default:
      return "text-gray-400";
  }
};

const allProblems: Problem[] = [
  {
    id: "1",
    number: 1,
    title: "마이크로소프트 로고",
    status: "해결",
    difficulty: "쉬움",
    attempts: 10,
    solvedCount: 3000,
    score: 3000,
    solvers: ["정승우", "강은찬", "조성현"],
  },
  {
    id: "2",
    number: 2,
    title: "감지 계산",
    status: "미해결",
    difficulty: "중간",
    attempts: 0,
    solvedCount: 700,
    score: 3012,
    solvers: ["강은찬", "조성현"],
  },
  {
    id: "3",
    number: 3,
    title: "DNA 헬릭스 2",
    status: "해결",
    difficulty: "중간",
    attempts: 12,
    solvedCount: 23,
    score: 12,
    solvers: ["정승우", "강은찬", "조성현", "유재민"],
  },
  {
    id: "4",
    number: 4,
    title: "Contact",
    status: "실패",
    difficulty: "어려움",
    attempts: 1313,
    solvedCount: 120,
    score: 1313,
    solvers: ["강은찬", "유재민"],
  },
  {
    id: "5",
    number: 5,
    title: "배열 합계",
    status: "해결",
    difficulty: "쉬움",
    attempts: 5,
    solvedCount: 1200,
    score: 2500,
    solvers: ["정승우", "조성현", "유재민"],
  },
  {
    id: "6",
    number: 6,
    title: "최대값 찾기",
    status: "미해결",
    difficulty: "쉬움",
    attempts: 0,
    solvedCount: 2000,
    score: 800,
    solvers: ["강은찬"],
  },
  {
    id: "7",
    number: 7,
    title: "정렬 알고리즘",
    status: "해결",
    difficulty: "중간",
    attempts: 8,
    solvedCount: 1500,
    score: 2000,
    solvers: ["정승우", "강은찬"],
  },
  {
    id: "8",
    number: 8,
    title: "그래프 탐색",
    status: "실패",
    difficulty: "어려움",
    attempts: 50,
    solvedCount: 500,
    score: 5000,
    solvers: ["강은찬"],
  },
  {
    id: "9",
    number: 9,
    title: "동적 계획법",
    status: "미해결",
    difficulty: "어려움",
    attempts: 0,
    solvedCount: 400,
    score: 3500,
    solvers: ["강은찬", "조성현"],
  },
  {
    id: "10",
    number: 10,
    title: "문자열 변환",
    status: "해결",
    difficulty: "중간",
    attempts: 3,
    solvedCount: 1100,
    score: 1500,
    solvers: ["정승우", "조성현", "유재민"],
  },
];

export default function ProblemsPage() {
  const [filters, setFilters] = useState<Filters>({
    keyword: "",
    difficultyMin: "",
    difficultyMax: "",
    status: "전체",
    record: "",
  });

  const getDifficultyLevel = (difficulty: string): number => {
    switch (difficulty) {
      case "쉬움":
        return 1;
      case "중간":
        return 2;
      case "어려움":
        return 3;
      default:
        return 0;
    }
  };

  const filteredProblems = allProblems.filter((problem) => {
    // 키워드 필터
    if (
      filters.keyword &&
      !problem.title.toLowerCase().includes(filters.keyword.toLowerCase())
    ) {
      return false;
    }

    // 난이도 필터
    const problemLevel = getDifficultyLevel(problem.difficulty);
    const minLevel = filters.difficultyMin
      ? getDifficultyLevel(filters.difficultyMin)
      : 1;
    const maxLevel = filters.difficultyMax
      ? getDifficultyLevel(filters.difficultyMax)
      : 3;

    if (problemLevel < minLevel || problemLevel > maxLevel) {
      return false;
    }

    // 레코드 필터
    if (
      filters.record &&
      !problem.solvers.some((solver) =>
        solver.toLowerCase().includes(filters.record.toLowerCase())
      )
    ) {
      return false;
    }

    // 해결 상태 필터
    if (filters.status && filters.status !== "전체") {
      if (problem.status !== filters.status) {
        return false;
      }
    }

    return true;
  });

  return (
    <div className="flex bg-[#0b0b0b] min-h-screen">
      <FilterSidebar value={filters} onFilterChange={setFilters} />

      <main className="flex-1 px-10 py-12">
        <div className="max-w-6xl mx-auto">
          {/* 헤더 */}
          <div className="flex items-start justify-between mb-10">
            <div>
              <h1 className="text-3xl font-bold text-white">문제</h1>
              <p className="text-sm text-gray-400 mt-3">
                실전에 나오는 문제들을 풀고 실력을 키우세요.
              </p>
            </div>
          </div>

          {/* 탭 */}
          <div className="flex gap-8 text-sm mb-8 border-b border-gray-900">
            <Link
              href="/problems"
              className="text-green-400 font-bold border-b-2 border-green-500 pb-4"
            >
              문제
            </Link>
            <Link
              href="/contribution"
              className="text-gray-500 font-bold hover:text-gray-300 pb-4 transition-colors"
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

          {/* 문제 테이블 */}
          <div className="rounded-xl border border-gray-900 overflow-hidden bg-[#0d0d0d]">
            {/* 테이블 헤더 */}
            <div className="bg-black/30 border-b border-gray-900 grid grid-cols-[60px,1fr,100px,80px,100px,100px,100px,120px] gap-4 px-6 py-4 text-xs tracking-wide text-gray-500 uppercase">
              <div className="flex items-center gap-2 cursor-pointer hover:text-gray-300">
                번호
              </div>
              <div className="flex items-center gap-2 cursor-pointer hover:text-gray-300">
                제목
              </div>
              <div className="flex items-center gap-2 cursor-pointer hover:text-gray-300">
                상태
              </div>
              <div className="flex items-center gap-2 cursor-pointer hover:text-gray-300">
                난이도
              </div>
              <div className="flex items-center gap-2 cursor-pointer hover:text-gray-300">
                점수
              </div>
              <div className="flex items-center gap-2 cursor-pointer hover:text-gray-300">
                시도
              </div>
              <div className="flex items-center gap-2 cursor-pointer hover:text-gray-300">
                정답
              </div>
              <div className="flex items-center gap-2 cursor-pointer hover:text-gray-300">
                레코드
              </div>
            </div>

            {/* 테이블 바디 */}
            {filteredProblems.map((problem, index) => (
              <Link key={problem.id} href={`/problems/${problem.id}`}>
                <div className="grid grid-cols-[60px,1fr,100px,80px,100px,100px,100px,120px] gap-4 px-6 py-4 text-sm items-center border-b border-gray-900 hover:bg-[#111111] transition-colors">
                  {/* 번호 */}
                  <span className="text-gray-500">{problem.number}</span>

                  {/* 제목 */}
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-block w-2 h-2 rounded-full ${
                        problem.status === "해결"
                          ? "bg-green-400"
                          : "bg-red-400"
                      }`}
                    ></span>
                    <span className="text-white font-medium hover:text-green-400 transition-colors">
                      {problem.title}
                    </span>
                  </div>

                  {/* 상태 */}
                  <span className={getStatusColor(problem.status)}>
                    {problem.status}
                  </span>

                  {/* 난이도 */}
                  <span className={getDifficultyColor(problem.difficulty)}>
                    {problem.difficulty}
                  </span>

                  {/* 점수 */}
                  <span className="text-yellow-400 font-semibold">
                    {problem.score.toLocaleString()}
                  </span>

                  {/* 시도 */}
                  <span className="text-gray-400">{problem.attempts}</span>

                  {/* 정답 */}
                  <span className="text-green-400 font-medium">
                    {problem.solvedCount}
                  </span>

                  {/* 레코드 */}
                  <span className="text-gray-400 text-xs">
                    {problem.solvers.join(", ")}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
