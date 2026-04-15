// 質問の型定義
export type QuestionType = "text" | "text_with_year" | "auto_year";

export interface Question {
  id: string;
  text: string;
  titlePlaceholder: string;   // タイトル欄のplaceholder
  textPlaceholder?: string;   // 詳細欄のplaceholder（省略可能）
  type: QuestionType;
  emoji: string;
  timelineLabel: string;
  yearPlaceholder?: string;
}

// 回答の型定義（タイトル＋詳細の2フィールド）
export interface Answer {
  questionId: string;
  title: string;   // タイムラインに大きく表示される見出し
  text: string;    // 詳細テキスト（省略可）
  year?: number | null;
}

// 年表アイテムの型定義（表示用に変換済み）
export interface TimelineItem {
  year: number | null;
  label: string;
  emoji: string;
  title: string;
  text: string;
  isFuture?: boolean;
}

// DBに保存する年表データの型定義
export interface Timeline {
  id: string;
  name: string;
  answers: Answer[];
  createdAt: string;
}
