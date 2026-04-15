"use client";

import { useState } from "react";

interface ShareButtonProps {
  url: string;
}

// URLコピー共有ボタン
export default function ShareButton({ url }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // clipboard APIが使えない場合はfallback
      const input = document.createElement("input");
      input.value = url;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-white shadow-md btn-bounce text-sm"
      style={{
        background: copied
          ? "linear-gradient(135deg, #4CAF50, #66BB6A)"
          : "linear-gradient(135deg, #FF8FAB, #FFB347)",
      }}
    >
      {copied ? "✅ コピーしました！" : "🔗 URLをシェアする"}
    </button>
  );
}
