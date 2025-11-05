# Sicherheit E-Commerce App

This is a modern, stylish, and secure ecommerce web application built with React, TypeScript, and Tailwind CSS. It features a product catalog, shopping cart, and an AI-powered style assistant.

## Development and Deployment

This project is set up to use [Vite](https://vitejs.dev/) for a fast local development experience and for building the application for production.

### Running Locally

**Prerequisites:** [Node.js](https://nodejs.org/) (version 18 or higher recommended)

1.  **Install dependencies:**
    Open your terminal in the project root and run:
    ```bash
    npm install
    ```

2.  **Set up Environment Variables:**
    Create a new file named `.env.local` in the project root. This file is for your secret API key and should not be committed to Git. Add your Gemini API key to this file:
    ```
    VITE_API_KEY=YOUR_GEMINI_API_KEY_HERE
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    This will start the development server, typically at `http://localhost:5173`.

### Deploying to Vercel

1.  **Push to GitHub:**
    Create a new repository on [GitHub](https://github.com/) and push your project code to it.

2.  **Import Project in Vercel:**
    - Log in to your [Vercel](https://vercel.com/) account.
    - Click on "Add New..." and select "Project".
    - Import the GitHub repository you just created.

3.  **Configure Project:**
    - Vercel should automatically detect that you are using Vite and configure the build settings correctly (Build Command: `npm run build`, Output Directory: `dist`).
    - Go to the "Environment Variables" section in your new Vercel project's settings.
    - Add a new environment variable:
        - **Name:** `VITE_API_KEY`
        - **Value:** Paste your Gemini API key here.

4.  **Deploy:**
    Click the "Deploy" button. Vercel will build and deploy your application. Once finished, you'll be given a public URL for your live site.