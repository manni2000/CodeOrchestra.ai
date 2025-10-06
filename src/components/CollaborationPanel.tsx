import { useState } from 'react';
import { Users, MessageCircle, Share2, Clock, CheckCircle2 } from 'lucide-react';

interface Collaborator {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline';
  currentPhase?: string;
}

interface Activity {
  id: string;
  user: string;
  action: string;
  timestamp: Date;
  type: 'edit' | 'verify' | 'comment' | 'complete';
}

export function CollaborationPanel() {
  const [collaborators] = useState<Collaborator[]>([
    { id: '1', name: 'Sarah Chen', avatar: 'SC', status: 'online', currentPhase: 'Phase 2' },
    { id: '2', name: 'Mike Johnson', avatar: 'MJ', status: 'online', currentPhase: 'Phase 1' },
    { id: '3', name: 'Lisa Park', avatar: 'LP', status: 'offline' },
  ]);

  const [activities] = useState<Activity[]>([
    { id: '1', user: 'Sarah Chen', action: 'verified auth.ts', timestamp: new Date(Date.now() - 120000), type: 'verify' },
    { id: '2', user: 'Mike Johnson', action: 'completed Phase 1', timestamp: new Date(Date.now() - 300000), type: 'complete' },
    { id: '3', user: 'Lisa Park', action: 'added comment on LoginForm.tsx', timestamp: new Date(Date.now() - 600000), type: 'comment' },
    { id: '4', user: 'Sarah Chen', action: 'edited Phase 2 description', timestamp: new Date(Date.now() - 900000), type: 'edit' },
  ]);

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'verify':
        return <CheckCircle2 className="text-green-500" size={16} />;
      case 'complete':
        return <CheckCircle2 className="text-blue-500" size={16} />;
      case 'comment':
        return <MessageCircle className="text-purple-500" size={16} />;
      case 'edit':
        return <Share2 className="text-orange-500" size={16} />;
    }
  };

  const formatTimestamp = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / 60000);
    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-purple-50 p-2 rounded-lg">
          <Users className="text-purple-600" size={24} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">Team Collaboration</h3>
          <p className="text-sm text-slate-600">Real-time activity and presence</p>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-semibold text-slate-700 mb-3">Active Collaborators</h4>
          <div className="space-y-2">
            {collaborators.map((collaborator) => (
              <div
                key={collaborator.id}
                className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
              >
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
                    {collaborator.avatar}
                  </div>
                  <div
                    className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${
                      collaborator.status === 'online' ? 'bg-green-500' : 'bg-slate-400'
                    }`}
                  />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-slate-900 text-sm">{collaborator.name}</div>
                  {collaborator.currentPhase && (
                    <div className="text-xs text-slate-500">Working on {collaborator.currentPhase}</div>
                  )}
                </div>
                {collaborator.status === 'online' && (
                  <button className="p-2 hover:bg-white rounded-lg transition-colors">
                    <MessageCircle size={16} className="text-slate-400" />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-slate-700 mb-3">Recent Activity</h4>
          <div className="space-y-2">
            {activities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors group"
              >
                <div className="flex-shrink-0 mt-0.5">{getActivityIcon(activity.type)}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm text-slate-900">
                    <span className="font-medium">{activity.user}</span>{' '}
                    <span className="text-slate-600">{activity.action}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
                    <Clock size={12} />
                    {formatTimestamp(activity.timestamp)}
                  </div>
                </div>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-white rounded">
                  <Share2 size={14} className="text-slate-400" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <button className="w-full py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2">
          <Users size={18} />
          Invite Team Members
        </button>
      </div>
    </div>
  );
}
