import React from 'react';
import { Video, Wand2, Terminal, BarChart3, Mic, Film } from 'lucide-react';

interface NavbarProps {
  activeTab: 'ingest' | 'pipeline' | 'preview' | 'api' | 'analytics';
  setActiveTab: (tab: 'ingest' | 'pipeline' | 'preview' | 'api' | 'analytics') => void;
  hasJob: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, hasJob }) => {
  return (
    <header className="bg-slate-900/90 border-b border-slate-800 sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('ingest')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-cyan-500/20">
            <Film className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
              CineVoice AI
            </span>
            <span className="block text-[10px] uppercase tracking-widest text-cyan-400 font-semibold">
              Zero-Touch Audio to Video Series
            </span>
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-1">
          <button
            onClick={() => setActiveTab('ingest')}
            className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-2 ${
              activeTab === 'ingest'
                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Mic className="w-4 h-4" />
            <span>Ingestion & Setup</span>
          </button>

          <button
            onClick={() => setActiveTab('pipeline')}
            className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-2 ${
              activeTab === 'pipeline'
                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Wand2 className="w-4 h-4" />
            <span>LLM Director & Pipeline</span>
          </button>

          <button
            onClick={() => setActiveTab('preview')}
            disabled={!hasJob}
            className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-2 ${
              !hasJob ? 'opacity-40 cursor-not-allowed' : ''
            } ${
              activeTab === 'preview'
                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Video className="w-4 h-4" />
            <span>Series Preview & Render</span>
          </button>

          <button
            onClick={() => setActiveTab('api')}
            className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-2 ${
              activeTab === 'api'
                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>REST API Console</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            disabled={!hasJob}
            className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all flex items-center space-x-2 ${
              !hasJob ? 'opacity-40 cursor-not-allowed' : ''
            } ${
              activeTab === 'analytics'
                ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Distribution Analytics</span>
          </button>
        </nav>

        <div className="flex items-center space-x-3">
          <div className="hidden lg:flex items-center space-x-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-xs font-medium text-emerald-300">Engine Online</span>
          </div>
        </div>
      </div>
    </header>
  );
};
