import { Task, Phase, FileChange } from '../types';

const sampleFeatures = [
  {
    keywords: ['auth', 'login', 'authentication', 'user'],
    template: {
      title: 'User Authentication System',
      phases: [
        {
          title: 'Setup Authentication Infrastructure',
          description: 'Configure authentication provider and database schema',
          files: [
            { path: 'src/lib/auth.ts', type: 'create' as const, description: 'Initialize authentication client and configure settings', reasoning: 'Centralized auth configuration ensures consistency across the app' },
            { path: 'src/types/user.ts', type: 'create' as const, description: 'Define User interface and auth-related types', reasoning: 'Type safety for user data throughout the application' },
          ],
          estimatedTime: '30 mins',
        },
        {
          title: 'Build Authentication UI',
          description: 'Create login, signup, and password reset components',
          files: [
            { path: 'src/components/LoginForm.tsx', type: 'create' as const, description: 'Build login form with email/password inputs and validation', reasoning: 'Reusable component for user authentication' },
            { path: 'src/components/SignupForm.tsx', type: 'create' as const, description: 'Create registration form with user details', reasoning: 'Separate concerns for better maintainability' },
            { path: 'src/components/AuthProvider.tsx', type: 'create' as const, description: 'Context provider for auth state management', reasoning: 'Global auth state accessible throughout the app' },
          ],
          estimatedTime: '1 hour',
          dependencies: ['Setup Authentication Infrastructure'],
        },
        {
          title: 'Implement Protected Routes',
          description: 'Add route guards and session management',
          files: [
            { path: 'src/components/ProtectedRoute.tsx', type: 'create' as const, description: 'Route wrapper that checks authentication status', reasoning: 'Prevent unauthorized access to protected pages' },
            { path: 'src/App.tsx', type: 'modify' as const, description: 'Wrap app with AuthProvider and configure routes', reasoning: 'Initialize auth state at the root level' },
          ],
          estimatedTime: '20 mins',
          dependencies: ['Build Authentication UI'],
        },
      ],
      mermaidDiagram: `graph TD
    A[User Request] --> B[Auth Provider Setup]
    B --> C[Database Schema]
    B --> D[Auth Configuration]
    C --> E[Login UI]
    D --> E
    E --> F[Session Management]
    F --> G[Protected Routes]
    G --> H[Complete System]`,
    },
  },
  {
    keywords: ['dashboard', 'analytics', 'chart', 'graph'],
    template: {
      title: 'Analytics Dashboard',
      phases: [
        {
          title: 'Setup Data Layer',
          description: 'Configure data fetching and state management',
          files: [
            { path: 'src/services/analytics.ts', type: 'create' as const, description: 'Create analytics service for data fetching', reasoning: 'Centralized data access layer' },
            { path: 'src/types/analytics.ts', type: 'create' as const, description: 'Define analytics data interfaces', reasoning: 'Type-safe analytics data structures' },
          ],
          estimatedTime: '25 mins',
        },
        {
          title: 'Build Dashboard Layout',
          description: 'Create responsive dashboard grid and navigation',
          files: [
            { path: 'src/components/Dashboard.tsx', type: 'create' as const, description: 'Main dashboard container with grid layout', reasoning: 'Responsive layout for multiple widgets' },
            { path: 'src/components/DashboardCard.tsx', type: 'create' as const, description: 'Reusable card component for metrics', reasoning: 'Consistent styling across dashboard' },
          ],
          estimatedTime: '40 mins',
          dependencies: ['Setup Data Layer'],
        },
        {
          title: 'Add Interactive Charts',
          description: 'Implement data visualization components',
          files: [
            { path: 'src/components/charts/LineChart.tsx', type: 'create' as const, description: 'Line chart component for time-series data', reasoning: 'Visual representation of trends' },
            { path: 'src/components/charts/BarChart.tsx', type: 'create' as const, description: 'Bar chart for categorical comparisons', reasoning: 'Easy comparison of metrics' },
            { path: 'src/components/MetricsSummary.tsx', type: 'create' as const, description: 'Summary cards with key metrics', reasoning: 'Quick overview of important numbers' },
          ],
          estimatedTime: '1 hour',
          dependencies: ['Build Dashboard Layout'],
        },
      ],
      mermaidDiagram: `graph LR
    A[Analytics Service] --> B[Data Processing]
    B --> C[Dashboard Layout]
    C --> D[Metric Cards]
    C --> E[Line Charts]
    C --> F[Bar Charts]
    D --> G[Real-time Updates]
    E --> G
    F --> G`,
    },
  },
  {
    keywords: ['api', 'backend', 'endpoint', 'rest'],
    template: {
      title: 'REST API Integration',
      phases: [
        {
          title: 'Configure API Client',
          description: 'Setup HTTP client with interceptors and error handling',
          files: [
            { path: 'src/lib/apiClient.ts', type: 'create' as const, description: 'Configure axios/fetch with base URL and auth headers', reasoning: 'Centralized API configuration' },
            { path: 'src/types/api.ts', type: 'create' as const, description: 'Define API response types and error interfaces', reasoning: 'Type-safe API interactions' },
          ],
          estimatedTime: '20 mins',
        },
        {
          title: 'Build API Services',
          description: 'Create service methods for each resource',
          files: [
            { path: 'src/services/userService.ts', type: 'create' as const, description: 'User CRUD operations', reasoning: 'Encapsulate user-related API calls' },
            { path: 'src/services/dataService.ts', type: 'create' as const, description: 'Data fetching and mutations', reasoning: 'Separate data operations from components' },
          ],
          estimatedTime: '45 mins',
          dependencies: ['Configure API Client'],
        },
        {
          title: 'Add Error Handling & Loading States',
          description: 'Implement robust error handling and user feedback',
          files: [
            { path: 'src/hooks/useApi.ts', type: 'create' as const, description: 'Custom hook for API calls with loading/error states', reasoning: 'Reusable API logic across components' },
            { path: 'src/components/ErrorBoundary.tsx', type: 'create' as const, description: 'Catch and display API errors gracefully', reasoning: 'Prevent app crashes from API failures' },
          ],
          estimatedTime: '30 mins',
          dependencies: ['Build API Services'],
        },
      ],
      mermaidDiagram: `graph TD
    A[API Client] --> B[Interceptors]
    A --> C[Error Handler]
    B --> D[User Service]
    B --> E[Data Service]
    C --> F[Error Boundary]
    D --> G[React Hooks]
    E --> G
    F --> G`,
    },
  },
];

export function generatePlan(taskDescription: string): Task {
  const lowerDesc = taskDescription.toLowerCase();

  let selectedTemplate = sampleFeatures[0];
  for (const feature of sampleFeatures) {
    if (feature.keywords.some(keyword => lowerDesc.includes(keyword))) {
      selectedTemplate = feature;
      break;
    }
  }

  const task: Task = {
    id: `task-${Date.now()}`,
    title: selectedTemplate.template.title,
    description: taskDescription,
    status: 'planning',
    phases: selectedTemplate.template.phases.map((phase, idx) => ({
      id: `phase-${idx}`,
      title: phase.title,
      description: phase.description,
      status: 'pending' as const,
      files: phase.files.map((file, fileIdx) => ({
        id: `file-${idx}-${fileIdx}`,
        path: file.path,
        type: file.type,
        description: file.description,
        reasoning: file.reasoning,
        verified: false,
        issues: [],
      })),
      dependencies: phase.dependencies || [],
      estimatedTime: phase.estimatedTime,
    })),
    createdAt: new Date(),
    updatedAt: new Date(),
    mermaidDiagram: selectedTemplate.template.mermaidDiagram,
  };

  setTimeout(() => {
    task.status = 'ready';
  }, 2000);

  return task;
}
