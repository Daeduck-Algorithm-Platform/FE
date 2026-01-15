"use client";

import { useState, useRef, KeyboardEvent, ClipboardEvent } from "react";
import { useRouter } from "next/navigation";

export default function VerificationPage() {
  const router = useRouter();
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value[value.length - 1];
    }

    // 숫자만 허용
    if (value && !/^\d$/.test(value)) {
      return;
    }

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    const newCode = [...code];

    // 숫자만 필터링
    const digits = pastedData.replace(/\D/g, "").slice(0, 6);

    for (let i = 0; i < digits.length && i < 6; i++) {
      newCode[i] = digits[i];
    }

    setCode(newCode);

    const nextIndex = Math.min(digits.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const verificationCode = code.join("");

    if (verificationCode.length === 6) {
      router.push("/login/success");
    }
  };

  const isCodeComplete = code.every((digit) => digit !== "");

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
          <h1 className="text-4xl font-bold text-white">인증코드 입력하기</h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col"
          style={{ gap: "312px" }}
        >
          <div className="flex gap-3 justify-center mb-12">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={handlePaste}
                placeholder="—"
                className="w-12 h-16 bg-transparent border-b-2 border-gray-700 text-white text-2xl font-bold text-center outline-none focus:border-gray-500 transition-colors"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={!isCodeComplete}
            className="w-full px-4 py-4 border border-gray-700 rounded-full text-white font-medium hover:bg-gray-900 hover:border-gray-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            다음으로
          </button>
        </form>
      </div>
    </div>
  );
}
