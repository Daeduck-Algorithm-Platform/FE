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
  Sparkles,
  Lightbulb,
  TrendingUp,
} from "lucide-react";
import { Group, Panel, Separator } from "react-resizable-panels";
import CodeEditor from "@/components/CodeEditor";
import { allProblems, problemDetails } from "@/lib/problems";
import { executeCode } from "@/lib/codeExecutor";

// 문제 유형별 템플릿 생성 함수
const getTemplateForProblem = (
  problemId: string,
  language: string,
  examples?: any[]
): string => {
  // 실제 예제 입력값 추출
  const firstExample = examples && examples.length > 0 ? examples[0] : null;
  let inputValue = firstExample ? firstExample.input : null;

  // inputValue가 문자열인 경우 그대로 사용, 아니면 JSON으로 변환
  if (inputValue && typeof inputValue === "string") {
    // 문자열은 그대로 사용 (이미 배열 형식 "[...]" 또는 숫자 등)
  } else if (inputValue) {
    inputValue = JSON.stringify(inputValue);
  }

  // 문제별 입력 타입 정의
  const problemInputTypes: Record<string, string> = {
    "1": "none", // 마이크로소프트 로고 - 출력만
    "2": "array", // 왼쪽에 더 큰 값
    "3": "number", // DNA 헬릭스
    "4": "graph", // 경로 찾기
    "5": "array", // 배열 합계
    "6": "array", // 최대값 찾기
    "7": "array", // 정렬 알고리즘
    "8": "graph", // 그래프 탐색
    "9": "array", // 동적 계획법
    "10": "strings", // 문자열 변환
  };

  const inputType = problemInputTypes[problemId] || "none";

  // 언어별 템플릿
  const templates: Record<string, Record<string, string>> = {
    python: {
      none: `def solve():
    # 여기에 코드를 작성하세요
    pass`,
      array: `def solve(arr):
    # 여기에 코드를 작성하세요
    # arr: 정수 배열
    pass`,
      number: `def solve(n):
    # 여기에 코드를 작성하세요
    # n: 정수
    pass`,
      graph: `def solve(n, edges, start, end):
    # 여기에 코드를 작성하세요
    # n: 노드 수, edges: 간선 정보, start: 시작 노드, end: 목표 노드
    pass`,
      strings: `def solve(str1, str2):
    # 여기에 코드를 작성하세요
    # str1, str2: 문자열
    pass`,
    },
    javascript: {
      none: `function solve() {
  // 여기에 코드를 작성하세요
}`,
      array: `function solve(arr) {
  // 여기에 코드를 작성하세요
  // arr: 정수 배열
}`,
      number: `function solve(n) {
  // 여기에 코드를 작성하세요
  // n: 정수
}`,
      graph: `function solve(n, edges, start, end) {
  // 여기에 코드를 작성하세요
  // n: 노드 수, edges: 간선 정보, start: 시작 노드, end: 목표 노드
}`,
      strings: `function solve(str1, str2) {
  // 여기에 코드를 작성하세요
  // str1, str2: 문자열
}`,
    },
    java: {
      none: `public class Solution {
    public static void solve() {
        // 여기에 코드를 작성하세요
        
    }

    public static void main(String[] args) {
        solve();
    }
}`,
      array: `public class Solution {
    public static int solve(int[] arr) {
        // 여기에 코드를 작성하세요
        // arr: 정수 배열
        return 0;
    }
}`,
      number: `public class Solution {
    public static String solve(int n) {
        // 여기에 코드를 작성하세요
        // n: 정수
        return "";
    }
}`,
      graph: `public class Solution {
    public static int solve(int n, int[][] edges, int start, int end) {
        // 여기에 코드를 작성하세요
        // n: 노드 수, edges: 간선 정보, start: 시작 노드, end: 목표 노드
        return 0;
    }
}`,
      strings: `public class Solution {
    public static int solve(String str1, String str2) {
        // 여기에 코드를 작성하세요
        // str1, str2: 문자열
        return 0;
    }
}`,
    },
    cpp: {
      none: `#include <iostream>
using namespace std;

void solve() {
    // 여기에 코드를 작성하세요
    
}

int main() {
    solve();
    return 0;
}`,
      array: `#include <iostream>
#include <vector>
using namespace std;

int solve(vector<int>& arr) {
    // 여기에 코드를 작성하세요
    // arr: 정수 배열
    return 0;
}`,
      number: `#include <iostream>
#include <string>
using namespace std;

string solve(int n) {
    // 여기에 코드를 작성하세요
    // n: 정수
    return "";
}`,
      graph: `#include <iostream>
#include <vector>
using namespace std;

int solve(int n, vector<vector<int>>& edges, int start, int end) {
    // 여기에 코드를 작성하세요
    // n: 노드 수, edges: 간선 정보, start: 시작 노드, end: 목표 노드
    return 0;
}`,
      strings: `#include <iostream>
#include <string>
using namespace std;

int solve(string str1, string str2) {
    // 여기에 코드를 작성하세요
    // str1, str2: 문자열
    return 0;
}`,
    },
    c: {
      none: `#include <stdio.h>

void solve() {
    // 여기에 코드를 작성하세요
    
}

int main() {
    solve();
    return 0;
}`,
      array: `#include <stdio.h>

int solve(int arr[], int size) {
    // 여기에 코드를 작성하세요
    // arr: 정수 배열, size: 배열 크기
    return 0;
}`,
      number: `#include <stdio.h>

void solve(int n) {
    // 여기에 코드를 작성하세요
    // n: 정수
}`,
      graph: `#include <stdio.h>

int solve(int n, int edges[][3], int edgeCount, int start, int end) {
    // 여기에 코드를 작성하세요
    // n: 노드 수, edges: 간선 정보, start: 시작 노드, end: 목표 노드
    return 0;
}`,
      strings: `#include <stdio.h>
#include <string.h>

int solve(char* str1, char* str2) {
    // 여기에 코드를 작성하세요
    // str1, str2: 문자열
    return 0;
}`,
    },
  };

  return (
    templates[language]?.[inputType] || templates[language]?.["none"] || ""
  );
};

