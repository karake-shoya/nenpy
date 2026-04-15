"use client";

import { motion } from "framer-motion";
import type { TimelineItem as TimelineItemType } from "@/lib/types";

interface TimelineItemProps {
  item: TimelineItemType;
  index: number;
  isLast: boolean;
}

// バッジのテキストと色を決定する
function getBadge(item: TimelineItemType): { text: string; color: string } {
  if (item.isFuture) return { text: "未来", color: "#FF8FAB" };
  if (item.year) return { text: `${item.year}年`, color: "#FF6B6B" };
  return { text: item.label, color: "#FFB347" };
}

export default function TimelineItem({ item, index, isLast }: TimelineItemProps) {
  const badge = getBadge(item);

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      className="relative flex items-start gap-4"
    >
      {!isLast && (
        <div
          className="absolute left-[1.4rem] top-12 w-0.5 h-full"
          style={{ background: "linear-gradient(180deg, #FFB347, #FFE8DC)" }}
        />
      )}

      <div
        className="relative z-10 w-11 h-11 rounded-full flex items-center justify-center text-xl flex-shrink-0 shadow-md"
        style={{
          background: item.isFuture
            ? "linear-gradient(135deg, #FF8FAB, #FFB347)"
            : "linear-gradient(135deg, #FF6B6B, #FFB347)",
        }}
      >
        {item.emoji}
      </div>

      <div
        className="flex-1 rounded-2xl px-5 py-4 mb-4 shadow-sm"
        style={{ backgroundColor: "#ffffff", border: "1.5px solid #FFD6C4" }}
      >
        <span
          className="inline-block text-xs font-bold px-3 py-1 rounded-full mb-2"
          style={{ backgroundColor: "#FFE8DC", color: badge.color }}
        >
          {badge.text}
        </span>

        {/* 年がある場合はラベルも表示 */}
        {item.year && !item.isFuture && (
          <p className="text-xs font-semibold mb-1" style={{ color: "#FFB347" }}>
            {item.label}
          </p>
        )}

        <p className="text-sm leading-relaxed" style={{ color: "#3D2B1F" }}>
          {item.text}
        </p>
      </div>
    </motion.div>
  );
}
