"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FilterProps {
  onFilterChange?: (filters: any) => void;
}

export default function FilterSidebar({ onFilterChange }: FilterProps) {
  const [expandedSections, setExpandedSections] = useState({
    difficulty: true,
    category: false,
  });

  const difficulties = ["쉬움", "중간", "어려움"];
  const categories = ["그래프", "동적계획법", "문자열", "배열", "정렬"];

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <aside className="w-64 bg-black border-r border-gray-700 p-6 sticky top-20 h-[calc(100vh-80px)] overflow-y-auto">
      {/* 검색 */}
      <div className="mb-8">
        <label className="text-gray-400 text-sm block mb-2">검색</label>
        <input
          type="text"
          placeholder="문제 제목 입력..."
          className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-green-500"
        />
      </div>

      {/* 난이도 필터 */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection("difficulty")}
          className="flex items-center justify-between w-full text-white font-semibold text-sm mb-3 hover:text-green-400"
        >
          난이도
          <ChevronDown
            size={16}
            className={`transition-transform ${
              expandedSections.difficulty ? "rotate-180" : ""
            }`}
          />
        </button>
        {expandedSections.difficulty && (
          <div className="space-y-2 pl-2">
            {difficulties.map((difficulty) => (
              <label
                key={difficulty}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-600 cursor-pointer"
                />
                <span className="text-gray-400 text-sm hover:text-gray-300">
                  {difficulty}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* 카테고리 필터 */}
      <div className="mb-6">
        <button
          onClick={() => toggleSection("category")}
          className="flex items-center justify-between w-full text-white font-semibold text-sm mb-3 hover:text-green-400"
        >
          카테고리
          <ChevronDown
            size={16}
            className={`transition-transform ${
              expandedSections.category ? "rotate-180" : ""
            }`}
          />
        </button>
        {expandedSections.category && (
          <div className="space-y-2 pl-2">
            {categories.map((category) => (
              <label
                key={category}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-600 cursor-pointer"
                />
                <span className="text-gray-400 text-sm hover:text-gray-300">
                  {category}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* 레이드 필터 */}
      <div className="mb-6">
        <label className="text-gray-400 text-sm block mb-3">레이드</label>
        <input
          type="text"
          placeholder="문제를 입력해주세요..."
          className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-green-500"
        />
      </div>
    </aside>
  );
}
