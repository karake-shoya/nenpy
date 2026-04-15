"use client";

import { QUESTIONS } from "@/lib/questions";
import type { Answer, TimelineItem as TimelineItemType } from "@/lib/types";
import TimelineItem from "./TimelineItem";

interface TimelineProps {
  name: string;
  answers: Answer[];
}

// 回答データを年表アイテムに変換する
function buildTimelineItems(answers: Answer[]): TimelineItemType[] {
  const currentYear = new Date().getFullYear();
  const items: TimelineItemType[] = [];

  for (const answer of answers) {
    if (!answer.text.trim()) continue;

    const question = QUESTIONS.find((q) => q.id === answer.questionId);
    if (!question) continue;

    // 未来の章・現在の章は特別扱い
    const isFuture = answer.questionId === "next_chapter";
    const isCurrent = answer.questionId === "current_chapter";

    // auto_year は現在年-10を自動設定
    const year = answer.questionId === "auto_year" ? currentYear - 10 : (answer.year ?? null);

    items.push({
      year: isFuture ? null : isCurrent ? currentYear : year,
      label: question.timelineLabel,
      emoji: question.emoji,
      text: answer.text,
      isFuture,
    });
  }

  // 年順にソート（年なし・未来は末尾）
  return items.sort((a, b) => {
    if (a.isFuture) return 1;
    if (b.isFuture) return -1;
    if (a.year === null && b.year === null) return 0;
    if (a.year === null) return 1;
    if (b.year === null) return -1;
    return a.year - b.year;
  });
}

// 年表全体の表示
export default function Timeline({ name, answers }: TimelineProps) {
  const items = buildTimelineItems(answers);

  return (
    <div className="w-full max-w-lg mx-auto px-4">
      {/* ヘッダー */}
      <div className="text-center mb-10">
        <div
          className="inline-block px-6 py-2 rounded-full text-white text-sm font-bold mb-4 shadow-md"
          style={{ background: "linear-gradient(135deg, #FF6B6B, #FFB347)" }}
        >
          🌸 {name}の年表
        </div>
        <h1 className="text-2xl font-bold" style={{ color: "#3D2B1F" }}>
          私だけのストーリー
        </h1>
      </div>

      {/* タイムライン本体 */}
      <div className="space-y-0">
        {items.map((item, i) => (
          <TimelineItem key={`${item.label}-${i}`} item={item} index={i} isLast={i === items.length - 1} />
        ))}
      </div>
    </div>
  );
}
