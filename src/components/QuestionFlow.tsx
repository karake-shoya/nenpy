"use client";

import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { QUESTIONS } from "@/lib/questions";
import type { Answer } from "@/lib/types";
import QuestionCard from "./QuestionCard";
import ProgressBar from "./ProgressBar";

// 質問フロー全体を管理するコンポーネント
export default function QuestionFlow() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentQuestion = QUESTIONS[currentIndex];

  const handleNext = async (text: string, year?: number | null) => {
    if (!text.trim()) return;

    const newAnswer: Answer = {
      questionId: currentQuestion.id,
      text,
      year: year ?? null,
    };

    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);

    // 最後の質問なら保存処理
    if (currentIndex === QUESTIONS.length - 1) {
      setIsSaving(true);
      setError(null);

      // 名前はname_birthの回答から取得
      const nameAnswer = updatedAnswers.find((a) => a.questionId === "name_birth");
      const name = nameAnswer?.text ?? "あなた";

      try {
        const res = await fetch("/api/timelines", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, answers: updatedAnswers }),
        });

        if (!res.ok) throw new Error("保存に失敗しました");

        const { id } = await res.json();
        router.push(`/view/${id}`);
      } catch {
        setError("保存に失敗しました。もう一度お試しください。");
        setIsSaving(false);
      }
      return;
    }

    // 次の質問へ
    setCurrentIndex(currentIndex + 1);
  };

  if (isSaving) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-3xl animate-bounce"
          style={{ background: "linear-gradient(135deg, #FF6B6B, #FFB347)" }}
        >
          ✨
        </div>
        <p className="text-lg font-bold" style={{ color: "#FF6B6B" }}>
          年表を作っています…
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* プログレスバー */}
      <div className="sticky top-0 z-10 backdrop-blur-sm" style={{ backgroundColor: "rgba(255,248,240,0.9)" }}>
        <ProgressBar current={currentIndex + 1} total={QUESTIONS.length} />
      </div>

      {/* 質問カード */}
      <div className="flex-1 flex items-center justify-center py-8">
        <div className="w-full max-w-lg">
          <AnimatePresence mode="wait">
            <QuestionCard
              key={currentQuestion.id}
              question={currentQuestion}
              onNext={handleNext}
              isLast={currentIndex === QUESTIONS.length - 1}
            />
          </AnimatePresence>
        </div>
      </div>

      {/* エラー表示 */}
      {error && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full text-white text-sm shadow-lg"
          style={{ backgroundColor: "#FF6B6B" }}>
          {error}
        </div>
      )}
    </div>
  );
}
