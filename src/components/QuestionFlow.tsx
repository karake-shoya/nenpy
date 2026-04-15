"use client";

import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { QUESTIONS } from "@/lib/questions";
import type { Answer } from "@/lib/types";
import QuestionCard from "./QuestionCard";
import ProgressBar from "./ProgressBar";

export default function QuestionFlow() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const currentQuestion = QUESTIONS[currentIndex];

  const handleNext = async (title: string, text: string, year?: number | null) => {
    const newAnswer: Answer = {
      questionId: currentQuestion.id,
      title,
      text,
      year: year ?? null,
    };

    // 同じ質問への回答を上書き（戻って再回答した場合）
    const updatedAnswers = [
      ...answers.filter((a) => a.questionId !== currentQuestion.id),
      newAnswer,
    ];
    setAnswers(updatedAnswers);

    if (currentIndex === QUESTIONS.length - 1) {
      setIsSaving(true);
      setError(null);

      const nameAnswer = updatedAnswers.find((a) => a.questionId === "name_birth");
      const name = nameAnswer?.title ?? "あなた";

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

    setCurrentIndex(currentIndex + 1);
  };

  const handleBack = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  if (isSaving) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl animate-bounce"
          style={{ background: "linear-gradient(135deg, #FFDDD2, #FFE8C8)" }}
        >
          ✨
        </div>
        <p className="text-base font-bold" style={{ color: "#FF6B6B" }}>
          年表を作っています…
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <div className="sticky top-0 z-10" style={{ backgroundColor: "rgba(255,248,240,0.92)", backdropFilter: "blur(8px)" }}>
        <ProgressBar current={currentIndex + 1} total={QUESTIONS.length} />
      </div>

      <div className="flex-1 flex items-center justify-center py-10">
        <div className="w-full max-w-lg">
          <AnimatePresence mode="wait">
            <QuestionCard
              key={currentQuestion.id}
              question={currentQuestion}
              questionNumber={currentIndex + 1}
              total={QUESTIONS.length}
              onNext={handleNext}
              onBack={currentIndex > 0 ? handleBack : null}
              isLast={currentIndex === QUESTIONS.length - 1}
            />
          </AnimatePresence>
        </div>
      </div>

      {error && (
        <div
          className="fixed bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full text-white text-sm shadow-lg"
          style={{ backgroundColor: "#FF6B6B" }}
        >
          {error}
        </div>
      )}
    </div>
  );
}
