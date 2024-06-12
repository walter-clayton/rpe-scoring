# Using GitHub Actions

## Introduction

This document provides guidelines on how to use GitHub Actions for continuous integration and continuous deployment (CI/CD) in our project.

## Table of Contents

1. [Overview](#overview)
2. [Workflow Configuration](#workflow-configuration)
3. [Environment Variables](#environment-variables)
4. [Triggering the Pipeline](#triggering-the-pipeline)
5. [Monitoring and Debugging](#monitoring-and-debugging)
6. [Best Practices](#best-practices)

## Overview

GitHub Actions is used to automate testing and deployment processes in our project. The CI/CD pipeline ensures that code changes are automatically tested and deployed to maintain the integrity of the project.

### Additional Resources

- [Git Workflow](CONTRIBUTIONS.md)
- [Writing Tests](WRITING_TESTS.md)

## Workflow Configuration

The CI/CD workflow is defined in the `.github/workflows/ci-cd.yml` file.

### Example Workflow Configuration

```yaml
name: CI Pipeline

on:
  push:
    branches:
      - RS-1
  pull_request:
    branches:
      - RS-1

jobs:
  test_and_build_client:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3

      - name: Set up Node.js
        uses: actions/setup-node@v3
        with:
          node-version: "20"

      - name: Install dependencies
        run: cd client && npm install

      - name: Run client tests
        run: cd client && npm run test
        env:
          CI: true
          REACT_APP_API_URL: ${{ secrets.REACT_APP_API_URL }}
          REACT_APP_API_KEY: ${{ secrets.REACT_APP_API_KEY }}

      - name: Build client
        run: cd client && npm run build
        env:
          REACT_APP_API_URL: ${{ secrets.REACT_APP_API_URL }}
          REACT_APP_API_KEY: ${{ secrets.REACT_APP_API_KEY }}
```

## Environment Variables

### Setting Up Secrets

Environment variables required for the workflow should be set up as secrets in the GitHub repository.

1. Navigate to your repository on GitHub.

2. Go to Settings > Secrets and click on New repository secret.

3. Add the following secrets:

   - REACT_APP_API_URL
   - REACT_APP_API_KEY

## Triggering the Pipeline

The CI/CD pipeline is triggered automatically on the following events:

1. Push: Any push to the RS-1 branch.
2. Pull Request: Any pull request to the RS-1 branch.

Ensure your branch is up-to-date with RS-1 before creating a pull request to avoid conflicts.

## Monitoring and Debugging

1. Go to the Actions tab in your GitHub repository.
2. Select the workflow run you want to monitor.
3. Review the logs to ensure all steps complete successfully.
4. If a step fails, click on it to view detailed logs and debug the issue.

## Best Practices

1.  Keep Actions Updated:

    - Use the latest versions of actions to ensure compatibility and security.

2.  Modular Workflows:

    - Write descriptive test names that explain what the test is verifying.

3.  Test Coverage:

    - Aim for high test coverage but focus on testing critical parts of the application.

4.  Run Tests Frequently:

    - Run tests frequently during development to catch issues early.

5.  Mock External Services:

    - Use mocks to simulate external services and dependencies.

By following these guidelines, you can ensure the robustness and reliability of your code through effective testing.
