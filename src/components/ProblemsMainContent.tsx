"use client";

import Link from "next/link";
import { ArrowUpDown } from "lucide-react";
import { useMemo, useState } from "react";
import FilterSidebar from "./FilterSidebar";

type FilterState = {
  keyword: string;
  difficultyMin: string;
  difficultyMax: string;
  status: string;
  record: string;
};

interface Problem {
  id: string;
  number: number;
  title: string;
  difficulty: "쉬움" | "중간" | "어려움";
  acceptanceRate: number;
  submissionCount: number;
  likes: number;
  solveCount: number;
  status: "해결" | "미해결" | "실패";
  record: string;
}

const solverNames = ["정승우", "강은찬", "조성현", "유재민"] as const;

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
    status: "해결",
    record: solverNames[0],
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
    status: "미해결",
    record: solverNames[1],
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
    status: "실패",
    record: solverNames[2],
  },
  {
    id: "4",
    number: 4,
    title: "Contact",
    difficulty: "쉬움",
    acceptanceRate: 74,
    submissionCount: 900,
    likes: 42,
    solveCount: 120,
    status: "해결",
    record: solverNames[3],
  },
  {
    id: "5",
    number: 5,
    title: "그래프 탐색",
    difficulty: "어려움",
    acceptanceRate: 21,
    submissionCount: 740,
    likes: 18,
    solveCount: 85,
    status: "미해결",
    record: solverNames[0],
  },
  {
    id: "6",
    number: 6,
    title: "정렬 알고리즘",
    difficulty: "중간",
    acceptanceRate: 65,
    submissionCount: 2100,
    likes: 75,
    solveCount: 1500,
    status: "해결",
    record: solverNames[1],
  },
  {
    id: "7",
    number: 7,
    title: "동적 계획법",
    difficulty: "어려움",
    acceptanceRate: 35,
    submissionCount: 520,
    likes: 22,
    solveCount: 210,
    status: "해결",
    record: solverNames[0],
  },
  {
    id: "8",
    number: 8,
    title: "해시 테이블",
    difficulty: "중간",
    acceptanceRate: 71,
    submissionCount: 1800,
    likes: 88,
    solveCount: 1400,
    status: "해결",
    record: solverNames[1],
  },
  {
    id: "9",
    number: 9,
    title: "이진 탐색",
    difficulty: "중간",
    acceptanceRate: 58,
    submissionCount: 1200,
    likes: 45,
    solveCount: 800,
    status: "해결",
    record: solverNames[2],
  },
  {
    id: "10",
    number: 10,
    title: "스택과 큐",
    difficulty: "쉬움",
    acceptanceRate: 82,
    submissionCount: 2200,
    likes: 120,
    solveCount: 2100,
    status: "해결",
    record: solverNames[1],
  },
  {
    id: "11",
    number: 11,
    title: "트리 순회",
    difficulty: "어려움",
    acceptanceRate: 28,
    submissionCount: 620,
    likes: 15,
    solveCount: 180,
    status: "해결",
    record: solverNames[1],
  },
  {
    id: "12",
    number: 12,
    title: "최단 경로",
    difficulty: "어려움",
    acceptanceRate: 19,
    submissionCount: 480,
    likes: 8,
    solveCount: 92,
    status: "해결",
    record: solverNames[2],
  },
  {
    id: "13",
    number: 13,
    title: "순열과 조합",
    difficulty: "중간",
    acceptanceRate: 45,
    submissionCount: 940,
    likes: 52,
    solveCount: 450,
    status: "미해결",
    record: solverNames[3],
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
  const [filters, setFilters] = useState<FilterState>({
    keyword: "",
    difficultyMin: "",
    difficultyMax: "",
    status: "전체",
    record: "",
  });

  const handleFilterChange = (next: FilterState) => {
    setFilters(next);
  };

  const visibleProblems = useMemo(() => {
    const order = ["쉬움", "중간", "어려움"];

    return problems.filter((p) => {
      // 입력 정리
      const keyword = filters.keyword.trim().toLowerCase();
      const recordTerm = filters.record.trim().toLowerCase();

      // 키워드: 제목 포함
      const matchKeyword = keyword
        ? p.title.toLowerCase().includes(keyword)
        : true;

      // 난이도: 구간 내 여부
      const currentIdx = order.indexOf(p.difficulty);
      const minOk = filters.difficultyMin
        ? currentIdx >= order.indexOf(filters.difficultyMin)
        : true;
      const maxOk = filters.difficultyMax
        ? currentIdx <= order.indexOf(filters.difficultyMax)
        : true;

      // 해결 상태
      const matchStatus =
        filters.status === "전체" ? true : p.status === filters.status;

      // 레코드: 이름 포함
      const matchRecord = recordTerm
        ? p.record.toLowerCase().includes(recordTerm)
        : true;

      return matchKeyword && minOk && maxOk && matchStatus && matchRecord;
    });
  }, [filters]);

  return (
    <div className="flex bg-[#0b0b0b] min-h-screen">
      {/* 왼쪽 사이드바 */}
      <FilterSidebar value={filters} onFilterChange={handleFilterChange} />

      {/* 메인 콘텐츠 */}
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
            <div className="bg-black/30 border-b border-gray-900 grid grid-cols-12 gap-4 px-6 py-4 text-xs tracking-wide text-gray-500 uppercase">
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
            {visibleProblems.map((problem, index) => (
              <Link key={problem.id} href={`/problems/${problem.id}`}>
                <div
                  className={`grid grid-cols-12 gap-4 px-6 py-4 text-sm items-center border-b border-gray-900 hover:bg-[#111111] transition-colors ${
                    index === 0 ? "bg-red-500/10" : ""
                  }`}
                >
                  {/* 번호와 제목 */}
                  <div className="col-span-6 flex items-center gap-3">
                    <span className="text-gray-500 w-8">{problem.number}</span>
                    <div className="flex-1 flex items-center gap-2">
                      {index === 0 && (
                        <span className="inline-block px-2 py-1 bg-red-500 text-white text-xs rounded">
                          어려움
                        </span>
                      )}
                      <span className="text-white font-medium hover:text-green-400 transition-colors">
                        {problem.title}
                      </span>
                    </div>
                  </div>

                  {/* 난이도 */}
                  <div
                    className={`col-span-2 font-semibold ${getDifficultyColor(
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
        </div>
      </main>
    </div>
  );
}
