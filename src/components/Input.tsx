import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  type?: "text" | "search" | "password" | "email" | "number";
  width?: string | number;
}

export default function Input({
  type = "text",
  className = "",
  width,
  ...props
}: InputProps) {
  const isSearch = type === "search";

  // width가 숫자거나 px로 끝나면 인라인 스타일로, 아니면 className으로 처리
  const widthStyle =
    typeof width === "number" ||
    (typeof width === "string" && width.endsWith("px"))
      ? { width: typeof width === "number" ? `${width}px` : width }
      : undefined;
  const widthClass = widthStyle ? "" : width || "w-full";

  return (
    <div className={`relative ${widthClass}`} style={widthStyle}>
      {isSearch && (
        <svg
          className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      )}
      <input
        type={type}
        className={`w-full px-5 py-4 bg-transparent border-b border-gray-700 text-white placeholder-gray-500 outline-none focus:border-gray-500 transition-colors ${
          isSearch ? "pl-8" : ""
        } ${className}`}
        {...props}
      />
    </div>
  );
}
