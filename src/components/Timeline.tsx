"use client";

import { QUESTIONS } from "@/lib/questions";
import type { Answer, TimelineItem as TimelineItemType } from "@/lib/types";
import TimelineItem from "./TimelineItem";

interface TimelineProps {
  name: string;
  answers: Answer[];
}

function buildTimelineItems(answers: Answer[]): TimelineItemType[] {
  const currentYear = new Date().getFullYear();
  const items: TimelineItemType[] = [];

  for (const answer of answers) {
    if (!answer.title.trim()) continue;

    const question = QUESTIONS.find((q) => q.id === answer.questionId);
    if (!question) continue;

    const isFuture = answer.questionId === "next_chapter";
    const isCurrent = answer.questionId === "current_chapter";
    const year =
      answer.questionId === "surprise_now" ? currentYear - 10
      : isCurrent ? currentYear
      : (answer.year ?? null);

    items.push({
      year: isFuture ? null : year,
      label: question.timelineLabel,
      emoji: question.emoji,
      title: answer.title,
      text: answer.text,
      isFuture,
    });
  }

  return items.sort((a, b) => {
    if (a.isFuture) return 1;
    if (b.isFuture) return -1;
    if (a.year === null && b.year === null) return 0;
    if (a.year === null) return 1;
    if (b.year === null) return -1;
    return a.year - b.year;
  });
}

export default function Timeline({ name, answers }: TimelineProps) {
  const items = buildTimelineItems(answers);

  return (
    <div className="w-full max-w-lg mx-auto px-4">
      {/* ヘッダー */}
      <div className="text-center mb-10">
        <p className="text-xs font-semibold tracking-widest mb-2 uppercase" style={{ color: "#FFB347" }}>
          Timeline
        </p>
        <h1 className="text-2xl font-black" style={{ color: "#2D1F1A" }}>
          {name}の年表
        </h1>
        <div className="mt-3 mx-auto w-12 h-1 rounded-full" style={{ background: "linear-gradient(90deg, #FF6B6B, #FFB347)" }} />
      </div>

      {/* タイムライン本体 */}
      <div>
        {items.map((item, i) => (
          <TimelineItem key={`${item.label}-${i}`} item={item} index={i} isLast={i === items.length - 1} />
        ))}
      </div>
    </div>
  );
}
