import type { Metadata } from "next";
import { Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto",
});

export const metadata: Metadata = {
  title: "nenpy - あなただけの年表をつくろう",
  description: "15の質問に答えるだけで、あなただけのオリジナル年表が完成。友だちにシェアしよう！",
  openGraph: {
    title: "nenpy - あなただけの年表をつくろう",
    description: "15の質問に答えるだけで、あなただけのオリジナル年表が完成。友だちにシェアしよう！",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={`${notoSansJP.variable} antialiased min-h-screen gradient-bg`}>{children}</body>
    </html>
  );
}
