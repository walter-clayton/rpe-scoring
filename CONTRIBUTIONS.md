# CONTRIBUTION GUIDELINES

Welcome to RPE Scoring for developers! We are excited to have you onboard and look forward to your contributions towards the development of our web app. This document outlines the process that every team member should follow to contribute code to the project. By adhering to these guidelines, we can ensure a smooth and efficient workflow for everyone involved.

## Getting Started

Before you begin contributing, make sure you have a GitHub account and Git installed on your local machine. Familiarize yourself with the basics of Git and GitHub.

## Workflow Overview

Our project follows a feature branch workflow, where all new features, bug fixes, or other changes are made in separate branches from the main branch. This approach helps to keep the main branch stable and ensures that each contribution can be reviewed and tested independently.

### 1. Clone the Repository

Clone the repository to your local machine using the following command:

```bash
git clone https://github.com/walter-clayton/rpe-scoring.git
```

### 2. Create a New Branch

Before you start making changes, create a new branch for your work. Use a name that reflects the feature or fix you are working on:

```bash
git checkout -b <branch-name>
```

### 3. Make Your Changes

Implement your feature or fix on your branch. Write clean, well-documented, and testable code. Make sure to commit your changes regularly with meaningful commit messages.

### 4. Pull the Latest Changes

Before pushing your changes, pull the latest changes from the main branch to ensure your branch is up-to-date:

```bash
git checkout main
git pull origin main
git checkout <branch-name>
git merge main
git add .
git commit -m <branch-name>
```

Resolve any merge conflicts that arise.

### 5. Push Your Branch

Once your changes are complete and you have merged the latest changes from the main branch, push your branch to the repository:

```bash
git push origin <branch-name>
```

### 6. Create a Pull Request

Go to the repository on GitHub and create a new pull request from your branch to the main branch. Provide a clear description of the changes and link any relevant issues.

### 7. Code Review and Testing

Your pull request will be reviewed by other team members. Participate in the review process by responding to comments and making any necessary adjustments. Automated tests should run to verify the changes.

### 8. Merge the Pull Request

Once your pull request has been approved and all tests pass, a project maintainer will merge your changes into the main branch.

### 9. Clean Up

After your changes have been merged, you can delete your branch both locally and on GitHub, unless you plan to make further changes.

```bash
git branch -d <branch-name>
git push origin --delete <branch-name>
```

### Best Practices

- Always work in a branch specific to your task.
- Keep your branches small and focused on a single feature or bug fix.
- Write meaningful commit messages and pull request descriptions.
- Follow the project's coding standards and guidelines.
- Participate in code reviews to foster a culture of collaboration and learning.

Thank you for contributing to our project! Together, we can build something amazing.
