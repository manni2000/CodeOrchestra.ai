import { useEffect, useState } from 'react';
import { Keyboard, X } from 'lucide-react';

export function KeyboardShortcuts() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === '/') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isOpen]);

  const shortcuts = [
    { key: '⌘/Ctrl + /', description: 'Show keyboard shortcuts' },
    { key: '⌘/Ctrl + K', description: 'Quick search' },
    { key: '⌘/Ctrl + N', description: 'New task' },
    { key: '⌘/Ctrl + E', description: 'Export plan' },
    { key: '⌘/Ctrl + H', description: 'Hand off to agent' },
    { key: 'Space', description: 'Expand/collapse phase' },
    { key: 'V', description: 'Verify selected item' },
    { key: 'E', description: 'Edit selected item' },
    { key: '↑/↓', description: 'Navigate phases' },
    { key: 'Escape', description: 'Close dialogs' },
  ];

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 bg-white text-slate-700 p-3 rounded-full shadow-lg border border-slate-200 hover:shadow-xl transition-all duration-300 hover:scale-110 group z-40"
        title="Keyboard shortcuts (⌘/)"
      >
        <Keyboard size={20} className="group-hover:rotate-12 transition-transform duration-300" />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full m-6 animate-slide-up">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="bg-blue-50 p-2 rounded-lg">
              <Keyboard className="text-blue-600" size={24} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Keyboard Shortcuts</h2>
              <p className="text-sm text-slate-600">Power user features for faster workflow</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X size={20} className="text-slate-600" />
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          {shortcuts.map((shortcut, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <span className="text-sm text-slate-700">{shortcut.description}</span>
              <kbd className="px-3 py-1 bg-white border border-slate-300 rounded text-xs font-mono text-slate-900 shadow-sm">
                {shortcut.key}
              </kbd>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
