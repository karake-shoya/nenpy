"use client";

interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percent = Math.round((current / total) * 100);

  return (
    <div className="w-full max-w-lg mx-auto px-4 py-3">
      <div className="w-full h-1.5 rounded-full" style={{ backgroundColor: "#F0E4DC" }}>
        <div
          className="h-1.5 rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${percent}%`,
            background: "linear-gradient(90deg, #FF6B6B 0%, #FFB347 100%)",
          }}
        />
      </div>
    </div>
  );
}
