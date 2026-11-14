import { render, fireEvent, screen } from "@testing-library/react";
import RPEScore from "../components/RPE/RPEScore";
import { describe, expect, it } from "vitest";

describe("RPEScore Component", () => {
  it("is open to everyone, with no password", () => {
    render(<RPEScore />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.queryByLabelText(/password/i)).not.toBeInTheDocument();
    expect(screen.getAllByTestId(/^score-button-/)).toHaveLength(10);
  });

  it("saves the score in the browser and confirms it", async () => {
    render(<RPEScore />);

    fireEvent.click(screen.getByTestId("score-button-7"));

    expect(await screen.findByText("Score saved: 7 out of 10.")).toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem("rpe-scores") || "[]")).toEqual([
      { score: 7, date: expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/) },
    ]);
  });

  it("opens the RPE chart", async () => {
    render(<RPEScore />);
    fireEvent.click(screen.getByRole("button", { name: /rpe chart/i }));
    expect(await screen.findByAltText("RPE Chart")).toBeInTheDocument();
  });
});