export default function ProblemSolvePage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const [language, setLanguage] = useState<string>("python");
  const [code, setCode] = useState("");
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
  const [aiFeedback, setAiFeedback] = useState<{
    suggestions: string[];
    complexity: string;
    improvements: string[];
  } | null>(null);
  const [showAIFeedback, setShowAIFeedback] = useState(false);

  // 문제 데이터 찾기
  const problem = allProblems.find((p) => p.number === parseInt(id));
  const details = problem ? problemDetails[problem.id] : null;

  // 문제가 로드될 때 examples를 포함한 템플릿 생성
  useEffect(() => {
    if (details && details.examples) {
      const newCode = getTemplateForProblem(id, language, details.examples);
      setCode(newCode);
    }
  }, [id, language, details]);

  const handleCodeChange = (newCode: string) => {
    setCode(newCode);
  };

  const handleCursorChange = (line: number, column: number) => {
    setLineNumber(line);
    setColumnNumber(column);
  };

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage);
    if (details) {
      setCode(getTemplateForProblem(id, newLanguage, details.examples));
    } else {
      setCode(getTemplateForProblem(id, newLanguage));
    }
    setOutput("");
    setTestResults([]);
    setShowAIFeedback(false);
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
        // 각 예제의 입력값을 전달
        const result = executeCode(code, language, example.input);
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

      if (allPassed) {
        setOutput("모든 테스트 케이스를 통과했습니다! ✨");
        // 테스트 통과 시 자동으로 AI 피드백 생성
        generateAIFeedback();
      } else {
        setOutput(
          `${results.filter((r) => r.passed).length}/${
            results.length
          } 테스트 케이스 통과`
        );
        // 실패 시 AI 피드백 숨기기
        setShowAIFeedback(false);
      }
    } catch (error) {
      setOutput(`테스트 오류: ${error}`);
      setShowAIFeedback(false);
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

  const generateAIFeedback = () => {
    // 코드 분석을 통한 실제 AI 피드백 생성
    const analysis = analyzeCode(code, language);
    setAiFeedback(analysis);
    setShowAIFeedback(true);
  };

  // 코드 분석 함수 - 실제 코드를 분석하여 피드백 생성
  const analyzeCode = (code: string, language: string) => {
    const lines = code.split("\n");
    const codeLength = lines.length;
    const hasLoops = /for|while|forEach|map|filter|reduce/.test(code);
    const hasNestedLoops = /for.*for|while.*while/.test(
      code.replace(/\n/g, " ")
    );
    const hasComments = /\/\/|\/\*|\#/.test(code);
    const functionCount = (code.match(/function|def |const \w+ = \(|=>/g) || [])
      .length;
    const variableCount = (code.match(/let |const |var |int |String /g) || [])
      .length;

    // 복잡도 분석
    let complexity = "O(1) - 상수 시간";
    let complexityAdvice = "현재 코드는 최적의 시간 복잡도를 가지고 있습니다.";

    if (hasNestedLoops) {
      complexity = "O(n²) 이상 - 중첩 반복문";
      complexityAdvice =
        "중첩 반복문을 제거하거나 해시맵/정렬을 활용하면 O(n log n) 또는 O(n)으로 개선할 수 있습니다.";
    } else if (hasLoops) {
      complexity = "O(n) - 선형 시간";
      complexityAdvice =
        "단일 반복문으로 효율적인 구현입니다. 추가 최적화는 어려울 수 있습니다.";
    }

    // 개선 제안 생성
    const suggestions: string[] = [];

    if (!hasComments && codeLength > 10) {
      suggestions.push(
        "복잡한 로직에는 주석을 추가하여 코드 가독성을 높이세요."
      );
    }

    if (variableCount > 10) {
      suggestions.push(
        "변수가 많습니다. 관련된 변수들을 객체나 클래스로 그룹화하는 것을 고려하세요."
      );
    }

    if (functionCount === 0 || codeLength > 30) {
      suggestions.push(
        "긴 코드는 여러 함수로 분리하면 재사용성과 테스트 용이성이 향상됩니다."
      );
    }

    if (language === "python" && !code.includes("def ")) {
      suggestions.push(
        "파이썬에서는 함수를 정의하여 코드를 구조화하는 것이 좋습니다."
      );
    }

    if (language === "javascript" && code.includes("var ")) {
      suggestions.push(
        "'var' 대신 'let'이나 'const'를 사용하여 블록 스코프를 명확히 하세요."
      );
    }

    if (suggestions.length === 0) {
      suggestions.push(
        "코드 구조가 깔끔합니다. 에지 케이스 처리를 확인해보세요."
      );
      suggestions.push("변수명이 명확한지 다시 한번 검토해보세요.");
    }

    // 최적화 포인트
    const improvements: string[] = [];

    if (hasNestedLoops) {
      improvements.push(
        "중첩 반복문을 해시맵이나 Set을 활용한 O(n) 알고리즘으로 개선"
      );
    }

    if (code.includes(".push(") && hasLoops) {
      improvements.push(
        "배열 크기를 미리 할당하거나, 언어별 내장 함수 활용 (map, filter 등)"
      );
    }

    if (language === "python" && code.includes("range(len(")) {
      improvements.push("enumerate()를 사용하면 더 Pythonic한 코드가 됩니다.");
    }

    if (language === "javascript" && code.includes("for (var i")) {
      improvements.push(
        "Array 메서드(map, filter, reduce)를 활용하면 더 간결하고 함수형 프로그래밍 스타일로 작성 가능"
      );
    }

    if (improvements.length === 0) {
      improvements.push("현재 코드는 이미 최적화되어 있습니다.");
      improvements.push(
        "메모리 사용을 줄이기 위해 불필요한 변수 선언을 제거하세요."
      );
    }

    return {
      complexity: `${complexity}\n${complexityAdvice}`,
      suggestions: suggestions.slice(0, 3),
      improvements: improvements.slice(0, 3),
    };
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
                    onChange={(e) => handleLanguageChange(e.target.value)}
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
                  onClick={generateAIFeedback}
                  disabled={
                    testResults.length === 0 ||
                    !testResults.every((r) => r.passed)
                  }
                  className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 disabled:from-gray-700 disabled:to-gray-700 text-white rounded-lg font-semibold text-xs transition-colors"
                  title={
                    testResults.length === 0
                      ? "먼저 테스트를 통과하세요"
                      : !testResults.every((r) => r.passed)
                      ? "모든 테스트를 통과해야 합니다"
                      : "AI 피드백 받기"
                  }
                >
                  <Sparkles size={14} />
                  AI 피드백
                </button>
                <button
                  onClick={copyCode}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold text-xs transition-colors ml-auto"
                >
                  <Copy size={14} />
                  {copied ? "복사됨" : "복사"}
                </button>
              </div>

              {/* AI 피드백 */}
              {showAIFeedback && aiFeedback && (
                <div className="border-t border-gray-900 bg-gradient-to-br from-purple-500/10 to-pink-500/10 p-4 max-h-64 overflow-y-auto flex-shrink-0">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold text-purple-400 flex items-center gap-2">
                      <Sparkles size={16} />
                      AI 코드 리뷰
                    </h3>
                    <button
                      onClick={() => setShowAIFeedback(false)}
                      className="text-gray-400 hover:text-white text-xs"
                    >
                      닫기
                    </button>
                  </div>

                  <div className="space-y-3">
                    {/* 복잡도 분석 */}
                    <div className="bg-black/30 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp size={14} className="text-blue-400" />
                        <p className="text-xs font-semibold text-blue-400">
                          복잡도 분석
                        </p>
                      </div>
                      <p className="text-xs text-gray-300">
                        {aiFeedback.complexity}
                      </p>
                    </div>

                    {/* 개선 제안 */}
                    <div className="bg-black/30 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <Lightbulb size={14} className="text-yellow-400" />
                        <p className="text-xs font-semibold text-yellow-400">
                          개선 제안
                        </p>
                      </div>
                      <ul className="space-y-1">
                        {aiFeedback.suggestions.map((suggestion, idx) => (
                          <li
                            key={idx}
                            className="text-xs text-gray-300 flex gap-2"
                          >
                            <span className="text-yellow-400">•</span>
                            <span>{suggestion}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* 최적화 포인트 */}
                    <div className="bg-black/30 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-2">
                        <CheckCircle size={14} className="text-green-400" />
                        <p className="text-xs font-semibold text-green-400">
                          최적화 포인트
                        </p>
                      </div>
                      <ul className="space-y-1">
                        {aiFeedback.improvements.map((improvement, idx) => (
                          <li
                            key={idx}
                            className="text-xs text-gray-300 flex gap-2"
                          >
                            <span className="text-green-400">✓</span>
                            <span>{improvement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

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
