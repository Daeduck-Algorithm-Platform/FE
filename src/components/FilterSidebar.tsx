"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";

interface FilterState {
  keyword: string;
  difficultyMin: string;
  difficultyMax: string;
  status: string;
  record: string;
}

const defaultFilters: FilterState = {
  keyword: "",
  difficultyMin: "",
  difficultyMax: "",
  status: "전체",
  record: "",
};

interface FilterProps {
  value?: FilterState;
  onFilterChange?: (filters: FilterState) => void;
}

export default function FilterSidebar({ value, onFilterChange }: FilterProps) {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);

  // sync when parent provides controlled value
  useEffect(() => {
    if (value) {
      setFilters(value);
    }
  }, [value]);

  const handleKeywordChange = (value: string) => {
    const updated = { ...filters, keyword: value };
    setFilters(updated);
    onFilterChange?.(updated);
  };

  const handleDifficultyMinChange = (value: string) => {
    const updated = { ...filters, difficultyMin: value };
    setFilters(updated);
    onFilterChange?.(updated);
  };

  const handleDifficultyMaxChange = (value: string) => {
    const updated = { ...filters, difficultyMax: value };
    setFilters(updated);
    onFilterChange?.(updated);
  };

  const handleStatusChange = (value: string) => {
    const updated = { ...filters, status: value };
    setFilters(updated);
    onFilterChange?.(updated);
  };

  const handleRecordChange = (value: string) => {
    const updated = { ...filters, record: value };
    setFilters(updated);
    onFilterChange?.(updated);
  };

  const resetFilters = () => {
    setFilters(defaultFilters);
    onFilterChange?.(defaultFilters);
  };

  return (
    <aside className="w-72 bg-black border-r border-gray-800 p-7 sticky top-20 min-h-[calc(100vh-80px)] overflow-y-auto">
      {/* 필터 헤더 */}
      <div className="flex items-center justify-between mb-6 pb-4 border-b border-dashed border-gray-700">
        <h2 className="text-white font-bold text-sm tracking-tight">필터</h2>
        <button
          onClick={resetFilters}
          className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
        >
          초기화 ↻
        </button>
      </div>

      {/* 검색 */}
      <div className="mb-8">
        <label className="text-gray-300 text-xs block mb-3">검색</label>
        <div className="relative">
          <Search
            size={16}
            className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-600"
          />
          <input
            type="text"
            placeholder="문제 제목을 입력해주세요."
            value={filters.keyword}
            onChange={(e) => handleKeywordChange(e.target.value)}
            className="w-full bg-transparent border-b border-gray-700 pl-6 pr-3 py-2 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-gray-500"
          />
        </div>
      </div>

      {/* 난이도 필터 */}
      <div className="mb-8">
        <label className="text-gray-300 text-xs block mb-3">난이도</label>
        <div className="flex items-center gap-3">
          <select
            value={filters.difficultyMin}
            onChange={(e) => handleDifficultyMinChange(e.target.value)}
            className="flex-1 bg-transparent border border-gray-600 rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:border-gray-400 cursor-pointer"
          >
            <option value="">쉬움</option>
            <option value="쉬움">쉬움</option>
            <option value="중간">중간</option>
            <option value="어려움">어려움</option>
          </select>
          <span className="text-gray-600 text-xs">...</span>
          <select
            value={filters.difficultyMax}
            onChange={(e) => handleDifficultyMaxChange(e.target.value)}
            className="flex-1 bg-transparent border border-gray-600 rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:border-gray-400 cursor-pointer"
          >
            <option value="">어려움</option>
            <option value="쉬움">쉬움</option>
            <option value="중간">중간</option>
            <option value="어려움">어려움</option>
          </select>
        </div>
      </div>

      {/* 해결 상태 필터 */}
      <div className="mb-8">
        <label className="text-gray-300 text-xs block mb-3">해결상태</label>
        <div className="flex flex-wrap gap-3">
          {["전체", "해결", "미해결", "실패"].map((status) => (
            <button
              type="button"
              key={status}
              onClick={() => handleStatusChange(status)}
              className={`px-4 py-2 rounded-md border text-sm transition-colors ${
                filters.status === status
                  ? "border-green-500 text-green-400 bg-green-500/10 shadow-[0_0_0_1px_rgba(74,222,128,0.2)]"
                  : "border-gray-700 text-gray-300 hover:border-gray-500"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* 레코드 필터 */}
      <div className="mb-8">
        <label className="text-gray-300 text-xs block mb-3">레코드</label>
        <div className="relative">
          <Search
            size={16}
            className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-600"
          />
          <input
            type="text"
            placeholder="이름을 입력해주세요."
            value={filters.record}
            onChange={(e) => handleRecordChange(e.target.value)}
            className="w-full bg-transparent border-b border-gray-700 pl-6 pr-3 py-2 text-white text-sm placeholder-gray-600 focus:outline-none focus:border-gray-500"
          />
        </div>
      </div>
    </aside>
  );
}
