export interface Problem {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  category: string[];
  description: string;
  examples: Example[];
  constraints: string[];
  acceptanceRate: number;
  likes: number;
}

export interface Example {
  input: string;
  output: string;
  explanation?: string;
}

export interface TestCase {
  input: string;
  expectedOutput: string;
  isHidden?: boolean;
}

export interface Submission {
  id: string;
  problemId: string;
  userId: string;
  code: string;
  language: string;
  status:
    | "Pending"
    | "Running"
    | "Accepted"
    | "Wrong Answer"
    | "Runtime Error"
    | "Time Limit Exceeded";
  runtime?: number;
  memory?: number;
  submittedAt: Date;
}
