import { Submission } from "@/types";

export async function submitCode(
  problemId: string,
  code: string,
  language: string
): Promise<Submission> {
  // API 호출 시뮬레이션
  return new Promise((resolve) => {
    setTimeout(() => {
      const submission: Submission = {
        id: Math.random().toString(36).substr(2, 9),
        problemId,
        userId: "user123",
        code,
        language,
        status: "Accepted",
        runtime: Math.floor(Math.random() * 100) + 10,
        memory: Math.floor(Math.random() * 50) + 10,
        submittedAt: new Date(),
      };
      resolve(submission);
    }, 2000);
  });
}

export async function runTests(
  problemId: string,
  code: string,
  language: string
): Promise<{ passed: number; total: number; details: any[] }> {
  // 테스트 실행 시뮬레이션
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        passed: 3,
        total: 3,
        details: [
          { testCase: 1, passed: true, output: "[0,1]", expected: "[0,1]" },
          { testCase: 2, passed: true, output: "[1,2]", expected: "[1,2]" },
          { testCase: 3, passed: true, output: "[0,3]", expected: "[0,3]" },
        ],
      });
    }, 1000);
  });
}
