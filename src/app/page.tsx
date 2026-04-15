import Link from "next/link";

// トップページ
export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-16">
      {/* ヒーローセクション */}
      <div className="text-center max-w-md mx-auto">
        {/* ロゴ */}
        <div className="mb-6">
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
          <p className="text-sm mt-1" style={{ color: "#8B6B5E" }}>
            ねんぴー
          </p>
        </div>

        {/* キャッチコピー */}
        <h1 className="text-2xl font-bold mb-4 leading-relaxed" style={{ color: "#3D2B1F" }}>
          あなただけの年表を
          <br />
          つくろう
        </h1>
        <p className="text-sm leading-relaxed mb-10" style={{ color: "#8B6B5E" }}>
          15の質問に答えるだけで、
          <br />
          あなたの人生がひとつの物語になる。
          <br />
          できた年表は、友だちにシェアしてね 🌸
        </p>

        {/* サンプルプレビュー */}
        <div
          className="rounded-3xl p-5 mb-10 text-left shadow-md"
          style={{ backgroundColor: "#ffffff", border: "1.5px solid #FFD6C4" }}
        >
          <p className="text-xs font-bold mb-3" style={{ color: "#FFB347" }}>
            📖 こんな年表が完成するよ
          </p>
          <div className="space-y-2">
            {[
              { emoji: "🍼", year: "2001年", text: "東京で生まれた" },
              { emoji: "🚀", year: "2019年", text: "上京して大学へ。これが人生の転機に" },
              { emoji: "🌟", year: "2022年", text: "大学時代が黄金期。戻りたい…" },
              { emoji: "🌈", year: "未来", text: "第5章 もっと自由に生きる期" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="text-lg">{item.emoji}</span>
                <div>
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full mr-2"
                    style={{ backgroundColor: "#FFE8DC", color: "#FF6B6B" }}
                  >
                    {item.year}
                  </span>
                  <span className="text-xs" style={{ color: "#3D2B1F" }}>
                    {item.text}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTAボタン */}
        <Link href="/create">
          <button
            className="w-full py-5 rounded-full font-black text-white text-lg shadow-lg btn-bounce"
            style={{
              background: "linear-gradient(135deg, #FF6B6B 0%, #FFB347 100%)",
            }}
          >
            ✨ はじめる（無料・ログイン不要）
          </button>
        </Link>

        <p className="text-xs mt-4" style={{ color: "#8B6B5E" }}>
          15問 · スキップOK · URLでシェア可能
        </p>
      </div>
    </main>
  );
}
