export const INDEXJS_TEMPLATE = `import app from './app.js';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
      console.log(\`Server is running on port \${PORT}\`);
});
`;

export const APPJS_TEMPLATE = `import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

dotenv.config();

// Initialize express app
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up CORS to accept requests from a specific origin
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
  })
);

// Use cookie parser to read cookies
app.use(cookieParser());

// Accept JSON payloads in requests, limiting the size to 16kb
app.use(
  express.json({
    limit: '16kb',
  })
);

// Parse URL-encoded payloads with a limit of 16kb
app.use(express.urlencoded({ extended: true, limit: '16kb' }));

// Serve static files from the 'Public' folder
app.use(express.static('Public'));


// Routes
app.get('/api/v1/healthcheck', async (req, res) => {
  res.send('Hello Sever is Running.....')
})


export default app;
`;

export const README_TEMPLATE = `# Backend Application with CSAPP CLI

## Description
This project is a Node.js backend application created with the CSAPP CLI. You can choose between TypeScript or JavaScript during setup, and it comes with a predefined folder structure, environment configurations, and Prettier formatting.

## Setup Instructions
Follow these steps to get started:

1. **Install dependencies**:
   Run \`npm install\` to install the required packages.

2. **Development mode**:
   Start the development server using \`npm run dev\`. This will run the app in development mode with Nodemon (for automatic restarts).

3. **Build the project**:
   If using TypeScript, build the project with \`npm run build\` to compile the TypeScript files. (Note: A build script can be added if necessary.)

4. **Start the application**:
   Run \`npm start\` to start the app in production mode.

## Scripts
- \`npm start\`: Starts the application using \`node src/index.js\` or \`src/index.ts\`.
- \`npm run dev\`: Starts the app in development mode using Nodemon.
- \`npm run build\`: (If TypeScript) Builds the app for production.

## Environment Variables
Make sure to configure the necessary environment variables in the \`.env\` file.

## License
This project is licensed under the MIT License.
`;
