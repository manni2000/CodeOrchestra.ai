import { Workflow, Github } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 backdrop-blur-sm bg-white/95">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-1.5 sm:p-2 rounded-lg sm:rounded-xl shadow-lg">
              <Workflow className="text-white w-5 h-5 sm:w-7 sm:h-7" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                CodeOrchestra
              </h1>
              <p className="text-[10px] xs:text-xs text-slate-600">Spec-Driven Development Planning</p>
            </div>
          </div>

          <a
            href="https://github.com/manni2000/CodeOrchestra.ai"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-slate-100 text-slate-700 rounded-lg hover:bg-slate-200 active:bg-slate-300 transition-colors duration-200 text-xs sm:text-sm font-medium whitespace-nowrap"
            aria-label="View on GitHub"
          >
            <Github className="w-4 h-4 sm:w-[18px] sm:h-[18px]" />
            <span className="hidden xs:inline">View on GitHub</span>
            <span className="xs:hidden">GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
}
