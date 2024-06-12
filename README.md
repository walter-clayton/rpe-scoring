# RPE SCORING

> RPE Scoring main site built with React, Express, Node, and MongoDB.

## Quick Start

```bash

# Go to front
cd client

# Install dependencies for server
npm install

# Run the client
npm run dev

# Server runs on client on  http://localhost:5173/

# Open another terminal

# Go to server
cd server

# Install dependencies for server
npm install

# Run the client
npm run dev

# Server runs on client on  http://localhost:5174/

# When running locally, modify the .env URLS

# Client environment variable
VITE_API_RPEPOST_URL=http://localhost:4000/api/rpe

# Server environment variable
FRONTEND_URL=http://localhost:5173

```

## Environment Variables

Create a .env file in both the client and server directories with the necessary environment variables. Example for the server:

```bash

MONGODB_URI=your-mongodb-uri
MONGODB_DBNAME=your-db-name
PORT=4000
ACCESS_KEY=your-access-key
FRONTEND_URL=http://localhost:5174

```

### Contributions

> Please go to this [page](CONTRIBUTIONS.md) for contributions.

Follow the project's coding standards and style guides.

- Ensure your code is well-documented.
- Write meaningful commit messages.
- Create a pull request (PR) to the RS-1 branch once your feature or bug fix is complete.

### Author

[Walter Clayton](http://www.walterclayton.com)

### Team

#### Contributors for 1.00 version

- [Yves E. Bolong](https://github.com/yvessoham)

### Version

![RPE Version](https://img.shields.io/badge/RPE-1.00-blue)

### License

This project is UNLICENSED.

© All Rights Reserved.
