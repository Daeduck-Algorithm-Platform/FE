"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

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

      {/* 성공 카드 */}
      <div className="relative z-10 px-[200px] text-center bg-black h-screen flex flex-col justify-center">
        {/* 애니메이션 체크마크 */}
        <svg
          className="w-32 h-32 mb-8 animate-bounce"
          viewBox="0 0 60 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="30"
            cy="30"
            r="26"
            stroke="#00ff00"
            strokeWidth="4"
            strokeDasharray="166"
            strokeDashoffset="0"
            style={{
              animation: "drawCircle 0.6s ease-out forwards",
            }}
          />
          <path
            d="M17 30 L26 39 L43 22"
            stroke="#00ff00"
            strokeWidth="4"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray="100"
            strokeDashoffset="100"
            style={{
              animation: "drawCheck 0.4s 0.4s ease-out forwards",
            }}
          />
          <style>{`
            @keyframes drawCircle {
              from {
                stroke-dashoffset: 166;
              }
              to {
                stroke-dashoffset: 0;
              }
            }
            @keyframes drawCheck {
              from {
                stroke-dashoffset: 100;
              }
              to {
                stroke-dashoffset: 0;
              }
            }
          `}</style>
        </svg>

        <p className="text-green-400 text-2xl font-semibold">인증되었습니다.</p>
      </div>
    </div>
  );
}
