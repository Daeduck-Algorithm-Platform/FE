"use client";

import Link from "next/link";
import { Problem } from "@/types";

const getDifficultyStyles = (difficulty: string) => {
  switch (difficulty) {
    case "Easy":
      return "bg-green-100 text-green-800";
    case "Medium":
      return "bg-yellow-100 text-yellow-800";
    case "Hard":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

interface ProblemCardProps {
  problem: Problem;
}

export default function ProblemCard({ problem }: ProblemCardProps) {
  return (
    <Link href={`/problems/${problem.id}`}>
      <div className="bg-white border border-gray-200 rounded-lg p-6 transition-all hover:shadow-lg hover:-translate-y-0.5 cursor-pointer">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          {problem.title}
        </h3>
        <div className="flex gap-4 items-center mb-3">
          <span
            className={`px-3 py-1 rounded text-sm font-medium ${getDifficultyStyles(
              problem.difficulty
            )}`}
          >
            {problem.difficulty}
          </span>
          <div className="flex gap-2 flex-wrap">
            {problem.category.map((cat) => (
              <span key={cat} className="text-sm text-gray-500">
                #{cat}
              </span>
            ))}
          </div>
        </div>
        <div className="flex gap-4 text-sm text-gray-400">
          <span>정답률: {problem.acceptanceRate}%</span>
          <span>👍 {problem.likes}</span>
        </div>
      </div>
    </Link>
  );
}
