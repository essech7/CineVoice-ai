import React, { useState } from 'react';
import { SAMPLE_AUDIOS } from '../services/cinevoiceEngine';
import { VisualStyle, AspectRatio } from '../types/cinevoice';
import { Upload, Mic, Sparkles, Sliders, FileText, CheckCircle2 } from 'lucide-react';

interface AudioIngestionViewProps {
  onStartJob: (
    title: string,
    transcript: string,
    style: VisualStyle,
    aspect: AspectRatio,
    duration: number,
    webhook: string
  ) => void;
}

export const AudioIngestionView: React.FC<AudioIngestionViewProps> = ({ onStartJob }) => {
  const [selectedSampleId, setSelectedSampleId] = useState<string>(SAMPLE_AUDIOS[0].id);
  const [audioTitle, setAudioTitle] = useState<string>(SAMPLE_AUDIOS[0].title);
  const [transcriptText, setTranscriptText] = useState<string>(SAMPLE_AUDIOS[0].transcript);
  const [visualStyle, setVisualStyle] = useState<VisualStyle>('cinematic_photorealistic');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('9:16');
  const [maxEpisodeDuration, setMaxEpisodeDuration] = useState<number>(60);
  const [webhookUrl, setWebhookUrl] = useState<string>('https://client.com/api/callback');
  const [fileName, setFileName] = useState<string | null>(null);

  const handleSelectSample = (sampleId: string) => {
    setSelectedSampleId(sampleId);
    const sample = SAMPLE_AUDIOS.find(s => s.id === sampleId);
    if (sample) {
      setAudioTitle(sample.title);
      setTranscriptText(sample.transcript);
      setFileName(null);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      setAudioTitle(file.name.replace(/\.[^/.]+$/, ''));
      // simulate reading audio transcript
      setTranscriptText(`[Audio File Ingested: ${file.name} - Duration: ~3m 45s]\n\nPart one. Welcome to the automated transcription of ${file.name}. The audio stream has been successfully parsed and normalized by our FastAPI ingestion gateway.\n\nPart two. The LLM Director orchestrator is ready to slice this argument into high-retention episodic chunks with 3 to 5 second scene beats.`);
      setSelectedSampleId('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onStartJob(audioTitle, transcriptText, visualStyle, aspectRatio, maxEpisodeDuration, webhookUrl);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">
          Audio Ingestion & Autonomous Series Studio
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm">
          Upload raw speech audio (.mp3, .wav, .m4a) or select a sample session. CineVoice AI will automatically transcribe, slice into 60s episodes, generate visual prompts, and render dynamic vertical series.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Audio Source & Script Editor */}
        <div className="lg:col-span-2 space-y-6">
          {/* Sample Presets */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm">
            <h2 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-4 flex items-center space-x-2">
              <Sparkles className="w-4 h-4" />
              <span>1. Choose Preset Session or Upload Audio</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
              {SAMPLE_AUDIOS.map(sample => (
                <div
                  key={sample.id}
                  onClick={() => handleSelectSample(sample.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    selectedSampleId === sample.id
                      ? 'bg-cyan-500/10 border-cyan-500 text-white shadow-lg shadow-cyan-500/10'
                      : 'bg-slate-800/50 border-slate-700/60 text-slate-300 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300">
                      {sample.category}
                    </span>
                    {selectedSampleId === sample.id && <CheckCircle2 className="w-4 h-4 text-cyan-400" />}
                  </div>
                  <h3 className="font-semibold text-sm mb-1 line-clamp-1">{sample.title}</h3>
                  <p className="text-xs text-slate-400 line-clamp-2">{sample.description}</p>
                </div>
              ))}
            </div>

            {/* File Upload Box */}
            <div className="border-2 border-dashed border-slate-700 hover:border-cyan-500/50 rounded-xl p-6 text-center transition-all bg-slate-950/40 relative">
              <input
                type="file"
                accept=".mp3,.wav,.m4a,.aac"
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                  <Upload className="w-6 h-6" />
                </div>
                <p className="text-sm font-medium text-slate-200">
                  {fileName ? <span className="text-cyan-300">Loaded: {fileName}</span> : 'Drag and drop audio file or browse (.mp3, .wav, .m4a)'}
                </p>
                <p className="text-xs text-slate-500">FastAPI S3 secure storage ingestion supported (up to 10 min)</p>
              </div>
            </div>
          </div>

          {/* Title & Transcript */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm space-y-4">
            <h2 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Audio Title & Transcript Preview</span>
            </h2>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Series / Audio Title</label>
              <input
                type="text"
                value={audioTitle}
                onChange={e => setAudioTitle(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-cyan-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Raw Transcript / Speech Content</label>
              <textarea
                rows={6}
                value={transcriptText}
                onChange={e => setTranscriptText(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-4 text-white text-sm focus:outline-none focus:border-cyan-500 font-mono"
                required
              />
            </div>
          </div>
        </div>

        {/* Right Col: Parameters & Configuration */}
        <div className="space-y-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm space-y-6">
            <h2 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider flex items-center space-x-2">
              <Sliders className="w-4 h-4" />
              <span>Pipeline Parameters</span>
            </h2>

            {/* Visual Style */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2">Visual Style (Flux.1 / Midjourney / Kling AI)</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'cinematic_photorealistic', name: 'Cinematic Photo' },
                  { id: 'anime', name: 'High-End Anime' },
                  { id: '3d_render', name: '3D Render (UE5)' },
                  { id: 'minimal_flat', name: 'Minimal Flat' }
                ].map(style => (
                  <button
                    type="button"
                    key={style.id}
                    onClick={() => setVisualStyle(style.id as VisualStyle)}
                    className={`px-3 py-2.5 rounded-lg text-xs font-medium border text-left transition-all ${
                      visualStyle === style.id
                        ? 'bg-cyan-500/20 border-cyan-500 text-cyan-200 shadow-sm'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {style.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Aspect Ratio */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-2">Aspect Ratio (Social Format)</label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: '9:16', name: '9:16 Vertical (TikTok/Reels)' },
                  { id: '16:9', name: '16:9 Cinematic (YouTube)' }
                ].map(aspect => (
                  <button
                    type="button"
                    key={aspect.id}
                    onClick={() => setAspectRatio(aspect.id as AspectRatio)}
                    className={`px-3 py-2.5 rounded-lg text-xs font-medium border text-left transition-all ${
                      aspectRatio === aspect.id
                        ? 'bg-cyan-500/20 border-cyan-500 text-cyan-200 shadow-sm'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                    }`}
                  >
                    {aspect.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Max Episode Duration */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">
                Max Episode Duration: <span className="text-cyan-300 font-bold">{maxEpisodeDuration}s</span>
              </label>
              <input
                type="range"
                min="30"
                max="60"
                step="5"
                value={maxEpisodeDuration}
                onChange={e => setMaxEpisodeDuration(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
              <span className="text-[10px] text-slate-500">Guarantees high retention under 60s per spec</span>
            </div>

            {/* Webhook URL */}
            <div>
              <label className="block text-xs font-medium text-slate-400 mb-1">Webhook URL (Delivery Layer)</label>
              <input
                type="text"
                value={webhookUrl}
                onChange={e => setWebhookUrl(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white text-xs font-mono focus:outline-none focus:border-cyan-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-fuchsia-500 text-white font-bold text-sm shadow-lg shadow-cyan-500/25 hover:opacity-95 transition-all flex items-center justify-center space-x-2"
            >
              <Sparkles className="w-5 h-5" />
              <span>Launch Autonomous Pipeline</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
