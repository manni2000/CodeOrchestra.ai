import { useState } from 'react';
import { CheckCircle2, Circle, Clock, ChevronDown, ChevronRight, FileCode, Plus, Pencil, Trash, Edit2, Save, X, GripVertical } from 'lucide-react';
import { Phase, FileChange } from '../types';

interface EditablePhaseCardProps {
  phase: Phase;
  onStatusChange: (phaseId: string, status: Phase['status']) => void;
  onFileVerify: (phaseId: string, fileId: string) => void;
  onPhaseEdit: (phaseId: string, updates: Partial<Phase>) => void;
  onFileEdit: (phaseId: string, fileId: string, updates: Partial<FileChange>) => void;
  onFileDelete: (phaseId: string, fileId: string) => void;
  onFileAdd: (phaseId: string) => void;
}

export function EditablePhaseCard({
  phase,
  onStatusChange,
  onFileVerify,
  onPhaseEdit,
  onFileEdit,
  onFileDelete,
  onFileAdd,
}: EditablePhaseCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [isEditingPhase, setIsEditingPhase] = useState(false);
  const [editedTitle, setEditedTitle] = useState(phase.title);
  const [editedDescription, setEditedDescription] = useState(phase.description);

  const savePhaseEdits = () => {
    onPhaseEdit(phase.id, {
      title: editedTitle,
      description: editedDescription,
    });
    setIsEditingPhase(false);
  };

  const cancelPhaseEdits = () => {
    setEditedTitle(phase.title);
    setEditedDescription(phase.description);
    setIsEditingPhase(false);
  };

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
    <div className={`rounded-xl border-2 transition-all duration-300 ${getStatusColor()} group hover:shadow-md`}>
      <div className="px-6 py-4 flex items-start gap-4">
        <button className="cursor-grab active:cursor-grabbing opacity-0 group-hover:opacity-100 transition-opacity">
          <GripVertical className="text-slate-400" size={20} />
        </button>

        <button
          onClick={() => setExpanded(!expanded)}
          className="flex-shrink-0"
        >
          {getStatusIcon()}
        </button>

        {isEditingPhase ? (
          <div className="flex-1 space-y-3">
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              rows={2}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <div className="flex gap-2">
              <button
                onClick={savePhaseEdits}
                className="px-3 py-1 bg-green-500 text-white text-sm rounded-lg hover:bg-green-600 transition-colors flex items-center gap-1"
              >
                <Save size={14} />
                Save
              </button>
              <button
                onClick={cancelPhaseEdits}
                className="px-3 py-1 bg-slate-200 text-slate-700 text-sm rounded-lg hover:bg-slate-300 transition-colors flex items-center gap-1"
              >
                <X size={14} />
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex-1 min-w-0 text-left"
          >
            <div className="flex items-center gap-3 mb-1">
              <h3 className="font-semibold text-slate-900">{phase.title}</h3>
              <span className="flex items-center gap-1 text-xs text-slate-500">
                <Clock size={12} />
                {phase.estimatedTime}
              </span>
            </div>
            <p className="text-sm text-slate-600">{phase.description}</p>
          </button>
        )}

        {!isEditingPhase && (
          <button
            onClick={() => setIsEditingPhase(true)}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-slate-200 rounded-lg"
          >
            <Edit2 size={16} className="text-slate-600" />
          </button>
        )}

        <button
          onClick={() => setExpanded(!expanded)}
          className="flex-shrink-0"
        >
          {expanded ? <ChevronDown className="text-slate-400" /> : <ChevronRight className="text-slate-400" />}
        </button>
      </div>

      {expanded && (
        <div className="px-6 pb-4 space-y-3 border-t border-slate-200/50">
          <div className="flex items-center justify-between pt-4 mb-2">
            <h4 className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <FileCode size={16} />
              File Changes ({phase.files.length})
            </h4>
            <div className="flex gap-2">
              <button
                onClick={() => onFileAdd(phase.id)}
                className="px-3 py-1 bg-slate-200 text-slate-700 text-xs rounded-lg hover:bg-slate-300 transition-colors flex items-center gap-1"
              >
                <Plus size={14} />
                Add File
              </button>
              {phase.status === 'pending' && (
                <button
                  onClick={() => onStatusChange(phase.id, 'active')}
                  className="px-3 py-1 bg-blue-500 text-white text-xs rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Start Phase
                </button>
              )}
              {phase.status === 'active' && (
                <button
                  onClick={() => onStatusChange(phase.id, 'completed')}
                  className="px-3 py-1 bg-green-500 text-white text-xs rounded-lg hover:bg-green-600 transition-colors"
                >
                  Mark Complete
                </button>
              )}
              {phase.status === 'completed' && (
                <button
                  onClick={() => onStatusChange(phase.id, 'verified')}
                  className="px-3 py-1 bg-emerald-500 text-white text-xs rounded-lg hover:bg-emerald-600 transition-colors"
                >
                  Verify Phase
                </button>
              )}
            </div>
          </div>

          <div className="space-y-2">
            {phase.files.map((file) => (
              <EditableFileChangeItem
                key={file.id}
                file={file}
                onVerify={() => onFileVerify(phase.id, file.id)}
                onEdit={(updates) => onFileEdit(phase.id, file.id, updates)}
                onDelete={() => onFileDelete(phase.id, file.id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function EditableFileChangeItem({
  file,
  onVerify,
  onEdit,
  onDelete,
}: {
  file: FileChange;
  onVerify: () => void;
  onEdit: (updates: Partial<FileChange>) => void;
  onDelete: () => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [showReasoning, setShowReasoning] = useState(false);
  const [editedPath, setEditedPath] = useState(file.path);
  const [editedDescription, setEditedDescription] = useState(file.description);

  const saveEdits = () => {
    onEdit({
      path: editedPath,
      description: editedDescription,
    });
    setIsEditing(false);
  };

  const cancelEdits = () => {
    setEditedPath(file.path);
    setEditedDescription(file.description);
    setIsEditing(false);
  };

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
    <div className={`p-3 rounded-lg border transition-all duration-200 group hover:shadow-sm ${file.verified ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-200'}`}>
      {isEditing ? (
        <div className="space-y-3">
          <input
            type="text"
            value={editedPath}
            onChange={(e) => setEditedPath(e.target.value)}
            className="w-full px-3 py-1 border border-slate-300 rounded text-xs font-mono focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="File path..."
          />
          <textarea
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            rows={2}
            className="w-full px-3 py-2 border border-slate-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Description..."
          />
          <div className="flex gap-2">
            <button
              onClick={saveEdits}
              className="px-3 py-1 bg-green-500 text-white text-xs rounded hover:bg-green-600 transition-colors flex items-center gap-1"
            >
              <Save size={12} />
              Save
            </button>
            <button
              onClick={cancelEdits}
              className="px-3 py-1 bg-slate-200 text-slate-700 text-xs rounded hover:bg-slate-300 transition-colors flex items-center gap-1"
            >
              <X size={12} />
              Cancel
            </button>
          </div>
        </div>
      ) : (
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
          </div>

          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => setIsEditing(true)}
              className="p-1 hover:bg-slate-200 rounded transition-colors"
            >
              <Edit2 size={14} className="text-slate-600" />
            </button>
            <button
              onClick={onDelete}
              className="p-1 hover:bg-red-100 rounded transition-colors"
            >
              <Trash size={14} className="text-red-600" />
            </button>
          </div>

          {!file.verified && (
            <button
              onClick={onVerify}
              className="px-2 py-1 text-xs bg-white border border-slate-300 rounded hover:bg-slate-100 transition-colors whitespace-nowrap"
            >
              Verify
            </button>
          )}
          {file.verified && (
            <CheckCircle2 className="text-emerald-500 flex-shrink-0" size={20} />
          )}
        </div>
      )}
    </div>
  );
}
