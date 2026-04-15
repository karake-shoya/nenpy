import Link from "next/link";

export default function Home() {
  const sampleItems = [
    { emoji: "🍼", year: "2001年", title: "東京で誕生", text: "家族4人の末っ子として生まれた" },
    { emoji: "🚀", year: "2019年", title: "上京して大学へ", text: "地元を離れる不安と、新しい自分への期待" },
    { emoji: "🌟", year: "2022年", title: "人生の黄金期", text: "バイト・サークル・友人…全部が輝いていた" },
    { emoji: "🌈", year: "未来", title: "もっと自由に生きる期", text: "次の章は自分らしく" },
  ];

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-16">
      <div className="w-full max-w-sm mx-auto">
        {/* ロゴ */}
        <div className="text-center mb-8">
          <span
            className="text-5xl font-black tracking-tight"
            style={{
              background: "linear-gradient(135deg, #FF6B6B 0%, #FFB347 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            nenpy
          </span>
          <p className="text-xs mt-1 tracking-widest font-medium" style={{ color: "#C4A090" }}>
            MY TIMELINE
          </p>
        </div>

        {/* キャッチコピー */}
        <div className="text-center mb-8">
          <h1 className="text-xl font-black mb-2 leading-relaxed" style={{ color: "#2D1F1A" }}>
            あなただけの年表を
            <br />
            つくろう
          </h1>
          <p className="text-sm leading-relaxed" style={{ color: "#8B6B5E" }}>
            14の質問に答えるだけで、
            <br />
            人生がひとつの物語になる
          </p>
        </div>

        {/* サンプルプレビュー */}
        <div
          className="rounded-2xl p-4 mb-8"
          style={{ backgroundColor: "#ffffff", border: "1px solid #F0E4DC" }}
        >
          <p className="text-xs font-semibold mb-3 tracking-wide" style={{ color: "#FFB347" }}>
            SAMPLE
          </p>
          <div className="space-y-3">
            {sampleItems.map((item, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-sm flex-shrink-0"
                  style={{ background: "linear-gradient(135deg, #FFDDD2, #FFE8C8)" }}
                >
                  {item.emoji}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span
                      className="text-xs font-bold px-2 py-0.5 rounded-full"
                      style={{ backgroundColor: "#FFF0EB", color: "#FF6B6B" }}
                    >
                      {item.year}
                    </span>
                  </div>
                  <p className="text-xs font-bold" style={{ color: "#2D1F1A" }}>
                    {item.title}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "#8B6B5E" }}>
                    {item.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTAボタン */}
        <Link href="/create" className="block w-full">
          <span
            className="block w-full py-4 rounded-xl font-black text-white text-base text-center btn-bounce"
            style={{
              background: "linear-gradient(135deg, #FF6B6B 0%, #FFB347 100%)",
              boxShadow: "0 4px 20px rgba(255, 107, 107, 0.35)",
            }}
          >
            はじめる
          </span>
        </Link>

        <p className="text-center text-xs mt-3" style={{ color: "#C4A090" }}>
          無料 · ログイン不要 · URLでシェア可能
        </p>
      </div>
    </main>
  );
}
