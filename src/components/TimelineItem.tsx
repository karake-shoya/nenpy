"use client";

import { motion } from "framer-motion";
import type { TimelineItem as TimelineItemType } from "@/lib/types";

interface TimelineItemProps {
  item: TimelineItemType;
  index: number;
  isLast: boolean;
}

function getBadge(item: TimelineItemType): { text: string; color: string } {
  if (item.isFuture) return { text: "未来", color: "#FF8FAB" };
  if (item.year) return { text: `${item.year}年`, color: "#FF6B6B" };
  return { text: item.label, color: "#FFB347" };
}

export default function TimelineItem({ item, index, isLast }: TimelineItemProps) {
  const badge = getBadge(item);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07, ease: "easeOut" }}
      className="relative flex items-start gap-3"
    >
      {/* 縦ライン */}
      {!isLast && (
        <div
          className="absolute left-[1.3rem] top-10 w-px h-full"
          style={{ background: "linear-gradient(180deg, #FFD6C4 0%, transparent 100%)" }}
        />
      )}

      {/* 絵文字アイコン */}
      <div
        className="relative z-10 w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
        style={{ background: "linear-gradient(135deg, #FFDDD2, #FFE8C8)" }}
      >
        {item.emoji}
      </div>

      {/* カード */}
      <div
        className="flex-1 rounded-2xl px-4 py-3.5 mb-3"
        style={{ backgroundColor: "#ffffff", border: "1px solid #F0E4DC" }}
      >
        {/* バッジ＋ラベル行 */}
        <div className="flex items-center gap-2 mb-1.5">
          <span
            className="text-xs font-bold px-2 py-0.5 rounded-full"
            style={{ backgroundColor: "#FFF0EB", color: badge.color }}
          >
            {badge.text}
          </span>
          {item.year && !item.isFuture && (
            <span className="text-xs" style={{ color: "#C4A090" }}>
              {item.label}
            </span>
          )}
        </div>

        {/* タイトル（大きく） */}
        <p className="font-bold text-sm leading-snug mb-1" style={{ color: "#2D1F1A" }}>
          {item.title}
        </p>

        {/* 詳細テキスト */}
        {item.text && (
          <p className="text-xs leading-relaxed" style={{ color: "#8B6B5E" }}>
            {item.text}
          </p>
        )}
      </div>
    </motion.div>
  );
}
