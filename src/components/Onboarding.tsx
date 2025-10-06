import { useState, useEffect } from 'react';
import { X, ArrowRight, Sparkles, Eye, Users, Zap } from 'lucide-react';

export function Onboarding() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding');
    if (!hasSeenOnboarding) {
      setTimeout(() => setIsVisible(true), 500);
    }
  }, []);

  const steps = [
    {
      icon: Sparkles,
      title: 'Welcome to CodeOrchestra',
      description: 'A planning layer that prevents agent drift and ensures production-ready code. Let me show you around!',
      image: '🎯',
    },
    {
      icon: Eye,
      title: 'Visualize Your Plan',
      description: 'See the complete implementation broken down into phases with file-level details, dependencies, and estimated times.',
      image: '📊',
    },
    {
      icon: Zap,
      title: 'Edit & Refine',
      description: 'Plans are fully editable. Add phases, modify files, or chat with AI to refine your implementation strategy.',
      image: '✨',
    },
    {
      icon: Users,
      title: 'Collaborate & Verify',
      description: 'Work with your team, track changes in real-time, and verify each step against the plan to catch drift early.',
      image: '🤝',
    },
  ];

  const handleClose = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    setIsVisible(false);
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleClose();
    }
  };

  if (!isVisible) return null;

  const step = steps[currentStep];
  const Icon = step.icon;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[100] animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full m-6 overflow-hidden animate-slide-up">
        <div className="relative bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 p-12 text-center">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
          >
            <X className="text-white" size={20} />
          </button>
          <div className="text-7xl mb-4 animate-bounce">{step.image}</div>
          <div className="bg-white/20 backdrop-blur-sm p-3 rounded-2xl inline-block">
            <Icon className="text-white" size={32} />
          </div>
        </div>

        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-3">{step.title}</h2>
            <p className="text-slate-600 leading-relaxed">{step.description}</p>
          </div>

          <div className="flex items-center justify-center gap-2 mb-6">
            {steps.map((_, idx) => (
              <div
                key={idx}
                className={`h-2 rounded-full transition-all duration-300 ${
                  idx === currentStep
                    ? 'w-8 bg-gradient-to-r from-blue-500 to-purple-500'
                    : idx < currentStep
                    ? 'w-2 bg-green-500'
                    : 'w-2 bg-slate-300'
                }`}
              />
            ))}
          </div>

          <div className="flex gap-3">
            {currentStep > 0 && (
              <button
                onClick={() => setCurrentStep(currentStep - 1)}
                className="flex-1 px-6 py-3 bg-slate-100 text-slate-700 rounded-xl font-medium hover:bg-slate-200 transition-colors"
              >
                Back
              </button>
            )}
            <button
              onClick={handleNext}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-medium hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              {currentStep < steps.length - 1 ? (
                <>
                  Next
                  <ArrowRight size={18} />
                </>
              ) : (
                <>
                  Get Started
                  <Sparkles size={18} />
                </>
              )}
            </button>
          </div>

          <button
            onClick={handleClose}
            className="w-full mt-3 text-sm text-slate-500 hover:text-slate-700 transition-colors"
          >
            Skip tutorial
          </button>
        </div>
      </div>
    </div>
  );
}
