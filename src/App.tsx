import { useState } from 'react';
import { Header } from './components/Header';
import { TaskInput } from './components/TaskInput';
import { EmptyState } from './components/EmptyState';
import { TaskOverview } from './components/TaskOverview';
import { EditablePhaseCard } from './components/EditablePhaseCard';
import { MermaidDiagram } from './components/MermaidDiagram';
import { VisualWorkflow } from './components/VisualWorkflow';
import { AIChatPanel } from './components/AIChatPanel';
import { CollaborationPanel } from './components/CollaborationPanel';
import { AdvancedFilters, FilterState } from './components/AdvancedFilters';
import { KeyboardShortcuts } from './components/KeyboardShortcuts';
import { Onboarding } from './components/Onboarding';
import { Task, Phase, FileChange } from './types';
import { generatePlan } from './utils/mockPlanner';
import { ArrowLeft, Download, Share2, ExternalLink, LayoutGrid, List } from 'lucide-react';

function App() {
  const [task, setTask] = useState<Task | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [viewMode, setViewMode] = useState<'list' | 'workflow'>('list');
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    status: [],
    fileType: [],
    tags: [],
    timeRange: 'all',
  });
  const [selectedPhaseId, setSelectedPhaseId] = useState<string | null>(null);

  const handleTaskSubmit = (description: string) => {
    setIsGenerating(true);
    const newTask = generatePlan(description);
    setTask(newTask);

    setTimeout(() => {
      setIsGenerating(false);
      if (newTask) {
        setTask({ ...newTask, status: 'ready' });
      }
    }, 2500);
  };

  const handlePhaseStatusChange = (phaseId: string, status: Phase['status']) => {
    if (!task) return;

    const updatedPhases = task.phases.map(phase =>
      phase.id === phaseId ? { ...phase, status } : phase
    );

    const allCompleted = updatedPhases.every(p => p.status === 'completed' || p.status === 'verified');
    const anyActive = updatedPhases.some(p => p.status === 'active');
    const anyCompleted = updatedPhases.some(p => p.status === 'completed' || p.status === 'verified');

    let newTaskStatus = task.status;
    if (allCompleted) {
      newTaskStatus = 'completed';
    } else if (anyActive || anyCompleted) {
      newTaskStatus = 'in_progress';
    }

    setTask({
      ...task,
      phases: updatedPhases,
      status: newTaskStatus,
      updatedAt: new Date(),
    });
  };

  const handleFileVerify = (phaseId: string, fileId: string) => {
    if (!task) return;

    const updatedPhases = task.phases.map(phase => {
      if (phase.id === phaseId) {
        const updatedFiles = phase.files.map(file =>
          file.id === fileId ? { ...file, verified: true } : file
        );
        return { ...phase, files: updatedFiles };
      }
      return phase;
    });

    setTask({
      ...task,
      phases: updatedPhases,
      updatedAt: new Date(),
    });
  };

  const handlePhaseEdit = (phaseId: string, updates: Partial<Phase>) => {
    if (!task) return;

    const updatedPhases = task.phases.map(phase =>
      phase.id === phaseId ? { ...phase, ...updates } : phase
    );

    setTask({
      ...task,
      phases: updatedPhases,
      updatedAt: new Date(),
    });
  };

  const handleFileEdit = (phaseId: string, fileId: string, updates: Partial<FileChange>) => {
    if (!task) return;

    const updatedPhases = task.phases.map(phase => {
      if (phase.id === phaseId) {
        const updatedFiles = phase.files.map(file =>
          file.id === fileId ? { ...file, ...updates } : file
        );
        return { ...phase, files: updatedFiles };
      }
      return phase;
    });

    setTask({
      ...task,
      phases: updatedPhases,
      updatedAt: new Date(),
    });
  };

  const handleFileDelete = (phaseId: string, fileId: string) => {
    if (!task) return;

    const updatedPhases = task.phases.map(phase => {
      if (phase.id === phaseId) {
        const updatedFiles = phase.files.filter(file => file.id !== fileId);
        return { ...phase, files: updatedFiles };
      }
      return phase;
    });

    setTask({
      ...task,
      phases: updatedPhases,
      updatedAt: new Date(),
    });
  };

  const handleFileAdd = (phaseId: string) => {
    if (!task) return;

    const newFile: FileChange = {
      id: `file-${Date.now()}`,
      path: 'src/new-file.ts',
      type: 'create',
      description: 'New file description',
      reasoning: 'Add reasoning here',
      verified: false,
      issues: [],
    };

    const updatedPhases = task.phases.map(phase => {
      if (phase.id === phaseId) {
        return { ...phase, files: [...phase.files, newFile] };
      }
      return phase;
    });

    setTask({
      ...task,
      phases: updatedPhases,
      updatedAt: new Date(),
    });
  };

  const handleReset = () => {
    setTask(null);
    setIsGenerating(false);
    setViewMode('list');
    setSelectedPhaseId(null);
  };

  const handleExportPlan = () => {
    if (!task) return;

    const planText = `# ${task.title}\n\n${task.description}\n\n## Phases\n\n${task.phases.map((phase, idx) =>
      `### Phase ${idx + 1}: ${phase.title}\n${phase.description}\n**Estimated Time:** ${phase.estimatedTime}\n\n**Files:**\n${phase.files.map(f => `- [${f.type.toUpperCase()}] ${f.path}\n  ${f.description}`).join('\n')}\n`
    ).join('\n')}`;

    const blob = new Blob([planText], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${task.title.replace(/\s+/g, '-').toLowerCase()}-plan.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handlePhaseClick = (phaseId: string) => {
    setSelectedPhaseId(phaseId);
    setViewMode('list');
    setTimeout(() => {
      const element = document.getElementById(`phase-${phaseId}`);
      element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const filteredPhases = task?.phases.filter(phase => {
    if (filters.status.length > 0 && !filters.status.includes(phase.status)) {
      return false;
    }

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      const matchesTitle = phase.title.toLowerCase().includes(query);
      const matchesDescription = phase.description.toLowerCase().includes(query);
      const matchesFiles = phase.files.some(f =>
        f.path.toLowerCase().includes(query) ||
        f.description.toLowerCase().includes(query)
      );
      if (!matchesTitle && !matchesDescription && !matchesFiles) {
        return false;
      }
    }

    return true;
  }) || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 text-sm sm:text-base">
      <Header />
      <Onboarding />
      <KeyboardShortcuts />

      <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-8">
        {!task ? (
          <div className="space-y-12">
            <div className="mt-12">
              <TaskInput onSubmit={handleTaskSubmit} disabled={isGenerating} />
            </div>
            <EmptyState />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-0 sm:justify-between">
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 bg-white text-slate-700 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors duration-200 font-medium"
              >
                <ArrowLeft size={18} />
                New Task
              </button>

              <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
                <div className="flex items-center gap-1 bg-white rounded-lg border border-slate-200 p-0.5 sm:p-1">
                  <button
                    onClick={() => setViewMode('list')}
                    className={`px-3 py-1.5 rounded transition-colors ${
                      viewMode === 'list'
                        ? 'bg-blue-500 text-white'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <List size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode('workflow')}
                    className={`px-3 py-1.5 rounded transition-colors ${
                      viewMode === 'workflow'
                        ? 'bg-blue-500 text-white'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <LayoutGrid size={18} />
                  </button>
                </div>

                <button
                  onClick={() => alert('Share functionality would integrate with your team collaboration tools')}
                  className="flex items-center gap-2 px-4 py-2 bg-white text-slate-700 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors duration-200 font-medium"
                >
                  <Share2 size={18} />
                  Share
                </button>
                <button
                  onClick={handleExportPlan}
                  className="flex items-center gap-2 px-4 py-2 bg-white text-slate-700 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors duration-200 font-medium"
                >
                  <Download size={18} />
                  Export
                </button>
                <button
                  onClick={() => alert('This would open the handoff interface to Cursor, Claude, Windsurf, etc.')}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 font-medium shadow-md"
                >
                  <ExternalLink size={18} />
                  Hand Off
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="lg:col-span-2 space-y-4 sm:space-y-6">
                <TaskOverview task={task} />

                {viewMode === 'workflow' ? (
                  <VisualWorkflow phases={task.phases} onPhaseClick={handlePhaseClick} />
                ) : (
                  <>
                    <AdvancedFilters onFilterChange={setFilters} />

                    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h3 className="text-2xl font-bold text-slate-900">Implementation Phases</h3>
                          <p className="text-sm text-slate-600 mt-1">
                            {filteredPhases.length} of {task.phases.length} phases shown
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {filteredPhases.map((phase) => (
                          <div key={phase.id} id={`phase-${phase.id}`}>
                            <EditablePhaseCard
                              phase={phase}
                              onStatusChange={handlePhaseStatusChange}
                              onFileVerify={handleFileVerify}
                              onPhaseEdit={handlePhaseEdit}
                              onFileEdit={handleFileEdit}
                              onFileDelete={handleFileDelete}
                              onFileAdd={handleFileAdd}
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                <MermaidDiagram diagram={task.mermaidDiagram} />
              </div>

              <div className="space-y-6">
                <CollaborationPanel />
              </div>
            </div>

            {task.status === 'completed' && (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-200 text-center animate-slide-up">
                <h3 className="text-2xl font-bold text-green-900 mb-2">🎉 Task Completed!</h3>
                <p className="text-green-700 mb-4">
                  All phases have been completed and verified. Your implementation is ready for review.
                </p>
                <button
                  onClick={handleReset}
                  className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 font-medium"
                >
                  Start New Task
                </button>
              </div>
            )}
          </div>
        )}
      </main>

      {task && <AIChatPanel taskTitle={task.title} onSuggestionApply={(suggestion) => console.log(suggestion)} />}

      <footer className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 mt-8 sm:mt-12 border-t border-slate-200">
        <div className="text-center text-sm text-slate-600">
          <p>
            Built with TypeScript, React, and Tailwind CSS • Inspired by{' '}
            <a href="https://traycer.ai" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 font-medium">
              Traycer
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
