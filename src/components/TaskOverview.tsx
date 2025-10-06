import { Task } from '../types';
import { Layers, Clock, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

interface TaskOverviewProps {
  task: Task;
}

export function TaskOverview({ task }: TaskOverviewProps) {
  const getStatusBadge = () => {
    const badges = {
      planning: { text: 'Generating Plan', color: 'bg-blue-100 text-blue-700 border-blue-200', icon: Loader2 },
      ready: { text: 'Ready to Start', color: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: CheckCircle2 },
      in_progress: { text: 'In Progress', color: 'bg-orange-100 text-orange-700 border-orange-200', icon: Clock },
      verifying: { text: 'Verifying', color: 'bg-purple-100 text-purple-700 border-purple-200', icon: AlertCircle },
      completed: { text: 'Completed', color: 'bg-green-100 text-green-700 border-green-200', icon: CheckCircle2 },
    };

    const badge = badges[task.status];
    const Icon = badge.icon;

    return (
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-sm font-medium rounded-full border ${badge.color}`}>
        <Icon size={14} className={task.status === 'planning' ? 'animate-spin' : ''} />
        {badge.text}
      </span>
    );
  };

  const completedPhases = task.phases.filter(p => p.status === 'completed' || p.status === 'verified').length;
  const totalPhases = task.phases.length;
  const progress = totalPhases > 0 ? (completedPhases / totalPhases) * 100 : 0;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-3xl font-bold text-slate-900">{task.title}</h2>
            {getStatusBadge()}
          </div>
          <p className="text-slate-600 leading-relaxed">{task.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <div className="flex items-center gap-2 mb-2">
            <Layers className="text-blue-500" size={20} />
            <span className="text-sm font-medium text-slate-600">Phases</span>
          </div>
          <p className="text-2xl font-bold text-slate-900">
            {completedPhases}/{totalPhases}
          </p>
        </div>

        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="text-green-500" size={20} />
            <span className="text-sm font-medium text-slate-600">Progress</span>
          </div>
          <p className="text-2xl font-bold text-slate-900">{Math.round(progress)}%</p>
        </div>

        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="text-orange-500" size={20} />
            <span className="text-sm font-medium text-slate-600">Est. Time</span>
          </div>
          <p className="text-2xl font-bold text-slate-900">
            {task.phases.reduce((acc, p) => {
              const mins = parseInt(p.estimatedTime);
              return acc + (isNaN(mins) ? 0 : mins);
            }, 0)} mins
          </p>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="font-medium text-slate-700">Overall Progress</span>
          <span className="text-slate-600">{completedPhases} of {totalPhases} phases complete</span>
        </div>
        <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-emerald-500 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}
