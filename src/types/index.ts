export type TaskStatus = 'planning' | 'ready' | 'in_progress' | 'verifying' | 'completed';
export type PhaseStatus = 'pending' | 'active' | 'completed' | 'verified';

export interface FileChange {
  id: string;
  path: string;
  type: 'create' | 'modify' | 'delete';
  description: string;
  reasoning: string;
  verified: boolean;
  issues: string[];
}

export interface Phase {
  id: string;
  title: string;
  description: string;
  status: PhaseStatus;
  files: FileChange[];
  dependencies: string[];
  estimatedTime: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  phases: Phase[];
  createdAt: Date;
  updatedAt: Date;
  mermaidDiagram?: string;
}
