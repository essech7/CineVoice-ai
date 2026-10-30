import React from 'react';
import { CineVoiceJob } from '../types/cinevoice';
import { BarChart3, TrendingUp, Users, Globe, Share2, Award, Zap } from 'lucide-react';

interface AnalyticsViewProps {
  job: CineVoiceJob;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ job }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">
          Global Distribution & Marketability Analytics
        </h1>
        <p className="text-slate-400 text-sm">
          Audience sentiment prediction, retention optimization, and demographic targeting for TikTok, Instagram Reels, and YouTube Shorts.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Score Card */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Marketability Score</span>
            <div className="text-4xl font-black text-cyan-400 mt-2 font-mono">{job.marketability_score} / 100</div>
            <span className="text-xs text-emerald-400 font-medium mt-1 flex items-center space-x-1">
              <TrendingUp className="w-3.5 h-3.5 inline" />
              <span>Top 3% viral potential</span>
            </span>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
            <Award className="w-7 h-7" />
          </div>
        </div>

        {/* Retention Card */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Retention Prediction</span>
            <div className="text-xl font-bold text-white mt-2">{job.retention_prediction}</div>
            <span className="text-xs text-slate-400 mt-1 block">3.5s cut rhythm active</span>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Zap className="w-7 h-7" />
          </div>
        </div>

        {/* Episodes Count Card */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Generated Series Pack</span>
            <div className="text-4xl font-black text-fuchsia-400 mt-2 font-mono">{job.episodes_count} Episodes</div>
            <span className="text-xs text-slate-400 mt-1 block">Ready for CDN distribution</span>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-fuchsia-500/10 border border-fuchsia-500/20 flex items-center justify-center text-fuchsia-400">
            <Share2 className="w-7 h-7" />
          </div>
        </div>
      </div>

      {/* Target Demographics & Distribution Channels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm space-y-4">
          <h2 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <span>Target Demographic Optimization</span>
          </h2>
          <div className="space-y-3">
            {job.target_demographics.map((demo, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <span className="text-sm font-bold text-white">{demo}</span>
                <span className="text-xs font-mono text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded border border-cyan-500/20">
                  Tier {idx + 1} Target
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm space-y-4">
          <h2 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider flex items-center space-x-2">
            <Globe className="w-4 h-4" />
            <span>Global Distribution Platforms</span>
          </h2>
          <div className="space-y-3">
            {[
              { platform: 'TikTok Short Series', status: 'Ready to Publish', reach: '1.2M Est. Impressions' },
              { platform: 'Instagram Reels', status: 'Ready to Publish', reach: '950K Est. Impressions' },
              { platform: 'YouTube Shorts', status: 'Ready to Publish', reach: '1.8M Est. Impressions' }
            ].map((ch, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white mb-0.5">{ch.platform}</h3>
                  <span className="text-xs text-slate-400">{ch.reach}</span>
                </div>
                <span className="text-xs font-medium px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {ch.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
