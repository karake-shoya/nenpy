"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import type { Question, Chapter } from "@/lib/types";

interface QuestionCardProps {
  question: Question;
  onNext: (text: string, year?: number | null) => void;
  isLast: boolean;
}

// 1問ずつ表示するチャットバブル風カード
export default function QuestionCard({ question, onNext, isLast }: QuestionCardProps) {
  const [text, setText] = useState("");
  const [year, setYear] = useState<string>("");
  // 章入力用（chapters型のみ使用）
  const [chapters, setChapters] = useState<Chapter[]>([{ title: "", year: null }]);

  const currentYear = new Date().getFullYear();

  // 章を追加
  const addChapter = () => {
    setChapters([...chapters, { title: "", year: null }]);
  };

  // 章テキストを更新
  const updateChapterTitle = (index: number, value: string) => {
    const updated = [...chapters];
    updated[index] = { ...updated[index], title: value };
    setChapters(updated);
  };

  // 章の年を更新
  const updateChapterYear = (index: number, value: string) => {
    const updated = [...chapters];
    updated[index] = { ...updated[index], year: value ? parseInt(value) : null };
    setChapters(updated);
  };

  // 送信ハンドラ
  const handleSubmit = () => {
    if (question.type === "chapters") {
      const validChapters = chapters.filter((c) => c.title.trim());
      if (validChapters.length === 0) return;
      // chaptersの先頭を代表テキストとして渡す
      const summaryText = validChapters.map((c) => (c.year ? `${c.year}年〜 ${c.title}` : c.title)).join(" / ");
      onNext(summaryText);
    } else if (question.type === "auto_year") {
      // 10年前を自動設定
      onNext(text.trim(), currentYear - 10);
    } else if (question.type === "text_with_year") {
      onNext(text.trim(), year ? parseInt(year) : null);
    } else {
      onNext(text.trim());
    }
  };

  const isDisabled =
    question.type === "chapters"
      ? chapters.every((c) => !c.title.trim())
      : !text.trim();

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full max-w-lg mx-auto px-4"
    >
      {/* 質問バブル */}
      <div className="flex items-start gap-3 mb-6">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center text-2xl flex-shrink-0 shadow-md"
          style={{ background: "linear-gradient(135deg, #FF6B6B, #FFB347)" }}
        >
          {question.emoji}
        </div>
        <div
          className="rounded-2xl rounded-tl-sm px-5 py-4 shadow-sm max-w-xs"
          style={{ backgroundColor: "#ffffff", border: "1.5px solid #FFD6C4" }}
        >
          <p className="text-sm leading-relaxed whitespace-pre-line" style={{ color: "#3D2B1F" }}>
            {question.text}
          </p>
        </div>
      </div>

      {/* 回答エリア */}
      <div className="ml-15 space-y-3">
        {question.type === "chapters" ? (
          /* 章入力（複数追加可能） */
          <div className="space-y-3">
            {chapters.map((chapter, i) => (
              <div key={i} className="flex gap-2 items-center">
                <input
                  type="text"
                  value={chapter.title}
                  onChange={(e) => updateChapterTitle(i, e.target.value)}
                  placeholder={i === 0 ? question.placeholder : `第${i + 1}章のタイトル`}
                  className="flex-1 rounded-2xl px-4 py-3 text-sm outline-none transition-all"
                  style={{
                    backgroundColor: "#ffffff",
                    border: "2px solid #FFD6C4",
                    color: "#3D2B1F",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#FF6B6B")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "#FFD6C4")}
                />
                <input
                  type="number"
                  value={chapter.year ?? ""}
                  onChange={(e) => updateChapterYear(i, e.target.value)}
                  placeholder="開始年"
                  className="w-24 rounded-2xl px-3 py-3 text-sm outline-none transition-all"
                  style={{
                    backgroundColor: "#ffffff",
                    border: "2px solid #FFD6C4",
                    color: "#3D2B1F",
                  }}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "#FF6B6B")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "#FFD6C4")}
                  min={1900}
                  max={currentYear}
                />
              </div>
            ))}
            <button
              type="button"
              onClick={addChapter}
              className="text-sm px-4 py-2 rounded-full transition-colors"
              style={{ color: "#FF8FAB", border: "1.5px dashed #FF8FAB" }}
            >
              ＋ 章を追加する
            </button>
          </div>
        ) : (
          /* 通常テキスト入力 */
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder={question.placeholder}
            rows={3}
            className="w-full rounded-2xl px-4 py-3 text-sm outline-none resize-none transition-all"
            style={{
              backgroundColor: "#ffffff",
              border: "2px solid #FFD6C4",
              color: "#3D2B1F",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#FF6B6B")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#FFD6C4")}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey && question.type === "text") {
                e.preventDefault();
                if (!isDisabled) handleSubmit();
              }
            }}
          />
        )}

        {/* 年入力（text_with_year のみ） */}
        {question.type === "text_with_year" && (
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            placeholder={question.yearPlaceholder ?? "年を入力（省略OK）"}
            className="w-36 rounded-2xl px-4 py-3 text-sm outline-none transition-all"
            style={{
              backgroundColor: "#ffffff",
              border: "2px solid #FFD6C4",
              color: "#3D2B1F",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "#FF6B6B")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "#FFD6C4")}
            min={1900}
            max={currentYear}
          />
        )}

        {/* 次へボタン */}
        <button
          onClick={handleSubmit}
          disabled={isDisabled}
          className="w-full py-4 rounded-full font-bold text-white text-base shadow-md btn-bounce disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
          style={{
            background: isDisabled
              ? "#FFD6C4"
              : "linear-gradient(135deg, #FF6B6B 0%, #FFB347 100%)",
          }}
        >
          {isLast ? "✨ 年表を完成させる！" : "次へ →"}
        </button>
      </div>
    </motion.div>
  );
}
