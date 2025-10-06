import { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Bot, User, Sparkles, X } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AIChatPanelProps {
  taskTitle: string;
  onSuggestionApply: (suggestion: string) => void;
}

export function AIChatPanel({ taskTitle, onSuggestionApply }: AIChatPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `I'm here to help you refine the plan for "${taskTitle}". You can ask me to:\n\n• Add or remove phases\n• Modify file changes\n• Explain implementation details\n• Suggest optimizations\n• Add error handling or testing\n\nWhat would you like to adjust?`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInput('');

    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: generateAIResponse(input),
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 800);
  };

  const generateAIResponse = (userInput: string): string => {
    const lower = userInput.toLowerCase();

    if (lower.includes('test') || lower.includes('testing')) {
      return 'Great idea! I recommend adding a new phase:\n\n**Phase: Testing & Quality Assurance**\n- Add unit tests for core functionality\n- Create integration tests\n- Set up CI/CD pipeline\n- Add E2E tests with Playwright\n\nWould you like me to add this phase to your plan?';
    }

    if (lower.includes('error') || lower.includes('validation')) {
      return 'Adding robust error handling is crucial. I suggest:\n\n1. Create a centralized error handler\n2. Add input validation for all forms\n3. Implement user-friendly error messages\n4. Add error boundary components\n5. Set up error logging service\n\nShall I add these file changes to the relevant phases?';
    }

    if (lower.includes('security') || lower.includes('secure')) {
      return 'Security should be a priority. Here are my recommendations:\n\n• Add rate limiting middleware\n• Implement CSRF protection\n• Set up input sanitization\n• Add authentication middleware\n• Configure security headers\n\nI can create a new "Security Hardening" phase for these changes.';
    }

    if (lower.includes('performance') || lower.includes('optimize')) {
      return 'For better performance, consider:\n\n• Add lazy loading for routes\n• Implement code splitting\n• Set up caching strategy\n• Optimize bundle size\n• Add performance monitoring\n\nWould you like me to integrate these optimizations into your phases?';
    }

    return `I understand you want to refine the plan. Based on your request, I can help you:\n\n• Adjust phase ordering and dependencies\n• Add missing implementation details\n• Include best practices\n• Add documentation steps\n\nCould you provide more specifics about what you'd like to change?`;
  };

  const quickActions: string[] = [
    'Add testing phase',
    'Include error handling',
    'Add security measures',
    'Optimize performance',
  ];

  return (
    <>
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-full shadow-2xl z-50 hover:scale-110 transition-transform"
        >
          <Bot size={28} />
        </button>
      ) : (
        <div className="fixed bottom-6 right-6 w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col z-50 animate-slide-up" style={{ maxHeight: 'calc(100vh - 4.5rem)' }}>
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-lg">
                <Bot size={20} />
              </div>
              <div>
                <h3 className="font-semibold">AI Plan Assistant</h3>
                <p className="text-xs text-white/80">Ask me anything about your plan</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 p-2 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div
                  className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                    message.role === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gradient-to-br from-purple-500 to-blue-500 text-white'
                  }`}
                >
                  {message.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                </div>
                <div
                  className={`flex-1 ${
                    message.role === 'user'
                      ? 'bg-blue-500 text-white rounded-2xl rounded-tr-none'
                      : 'bg-slate-100 text-slate-900 rounded-2xl rounded-tl-none'
                  } px-4 py-3`}
                >
                  <p className="text-sm whitespace-pre-line leading-relaxed">{message.content}</p>
                  <span
                    className={`text-xs mt-1 block ${
                      message.role === 'user' ? 'text-white/70' : 'text-slate-500'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 border-t border-slate-200 space-y-3">
            <div className="flex flex-wrap gap-2">
              {quickActions.map((action, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setInput(action);
                    setTimeout(() => handleSend(), 100);
                  }}
                  className="px-3 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium hover:bg-slate-200 transition-colors"
                >
                  {action}
                </button>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask to refine the plan..."
                className="flex-1 px-4 py-2 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
