import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import RPEScore from "../components/RPE/RPEScore";
import { describe, expect, it } from "vitest";

const enterPassword = async () => {
  fireEvent.change(screen.getByLabelText("Password"), {
    target: { value: "123" },
  });
  fireEvent.click(screen.getByRole("button", { name: /submit/i }));
  await waitFor(() =>
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
  );
};

describe("RPEScore Component", () => {
  it("displays the password dialog initially and handles password submission", async () => {
    render(<RPEScore />);

    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();

    await enterPassword();
  });

  it("saves the score in the browser and confirms it", async () => {
    render(<RPEScore />);
    await enterPassword();

    fireEvent.click(screen.getByTestId("score-button-7"));

    expect(
      await screen.findByText(/You have registered your score/)
    ).toBeInTheDocument();
    expect(screen.getByText(/Your score is 7/)).toBeInTheDocument();
    expect(JSON.parse(localStorage.getItem("rpe-scores") || "[]")).toEqual([
      { score: 7, date: expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/) },
    ]);
  });
});
