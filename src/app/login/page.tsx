"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components";

export default function LoginPage() {
  const router = useRouter();
  const [studentId, setStudentId] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (studentId && name) {
      sessionStorage.setItem("studentId", studentId);
      sessionStorage.setItem("name", name);
      router.push("/login/verification");
    }
  };

  const handleStudentIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // 숫자만 허용하고 최대 4자리까지만
    if (/^\d{0,4}$/.test(value)) {
      setStudentId(value);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
      {/* 배경 텍스트 패턴 이미지 */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20 pointer-events-none"
        style={{ backgroundImage: "url(/loginBackground.png)" }}
      />

      {/* 배경 블러 효과 */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute w-96 h-96 bg-red-500 rounded-full blur-3xl opacity-30 top-[10%] left-[5%]"></div>
        <div className="absolute w-96 h-96 bg-green-500 rounded-full blur-3xl opacity-30 bottom-[10%] left-[5%]"></div>
        <div className="absolute w-96 h-96 bg-red-500 rounded-full blur-3xl opacity-30 top-[10%] right-[5%]"></div>
        <div className="absolute w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-30 bottom-[10%] right-[5%]"></div>
      </div>

      {/* 폼 카드 */}
      <div className="relative z-10 px-[200px] text-center bg-black h-screen flex flex-col justify-center">
        <div className="mb-12">
          <p className="text-gray-400 text-sm mb-2">Algorithm Platform for</p>
          <p className="text-gray-400 text-sm mb-4">
            Daedeok Software Meister High School
          </p>
          <h1 className="text-4xl font-bold text-white">
            <span className="text-purple-400">DAP</span> 로그인하기
          </h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col"
          style={{ gap: "312px" }}
        >
          <div className="flex flex-col gap-5 justify-between w-full mb-2">
            <Input
              type="text"
              placeholder="학번을 입력하세요..."
              value={studentId}
              onChange={handleStudentIdChange}
              width="300px"
            />

            <Input
              type="text"
              placeholder="이름을 입력하세요..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              width="300px"
            />
          </div>

          <button
            type="submit"
            disabled={!studentId || !name}
            className="w-full px-4 py-4 border border-gray-700 rounded-full text-white font-medium hover:bg-gray-900 hover:border-gray-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            다음으로
          </button>
        </form>
      </div>
    </div>
  );
}
