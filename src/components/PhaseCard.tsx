import { useState } from 'react';
import { CheckCircle2, Circle, Clock, ChevronDown, ChevronRight, FileCode, Plus, Pencil, Trash } from 'lucide-react';
import { Phase, FileChange } from '../types';

interface PhaseCardProps {
  phase: Phase;
  onStatusChange: (phaseId: string, status: Phase['status']) => void;
  onFileVerify: (phaseId: string, fileId: string) => void;
}

export function PhaseCard({ phase, onStatusChange, onFileVerify }: PhaseCardProps) {
  const [expanded, setExpanded] = useState(false);

  const getStatusColor = () => {
    switch (phase.status) {
      case 'completed':
        return 'bg-green-50 border-green-200';
      case 'active':
        return 'bg-blue-50 border-blue-200';
      case 'verified':
        return 'bg-emerald-50 border-emerald-200';
      default:
        return 'bg-white border-slate-200';
    }
  };

  const getStatusIcon = () => {
    switch (phase.status) {
      case 'completed':
      case 'verified':
        return <CheckCircle2 className="text-green-500" size={20} />;
      case 'active':
        return <Circle className="text-blue-500 fill-blue-500" size={20} />;
      default:
        return <Circle className="text-slate-300" size={20} />;
    }
  };

  return (
    <div className={`rounded-xl border-2 transition-all duration-300 ${getStatusColor()}`}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-6 py-4 flex items-start gap-4 text-left hover:bg-black/5 transition-colors duration-200"
      >
        {getStatusIcon()}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-1">
            <h3 className="font-semibold text-slate-900">{phase.title}</h3>
            <span className="flex items-center gap-1 text-xs text-slate-500">
              <Clock size={12} />
              {phase.estimatedTime}
            </span>
          </div>
          <p className="text-sm text-slate-600">{phase.description}</p>
          {phase.dependencies.length > 0 && (
            <div className="mt-2 text-xs text-slate-500">
              Depends on: {phase.dependencies.join(', ')}
            </div>
          )}
        </div>
        {expanded ? <ChevronDown className="text-slate-400 flex-shrink-0" /> : <ChevronRight className="text-slate-400 flex-shrink-0" />}
      </button>

      {expanded && (
        <div className="px-6 pb-4 space-y-3 border-t border-slate-200/50">
          <div className="flex items-center justify-between pt-4 mb-2">
            <h4 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <FileCode size={16} />
              File Changes ({phase.files.length})
            </h4>
            <div className="flex gap-2">
              {phase.status === 'pending' && (
                <button
                  onClick={() => onStatusChange(phase.id, 'active')}
                  className="px-3 py-1 bg-blue-500 text-white text-xs rounded-lg hover:bg-blue-600 transition-colors duration-200"
                >
                  Start Phase
                </button>
              )}
              {phase.status === 'active' && (
                <button
                  onClick={() => onStatusChange(phase.id, 'completed')}
                  className="px-3 py-1 bg-green-500 text-white text-xs rounded-lg hover:bg-green-600 transition-colors duration-200"
                >
                  Mark Complete
                </button>
              )}
              {phase.status === 'completed' && (
                <button
                  onClick={() => onStatusChange(phase.id, 'verified')}
                  className="px-3 py-1 bg-emerald-500 text-white text-xs rounded-lg hover:bg-emerald-600 transition-colors duration-200"
                >
                  Verify Phase
                </button>
              )}
            </div>
          </div>

          <div className="space-y-2">
            {phase.files.map((file) => (
              <FileChangeItem
                key={file.id}
                file={file}
                onVerify={() => onFileVerify(phase.id, file.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function FileChangeItem({ file, onVerify }: { file: FileChange; onVerify: () => void }) {
  const [showReasoning, setShowReasoning] = useState(false);

  const getTypeIcon = () => {
    switch (file.type) {
      case 'create':
        return <Plus className="text-green-600" size={14} />;
      case 'modify':
        return <Pencil className="text-blue-600" size={14} />;
      case 'delete':
        return <Trash className="text-red-600" size={14} />;
    }
  };

  const getTypeBadge = () => {
    const colors = {
      create: 'bg-green-100 text-green-700 border-green-200',
      modify: 'bg-blue-100 text-blue-700 border-blue-200',
      delete: 'bg-red-100 text-red-700 border-red-200',
    };
    return (
      <span className={`px-2 py-0.5 text-xs font-medium rounded border ${colors[file.type]} flex items-center gap-1`}>
        {getTypeIcon()}
        {file.type}
      </span>
    );
  };

  return (
    <div className={`p-3 rounded-lg border transition-all duration-200 ${file.verified ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-200'}`}>
      <div className="flex items-start gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            {getTypeBadge()}
            <code className="text-xs font-mono text-slate-700 truncate">{file.path}</code>
          </div>
          <p className="text-sm text-slate-600 mb-2">{file.description}</p>

          <button
            onClick={() => setShowReasoning(!showReasoning)}
            className="text-xs text-blue-600 hover:text-blue-700 font-medium"
          >
            {showReasoning ? 'Hide' : 'Show'} reasoning
          </button>

          {showReasoning && (
            <div className="mt-2 p-2 bg-white rounded border border-slate-200">
              <p className="text-xs text-slate-600 italic">{file.reasoning}</p>
            </div>
          )}

          {file.issues.length > 0 && (
            <div className="mt-2 p-2 bg-red-50 rounded border border-red-200">
              <p className="text-xs font-semibold text-red-700 mb-1">Issues Found:</p>
              <ul className="text-xs text-red-600 list-disc list-inside">
                {file.issues.map((issue, idx) => (
                  <li key={idx}>{issue}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {!file.verified && (
          <button
            onClick={onVerify}
            className="px-2 py-1 text-xs bg-white border border-slate-300 rounded hover:bg-slate-100 transition-colors duration-200 whitespace-nowrap"
          >
            Verify
          </button>
        )}
        {file.verified && (
          <CheckCircle2 className="text-emerald-500 flex-shrink-0" size={20} />
        )}
      </div>
    </div>
  );
}
