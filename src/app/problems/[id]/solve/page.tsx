"use client";

import { useState, useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeft,
  Play,
  CheckCircle,
  Send,
  Copy,
  AlertCircle,
} from "lucide-react";
import { Group, Panel, Separator } from "react-resizable-panels";
import CodeEditor from "@/components/CodeEditor";
import { allProblems, problemDetails } from "@/lib/problems";
import { executeCode } from "@/lib/codeExecutor";

const languageTemplates: Record<string, string> = {
  python: `def solve():
    # 여기에 코드를 작성하세요
    pass

# 테스트
if __name__ == "__main__":
    pass`,
  javascript: `function solve() {
  // 여기에 코드를 작성하세요
}

// 테스트
console.log(solve());`,
  java: `public class Solution {
    public static void solve() {
        // 여기에 코드를 작성하세요
    }

    public static void main(String[] args) {
        solve();
    }
}`,
  cpp: `#include <iostream>
using namespace std;

void solve() {
    // 여기에 코드를 작성하세요
}

int main() {
    solve();
    return 0;
}`,
  c: `#include <stdio.h>

void solve() {
    // 여기에 코드를 작성하세요
}

int main() {
    solve();
    return 0;
}`,
};

export default function ProblemSolvePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const [code, setCode] = useState(languageTemplates.python);
  const [language, setLanguage] =
    useState<keyof typeof languageTemplates>("python");
  const [lineNumber, setLineNumber] = useState(1);
  const [columnNumber, setColumnNumber] = useState(1);
  const [output, setOutput] = useState("");
  const [testResults, setTestResults] = useState<
    Array<{
      id: number;
      passed: boolean;
      input: string;
      expected: string;
      actual: string;
    }>
  >([]);
  const [isRunning, setIsRunning] = useState(false);
  const [copied, setCopied] = useState(false);

  // 문제 데이터 찾기
  const problem = allProblems.find((p) => p.number === parseInt(id));
  const details = problem ? problemDetails[problem.id] : null;

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  const handleCursorChange = (line: number, column: number) => {
    setLineNumber(line);
    setColumnNumber(column);
  };

  const handleLanguageChange = (
    newLanguage: keyof typeof languageTemplates
  ) => {
    setLanguage(newLanguage);
    setCode(languageTemplates[newLanguage]);
    setOutput("");
    setTestResults([]);
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    try {
      const result = executeCode(code, language);
      setOutput(result.output || result.error || "실행 완료");
    } catch (error) {
      setOutput(`오류: ${error}`);
    }
    setIsRunning(false);
  };

  const handleTestCode = async () => {
    setIsRunning(true);
    try {
      if (!details) return;

      const results = details.examples.map((example, idx) => {
        const result = executeCode(code, language);
        const actual = result.output.trim();
        const expected = example.output.trim();
        const passed = actual === expected;

        return {
          id: idx + 1,
          passed,
          input: example.input,
          expected,
          actual,
        };
      });

      setTestResults(results);
      const allPassed = results.every((r) => r.passed);
      setOutput(
        allPassed
          ? "모든 테스트 케이스를 통과했습니다! ✨"
          : `${results.filter((r) => r.passed).length}/${
              results.length
            } 테스트 케이스 통과`
      );
    } catch (error) {
      setOutput(`테스트 오류: ${error}`);
    }
    setIsRunning(false);
  };

  const handleSubmitCode = async () => {
    setIsRunning(true);
    try {
      // 제출 로직 (현재는 테스트와 동일)
      await handleTestCode();
      setOutput("코드가 제출되었습니다!");
    } catch (error) {
      setOutput(`제출 오류: ${error}`);
    }
    setIsRunning(false);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!problem || !details) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-400">문제를 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="bg-[#0b0b0b] min-h-screen flex flex-col">
      {/* 헤더 */}
      <header className="sticky top-0 z-40 bg-black border-b border-gray-900 h-16">
        <div className="px-8 py-4 flex items-center justify-between h-full">
          <div className="flex items-center gap-4">
            <Link href="/problems">
              <button className="p-2 hover:bg-gray-900 rounded-lg transition-colors">
                <ArrowLeft size={20} className="text-gray-400" />
              </button>
            </Link>
            <h1 className="text-lg font-bold text-white">
              {problem.number}. {problem.title}
            </h1>
          </div>
          <div className="text-sm text-gray-400">정답률: 52% | 제출: 3500</div>
        </div>
      </header>

      {/* 메인 콘텐츠 - 리사이저블 패널 */}
      <Group orientation="horizontal" className="flex-1 overflow-hidden">
        {/* 왼쪽: 문제 설명 */}
        <Panel
          defaultSize={35}
          minSize={20}
          className="bg-[#0b0b0b] overflow-hidden"
        >
          <div className="flex flex-col h-full overflow-hidden">
            <div className="flex-1 overflow-y-auto px-8 py-8 space-y-6">
              {/* 문제 설명 */}
              <section>
                <h2 className="text-lg font-bold text-white mb-3">문제</h2>
                <div className="bg-[#0d0d0d] border border-gray-900 rounded-lg p-5">
                  <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
                    {details.description}
                  </p>
                </div>
              </section>

              {/* 제약 조건 */}
              {details.constraints && (
                <section>
                  <h2 className="text-lg font-bold text-white mb-3">
                    제약 조건
                  </h2>
                  <div className="bg-[#0d0d0d] border border-gray-900 rounded-lg p-5">
                    <ul className="text-gray-300 text-sm space-y-2">
                      {details.constraints.map((constraint, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-green-400 flex-shrink-0">
                            •
                          </span>
                          <span>{constraint}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </section>
              )}

              {/* 입출력 예시 */}
              <section>
                <h2 className="text-lg font-bold text-white mb-3">
                  입출력 예시
                </h2>
                <div className="space-y-3">
                  {details.examples.map((example, idx) => (
                    <div
                      key={idx}
                      className="bg-[#0d0d0d] border border-gray-900 rounded-lg overflow-hidden"
                    >
                      <div className="bg-black/50 px-4 py-2 border-b border-gray-800">
                        <p className="text-xs font-semibold text-gray-400">
                          예시 {idx + 1}
                        </p>
                      </div>
                      <div className="grid grid-cols-2 divide-x divide-gray-800">
                        <div className="p-4">
                          <p className="text-xs text-gray-500 mb-2 font-semibold">
                            입력
                          </p>
                          <pre className="text-xs text-gray-300 bg-black/30 rounded p-2 overflow-x-auto">
                            <code>{example.input}</code>
                          </pre>
                        </div>
                        <div className="p-4">
                          <p className="text-xs text-gray-500 mb-2 font-semibold">
                            출력
                          </p>
                          <pre className="text-xs text-gray-300 bg-black/30 rounded p-2 overflow-x-auto">
                            <code>{example.output}</code>
                          </pre>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </Panel>

        {/* 중앙 리사이즈 핸들 */}
        <Separator className="w-1 bg-gray-900 hover:bg-gray-700 transition-colors cursor-col-resize" />

        {/* 오른쪽: 코드 에디터 및 테스트 결과 */}
        <Panel defaultSize={65} minSize={20}>
          <Group orientation="vertical" className="h-full">
            {/* 코드 에디터 패널 */}
            <Panel
              defaultSize={50}
              minSize={30}
              className="flex flex-col overflow-hidden bg-[#0b0b0b]"
            >
              {/* 언어 선택 및 도구 */}
              <div className="bg-[#0d0d0d] border-b border-gray-900 px-6 py-4 flex items-center justify-between flex-shrink-0">
                <div className="flex items-center gap-4">
                  <label className="text-gray-400 text-sm font-semibold">
                    언어:
                  </label>
                  <select
                    value={language}
                    onChange={(e) =>
                      handleLanguageChange(
                        e.target.value as keyof typeof languageTemplates
                      )
                    }
                    className="bg-[#1a1a1a] border border-gray-700 rounded px-3 py-2 text-white text-sm focus:outline-none hover:border-gray-600 transition-colors cursor-pointer"
                  >
                    <option value="python">Python</option>
                    <option value="javascript">JavaScript</option>
                    <option value="java">Java</option>
                    <option value="cpp">C++</option>
                    <option value="c">C</option>
                  </select>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500 font-mono">
                  <span>라인: {lineNumber}</span>
                  <span className="text-gray-700">|</span>
                  <span>열: {columnNumber}</span>
                </div>
              </div>

              {/* 코드 에디터 */}
              <div className="flex-1 overflow-hidden">
                <CodeEditor
                  value={code}
                  onChange={handleCodeChange}
                  language={language}
                  theme="vs-dark"
                  height="100%"
                  onCursorChange={handleCursorChange}
                />
              </div>

              {/* 버튼 바 */}
              <div className="border-t border-gray-900 bg-[#0d0d0d] p-3 flex gap-2 flex-shrink-0">
                <button
                  onClick={handleRunCode}
                  disabled={isRunning}
                  className="flex items-center gap-2 px-3 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-700 text-white rounded-lg font-semibold text-xs transition-colors"
                >
                  <Play size={14} />
                  실행
                </button>
                <button
                  onClick={handleTestCode}
                  disabled={isRunning}
                  className="flex items-center gap-2 px-3 py-2 bg-purple-500 hover:bg-purple-600 disabled:bg-gray-700 text-white rounded-lg font-semibold text-xs transition-colors"
                >
                  <CheckCircle size={14} />
                  테스트
                </button>
                <button
                  onClick={handleSubmitCode}
                  disabled={isRunning}
                  className="flex items-center gap-2 px-3 py-2 bg-green-500 hover:bg-green-600 disabled:bg-gray-700 text-white rounded-lg font-semibold text-xs transition-colors"
                >
                  <Send size={14} />
                  제출
                </button>
                <button
                  onClick={copyCode}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold text-xs transition-colors ml-auto"
                >
                  <Copy size={14} />
                  {copied ? "복사됨" : "복사"}
                </button>
              </div>

              {/* 실행 결과 */}
              {output && (
                <div className="border-t border-gray-900 bg-[#0d0d0d] p-4 max-h-32 overflow-y-auto flex-shrink-0">
                  <h3 className="text-sm font-bold text-gray-400 mb-2">
                    실행 결과
                  </h3>
                  <pre className="text-sm text-gray-300 font-mono bg-black/50 rounded p-2 whitespace-pre-wrap break-words">
                    {output}
                  </pre>
                </div>
              )}
            </Panel>

            {/* 수직 리사이즈 핸들 */}
            <Separator className="h-1 bg-gray-900 hover:bg-gray-700 transition-colors cursor-row-resize" />

            {/* 테스트 결과 패널 */}
            <Panel
              defaultSize={50}
              minSize={25}
              className="bg-[#0d0d0d] flex flex-col overflow-hidden"
            >
              <div className="bg-[#1a1a1a] border-b border-gray-900 px-6 py-4 flex-shrink-0">
                <h2 className="text-sm font-bold text-white">테스트 결과</h2>
              </div>

              <div className="flex-1 overflow-y-auto">
                {testResults.length === 0 ? (
                  <div className="flex items-center justify-center h-full text-gray-500 text-sm p-4">
                    <p>테스트를 실행하면 결과가 표시됩니다</p>
                  </div>
                ) : (
                  <div className="p-4 space-y-3">
                    {testResults.map((result) => (
                      <div
                        key={result.id}
                        className="bg-[#0b0b0b] border border-gray-800 rounded overflow-hidden text-sm"
                      >
                        <div
                          className={`px-4 py-3 border-b border-gray-800 flex items-center gap-2 ${
                            result.passed ? "bg-green-500/10" : "bg-red-500/10"
                          }`}
                        >
                          {result.passed ? (
                            <CheckCircle size={12} className="text-green-400" />
                          ) : (
                            <AlertCircle size={12} className="text-red-400" />
                          )}
                          <span
                            className={`font-semibold ${
                              result.passed ? "text-green-400" : "text-red-400"
                            }`}
                          >
                            TC {result.id} {result.passed ? "통과" : "실패"}
                          </span>
                        </div>
                        <div className="p-4 space-y-3">
                          <div>
                            <p className="text-gray-400 mb-2 font-semibold text-xs uppercase tracking-wide">
                              입력
                            </p>
                            <div className="overflow-x-auto">
                              <pre className="text-gray-300 bg-black/50 rounded p-3 text-xs whitespace-pre-wrap break-words">
                                {result.input}
                              </pre>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div>
                              <p className="text-gray-400 mb-2 font-semibold text-xs uppercase tracking-wide">
                                예상 출력
                              </p>
                              <div className="overflow-x-auto">
                                <pre className="text-green-400 bg-black/50 rounded p-3 text-xs whitespace-pre-wrap break-words">
                                  {result.expected}
                                </pre>
                              </div>
                            </div>
                            <div>
                              <p className="text-gray-400 mb-2 font-semibold text-xs uppercase tracking-wide">
                                실제 출력
                              </p>
                              <div className="overflow-x-auto">
                                <pre
                                  className={`bg-black/50 rounded p-3 text-xs whitespace-pre-wrap break-words ${
                                    result.passed
                                      ? "text-green-400"
                                      : "text-red-400"
                                  }`}
                                >
                                  {result.actual}
                                </pre>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Panel>
          </Group>
        </Panel>
      </Group>
    </div>
  );
}
