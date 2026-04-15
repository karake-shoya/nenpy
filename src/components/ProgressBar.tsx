"use client";

interface ProgressBarProps {
  current: number;
  total: number;
}

// 上部プログレスバー
export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percent = Math.round((current / total) * 100);

  return (
    <div className="w-full px-6 py-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium" style={{ color: "#FF6B6B" }}>
          質問 {current} / {total}
        </span>
        <span className="text-sm font-medium" style={{ color: "#FFB347" }}>
          {percent}%
        </span>
      </div>
      <div className="w-full h-3 rounded-full" style={{ backgroundColor: "#FFE8DC" }}>
        <div
          className="h-3 rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${percent}%`,
            background: "linear-gradient(90deg, #FF6B6B 0%, #FFB347 100%)",
          }}
        />
      </div>
    </div>
  );
}
