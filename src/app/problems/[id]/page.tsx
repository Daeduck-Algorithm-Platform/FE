"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

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

const problemDescriptions: Record<
  string,
  { description: string; examples: Array<{ input: string; output: string }> }
> = {
  "1": {
    description:
      "Microsoft 로고 문제는 패턴을 이용한 문제입니다. 주어진 숫자 n에 대해 마이크로소프트 로고 패턴을 출력해야 합니다. 각 행은 특정 패턴을 따르며, 공백과 문자의 조합으로 로고를 구성합니다.",
    examples: [
      { input: "20", output: "3" },
      { input: "20", output: "3" },
      { input: "20", output: "3" },
      { input: "20", output: "3" },
      { input: "20", output: "3" },
      { input: "20", output: "3" },
    ],
  },
  "2": {
    description:
      "주어진 배열에서 특정 조건을 만족하는 원소를 감지하고 계산하는 문제입니다.",
    examples: [{ input: "[1, 2, 3, 4, 5]", output: "9" }],
  },
  "3": {
    description:
      "DNA 헬릭스 패턴의 2번째 변형입니다. 주어진 길이에 따라 나선 패턴을 생성해야 합니다.",
    examples: [{ input: "8", output: "ACGTACGT" }],
  },
};

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

export default function ProblemDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const problem = allProblems.find((p) => p.id === params.id);

  if (!problem) {
    return (
      <div className="bg-[#0b0b0b] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-4">
            문제를 찾을 수 없습니다
          </h1>
          <Link href="/problems">
            <button className="px-6 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors">
              문제 목록으로 돌아가기
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const description = problemDescriptions[problem.id];

  return (
    <div className="bg-[#0b0b0b] min-h-screen flex flex-col">
      {/* 헤더 */}
      <header className="bg-black border-b border-gray-900">
        <div className="px-8 py-4 flex items-center gap-4">
          <Link href="/problems">
            <button className="p-2 hover:bg-gray-900 rounded-lg transition-colors">
              <ArrowLeft size={20} className="text-gray-400" />
            </button>
          </Link>
          <h1 className="text-2xl font-bold text-white">
            {problem.number}. {problem.title}
          </h1>
        </div>
      </header>

      <main className="flex-1 px-20 py-12">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* 메타데이터 */}
          <div className="flex items-center gap-6 text-sm">
            <span
              className={`font-semibold ${getDifficultyColor(
                problem.difficulty
              )}`}
            >
              난이도 • {problem.difficulty}
            </span>
            <span className="text-gray-400">
              점수: {problem.score.toLocaleString()}점
            </span>
            <span className="text-gray-400">레코드: {problem.solvers[0]}</span>
          </div>

          {/* 문제 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">문제</h2>
            <div className="bg-[#0d0d0d] border border-gray-900 rounded-lg p-6">
              <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                {description?.description || "문제 설명이 없습니다."}
              </p>
            </div>
          </section>

          {/* 입출력 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">입출력</h2>
            <div className="space-y-4">
              {description?.examples.map((example, idx) => (
                <div key={idx} className="grid grid-cols-2 gap-4">
                  {/* 입력 */}
                  <div className="bg-[#0d0d0d] border border-gray-900 rounded-lg overflow-hidden">
                    <div className="bg-black/50 px-4 py-2 border-b border-gray-800">
                      <p className="text-sm font-semibold text-gray-400">
                        예시 {idx + 1}번
                      </p>
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-gray-500 mb-2">입력</p>
                      <table className="w-full text-sm text-gray-300 border border-gray-700 rounded">
                        <thead className="bg-black/50 border-b border-gray-700">
                          <tr>
                            <th className="px-4 py-2 text-left font-semibold">
                              입력
                            </th>
                            <th className="px-4 py-2 text-left font-semibold">
                              출력
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-gray-700">
                            <td className="px-4 py-2">{example.input}</td>
                            <td className="px-4 py-2">{example.output}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* 출력 */}
                  <div className="bg-[#0d0d0d] border border-gray-900 rounded-lg overflow-hidden">
                    <div className="bg-black/50 px-4 py-2 border-b border-gray-800">
                      <p className="text-sm font-semibold text-gray-400">
                        예시 {idx + 1}번
                      </p>
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-gray-500 mb-2">입력</p>
                      <table className="w-full text-sm text-gray-300 border border-gray-700 rounded">
                        <thead className="bg-black/50 border-b border-gray-700">
                          <tr>
                            <th className="px-4 py-2 text-left font-semibold">
                              입력
                            </th>
                            <th className="px-4 py-2 text-left font-semibold">
                              출력
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-gray-700">
                            <td className="px-4 py-2">{example.input}</td>
                            <td className="px-4 py-2">{example.output}</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* 하단 버튼 */}
      <footer className="bg-black border-t border-gray-900 px-20 py-8">
        <div className="max-w-5xl mx-auto flex items-center justify-end gap-4">
          <Link href="/problems">
            <button className="px-8 py-3 border border-gray-700 text-white font-semibold rounded-lg hover:border-gray-500 transition-colors">
              나가기
            </button>
          </Link>
          <Link href={`/problems/${problem.id}/solve`}>
            <button className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors">
              문제풀기
            </button>
          </Link>
        </div>
      </footer>
    </div>
  );
}
