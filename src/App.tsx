import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { AudioIngestionView } from './components/AudioIngestionView';
import { PipelineProcessorView } from './components/PipelineProcessorView';
import { SeriesPreviewView } from './components/SeriesPreviewView';
import { ApiPlaygroundView } from './components/ApiPlaygroundView';
import { AnalyticsView } from './components/AnalyticsView';
import { generateCineVoiceJob, SAMPLE_AUDIOS } from './services/cinevoiceEngine';
import { CineVoiceJob, VisualStyle, AspectRatio } from './types/cinevoice';

export default function App() {
  const [activeTab, setActiveTab] = useState<'ingest' | 'pipeline' | 'preview' | 'api' | 'analytics'>('ingest');
  const [job, setJob] = useState<CineVoiceJob | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleStartJob = async (
    title: string,
    transcript: string,
    style: VisualStyle,
    aspect: AspectRatio,
    duration: number,
    webhook: string
  ) => {
    setIsProcessing(true);
    setActiveTab('pipeline');

    try {
      const generatedJob = await generateCineVoiceJob(title, transcript, style, aspect, duration, webhook);
      setJob(generatedJob);
    } catch (err) {
      console.error('Job generation error:', err);
      // Fallback job
      const fallback = await generateCineVoiceJob(SAMPLE_AUDIOS[0].title, SAMPLE_AUDIOS[0].transcript, 'cinematic_photorealistic', '9:16', 60, webhook);
      setJob(fallback);
    }
  };

  const handlePipelineComplete = () => {
    setIsProcessing(false);
    setActiveTab('preview');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-white">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        hasJob={job !== null}
      />

      <main className="flex-1 pb-16">
        {activeTab === 'ingest' && (
          <AudioIngestionView onStartJob={handleStartJob} />
        )}

        {activeTab === 'pipeline' && (
          <PipelineProcessorView onComplete={handlePipelineComplete} />
        )}

        {activeTab === 'preview' && job && (
          <SeriesPreviewView job={job} />
        )}

        {activeTab === 'api' && (
          <ApiPlaygroundView />
        )}

        {activeTab === 'analytics' && job && (
          <AnalyticsView job={job} />
        )}
      </main>

      <footer className="bg-slate-900/50 border-t border-slate-900 py-6 text-center text-xs text-slate-500">
        <p>CineVoice AI — Zero-Touch Autonomous Audio to Video Series Platform. Powered by LLM Orchestration & Render Engine.</p>
      </footer>
    </div>
  );
}
