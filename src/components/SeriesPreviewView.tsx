import React, { useState, useEffect } from 'react';
import { CineVoiceJob, Episode } from '../types/cinevoice';
import { Play, Pause, Download, RotateCcw, Film, Layers, CheckCircle2, Copy, Sparkles, FileCode } from 'lucide-react';

interface SeriesPreviewViewProps {
  job: CineVoiceJob;
}

export const SeriesPreviewView: React.FC<SeriesPreviewViewProps> = ({ job }) => {
  const [selectedEpisodeIndex, setSelectedEpisodeIndex] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'preview' | 'scenes' | 'subtitles' | 'json'>('preview');
  const [copied, setCopied] = useState<boolean>(false);

  const currentEpisode: Episode = job.series[selectedEpisodeIndex] || job.series[0];

  useEffect(() => {
    let timer: any = null;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= currentEpisode.duration_sec) {
            setIsPlaying(false);
            return 0;
          }
          return Number((prev + 0.5).toFixed(1));
        });
      }, 500);
    }
    return () => clearInterval(timer);
  }, [isPlaying, currentEpisode.duration_sec]);

  // Find active scene based on currentTime
  const activeScene = currentEpisode.scenes.find(
    s => currentTime >= s.start_sec && currentTime <= s.end_sec
  ) || currentEpisode.scenes[0];

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(job, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFile = (filename: string, content: string, type: string) => {
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <div className="flex items-center space-x-2 text-cyan-400 text-xs font-semibold mb-1">
            <span className="px-2 py-0.5 rounded bg-cyan-500/20 font-mono">Job ID: {job.job_id}</span>
            <span>•</span>
            <span>Style: {job.visual_style}</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">{job.audio_title}</h1>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => handleDownloadFile(`${job.job_id}_shotlist.json`, JSON.stringify(job, null, 2), 'application/json')}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center space-x-2 border border-slate-700 transition-all"
          >
            <Download className="w-4 h-4 text-cyan-400" />
            <span>Download JSON Payload</span>
          </button>
          <button
            onClick={() => handleDownloadFile(`${job.job_id}_subtitles.ass`, currentEpisode.subtitle_ass, 'text/plain')}
            className="px-4 py-2 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-200 text-xs font-semibold flex items-center space-x-2 border border-cyan-500/30 transition-all"
          >
            <FileCode className="w-4 h-4 text-cyan-400" />
            <span>Download .ASS Subtitles</span>
          </button>
        </div>
      </div>

      {/* Episode Selector Tabs */}
      <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
        {job.series.map((ep, idx) => (
          <button
            key={ep.episode_index}
            onClick={() => {
              setSelectedEpisodeIndex(idx);
              setCurrentTime(0);
              setIsPlaying(false);
            }}
            className={`px-5 py-3 rounded-xl font-semibold text-xs transition-all flex items-center space-x-3 whitespace-nowrap ${
              selectedEpisodeIndex === idx
                ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-lg shadow-cyan-500/20'
                : 'bg-slate-900/60 border border-slate-800 text-slate-400 hover:bg-slate-800'
            }`}
          >
            <span className="w-6 h-6 rounded-lg bg-black/30 flex items-center justify-center font-mono">
              {ep.episode_index}
            </span>
            <div className="text-left">
              <div className="font-bold">{ep.title}</div>
              <div className="text-[10px] opacity-75">{ep.duration_sec}s • {ep.scenes.length} scenes</div>
            </div>
          </button>
        ))}
      </div>

      {/* Main Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: 9:16 Vertical Video Player Simulator */}
        <div className="lg:col-span-5 flex flex-col items-center">
          <div className="bg-slate-950 border-4 border-slate-800 rounded-3xl p-3 shadow-2xl relative w-full max-w-[320px] aspect-[9/16] flex flex-col justify-between overflow-hidden group">
            {/* Video Background Keyframe */}
            <div className="absolute inset-0 z-0">
              <img
                src={activeScene?.image_url || currentEpisode.thumbnail_url}
                alt="Scene Keyframe"
                className="w-full h-full object-cover transition-all duration-500 transform scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/40"></div>
            </div>

            {/* Top Bar inside player */}
            <div className="relative z-10 flex justify-between items-center px-4 pt-3">
              <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-bold text-cyan-300 border border-cyan-500/30">
                9:16 Vertical • Scene {activeScene?.scene_index}/{currentEpisode.scenes.length}
              </span>
              <span className="text-xs font-mono text-white font-bold bg-black/60 px-2 py-0.5 rounded backdrop-blur-md">
                {currentTime.toFixed(1)}s / {currentEpisode.duration_sec}s
              </span>
            </div>

            {/* Center Play Button Overlay when paused */}
            {!isPlaying && (
              <div
                onClick={() => setIsPlaying(true)}
                className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 cursor-pointer backdrop-blur-xs group-hover:bg-black/20 transition-all"
              >
                <div className="w-16 h-16 rounded-full bg-cyan-500 flex items-center justify-center text-white shadow-lg shadow-cyan-500/50 transform group-hover:scale-110 transition-all">
                  <Play className="w-8 h-8 fill-current ml-1" />
                </div>
              </div>
            )}

            {/* Karaoke Subtitle Overlay (Bottom Third) */}
            <div className="relative z-10 p-6 text-center">
              <div className="inline-block bg-black/70 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 max-w-full">
                <p className="text-sm md:text-base font-black tracking-wide text-yellow-300 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                  {activeScene?.key_keywords?.join(' ') || currentEpisode.title}
                </p>
                <p className="text-[11px] text-emerald-300 font-mono mt-0.5">
                  Karaoke Style Active (3.5s cut)
                </p>
              </div>
            </div>

            {/* Player Controls Bar */}
            <div className="relative z-10 bg-black/80 backdrop-blur-md p-3 rounded-2xl flex items-center justify-between border border-white/10">
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-9 h-9 rounded-xl bg-cyan-500 text-white flex items-center justify-center hover:opacity-90 transition-all"
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
              </button>

              <div className="flex-1 mx-3">
                <input
                  type="range"
                  min="0"
                  max={currentEpisode.duration_sec}
                  step="0.5"
                  value={currentTime}
                  onChange={e => setCurrentTime(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              <button
                onClick={() => {
                  setCurrentTime(0);
                  setIsPlaying(false);
                }}
                className="w-9 h-9 rounded-xl bg-slate-800 text-slate-300 flex items-center justify-center hover:bg-slate-700 transition-all"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right: Inspector Tabs (Scenes, Subtitles, JSON) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
            <div className="flex items-center space-x-2 border-b border-slate-800 pb-4 mb-4">
              <button
                onClick={() => setActiveTab('preview')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'preview'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Episode Summary
              </button>
              <button
                onClick={() => setActiveTab('scenes')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'scenes'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Scene Breakdown ({currentEpisode.scenes.length})
              </button>
              <button
                onClick={() => setActiveTab('subtitles')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'subtitles'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                .ASS Subtitles
              </button>
              <button
                onClick={() => setActiveTab('json')}
                className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
                  activeTab === 'json'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Full JSON Payload
              </button>
            </div>

            {activeTab === 'preview' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">{currentEpisode.title}</h3>
                  <p className="text-slate-300 text-sm">{currentEpisode.summary}</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 pt-4 border-t border-slate-800">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <span className="block text-xs text-slate-400 mb-1">Duration</span>
                    <span className="text-lg font-bold text-cyan-400 font-mono">{currentEpisode.duration_sec}s</span>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <span className="block text-xs text-slate-400 mb-1">Scene Cuts</span>
                    <span className="text-lg font-bold text-emerald-400 font-mono">{currentEpisode.scenes.length} plans</span>
                  </div>
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <span className="block text-xs text-slate-400 mb-1">Visual Style</span>
                    <span className="text-xs font-bold text-fuchsia-400 font-mono uppercase">{job.visual_style}</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'scenes' && (
              <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                {currentEpisode.scenes.map(scene => (
                  <div
                    key={scene.scene_index}
                    onClick={() => setCurrentTime(scene.start_sec)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all flex items-start space-x-4 ${
                      currentTime >= scene.start_sec && currentTime <= scene.end_sec
                        ? 'bg-cyan-500/10 border-cyan-500 shadow-md'
                        : 'bg-slate-950/50 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <img
                      src={scene.image_url}
                      alt={`Scene ${scene.scene_index}`}
                      className="w-16 h-24 object-cover rounded-lg border border-slate-800 shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-cyan-400">Scene {scene.scene_index}</span>
                        <span className="text-xs font-mono text-slate-400">{scene.start_sec}s - {scene.end_sec}s</span>
                      </div>
                      <p className="text-xs text-slate-300 font-mono mb-2 line-clamp-2">{scene.visual_prompt}</p>
                      <div className="flex flex-wrap gap-1">
                        {scene.key_keywords.map((kw, kidx) => (
                          <span key={kidx} className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/20 font-mono">
                            {kw}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'subtitles' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Karaoke .ASS Subtitle File Format</span>
                  <button
                    onClick={() => handleDownloadFile(`${job.job_id}_subtitles.ass`, currentEpisode.subtitle_ass, 'text/plain')}
                    className="text-xs text-cyan-400 hover:underline flex items-center space-x-1"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download .ASS</span>
                  </button>
                </div>
                <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-cyan-300 font-mono overflow-x-auto max-h-[350px]">
                  {currentEpisode.subtitle_ass}
                </pre>
              </div>
            )}

            {activeTab === 'json' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400">Complete Job & Shot List JSON Payload</span>
                  <button
                    onClick={handleCopyJson}
                    className="text-xs text-cyan-400 hover:underline flex items-center space-x-1"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    <span>{copied ? 'Copied!' : 'Copy JSON'}</span>
                  </button>
                </div>
                <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs text-cyan-300 font-mono overflow-x-auto max-h-[350px]">
                  {JSON.stringify(job, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
