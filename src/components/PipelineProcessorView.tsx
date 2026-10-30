import React, { useEffect, useState } from 'react';
import { CheckCircle2, Loader2, ArrowRight, Server, Mic, Wand2, Image as ImageIcon, Film, CloudUpload } from 'lucide-react';

interface PipelineProcessorViewProps {
  onComplete: () => void;
}

export const PipelineProcessorView: React.FC<PipelineProcessorViewProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [progress, setProgress] = useState<number>(0);

  const steps = [
    { id: 1, title: '1. Ingestion', module: 'API Gateway & S3 Storage', tech: 'FastAPI / S3', desc: 'Secure reception and validation of audio payload.' },
    { id: 2, title: '2. Transcription', module: 'STT Engine', tech: 'OpenAI Whisper / Deepgram', desc: 'Word-level timestamp alignment and transcription.' },
    { id: 3, title: '3. Analyse & Script', module: 'LLM Director Orchestrator', tech: 'Claude 3.5 / GPT-4o', desc: 'Extracting hooks, slicing into autonomous episodes & JSON shot list.' },
    { id: 4, title: '4. Génération Visuelle', module: 'Asset Generation Pipeline', tech: 'Flux.1 / Kling AI', desc: 'Style seed injection and keyframe image-to-video generation.' },
    { id: 5, title: '5. Montage & Subtitles', module: 'Rendering Engine', tech: 'FFmpeg / Python MoviePy', desc: '3.5-5s cuts, audio mixing, and karaoke .ass subtitles.' },
    { id: 6, title: '6. Distribution', module: 'Delivery Layer', tech: 'AWS CloudFront CDN', desc: 'Secure video deliverables ready for TikTok, Reels & Shorts.' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => onComplete(), 800);
          return 100;
        }
        const next = prev + 3.5;
        const calculatedStep = Math.min(6, Math.floor((next / 100) * 6) + 1);
        setCurrentStep(calculatedStep);
        return next;
      });
    }, 120);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-3">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>Zero-Touch Autonomous Processing in Progress</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">
          CineVoice AI Pipeline Orchestration
        </h1>
        <p className="text-slate-400 text-sm">
          Absorbing heavy render workloads through asynchronous event-driven architecture.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-2xl mb-8">
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm font-semibold text-slate-200">Overall Job Completion</span>
          <span className="text-cyan-400 font-bold font-mono">{Math.round(progress)}%</span>
        </div>
        <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden p-0.5 border border-slate-800">
          <div
            className="h-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-fuchsia-500 rounded-full transition-all duration-200"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Steps List */}
      <div className="space-y-4">
        {steps.map(step => {
          const isFinished = currentStep > step.id || progress === 100;
          const isCurrent = currentStep === step.id && progress < 100;

          return (
            <div
              key={step.id}
              className={`p-5 rounded-xl border transition-all flex items-center justify-between ${
                isFinished
                  ? 'bg-emerald-950/20 border-emerald-500/30 text-slate-200'
                  : isCurrent
                  ? 'bg-cyan-950/30 border-cyan-500/60 shadow-lg shadow-cyan-500/10 text-white'
                  : 'bg-slate-900/40 border-slate-800/60 text-slate-500'
              }`}
            >
              <div className="flex items-center space-x-4">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm ${
                    isFinished
                      ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                      : isCurrent
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 animate-pulse'
                      : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  {isFinished ? <CheckCircle2 className="w-5 h-5" /> : isCurrent ? <Loader2 className="w-5 h-5 animate-spin" /> : step.id}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-bold text-sm">{step.title}</h3>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">
                      {step.module}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{step.desc}</p>
                </div>
              </div>

              <div className="hidden md:block text-right">
                <span className="text-xs font-mono text-cyan-300 bg-cyan-950/50 px-2.5 py-1 rounded border border-cyan-500/20">
                  {step.tech}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
