"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import type { Question } from "@/lib/types";

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  total: number;
  onNext: (title: string, text: string, year?: number | null) => void;
  onBack: (() => void) | null;
  isLast: boolean;
}

export default function QuestionCard({ question, questionNumber, total, onNext, onBack, isLast }: QuestionCardProps) {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [year, setYear] = useState("");

  const currentYear = new Date().getFullYear();
  const isDisabled = !title.trim();

  const handleSubmit = () => {
    if (isDisabled) return;
    const resolvedYear =
      question.type === "auto_year" ? currentYear - 10
      : question.type === "text_with_year" ? (year ? parseInt(year) : null)
      : null;
    onNext(title.trim(), text.trim(), resolvedYear);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="w-full max-w-lg mx-auto px-4"
    >
      {/* 絵文字アイコン */}
      <div className="flex justify-center mb-5">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-sm"
          style={{ background: "linear-gradient(135deg, #FFDDD2, #FFE8C8)" }}
        >
          {question.emoji}
        </div>
      </div>

      {/* 質問テキスト */}
      <h2 className="text-center text-lg font-bold mb-6 leading-relaxed" style={{ color: "#2D1F1A" }}>
        {question.text}
      </h2>

      {/* 入力エリア */}
      <div className="space-y-3 mb-6">
        {/* タイトル入力 */}
        <div>
          <label className="block text-xs font-semibold mb-1.5 ml-1" style={{ color: "#FF6B6B" }}>
            ひとことで
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
            placeholder={question.titlePlaceholder}
            maxLength={50}
            className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
            style={{
              backgroundColor: "#FFFAF7",
              border: "1.5px solid #F0D6C8",
              color: "#2D1F1A",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#FF6B6B")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#F0D6C8")}
          />
        </div>

        {/* 詳細入力（省略可） */}
        {question.textPlaceholder && (
          <div>
            <label className="block text-xs font-semibold mb-1.5 ml-1" style={{ color: "#FFB347" }}>
              もう少し詳しく <span className="font-normal opacity-60">（省略OK）</span>
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && e.preventDefault()}
              placeholder={question.textPlaceholder}
              rows={3}
              className="w-full rounded-xl px-4 py-3 text-sm outline-none resize-none transition-all"
              style={{
                backgroundColor: "#FFFAF7",
                border: "1.5px solid #F0D6C8",
                color: "#2D1F1A",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#FFB347")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#F0D6C8")}
            />
          </div>
        )}

        {/* 年入力 */}
        {question.type === "text_with_year" && (
          <div>
            <label className="block text-xs font-semibold mb-1.5 ml-1" style={{ color: "#FF8FAB" }}>
              西暦 <span className="font-normal opacity-60">（省略OK）</span>
            </label>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
              placeholder={question.yearPlaceholder ?? "例：2020"}
              className="w-32 rounded-xl px-4 py-3 text-sm outline-none transition-all"
              style={{
                backgroundColor: "#FFFAF7",
                border: "1.5px solid #F0D6C8",
                color: "#2D1F1A",
              }}
              onFocus={(e) => (e.currentTarget.style.borderColor = "#FF8FAB")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "#F0D6C8")}
              min={1900}
              max={currentYear}
            />
          </div>
        )}
      </div>

      {/* ボタン行 */}
      <div className="flex items-center gap-3">
        {/* 戻るボタン */}
        {onBack && (
          <button
            onClick={onBack}
            className="flex items-center gap-1.5 px-4 py-3 rounded-xl text-sm font-medium transition-all"
            style={{
              backgroundColor: "#FFF0EB",
              color: "#FF6B6B",
              border: "1.5px solid #F0D6C8",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#FFE4DA")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#FFF0EB")}
          >
            ← 戻る
          </button>
        )}

        {/* 次へボタン */}
        <button
          onClick={handleSubmit}
          disabled={isDisabled}
          className="flex-1 py-3.5 rounded-xl font-bold text-white text-sm transition-all"
          style={{
            background: isDisabled
              ? "#F0D6C8"
              : "linear-gradient(135deg, #FF6B6B 0%, #FFB347 100%)",
            boxShadow: isDisabled ? "none" : "0 4px 16px rgba(255, 107, 107, 0.3)",
          }}
          onMouseEnter={(e) => {
            if (!isDisabled) e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          {isLast ? "✨ 年表を完成させる" : "次へ"}
        </button>
      </div>

      {/* ステップ表示 */}
      <p className="text-center text-xs mt-4 opacity-50" style={{ color: "#2D1F1A" }}>
        {questionNumber} / {total}
      </p>
    </motion.div>
  );
}
