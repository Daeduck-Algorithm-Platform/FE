import { Problem } from "@/types";

// Mock data - 실제로는 데이터베이스에서 가져옴
export const mockProblems: Problem[] = [
  {
    id: "1",
    title: "Two Sum",
    difficulty: "Easy",
    category: ["Array", "Hash Table"],
    description:
      "주어진 정수 배열에서 두 수를 더해 target이 되는 인덱스를 반환하세요.",
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "nums[0] + nums[1] == 9 이므로 [0, 1]을 반환합니다.",
      },
    ],
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
    ],
    acceptanceRate: 48.5,
    likes: 12453,
  },
  {
    id: "2",
    title: "Add Two Numbers",
    difficulty: "Medium",
    category: ["Linked List", "Math"],
    description:
      "두 개의 링크드 리스트로 표현된 음이 아닌 정수를 더하는 함수를 작성하세요.",
    examples: [
      {
        input: "l1 = [2,4,3], l2 = [5,6,4]",
        output: "[7,0,8]",
        explanation: "342 + 465 = 807",
      },
    ],
    constraints: [
      "각 링크드 리스트의 노드 개수는 [1, 100] 범위입니다.",
      "0 <= Node.val <= 9",
    ],
    acceptanceRate: 39.2,
    likes: 8934,
  },
  {
    id: "3",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    category: ["String", "Sliding Window"],
    description:
      "문자열에서 중복 문자가 없는 가장 긴 부분 문자열의 길이를 구하세요.",
    examples: [
      {
        input: 's = "abcabcbb"',
        output: "3",
        explanation: '"abc"가 가장 긴 부분 문자열입니다.',
      },
    ],
    constraints: [
      "0 <= s.length <= 5 * 10^4",
      "s는 영문자, 숫자, 기호 및 공백으로 구성됩니다.",
    ],
    acceptanceRate: 33.8,
    likes: 15678,
  },
];

export async function getProblems(): Promise<Problem[]> {
  // API 호출 시뮬레이션
  return new Promise((resolve) => {
    setTimeout(() => resolve(mockProblems), 100);
  });
}

export async function getProblemById(id: string): Promise<Problem | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const problem = mockProblems.find((p) => p.id === id);
      resolve(problem || null);
    }, 100);
  });
}
