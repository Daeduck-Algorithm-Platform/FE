"use client";

import Link from "next/link";
import { Search, Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

type Post = {
  id: number;
  title: string;
  content: string;
  author: string;
  timestamp: string;
};

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("community_posts");
    if (!stored) return;
    try {
      const parsed = JSON.parse(stored) as Post[];
      setPosts(parsed);
    } catch {
      setPosts([]);
    }
  }, []);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return posts;
    return posts.filter(
      (p) =>
        p.title.toLowerCase().includes(term) ||
        p.content.toLowerCase().includes(term)
    );
  }, [posts, search]);

  const formatDate = (iso: string) => {
    try {
      return new Date(iso).toLocaleString("ko-KR", {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "";
    }
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
          <Link
            href="/community/write"
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors font-medium"
          >
            <Plus size={18} />새 글 작성
          </Link>
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
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-[#1a1a1a] border border-gray-800 rounded-lg pl-11 pr-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-green-500 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* 게시물 목록 */}
          <div className="space-y-4">
            {filtered.length === 0 ? (
              <div className="bg-[#0d0d0d] border border-gray-900 rounded-lg p-6 text-center text-gray-400">
                <p className="mb-3">검색 결과가 없습니다.</p>
                <Link
                  href="/community/write"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors font-medium"
                >
                  <Plus size={16} /> 첫 글 작성하기
                </Link>
              </div>
            ) : (
              filtered.map((post) => (
                <div
                  key={post.id}
                  className="bg-[#0d0d0d] border border-gray-900 hover:border-gray-700 rounded-lg p-6 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <h3 className="text-white font-bold text-lg mb-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-400 text-sm whitespace-pre-line">
                        {post.content}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-800 text-xs text-gray-500">
                    <span className="text-gray-400">{post.author}</span>
                    <span>{formatDate(post.timestamp)}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
