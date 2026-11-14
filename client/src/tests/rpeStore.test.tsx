import { describe, expect, it } from "vitest";
import { saveScore, dailyAverages } from "../lib/rpeStore";

describe("rpeStore", () => {
  it("averages the scores of each day, oldest first", () => {
    saveScore(4, new Date(2026, 10, 14, 9));
    saveScore(8, new Date(2026, 10, 14, 18));
    saveScore(2, new Date(2026, 10, 13, 7));

    const days = dailyAverages();

    expect(days.map((d) => d._id.getDate())).toEqual([13, 14]);
    expect(days[1].averageScore).toBe(6);
    expect(days[1].emoji).toBe("🤨");
    expect(days[1].color).toBe("#7dd957");
  });

  it("keeps the day in the visitor's time zone", () => {
    saveScore(5, new Date(2026, 10, 14, 23, 30));
    const [day] = dailyAverages();
    expect([day._id.getFullYear(), day._id.getMonth(), day._id.getDate()]).toEqual([2026, 10, 14]);
  });

  it("starts empty and ignores damaged data", () => {
    expect(dailyAverages()).toEqual([]);
    localStorage.setItem("rpe-scores", "not json");
    expect(dailyAverages()).toEqual([]);
    localStorage.setItem("rpe-scores", JSON.stringify([{ score: "x" }]));
    expect(dailyAverages()).toEqual([]);
  });
});
