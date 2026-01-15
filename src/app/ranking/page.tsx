"use client";

import Link from "next/link";
import { Trophy, TrendingUp, Award, Target, BarChart3 } from "lucide-react";

interface UserRanking {
  id: string;
  rank: number;
  username: string;
  solved: number;
  accuracy: number;
  score: number;
}

const baseRankings: UserRanking[] = [
  {
    id: "1",
    rank: 1,
    username: "강은찬",
    solved: 8,
    accuracy: 100,
    score: 4500,
  },
  {
    id: "2",
    rank: 2,
    username: "조성현",
    solved: 6,
    accuracy: 100,
    score: 3800,
  },
  {
    id: "3",
    rank: 3,
    username: "정승우",
    solved: 5,
    accuracy: 100,
    score: 3200,
  },
  {
    id: "4",
    rank: 4,
    username: "유재민",
    solved: 4,
    accuracy: 75,
    score: 2100,
  },
];

// 랭킹 계산 로직: 풀이 수, 정답률, 점수를 정규화해서 총점 계산
const calculateRankingScore = (ranking: UserRanking): number => {
  // 최대값 기준으로 정규화 (0-100 범위)
  const maxSolved = Math.max(...baseRankings.map((r) => r.solved));
  const maxScore = Math.max(...baseRankings.map((r) => r.score));

  const solvedScore = (ranking.solved / maxSolved) * 100;
  const accuracyScore = ranking.accuracy; // 이미 0-100 범위
  const scoreScore = (ranking.score / maxScore) * 100;

  // 세 항목을 동일 가중치로 합산
  return (solvedScore + accuracyScore + scoreScore) / 3;
};

// 점수 기준으로 정렬하고 순위 재지정
const rankings: UserRanking[] = baseRankings
  .map((ranking) => ({
    ...ranking,
    totalScore: calculateRankingScore(ranking),
  }))
  .sort((a: any, b: any) => b.totalScore - a.totalScore)
  .map((ranking: any, index) => ({
    ...ranking,
    rank: index + 1,
  }));

const getRankColor = (rank: number) => {
  switch (rank) {
    case 1:
      return "text-yellow-400";
    case 2:
      return "text-gray-400";
    case 3:
      return "text-orange-400";
    default:
      return "text-gray-400";
  }
};

const getRankBgColor = (rank: number) => {
  switch (rank) {
    case 1:
      return "bg-yellow-500/10";
    case 2:
      return "bg-gray-500/10";
    case 3:
      return "bg-orange-500/10";
    default:
      return "";
  }
};

export default function RankingPage() {
  return (
    <div className="bg-[#0b0b0b] min-h-screen">
      <main className="px-10 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-start justify-between mb-10">
            <div>
              <h1 className="text-3xl font-bold text-white">랭킹</h1>
              <p className="text-sm text-gray-400 mt-3">
                사용자들 간의 경쟁을 통해 실력을 확인해보세요.
              </p>
            </div>
            <div className="flex items-center gap-2 bg-[#0f0f0f] border border-gray-900 rounded-full px-4 py-2">
              <Trophy size={16} className="text-yellow-400" />
              <span className="text-sm text-gray-400">정승우님의 순위 #3</span>
            </div>
          </div>

          <div className="flex gap-8 text-sm mb-8 border-b border-gray-900">
            <Link
              href="/problems"
              className="text-gray-500 font-bold hover:text-gray-300 pb-4 transition-colors"
            >
              문제
            </Link>
            <Link
              href="/contribution"
              className="text-gray-500 font-bold hover:text-gray-300 pb-4 transition-colors"
            >
              기여
            </Link>
            <Link
              href="/ranking"
              className="text-green-400 font-bold border-b-2 border-green-500 pb-4"
            >
              랭킹
            </Link>
          </div>

          {/* 통계 카드 */}
          <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/30 rounded-xl p-6">
              <div className="flex items-center justify-between mb-3">
                <Trophy className="text-yellow-400" size={24} />
                <div className="text-right">
                  <p className="text-xs text-gray-400">1위 사용자</p>
                  <p className="text-2xl font-bold text-yellow-400">강은찬</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 size={14} className="text-yellow-400/60" />
                <p className="text-xs text-gray-400">8문제 해결 · 100%</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-6">
              <div className="flex items-center justify-between mb-3">
                <Target className="text-green-400" size={24} />
                <div className="text-right">
                  <p className="text-xs text-gray-400">평균 정답률</p>
                  <p className="text-2xl font-bold text-green-400">94%</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp size={14} className="text-green-400/60" />
                <p className="text-xs text-gray-400">전월 대비 +8%</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl p-6">
              <div className="flex items-center justify-between mb-3">
                <Award className="text-blue-400" size={24} />
                <div className="text-right">
                  <p className="text-xs text-gray-400">총 해결 문제</p>
                  <p className="text-2xl font-bold text-blue-400">23</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 size={14} className="text-blue-400/60" />
                <p className="text-xs text-gray-400">전체 10문제 중</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-6">
              <div className="flex items-center justify-between mb-3">
                <TrendingUp className="text-purple-400" size={24} />
                <div className="text-right">
                  <p className="text-xs text-gray-400">평균 점수</p>
                  <p className="text-2xl font-bold text-purple-400">3,400</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp size={14} className="text-purple-400/60" />
                <p className="text-xs text-gray-400">지난주 대비 +250</p>
              </div>
            </div>
          </div>

          {/* Ranking Table */}
          <div className="rounded-xl border border-gray-900 overflow-hidden bg-[#0d0d0d]">
            <div className="grid grid-cols-[80px,200px,120px,120px,140px] px-6 py-4 text-xs tracking-wide text-gray-500 uppercase border-b border-gray-900 bg-black/30">
              <span>순위</span>
              <span>사용자명</span>
              <span>해결한 문제</span>
              <span>정답률</span>
              <span>점수</span>
            </div>

            {rankings.map((user) => (
              <div
                key={user.id}
                className={`grid grid-cols-[80px,200px,120px,120px,140px] px-6 py-4 text-sm items-center border-b border-gray-900 hover:bg-[#111111] transition-colors ${getRankBgColor(
                  user.rank
                )}`}
              >
                <div className="flex items-center">
                  {user.rank === 1 && <span className="text-2xl">🥇</span>}
                  {user.rank === 2 && <span className="text-2xl">🥈</span>}
                  {user.rank === 3 && <span className="text-2xl">🥉</span>}
                  {user.rank > 3 && (
                    <span
                      className={`font-bold text-lg ${getRankColor(user.rank)}`}
                    >
                      #{user.rank}
                    </span>
                  )}
                </div>

                <span className="text-white font-medium cursor-pointer hover:text-green-400 transition-colors">
                  {user.username}
                </span>

                <div className="flex items-center gap-2">
                  <span className="text-green-400 font-semibold">
                    {user.solved}
                  </span>
                  <span className="text-gray-600">문제</span>
                </div>

                <div className="flex items-center gap-1">
                  <span className="font-semibold text-white">
                    {user.accuracy}%
                  </span>
                </div>

                <span className="text-yellow-400 font-bold text-lg">
                  {user.score.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
