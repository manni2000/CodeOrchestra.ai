import { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';

interface TaskInputProps {
  onSubmit: (description: string) => void;
  disabled?: boolean;
}

export function TaskInput({ onSubmit, disabled }: TaskInputProps) {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSubmit(input.trim());
      setInput('');
    }
  };

  const suggestions = [
    'Add user authentication with email/password',
    'Create an analytics dashboard with charts',
    'Build a REST API integration layer',
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      <form onSubmit={handleSubmit} className="relative">
        <div className="flex items-center gap-3 bg-white rounded-2xl shadow-lg border border-slate-200 p-2 transition-all duration-200 focus-within:border-blue-400 focus-within:shadow-xl">
          <Sparkles className="ml-3 text-blue-500" size={20} />
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe what you want to build..."
            disabled={disabled}
            className="flex-1 px-2 py-3 text-slate-900 placeholder-slate-400 outline-none disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || disabled}
            className="px-5 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl font-medium transition-all duration-200 hover:from-blue-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-md hover:shadow-lg"
          >
            <span>Generate Plan</span>
            <Send size={16} />
          </button>
        </div>
      </form>

      <div className="flex flex-wrap gap-2 justify-center">
        {suggestions.map((suggestion, idx) => (
          <button
            key={idx}
            onClick={() => !disabled && onSubmit(suggestion)}
            disabled={disabled}
            className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-slate-200 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}
