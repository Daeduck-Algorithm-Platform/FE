"use client";

import Link from "next/link";
import { ArrowLeft, Play, Send, Check } from "lucide-react";

export default function ProblemSolvePage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="bg-[#0b0b0b] min-h-screen">
      {/* 헤더 */}
      <header className="sticky top-0 z-40 bg-black border-b border-gray-900">
        <div className="px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/problems">
              <button className="p-2 hover:bg-gray-900 rounded-lg transition-colors">
                <ArrowLeft size={20} className="text-gray-400" />
              </button>
            </Link>
            <h1 className="text-lg font-bold text-white">
              문제 풀이: 마이크로소프트 로고
            </h1>
          </div>
          <div className="text-sm text-gray-400">정답률: 52% | 제출: 3500</div>
        </div>
      </header>

      <div className="flex gap-0 h-[calc(100vh-64px)]">
        {/* 왼쪽: 코드 에디터 */}
        <div className="flex-1 border-r border-gray-900 flex flex-col">
          <div className="bg-[#0d0d0d] border-b border-gray-900 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <select className="bg-[#1a1a1a] border border-gray-700 rounded px-3 py-1 text-white text-sm focus:outline-none">
                <option>Python</option>
                <option>JavaScript</option>
                <option>Java</option>
              </select>
            </div>
            <div className="text-xs text-gray-500">라인: 1 | 열: 1</div>
          </div>

          <div className="flex-1 overflow-auto bg-[#0b0b0b] p-6 font-mono text-sm">
            <pre className="text-gray-300">
              {`def solve(n):
    # 여기에 코드를 작성하세요
    pass

# 테스트
if __name__ == "__main__":
    print(solve(5))`}
            </pre>
          </div>

          <div className="bg-[#0d0d0d] border-t border-gray-900 px-6 py-4 flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors">
              <Play size={16} />
              실행
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition-colors">
              <Send size={16} />
              제출
            </button>
          </div>
        </div>

        {/* 오른쪽: 테스트 케이스 및 결과 */}
        <div className="w-80 bg-[#0d0d0d] border-l border-gray-900 flex flex-col overflow-hidden">
          <div className="bg-[#1a1a1a] border-b border-gray-900 px-6 py-4">
            <h2 className="text-white font-semibold">테스트 케이스</h2>
          </div>

          <div className="flex-1 overflow-y-auto">
            {/* 테스트 케이스 탭 */}
            <div className="border-b border-gray-800">
              <div className="flex text-xs text-gray-500">
                <button className="flex-1 px-4 py-3 border-b-2 border-green-500 text-green-400">
                  케이스 1 ✓
                </button>
              </div>
            </div>

            {/* 테스트 결과 */}
            <div className="p-6 space-y-4">
              <div>
                <p className="text-gray-400 text-xs mb-2">입력:</p>
                <div className="bg-[#0b0b0b] border border-gray-800 rounded p-3 text-green-400 text-sm font-mono">
                  5
                </div>
              </div>

              <div>
                <p className="text-gray-400 text-xs mb-2">예상 출력:</p>
                <div className="bg-[#0b0b0b] border border-gray-800 rounded p-3 text-green-400 text-sm font-mono">
                  {`█ █\n███\n█ █\n█ █\n█ █`}
                </div>
              </div>

              <div>
                <p className="text-gray-400 text-xs mb-2">실행 결과:</p>
                <div className="bg-[#0b0b0b] border border-gray-800 rounded p-3">
                  <div className="flex items-center gap-2 text-green-400 text-sm">
                    <Check size={16} />
                    통과
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-800 text-xs text-gray-500 space-y-1">
                <p>실행 시간: 0.12초</p>
                <p>메모리: 12.3MB</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
