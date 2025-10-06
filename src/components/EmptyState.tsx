import { Lightbulb, Code2, Zap, Shield } from 'lucide-react';

export function EmptyState() {
  const features = [
    {
      icon: Lightbulb,
      title: 'Smart Planning',
      description: 'AI-powered analysis generates detailed implementation plans',
    },
    {
      icon: Code2,
      title: 'Phase-by-Phase',
      description: 'Break complex features into manageable, sequential phases',
    },
    {
      icon: Zap,
      title: 'File-Level Details',
      description: 'See exactly what files need to be created, modified, or deleted',
    },
    {
      icon: Shield,
      title: 'Verify & Track',
      description: 'Verify implementation against the plan to catch drift early',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto text-center space-y-12 py-12">
      <div className="space-y-4">
        <h2 className="text-4xl font-bold text-slate-900">
          Plan Before You Code
        </h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          Transform feature requests into structured, executable plans. No more agent drift,
          no more surprises. Just clean, production-ready code.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {features.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300"
            >
              <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <Icon className="text-blue-600" size={24} />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-600 leading-relaxed">{feature.description}</p>
            </div>
          );
        })}
      </div>

      <div className="bg-gradient-to-r from-blue-50 to-emerald-50 rounded-2xl p-8 border border-blue-200">
        <h3 className="font-semibold text-slate-900 mb-3">How It Works</h3>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs">1</div>
            <span className="text-slate-700">Describe your feature</span>
          </div>
          <div className="hidden md:block text-slate-400">→</div>
          <div className="flex items-center gap-2">
            <div className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs">2</div>
            <span className="text-slate-700">Review the generated plan</span>
          </div>
          <div className="hidden md:block text-slate-400">→</div>
          <div className="flex items-center gap-2">
            <div className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs">3</div>
            <span className="text-slate-700">Hand off to your coding agent</span>
          </div>
          <div className="hidden md:block text-slate-400">→</div>
          <div className="flex items-center gap-2">
            <div className="bg-blue-500 text-white w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs">4</div>
            <span className="text-slate-700">Verify implementation</span>
          </div>
        </div>
      </div>
    </div>
  );
}
