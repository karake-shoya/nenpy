import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// 生まれ年から人生マイルストーンの西暦を計算する
export interface YearMilestone {
  label: string;
  year: number;
}

export function calcMilestones(birthYear: number): YearMilestone[] {
  return [
    { label: "小学校入学", year: birthYear + 6 },
    { label: "中学校入学", year: birthYear + 12 },
    { label: "高校入学",   year: birthYear + 15 },
    { label: "20歳",       year: birthYear + 20 },
    { label: "30歳",       year: birthYear + 30 },
    { label: "40歳",       year: birthYear + 40 },
    { label: "50歳",       year: birthYear + 50 },
    { label: "60歳",       year: birthYear + 60 },
  ];
}
