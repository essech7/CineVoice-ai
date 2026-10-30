import React, { useState } from 'react';
import { Terminal, Send, CheckCircle2, Code, Copy, Play } from 'lucide-react';

export const ApiPlaygroundView: React.FC = () => {
  const [requestBody, setRequestBody] = useState<string>(JSON.stringify({
    visual_style: "cinematic_photorealistic",
    aspect_ratio: "9:16",
    max_episode_duration: 60,
    webhook_url: "https://client.com/api/callback"
  }, null, 2));

  const [responseStatus, setResponseStatus] = useState<number>(202);
  const [responseBody, setResponseBody] = useState<string>(JSON.stringify({
    job_id: "job_cv_982347101",
    status: "queued",
    estimated_processing_time_sec: 180,
    created_at: "2026-10-30T14:00:00Z"
  }, null, 2));

  const [loading, setLoading] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const handleTestRequest = async () => {
    setLoading(true);
    setTimeout(() => {
      setResponseStatus(202);
      setResponseBody(JSON.stringify({
        job_id: `job_cv_${Math.floor(100000000 + Math.random() * 900000000)}`,
        status: "queued",
        estimated_processing_time_sec: 180,
        created_at: new Date().toISOString(),
        webhook_url: "https://client.com/api/callback"
      }, null, 2));
      setLoading(false);
    }, 600);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">
          REST API & Webhook Console
        </h1>
        <p className="text-slate-400 text-sm">
          Integrate CineVoice AI directly into your production pipelines with our asynchronous REST API (`POST /api/v1/series/generate`).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Request Panel */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-400 font-mono text-xs font-bold">POST</span>
              <span className="text-sm font-mono text-white">/api/v1/series/generate</span>
            </div>
            <span className="text-xs text-slate-400">Content-Type: multipart/form-data</span>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Request Payload (JSON / Form Data)</label>
            <textarea
              rows={10}
              value={requestBody}
              onChange={e => setRequestBody(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 text-cyan-300 font-mono text-xs focus:outline-none focus:border-cyan-500"
            />
          </div>

          <button
            onClick={handleTestRequest}
            disabled={loading}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-bold text-sm shadow-lg shadow-cyan-500/20 hover:opacity-95 transition-all flex items-center justify-center space-x-2"
          >
            {loading ? <Terminal className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-current" />}
            <span>{loading ? 'Submitting Job...' : 'Send API Request (Test Job)'}</span>
          </button>
        </div>

        {/* Response Panel */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center space-x-2">
              <span className={`px-2.5 py-1 rounded font-mono text-xs font-bold ${responseStatus === 202 ? 'bg-cyan-500/20 text-cyan-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                HTTP {responseStatus} Accepted
              </span>
            </div>
            <button
              onClick={() => {
                navigator.clipboard.writeText(responseBody);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className="text-xs text-cyan-400 hover:underline flex items-center space-x-1"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copied ? 'Copied!' : 'Copy Response'}</span>
            </button>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-400 mb-1">Response Schema (Polling / Webhook Payload)</label>
            <pre className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-cyan-300 font-mono text-xs overflow-x-auto h-[260px]">
              {responseBody}
            </pre>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-400 space-y-1">
            <span className="font-semibold text-cyan-400 block mb-1">Webhook Dispatch Notice:</span>
            Once the asynchronous Celery workers complete video rendering and subtitle overlay, a POST request is automatically dispatched to your registered `webhook_url`.
          </div>
        </div>
      </div>
    </div>
  );
};
