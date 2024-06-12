import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import RPEScore from "../components/RPE/RPEScore";
import { beforeAll, describe, expect, it, vi } from "vitest";

// Define the type for the global object to include import.meta.env
type GlobalWithImportMetaEnv = typeof globalThis & {
  import: {
    meta: {
      env: {
        VITE_API_RPEPOST_URL: string;
      };
    };
  };
};

// Mock import.meta.env
beforeAll(() => {
  (globalThis as GlobalWithImportMetaEnv).import = {
    meta: {
      env: {
        VITE_API_RPEPOST_URL: "http://localhost:4000/api/rpe",
      },
    },
  };
});

// Mock axios
vi.mock("axios");

describe("RPEScore Component", () => {
  it("displays the password dialog initially and handles password submission", async () => {
    render(<RPEScore />);

    // Check that the password dialog is displayed
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByLabelText("Password")).toBeInTheDocument();

    // Enter the password and submit
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    // Wait for the dialog to close
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
    );
  });

  it("calls handleClick and shows loader when button is clicked", async () => {
    // Mock axios post response
    (axios.post as jest.Mock).mockResolvedValue({ status: 201 });

    render(<RPEScore />);

    // Enter the password and submit
    fireEvent.change(screen.getByLabelText("Password"), {
      target: { value: "123" },
    });
    fireEvent.click(screen.getByRole("button", { name: /submit/i }));

    // Wait for the dialog to close
    await waitFor(() =>
      expect(screen.queryByRole("dialog")).not.toBeInTheDocument()
    );

    // Wait for the component to render
    await waitFor(() => screen.getByText(/RPE SCORE/i));

    // Find the button using data-testid
    const scoreButton = screen.getByTestId("score-button-1");

    // Click the button
    fireEvent.click(scoreButton);

    // Wait for the loader to be visible
    await waitFor(() =>
      expect(screen.getByTestId("loader")).toBeInTheDocument()
    );

    // Expect axios.post to have been called
    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1));

    // Wait for the loader to be hidden after request completes
    await waitFor(() =>
      expect(screen.queryByTestId("loader")).not.toBeInTheDocument()
    );
  });
});
