"use client";

import React, { useState } from "react";

interface CodeEditorProps {
  initialCode?: string;
  onRun?: (code: string, language: string) => void;
  onSubmit?: (code: string, language: string) => void;
}

export default function CodeEditor({
  initialCode = "// 여기에 코드를 작성하세요",
  onRun,
  onSubmit,
}: CodeEditorProps) {
  const [code, setCode] = useState(initialCode);
  const [language, setLanguage] = useState("javascript");
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = async () => {
    if (onRun) {
      setIsRunning(true);
      await onRun(code, language);
      setIsRunning(false);
    }
  };

  const handleSubmit = async () => {
    if (onSubmit) {
      setIsRunning(true);
      await onSubmit(code, language);
      setIsRunning(false);
    }
  };

  return (
    <div className="flex flex-col h-full border border-gray-200 rounded-lg overflow-hidden">
      <div className="flex justify-between items-center p-4 bg-gray-50 border-b border-gray-200">
        <select
          value={language}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            setLanguage(e.target.value)
          }
          className="px-2 py-2 border border-gray-300 rounded text-sm cursor-pointer focus:outline-none focus:border-blue-500"
        >
          <option value="javascript">JavaScript</option>
          <option value="typescript">TypeScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
        </select>
        <div className="flex gap-2">
          <button
            onClick={handleRun}
            disabled={isRunning}
            className="px-4 py-2 text-sm font-medium rounded border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            실행
          </button>
          <button
            onClick={handleSubmit}
            disabled={isRunning}
            className="px-4 py-2 text-sm font-medium rounded bg-blue-500 text-white hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            제출
          </button>
        </div>
      </div>
      <textarea
        value={code}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          setCode(e.target.value)
        }
        placeholder="여기에 코드를 작성하세요..."
        className="flex-1 p-4 font-mono text-sm leading-relaxed border-none resize-none focus:outline-none"
      />
    </div>
  );
}
