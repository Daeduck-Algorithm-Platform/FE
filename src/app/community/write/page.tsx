"use client";

import { useState, FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check } from "lucide-react";

export default function CommunityWritePage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const stored = localStorage.getItem("community_posts");
    let posts: any[] = [];
    try {
      posts = stored ? JSON.parse(stored) : [];
    } catch {
      posts = [];
    }

    const newPost = {
      id: Date.now(),
      title: title.trim(),
      content: content.trim(),
      author: author.trim() || "익명",
      timestamp: new Date().toISOString(),
    };

    localStorage.setItem(
      "community_posts",
      JSON.stringify([newPost, ...posts])
    );
    router.push("/community");
  };

  const isDisabled = !title.trim() || !content.trim();

  return (
    <div className="bg-[#0b0b0b] min-h-screen text-white">
      <header className="sticky top-0 z-40 bg-black border-b border-gray-900">
        <div className="px-8 py-4 flex items-center gap-3">
          <Link
            href="/community"
            className="p-2 hover:bg-gray-900 rounded-lg transition-colors text-gray-400"
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="text-xl font-bold">글 작성</h1>
            <p className="text-gray-500 text-sm">
              커뮤니티에 새로운 글을 남겨보세요
            </p>
          </div>
        </div>
      </header>

      <main className="px-8 py-10">
        <div className="max-w-4xl mx-auto bg-[#0d0d0d] border border-gray-900 rounded-xl p-8 shadow-lg">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm text-gray-400 mb-2">제목</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-green-500"
                placeholder="글 제목을 입력하세요"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">
                작성자 (선택)
              </label>
              <input
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-green-500"
                placeholder="닉네임을 입력하세요"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-2">내용</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full bg-[#1a1a1a] border border-gray-800 rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-green-500 min-h-[280px]"
                placeholder="내용을 입력하세요"
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="submit"
                disabled={isDisabled}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 disabled:bg-gray-700 text-white font-medium transition-colors"
              >
                <Check size={16} /> 작성 완료
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
