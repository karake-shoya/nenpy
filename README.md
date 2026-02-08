# next-supabase-shadcn-template

Next.js (App Router) + TypeScript + Tailwind CSS + shadcn/ui + Supabase を最初から組み込んだテンプレートです。

## 技術スタック

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui
- Supabase JavaScript Client (`@supabase/supabase-js`)
- ESLint + Prettier

## セットアップ

1. Node.js バージョンを合わせる

```bash
nvm use
```

2. 依存関係をインストール

```bash
npm install
```

3. 環境変数ファイルを作成

```bash
cp .env.example .env.local
```

4. `.env.local` に Supabase の情報を設定

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Supabase ダッシュボードの `Project Settings` -> `Data API` から URL と anon key を取得できます。

## 開発コマンド

```bash
npm run dev
npm run lint
npm run build
npm run format
```

## 起動確認手順

1. 開発サーバーを起動

```bash
npm run dev
```

2. ブラウザで以下を確認

- `http://localhost:3000/`
- `http://localhost:3000/api/health` -> `{"status":"ok"}`
- `http://localhost:3000/api/supabase/ping` -> `{"ok":true|false,"hasSession":boolean}`

3. `/` ページのボタンで API を実行し、結果表示を確認

- `Health API を叩く`
- `Supabase Ping を叩く`

## shadcn/ui コンポーネント追加

```bash
npx shadcn@latest add button
```

必要に応じて別コンポーネントも同様に `add` で追加できます。
