import { useState } from 'react';
import { Network, ChevronDown, ChevronUp } from 'lucide-react';

interface MermaidDiagramProps {
  diagram?: string;
}

export function MermaidDiagram({ diagram }: MermaidDiagramProps) {
  const [expanded, setExpanded] = useState(false);

  if (!diagram) return null;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-colors duration-200"
      >
        <div className="flex items-center gap-3">
          <Network className="text-blue-500" size={24} />
          <div className="text-left">
            <h3 className="font-semibold text-slate-900">Architecture Diagram</h3>
            <p className="text-sm text-slate-600">Visual representation of the implementation flow</p>
          </div>
        </div>
        {expanded ? <ChevronUp className="text-slate-400" /> : <ChevronDown className="text-slate-400" />}
      </button>

      {expanded && (
        <div className="px-6 pb-6 border-t border-slate-200">
          <div className="bg-slate-50 rounded-xl p-6 mt-4">
            <pre className="text-xs font-mono text-slate-700 overflow-x-auto whitespace-pre">
              {diagram}
            </pre>
            <p className="mt-4 text-sm text-slate-600 italic">
              💡 This diagram can be visualized using tools like Mermaid Live Editor or integrated IDE extensions
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
