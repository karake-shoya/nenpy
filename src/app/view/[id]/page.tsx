import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Timeline from "@/components/Timeline";
import ShareButton from "@/components/ShareButton";
import { getTimelineById } from "@/lib/db";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const timeline = await getTimelineById(id);
  if (!timeline) return { title: "年表が見つかりません | nenpy" };

  return {
    title: `${timeline.name}の年表 | nenpy`,
    description: `${timeline.name}さんの人生の年表をチェック！あなたも自分だけの年表をつくろう。`,
    openGraph: {
      title: `${timeline.name}の年表 | nenpy`,
      description: `${timeline.name}さんの人生の年表をチェック！`,
    },
  };
}

export default async function ViewPage({ params }: PageProps) {
  const { id } = await params;
  const timeline = await getTimelineById(id);

  if (!timeline) {
    notFound();
  }

  return (
    <main className="min-h-screen py-12 px-4">
      {/* 共有ボタン（上部） */}
      <div className="flex justify-center mb-8">
        <ShareButton url={`/view/${id}`} />
      </div>

      {/* 年表 */}
      <Timeline name={timeline.name} answers={timeline.answers} />

      {/* フッター：自分も作るCTA */}
      <div className="text-center mt-16 pb-8">
        <p className="text-sm mb-4" style={{ color: "#8B6B5E" }}>
          あなたも年表をつくってみる？
        </p>
        <a href="/">
          <button
            className="px-8 py-4 rounded-full font-black text-white shadow-lg btn-bounce"
            style={{ background: "linear-gradient(135deg, #FF6B6B 0%, #FFB347 100%)" }}
          >
            ✨ 自分の年表をつくる
          </button>
        </a>
      </div>
    </main>
  );
}
