"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen bg-black pt-32 pb-20 overflow-hidden flex items-center">
      {/* 배경 그래디언트 블롭 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-green-500 rounded-full blur-3xl opacity-20 -top-20 -left-20"></div>
        <div className="absolute w-96 h-96 bg-cyan-500 rounded-full blur-3xl opacity-20 -bottom-20 right-20"></div>
        <div className="absolute w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-10 top-1/2 right-1/3"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 좌측 콘텐츠 */}
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-block px-4 py-2 rounded-full bg-green-500 bg-opacity-20 border border-green-500 border-opacity-50">
                <span className="text-green-400 text-sm font-semibold">
                  ✨ 알고리즘 학습 플랫폼
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
                코딩 테스트
                <br />
                <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
                  완벽하게 준비하기
                </span>
              </h1>

              <p className="text-lg text-gray-400 max-w-xl">
                체계적인 문제 풀이로 취업 준비를 시작하세요. 실무 수준의
                알고리즘 문제를 풀고 다른 개발자들과 경쟁해보세요.
              </p>
            </div>

            {/* CTA 버튼 */}
            <div className="flex gap-4 flex-wrap">
              <Link
                href="/problems"
                className="px-8 py-3 rounded-lg bg-gradient-to-r from-green-500 to-cyan-500 text-black font-semibold hover:shadow-lg hover:shadow-green-500/50 transition-all transform hover:scale-105 flex items-center gap-2"
              >
                문제 풀이 시작
                <ArrowRight size={20} />
              </Link>
              <button className="px-8 py-3 rounded-lg border border-gray-600 text-white font-semibold hover:border-green-500 hover:text-green-400 transition-colors">
                학습 가이드 보기
              </button>
            </div>

            {/* 통계 */}
            <div className="flex gap-8 pt-4 border-t border-gray-800">
              <div>
                <p className="text-2xl font-bold text-green-400">3,500+</p>
                <p className="text-sm text-gray-400">문제</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-cyan-400">50,000+</p>
                <p className="text-sm text-gray-400">사용자</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-400">100%</p>
                <p className="text-sm text-gray-400">무료</p>
              </div>
            </div>
          </div>

          {/* 우측 비주얼 */}
          <div className="relative hidden lg:block">
            <div className="relative w-full aspect-square bg-gradient-to-br from-green-500 to-cyan-500 rounded-2xl opacity-10 blur-2xl"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <div className="text-6xl font-bold text-green-400 opacity-50">
                  {"{ }"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
