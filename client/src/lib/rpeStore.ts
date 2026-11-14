// Scores are kept in the visitor's own browser, so the demo needs no server
// or database and keeps working on free static hosting.

const STORAGE_KEY = "rpe-scores";

// Same faces as the score buttons.
const emojis = ["😆", "😋", "😊", "🙂", "😉", "😯", "😪", "😥", "😭", "😵"];
const colors = [
  "#5ce1e6",
  "#37b6fe",
  "#37b6fe",
  "#7dd957",
  "#7dd957",
  "#7dd957",
  "#ffde59",
  "#ffde59",
  "#fe904c",
  "#fe1616",
];

export interface StoredScore {
  score: number;
  date: string; // YYYY-MM-DD in the visitor's time zone
}

export interface DailyAverage {
  _id: Date;
  averageScore: number;
  color: string;
  emoji: string;
}

const dayKey = (d: Date) =>
  `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;

function readScores(): StoredScore[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

// Throws when the browser blocks storage, so the caller can say it failed.
export function saveScore(score: number, now: Date = new Date()): void {
  const scores = readScores();
  scores.push({ score, date: dayKey(now) });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(scores));
}

export function dailyAverages(): DailyAverage[] {
  const byDay = new Map<string, number[]>();
  for (const { score, date } of readScores()) {
    if (typeof score !== "number" || typeof date !== "string") continue;
    byDay.set(date, [...(byDay.get(date) || []), score]);
  }
  return [...byDay.entries()].sort().map(([date, scores]) => {
    const averageScore = scores.reduce((a, b) => a + b, 0) / scores.length;
    const index = Math.min(Math.max(Math.round(averageScore), 1), 10) - 1;
    const [y, m, d] = date.split("-").map(Number);
    return {
      _id: new Date(y, m - 1, d),
      averageScore,
      emoji: emojis[index],
      color: colors[index],
    };
  });
}
