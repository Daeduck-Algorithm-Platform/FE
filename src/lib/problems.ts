export interface Problem {
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

export interface ProblemDetail {
  description: string;
  examples: Array<{ input: string; output: string }>;
  constraints: string[];
  timeLimit: string;
  memoryLimit: string;
}

export const allProblems: Problem[] = [
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

export const problemDetails: Record<string, ProblemDetail> = {
  "1": {
    description:
      "Microsoft 로고 문제는 패턴을 이용한 문제입니다. 주어진 숫자 n에 대해 마이크로소프트 로고 패턴을 출력해야 합니다. 각 행은 특정 패턴을 따르며, 공백과 별표의 조합으로 로고를 구성합니다.",
    examples: [
      { input: "5", output: "*     *\n*     *\n*  *  *\n*     *\n*     *" },
      {
        input: "7",
        output:
          "*       *\n*       *\n*   *   *\n*   *   *\n*       *\n*       *\n*       *",
      },
    ],
    constraints: ["1 ≤ n ≤ 100", "n은 홀수", "출력 형식은 정확히 따라야 함"],
    timeLimit: "1초",
    memoryLimit: "128MB",
  },
  "2": {
    description:
      "주어진 배열에서 특정 조건을 만족하는 원소를 감지하고 계산하는 문제입니다. 각 원소의 좌측에 더 큰 값이 몇 개 있는지 세어야 합니다.",
    examples: [
      { input: "[1, 5, 0, 3, 4]", output: "0 0 1 1 1" },
      { input: "[10, 20, 15]", output: "0 0 1" },
    ],
    constraints: [
      "1 ≤ 배열 크기 ≤ 100000",
      "-1000 ≤ 각 원소 ≤ 1000",
      "중복 원소 가능",
    ],
    timeLimit: "2초",
    memoryLimit: "256MB",
  },
  "3": {
    description:
      "DNA 헬릭스 패턴의 2번째 변형입니다. 주어진 길이에 따라 나선 패턴을 생성해야 합니다. ACGT 염기서열을 특정 규칙에 따라 나열합니다.",
    examples: [
      { input: "8", output: "ACGTACGT" },
      { input: "12", output: "ACGTACGTACGT" },
    ],
    constraints: [
      "1 ≤ 길이 ≤ 100000",
      "DNA 염기서열: ACGT만 사용",
      "패턴은 ACGT를 반복",
    ],
    timeLimit: "1초",
    memoryLimit: "256MB",
  },
  "4": {
    description:
      "두 도시 사이의 최단 경로를 찾는 문제입니다. 무방향 그래프에서 주어진 두 노드 사이의 최단 거리를 구해야 합니다. BFS 또는 다익스트라 알고리즘을 사용할 수 있습니다.",
    examples: [
      { input: "4 5\n1 2 1\n1 3 4\n2 3 2\n2 4 5\n3 4 1\n1 4", output: "4" },
      { input: "3 2\n1 2 10\n2 3 20\n1 3", output: "30" },
    ],
    constraints: [
      "1 ≤ 노드 수 ≤ 1000",
      "1 ≤ 간선 수 ≤ 10000",
      "1 ≤ 가중치 ≤ 10000",
    ],
    timeLimit: "2초",
    memoryLimit: "256MB",
  },
  "5": {
    description:
      "배열의 모든 원소의 합을 구하는 문제입니다. 주어진 배열에서 음수 부분 수열(contiguous subarray)의 최대 합을 구해야 합니다.",
    examples: [
      { input: "[-2, 1, -3, 4, -1, 2, 1, -5, 4]", output: "6" },
      { input: "[5, -3, 5]", output: "7" },
    ],
    constraints: [
      "1 ≤ 배열 크기 ≤ 100000",
      "-10000 ≤ 각 원소 ≤ 10000",
      "최소 하나의 원소 선택 필수",
    ],
    timeLimit: "1초",
    memoryLimit: "256MB",
  },
  "6": {
    description:
      "주어진 배열에서 최대값을 찾는 문제입니다. 단순하지만 효율성이 중요한 문제로, 최적화된 알고리즘이 필요합니다.",
    examples: [
      { input: "[3, 1, 4, 1, 5, 9, 2, 6]", output: "9" },
      { input: "[-5, -2, -10, -1]", output: "-1" },
    ],
    constraints: [
      "1 ≤ 배열 크기 ≤ 1000000",
      "-1000000 ≤ 각 원소 ≤ 1000000",
      "중복 원소 가능",
    ],
    timeLimit: "1초",
    memoryLimit: "128MB",
  },
  "7": {
    description:
      "주어진 배열을 정렬하는 문제입니다. 다양한 정렬 알고리즘(퀵정렬, 병합정렬 등)을 이용할 수 있으며, 시간복잡도 O(n log n)의 해답이 요구됩니다.",
    examples: [
      { input: "[5, 2, 8, 1, 9]", output: "[1, 2, 5, 8, 9]" },
      { input: "[3, 3, 1, 2]", output: "[1, 2, 3, 3]" },
    ],
    constraints: [
      "1 ≤ 배열 크기 ≤ 100000",
      "-1000 ≤ 각 원소 ≤ 1000",
      "제자리 정렬 권장",
    ],
    timeLimit: "1초",
    memoryLimit: "256MB",
  },
  "8": {
    description:
      "그래프의 깊이 우선 탐색(DFS) 또는 너비 우선 탐색(BFS)을 이용하여 주어진 조건을 만족하는 노드를 찾는 문제입니다. 그래프의 연결성을 확인해야 합니다.",
    examples: [
      { input: "5 4\n1 2\n2 3\n3 4\n4 5\n1 5", output: "Yes" },
      { input: "3 1\n1 2\n2 3", output: "No" },
    ],
    constraints: [
      "1 ≤ 노드 수 ≤ 10000",
      "1 ≤ 간선 수 ≤ 100000",
      "단일 연결 성분 보장",
    ],
    timeLimit: "2초",
    memoryLimit: "512MB",
  },
  "9": {
    description:
      "동적 계획법을 이용하는 문제입니다. 주어진 인덱스까지 도달할 수 있는 최대값을 구하는 문제로, 부분 문제의 최적해를 이용해 전체 최적해를 구합니다.",
    examples: [
      { input: "5 [2, 3, 1, 1, 4]", output: "True" },
      { input: "3 [3, 2, 1, 0, 4]", output: "False" },
    ],
    constraints: [
      "0 ≤ 배열 크기 ≤ 10000",
      "0 ≤ 각 원소 ≤ 100",
      "배열의 마지막 인덱스에 도달 가능 여부 판단",
    ],
    timeLimit: "1초",
    memoryLimit: "256MB",
  },
  "10": {
    description:
      "문자열을 변환하는 문제입니다. 두 문자열이 주어졌을 때, 한 문자열을 다른 문자열로 변환하는 데 필요한 최소 편집 거리(Edit Distance, Levenshtein Distance)를 구합니다.",
    examples: [
      { input: "horse\nros", output: "3" },
      { input: "intention\nexecution", output: "5" },
    ],
    constraints: [
      "0 ≤ 문자열 길이 ≤ 500",
      "영문자와 숫자만 포함",
      "삽입, 삭제, 치환 연산 허용",
    ],
    timeLimit: "2초",
    memoryLimit: "256MB",
  },
};
