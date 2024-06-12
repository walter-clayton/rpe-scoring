# WRITING TESTS

## Introduction

This document provides guidelines on how to write and run tests for the project. Writing tests ensures the code quality and helps in maintaining the stability of the project.

## Table of Contents

1. [Overview](#overview)
2. [Client Tests](#client-tests)
3. [Server Tests](#server-tests)
4. [Running Tests](#running-tests)
5. [Best Practices](#best-practices)

## Overview

Testing is a crucial part of the development process. It ensures that the code behaves as expected and helps catch bugs early.

### Additional Resources

- [Git Workflow](CONTRIBUTIONS.md)
- [Using GitHub Actions](USING_GITHUB_ACTIONS.md)

## Client Tests

### Tools and Frameworks

We use Jest and React Testing Library for client-side testing.

### Writing Tests

1. **Location**:

   - Place your test files in the `client/src/tests` directory.

2. **File Naming**:
   - Name your test files with a `.test.js` or `.test.tsx` extension.

### Example Test

```jsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import RPEScore from "../components/RPE/RPEScore";
import axios from "axios";
import { vi } from "vitest";

vi.mock("axios");

describe("RPEScore Component", () => {
  it("calls handleClick and disables button when clicked", async () => {
    // Mock axios post response
    axios.post.mockResolvedValue({ status: 201 });

    render(<RPEScore />);

    // Find the button by its text
    const scoreButton = screen.getByRole("button", { name: /1/i });

    // Click the button
    fireEvent.click(scoreButton);

    // Expect axios.post to have been called
    await screen.findByTestId("loader"); // Wait for loader to appear

    // Expect button to be disabled
    await waitFor(() => expect(scoreButton).toBeDisabled());
  });
});
```

## Server Tests

### Tools and Frameworks

Use your preferred testing framework, such as Jest, for server-side testing.

### Writing Tests

1. **Location**:

   - Place your test files in the `server/tests` directory.

2. **File Naming**:
   - Name your test files with a `.test.js` or `.test.tsx` extension.

### Example Test

```jsx
// Example server test file

const request = require("supertest");
const app = require("../app"); // Assume your Express app is exported from app.js

describe("GET /api/example", () => {
  it("should return 200 OK", async () => {
    const res = await request(app).get("/api/example");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("message");
  });
});
```

## Running Tests

### Client

To run client-side tests, navigate to the `client` directory and use the following command:

```sh
npm run test
```

### Server

To run server-side tests, navigate to the `server` directory and use the following command:

```sh
npm run test
```

## Best Practices

1.  Write Tests for New Features:

    - Ensure every new feature has corresponding tests.

2.  Use Meaningful Test Names:

    - Break down workflows into smaller, reusable jobs and steps.

3.  Environment Variables:

    - Use secrets for sensitive data and environment-specific configurations.

4.  Monitor Runs:

    - Regularly check the Actions tab to monitor the status of workflows and address any failures promptly.
