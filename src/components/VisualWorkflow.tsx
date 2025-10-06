import { Phase } from '../types';
import { Check, Circle, ArrowRight, Clock, AlertCircle } from 'lucide-react';

interface VisualWorkflowProps {
  phases: Phase[];
  onPhaseClick: (phaseId: string) => void;
}

export function VisualWorkflow({ phases, onPhaseClick }: VisualWorkflowProps) {
  const getPhaseIcon = (status: Phase['status']) => {
    switch (status) {
      case 'completed':
      case 'verified':
        return <Check className="text-white" size={16} />;
      case 'active':
        return <Circle className="text-white fill-white" size={12} />;
      default:
        return <Clock className="text-white" size={16} />;
    }
  };

  const getPhaseColor = (status: Phase['status']) => {
    switch (status) {
      case 'completed':
      case 'verified':
        return 'bg-green-500 border-green-600';
      case 'active':
        return 'bg-blue-500 border-blue-600 animate-pulse';
      default:
        return 'bg-slate-300 border-slate-400';
    }
  };

  const getConnectorStyle = (currentStatus: Phase['status'], nextStatus?: Phase['status']) => {
    if (currentStatus === 'completed' || currentStatus === 'verified') {
      return 'bg-green-500';
    }
    if (currentStatus === 'active') {
      return 'bg-gradient-to-r from-green-500 to-slate-300';
    }
    return 'bg-slate-300';
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-slate-900">Visual Workflow</h3>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-slate-300" />
            <span className="text-slate-600">Pending</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-slate-600">Active</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-slate-600">Completed</span>
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="flex items-center justify-between">
          {phases.map((phase, idx) => (
            <div key={phase.id} className="flex items-center flex-1">
              <div className="flex flex-col items-center relative group">
                <button
                  onClick={() => onPhaseClick(phase.id)}
                  className={`w-12 h-12 rounded-full border-4 flex items-center justify-center transition-all duration-300 hover:scale-110 ${getPhaseColor(phase.status)} shadow-lg hover:shadow-xl`}
                >
                  {getPhaseIcon(phase.status)}
                </button>

                <div className="absolute top-16 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white px-4 py-2 rounded-lg text-xs whitespace-nowrap z-10 shadow-xl">
                  <div className="font-semibold mb-1">{phase.title}</div>
                  <div className="text-slate-300">{phase.estimatedTime}</div>
                  <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 rotate-45" />
                </div>

                <div className="mt-3 text-center max-w-[120px]">
                  <div className="text-xs font-medium text-slate-700 mb-1">
                    Phase {idx + 1}
                  </div>
                  <div className="text-xs text-slate-500">
                    {phase.files.length} files
                  </div>
                </div>

                {phase.dependencies.length > 0 && (
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
                    <AlertCircle size={14} className="text-orange-500" />
                  </div>
                )}
              </div>

              {idx < phases.length - 1 && (
                <div className="flex-1 h-1 mx-2 relative">
                  <div className="absolute inset-0 bg-slate-200 rounded-full" />
                  <div
                    className={`absolute inset-0 rounded-full transition-all duration-500 ${getConnectorStyle(phase.status, phases[idx + 1]?.status)}`}
                  />
                  <ArrowRight className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-400" size={16} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 grid grid-cols-3 gap-4">
        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
          <div className="text-2xl font-bold text-slate-900 mb-1">
            {phases.filter(p => p.status === 'completed' || p.status === 'verified').length}
          </div>
          <div className="text-sm text-slate-600">Phases Completed</div>
        </div>
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="text-2xl font-bold text-blue-900 mb-1">
            {phases.filter(p => p.status === 'active').length}
          </div>
          <div className="text-sm text-blue-600">Active Phase</div>
        </div>
        <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
          <div className="text-2xl font-bold text-slate-900 mb-1">
            {phases.filter(p => p.status === 'pending').length}
          </div>
          <div className="text-sm text-slate-600">Remaining</div>
        </div>
      </div>
    </div>
  );
}
