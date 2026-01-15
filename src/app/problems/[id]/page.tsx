"use client";

import Link from "next/link";
import { ArrowLeft, Check, AlertCircle, RotateCcw } from "lucide-react";
import { allProblems, problemDetails } from "@/lib/problems";

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

  const details = problemDetails[problem.id];
  const isSolved = problem.status === "해결";
  const isFailed = problem.status === "실패";
  const isUnsolved = problem.status === "미해결";

  return (
    <div className="bg-[#0b0b0b] min-h-screen flex flex-col">
      {/* 헤더 */}
      <header className="bg-black border-b border-gray-900 sticky top-0 z-40">
        <div className="px-8 py-4 flex items-center gap-4">
          <Link href="/problems">
            <button className="p-2 hover:bg-gray-900 rounded-lg transition-colors">
              <ArrowLeft size={20} className="text-gray-400" />
            </button>
          </Link>
          <h1 className="text-2xl font-bold text-white">
            {problem.number}. {problem.title}
          </h1>
          {/* 상태 배지 */}
          <div className="ml-auto flex items-center gap-2">
            {isSolved && (
              <div className="flex items-center gap-1 px-3 py-1 bg-green-500/20 text-green-400 rounded-lg border border-green-500/30">
                <Check size={16} />
                <span className="text-sm font-semibold">해결</span>
              </div>
            )}
            {isFailed && (
              <div className="flex items-center gap-1 px-3 py-1 bg-red-500/20 text-red-400 rounded-lg border border-red-500/30">
                <AlertCircle size={16} />
                <span className="text-sm font-semibold">실패</span>
              </div>
            )}
            {isUnsolved && (
              <div className="flex items-center gap-1 px-3 py-1 bg-gray-500/20 text-gray-400 rounded-lg border border-gray-500/30">
                <span className="text-sm font-semibold">미해결</span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="flex-1 px-20 py-12">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* 메타데이터 */}
          <div className="flex items-center gap-8 text-sm">
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
            <span className="text-gray-400">
              해결한 유저: {problem.solvedCount}
            </span>
            {isSolved && (
              <span className="text-gray-400">시도: {problem.attempts}회</span>
            )}
          </div>

          {/* 상태별 안내 메시지 */}
          {isSolved && (
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 flex items-center gap-3">
              <Check size={20} className="text-green-400 flex-shrink-0" />
              <div>
                <p className="text-green-400 font-semibold">
                  이미 해결한 문제입니다!
                </p>
                <p className="text-green-300/80 text-sm">
                  아래에서 다시 풀어보거나 내 풀이를 확인할 수 있습니다.
                </p>
              </div>
            </div>
          )}

          {isFailed && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-center gap-3">
              <AlertCircle size={20} className="text-red-400 flex-shrink-0" />
              <div>
                <p className="text-red-400 font-semibold">
                  해결하지 못한 문제입니다
                </p>
                <p className="text-red-300/80 text-sm">
                  아래의 다시 풀기 버튼으로 다시 도전해보세요!
                </p>
              </div>
            </div>
          )}

          {isUnsolved && (
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 flex items-center gap-3">
              <span className="text-blue-400 font-semibold">
                아직 도전하지 않은 문제입니다
              </span>
            </div>
          )}

          {/* 문제 설명 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">문제</h2>
            <div className="bg-[#0d0d0d] border border-gray-900 rounded-lg p-6">
              <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                {details?.description || "문제 설명이 없습니다."}
              </p>
            </div>
          </section>

          {/* 제약 조건 */}
          {details?.constraints && (
            <section>
              <h2 className="text-2xl font-bold text-white mb-4">제약 조건</h2>
              <div className="bg-[#0d0d0d] border border-gray-900 rounded-lg p-6">
                <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                  {details.constraints}
                </p>
              </div>
            </section>
          )}

          {/* 입출력 예시 */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">입출력 예시</h2>
            <div className="space-y-4">
              {details?.examples.map((example, idx) => (
                <div
                  key={idx}
                  className="bg-[#0d0d0d] border border-gray-900 rounded-lg overflow-hidden"
                >
                  <div className="bg-black/50 px-4 py-3 border-b border-gray-800">
                    <p className="text-sm font-semibold text-gray-400">
                      예시 {idx + 1}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 divide-x divide-gray-800">
                    {/* 입력 */}
                    <div className="p-4">
                      <p className="text-xs text-gray-500 mb-3 font-semibold">
                        입력
                      </p>
                      <pre className="text-sm text-gray-300 bg-black/30 rounded p-3 overflow-x-auto">
                        <code>{example.input}</code>
                      </pre>
                    </div>
                    {/* 출력 */}
                    <div className="p-4">
                      <p className="text-xs text-gray-500 mb-3 font-semibold">
                        출력
                      </p>
                      <pre className="text-sm text-gray-300 bg-black/30 rounded p-3 overflow-x-auto">
                        <code>{example.output}</code>
                      </pre>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* 하단 버튼 */}
      <footer className="bg-black border-t border-gray-900 px-20 py-8 sticky bottom-0">
        <div className="max-w-5xl mx-auto flex items-center justify-end gap-4">
          <Link href="/problems">
            <button className="px-8 py-3 border border-gray-700 text-white font-semibold rounded-lg hover:border-gray-500 transition-colors">
              나가기
            </button>
          </Link>

          {isSolved ? (
            <Link href={`/problems/${problem.id}/solve`}>
              <button className="px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-colors flex items-center gap-2">
                <RotateCcw size={16} />
                다시 풀기
              </button>
            </Link>
          ) : (
            <Link href={`/problems/${problem.id}/solve`}>
              <button className="px-8 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors">
                문제풀기
              </button>
            </Link>
          )}
        </div>
      </footer>
    </div>
  );
}
