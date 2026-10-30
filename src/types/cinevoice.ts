export type VisualStyle = 'cinematic_photorealistic' | 'anime' | '3d_render' | 'minimal_flat';
export type AspectRatio = '9:16' | '16:9';
export type JobStatus = 'queued' | 'processing' | 'completed' | 'failed';

export interface Scene {
  scene_index: number;
  start_sec: number;
  end_sec: number;
  visual_prompt: string;
  key_keywords: string[];
  image_url: string;
}

export interface Episode {
  episode_index: number;
  title: string;
  duration_sec: number;
  video_url: string;
  thumbnail_url: string;
  summary: string;
  scenes: Scene[];
  subtitle_ass: string;
}

export interface CineVoiceJob {
  job_id: string;
  status: JobStatus;
  estimated_processing_time_sec: number;
  created_at: string;
  audio_title: string;
  audio_duration_sec: number;
  visual_style: VisualStyle;
  aspect_ratio: AspectRatio;
  max_episode_duration: number;
  webhook_url: string;
  episodes_count: number;
  series: Episode[];
  transcript_preview: {
    text: string;
    word_timestamps: { word: string; start: number; end: number }[];
  };
  marketability_score: number;
  target_demographics: string[];
  retention_prediction: string;
}

export interface SampleAudio {
  id: string;
  title: string;
  category: string;
  duration_sec: number;
  description: string;
  transcript: string;
}
