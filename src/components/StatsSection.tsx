"use client";

import { Zap, Users, Trophy } from "lucide-react";

const stats = [
  {
    icon: Zap,
    title: "빠른 학습",
    description: "체계적인 난이도별 문제로 단계적 학습",
    value: "3,500+",
    unit: "정선된 문제",
  },
  {
    icon: Users,
    title: "활발한 커뮤니티",
    description: "전국의 개발자들과 경쟁하고 성장하기",
    value: "50,000+",
    unit: "활동 사용자",
  },
  {
    icon: Trophy,
    title: "실전 대비",
    description: "실제 면접과 시험에 나오는 유형의 문제",
    value: "98%",
    unit: "만족도",
  },
];

export default function StatsSection() {
  return (
    <section className="relative bg-black py-20 overflow-hidden">
      {/* 배경 효과 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-green-500 rounded-full blur-3xl opacity-10 -top-40 -left-40"></div>
        <div className="absolute w-96 h-96 bg-cyan-500 rounded-full blur-3xl opacity-10 -bottom-40 -right-40"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* 섹션 제목 */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-bold text-white">
            왜 <span className="text-green-400">Daeduck</span>인가?
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            최고의 학습 환경과 커뮤니티 지원으로 성공적인 취업을 돕습니다
          </p>
        </div>

        {/* 통계 카드 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="group p-8 rounded-2xl bg-gradient-to-br from-gray-900 to-black border border-gray-800 hover:border-green-500 hover:border-opacity-50 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20"
              >
                <div className="mb-6 p-3 w-fit rounded-lg bg-green-500 bg-opacity-10 group-hover:bg-opacity-20 transition-all">
                  <Icon className="text-green-400" size={28} />
                </div>

                <h3 className="text-xl font-bold text-white mb-2">
                  {stat.title}
                </h3>
                <p className="text-gray-400 text-sm mb-6">{stat.description}</p>

                <div className="pt-6 border-t border-gray-800">
                  <p className="text-3xl font-bold text-green-400">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">{stat.unit}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
