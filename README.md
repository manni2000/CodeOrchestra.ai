# CodeOrchestra.ai

CodeOrchestra.ai is a web app powerful and intuitive task management tool designed to help developers and teams plan, track, and visualize complex software development projects. It allows you to break down large tasks into manageable phases, monitor progress, and collaborate effectively.

## Features

- **Task Planning**: Define a main task and let the AI generate a detailed, phase-based implementation plan.
- **Phase Management**: Organize your project into distinct phases, each with its own set of files and objectives.
- **Status Tracking**: Monitor the status of each phase, from 'pending' to 'completed' and 'verified'.
- **Interactive Workflow Visualization**: Switch between a list view and a visual workflow diagram (powered by Mermaid.js) to see the project's structure at a glance.
- **Editable Plan**: Dynamically add, edit, or delete phases and files as your project evolves.
- **Advanced Filtering**: Quickly find specific phases or files using search, status, and other filters.
- **Export to Markdown**: Export the entire project plan to a Markdown file for documentation or offline access.
- **AI Chat Assistant**: An integrated AI chat panel to help with suggestions and modifications.
- **Collaboration Tools**: Features for team collaboration and hand-off to other development environments.

## Tech Stack

- **Frontend**: React, TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Backend (as per dependencies)**: Supabase (client-side)
- **Linting**: ESLint

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18 or later)
- npm

### Installation

1. Clone the repo:
   ```sh
   git clone https://github.com/your_username/codeorchestra.ai.git
   ```
2. Navigate to the project directory:
   ```sh
   cd codeorchestra.ai
   ```
3. Install NPM packages:
   ```sh
   npm install
   ```

### Running the Application

To start the development server, run:

```sh
npm run dev
```

This will start the application on `http://localhost:5173` (or another port if 5173 is busy).

## Available Scripts

In the project directory, you can run the following commands:

- `npm run dev`: Runs the app in development mode.
- `npm run build`: Builds the app for production.
- `npm run lint`: Lints the source code using ESLint.
- `npm run preview`: Serves the production build locally.
- `npm run typecheck`: Performs a static type check using TypeScript.

## Project Structure

```
/src
|-- /components      # Reusable React components
|-- /types           # TypeScript type definitions
|-- /utils           # Utility functions
|-- App.tsx          # Main application component
|-- main.tsx         # Entry point of the application
|-- index.css        # Global styles
```
