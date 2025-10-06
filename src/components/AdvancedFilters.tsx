import { useState } from 'react';
import { Filter, Search, X, Tag, FileCode, Clock, CheckCircle2 } from 'lucide-react';

interface AdvancedFiltersProps {
  onFilterChange: (filters: FilterState) => void;
}

export interface FilterState {
  searchQuery: string;
  status: string[];
  fileType: string[];
  tags: string[];
  timeRange: string;
}

export function AdvancedFilters({ onFilterChange }: AdvancedFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    searchQuery: '',
    status: [],
    fileType: [],
    tags: [],
    timeRange: 'all',
  });

  const statusOptions = [
    { value: 'pending', label: 'Pending', color: 'slate' },
    { value: 'active', label: 'Active', color: 'blue' },
    { value: 'completed', label: 'Completed', color: 'green' },
    { value: 'verified', label: 'Verified', color: 'emerald' },
  ];

  const fileTypeOptions = [
    { value: 'create', label: 'Create', icon: '➕' },
    { value: 'modify', label: 'Modify', icon: '✏️' },
    { value: 'delete', label: 'Delete', icon: '🗑️' },
  ];

  const tagOptions = [
    'Frontend',
    'Backend',
    'Database',
    'API',
    'Auth',
    'UI/UX',
    'Testing',
    'Security',
  ];

  const timeRangeOptions = [
    { value: 'all', label: 'All time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This week' },
    { value: 'month', label: 'This month' },
  ];

  const updateFilters = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const toggleArrayFilter = (key: 'status' | 'fileType' | 'tags', value: string) => {
    const currentArray = filters[key];
    const newArray = currentArray.includes(value)
      ? currentArray.filter(v => v !== value)
      : [...currentArray, value];
    updateFilters(key, newArray);
  };

  const clearFilters = () => {
    const clearedFilters: FilterState = {
      searchQuery: '',
      status: [],
      fileType: [],
      tags: [],
      timeRange: 'all',
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  const activeFilterCount =
    filters.status.length +
    filters.fileType.length +
    filters.tags.length +
    (filters.timeRange !== 'all' ? 1 : 0) +
    (filters.searchQuery ? 1 : 0);

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="bg-blue-50 p-2 rounded-lg">
            <Filter className="text-blue-600" size={20} />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">Filters & Search</h3>
            {activeFilterCount > 0 && (
              <p className="text-xs text-slate-600">{activeFilterCount} active filters</p>
            )}
          </div>
        </div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
        >
          {isOpen ? 'Hide' : 'Show'}
        </button>
      </div>

      <div className="relative mb-4">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        <input
          type="text"
          value={filters.searchQuery}
          onChange={(e) => updateFilters('searchQuery', e.target.value)}
          placeholder="Search phases, files, or descriptions..."
          className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
        />
      </div>

      {isOpen && (
        <div className="space-y-4 animate-slide-up">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 size={16} className="text-slate-600" />
              <label className="text-sm font-medium text-slate-700">Status</label>
            </div>
            <div className="flex flex-wrap gap-2">
              {statusOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => toggleArrayFilter('status', option.value)}
                  className={`px-3 py-1 text-xs rounded-lg border transition-all ${
                    filters.status.includes(option.value)
                      ? `bg-${option.color}-100 border-${option.color}-300 text-${option.color}-700`
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <FileCode size={16} className="text-slate-600" />
              <label className="text-sm font-medium text-slate-700">File Changes</label>
            </div>
            <div className="flex flex-wrap gap-2">
              {fileTypeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => toggleArrayFilter('fileType', option.value)}
                  className={`px-3 py-1 text-xs rounded-lg border transition-all ${
                    filters.fileType.includes(option.value)
                      ? 'bg-blue-100 border-blue-300 text-blue-700'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span className="mr-1">{option.icon}</span>
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <Tag size={16} className="text-slate-600" />
              <label className="text-sm font-medium text-slate-700">Tags</label>
            </div>
            <div className="flex flex-wrap gap-2">
              {tagOptions.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleArrayFilter('tags', tag)}
                  className={`px-3 py-1 text-xs rounded-lg border transition-all ${
                    filters.tags.includes(tag)
                      ? 'bg-purple-100 border-purple-300 text-purple-700'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2 mb-2">
              <Clock size={16} className="text-slate-600" />
              <label className="text-sm font-medium text-slate-700">Time Range</label>
            </div>
            <div className="flex gap-2">
              {timeRangeOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => updateFilters('timeRange', option.value)}
                  className={`px-3 py-1 text-xs rounded-lg border transition-all ${
                    filters.timeRange === option.value
                      ? 'bg-blue-100 border-blue-300 text-blue-700'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {activeFilterCount > 0 && (
            <button
              onClick={clearFilters}
              className="w-full py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
            >
              <X size={16} />
              Clear all filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}
