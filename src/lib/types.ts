// 質問の型定義
export type QuestionType = "text" | "text_with_year" | "chapters" | "auto_year";

export interface Question {
  id: string;
  text: string;
  placeholder?: string;
  type: QuestionType;
  emoji: string;
  timelineLabel: string;
  // text_with_year の場合に年のplaceholder
  yearPlaceholder?: string;
}

// 回答の型定義
export interface Answer {
  questionId: string;
  text: string;
  year?: number | null;
}

// 章の型定義（question: chapters用）
export interface Chapter {
  title: string;
  year?: number | null;
}

// 年表アイテムの型定義（表示用に変換済み）
export interface TimelineItem {
  year: number | null;
  label: string;
  emoji: string;
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
