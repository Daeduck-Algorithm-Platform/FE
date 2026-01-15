"use client";

import Link from "next/link";
import { Search, Plus, MessageCircle, ThumbsUp, Eye } from "lucide-react";
import { useState } from "react";

export default function CommunityPage() {
  const [posts] = useState([
    {
      id: 1,
      title: "마이크로소프트 로고 문제 풀이 팁",
      author: "강은찬",
      category: "팁",
      views: 234,
      replies: 12,
      likes: 45,
      timestamp: "2시간 전",
      excerpt:
        "이 문제는 패턴 인식이 핵심입니다. DP를 이용한 효율적인 접근법을 공유합니다.",
    },
    {
      id: 2,
      title: "감지 계산 알고리즘 질문",
      author: "조성현",
      category: "질문",
      views: 156,
      replies: 8,
      likes: 23,
      timestamp: "4시간 전",
      excerpt: "이 문제의 시간복잡도를 어떻게 O(n)으로 줄일 수 있을까요?",
    },
    {
      id: 3,
      title: "DNA 헬릭스 2 - 완벽한 해답",
      author: "유재민",
      category: "해답",
      views: 432,
      replies: 24,
      likes: 89,
      timestamp: "1일 전",
      excerpt: "우아한 비트마스킹 솔루션으로 O(1) 공간 복잡도 달성!",
    },
    {
      id: 4,
      title: "경로 합 변형 - 다양한 접근법",
      author: "정승우",
      category: "토론",
      views: 312,
      replies: 31,
      likes: 67,
      timestamp: "2일 전",
      excerpt:
        "재귀, DP, BFS 3가지 방식을 비교해봤습니다. 각각의 장단점을 정리했어요.",
    },
  ]);

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      팁: "bg-blue-500/20 text-blue-400",
      질문: "bg-yellow-500/20 text-yellow-400",
      해답: "bg-green-500/20 text-green-400",
      토론: "bg-purple-500/20 text-purple-400",
    };
    return colors[category] || colors.토론;
  };

  return (
    <div className="bg-[#0b0b0b] min-h-screen">
      {/* 헤더 */}
      <header className="sticky top-0 z-40 bg-black border-b border-gray-900">
        <div className="px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">커뮤니티</h1>
            <p className="text-gray-500 text-sm">
              질문, 팁, 해답을 공유하고 토론하세요
            </p>
          </div>
          <button className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors font-medium">
            <Plus size={18} />새 글 작성
          </button>
        </div>
      </header>

      <main className="px-8 py-8">
        <div className="max-w-4xl mx-auto">
          {/* 검색 및 필터 */}
          <div className="mb-8">
            <div className="flex gap-4">
              <div className="flex-1 relative">
                <Search
                  className="absolute left-4 top-3 text-gray-500"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="글 제목이나 키워드로 검색..."
                  className="w-full bg-[#1a1a1a] border border-gray-800 rounded-lg pl-11 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-green-500 transition-colors"
                />
              </div>
            </div>

            {/* 카테고리 필터 */}
            <div className="mt-4 flex gap-2 flex-wrap">
              {["전체", "팁", "질문", "해답", "토론"].map((cat) => (
                <button
                  key={cat}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    cat === "전체"
                      ? "bg-green-500/20 text-green-400 border border-green-500/50"
                      : "bg-gray-900 text-gray-400 border border-gray-800 hover:border-gray-700"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* 게시물 목록 */}
          <div className="space-y-4">
            {posts.map((post) => (
              <Link key={post.id} href={`/community/${post.id}`}>
                <div className="bg-[#0d0d0d] border border-gray-900 hover:border-gray-700 rounded-lg p-6 transition-colors cursor-pointer">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex-1">
                      <h3 className="text-white font-bold text-lg mb-2 hover:text-green-400 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-400 text-sm line-clamp-2">
                        {post.excerpt}
                      </p>
                    </div>
                    <span
                      className={`inline-block px-3 py-1 rounded text-xs whitespace-nowrap ${getCategoryColor(
                        post.category
                      )}`}
                    >
                      {post.category}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                    <div className="flex items-center gap-4 text-gray-500 text-xs">
                      <span className="text-gray-400">{post.author}</span>
                      <span>{post.timestamp}</span>
                    </div>
                    <div className="flex items-center gap-6 text-gray-500">
                      <div className="flex items-center gap-1">
                        <Eye size={16} />
                        <span className="text-xs">{post.views}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle size={16} />
                        <span className="text-xs">{post.replies}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <ThumbsUp size={16} />
                        <span className="text-xs">{post.likes}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* 페이지네이션 */}
          <div className="mt-12 flex items-center justify-center gap-2">
            <button className="px-4 py-2 bg-gray-900 text-gray-400 border border-gray-800 rounded-lg hover:border-gray-700 transition-colors">
              이전
            </button>
            {[1, 2, 3, 4, 5].map((page) => (
              <button
                key={page}
                className={`w-10 h-10 rounded-lg transition-colors ${
                  page === 1
                    ? "bg-green-500/20 text-green-400 border border-green-500/50"
                    : "bg-gray-900 text-gray-400 border border-gray-800 hover:border-gray-700"
                }`}
              >
                {page}
              </button>
            ))}
            <button className="px-4 py-2 bg-gray-900 text-gray-400 border border-gray-800 rounded-lg hover:border-gray-700 transition-colors">
              다음
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
