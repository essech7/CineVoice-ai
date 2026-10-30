# Implementation Plan - CineVoice AI

CineVoice AI is an autonomous AI Director and Video Editor platform that transforms raw audio speech (up to 10 minutes) into engaging vertical video series (TikTok, Instagram Reels, YouTube Shorts) with narrative chunking, 3-5 second scene beats, visual prompting, karaoke subtitles, and structured JSON shot lists.

## Proposed Architecture & Features

### 1. Audio Ingestion & Job Configuration Studio
- **Audio Upload & Sample Library**: Upload `.mp3`, `.wav`, `.m4a` files, record microphone audio, or select high-impact sample audio sessions (e.g., Tech Keynote, Cinematic Storytelling, AI Vision Manifesto).
- **Pipeline Parameters**: Configure Visual Style (`Cinematic Photorealistic`, `Anime`, `3D Render`, `Minimal Flat`), Aspect Ratio (`9:16` vertical or `16:9`), Max Episode Duration (<60s), and Style Seed for visual consistency.

### 2. Autonomous LLM Director & Orchestrator (Pipeline)
- **Step 1: STT Transcription & Word Timestamps**: Generates word-level timestamps and structured transcripts.
- **Step 2: Narrative Slicing**: Splits transcription into 1 to N autonomous high-retention episodes.
- **Step 3: Scene Breakdown**: Divides each episode into 3-5 second visual beats with exact start/end timestamps.
- **Step 4: Visual Prompting & Style Coherence**: Generates stable image/video prompts with style seeds and constant character/theme descriptions.
- **Step 5: Dynamic Karaoke Subtitles**: Generates `.ass` subtitle structures with karaoke-style word-by-word color highlighting.

### 3. Video Rendering & Preview Studio
- **9:16 Vertical Video Player**: Interactive video player simulation with synchronized audio playback, dynamic karaoke subtitles overlay, and scene transitions every 3.5 to 5 seconds.
- **Shot List Inspector**: Full JSON and tabular breakdown of scenes, visual prompts, and duration.
- **Export Center**: Download generated video package (.mp4 simulation, .ass subtitles, and JSON payload).

### 4. REST API Playground & Webhook Simulator
- Interactive API Console for `POST /api/v1/series/generate` and polling status (`queued` -> `processing` -> `completed`), displaying webhook payloads matching the official technical spec.

### 5. Social Distribution & Analytics
- Multi-platform readiness dashboard (TikTok, Instagram Reels, YouTube Shorts) with retention rate prediction, demographic optimization, and marketability scores.

## Proposed File Structure

- `/src/types/cinevoice.ts` - Data types for jobs, episodes, scenes, transcripts, and settings.
- `/src/services/cinevoiceEngine.ts` - Simulation and Gemini API integration for transcription, narrative slicing, visual prompt generation, and JSON rendering.
- `/src/components/Navbar.tsx` - Top navigation (Dashboard, Pipeline Studio, API Console, Analytics).
- `/src/components/AudioIngestionView.tsx` - Audio upload, sample selection, and job parameter configuration.
- `/src/components/PipelineProcessorView.tsx` - Real-time processing progress (Ingestion, Transcription, LLM Orchestration, Visual Generation, Rendering).
- `/src/components/SeriesPreviewView.tsx` - Vertical video player, episode selector, karaoke subtitle preview, and asset export.
- `/src/components/ApiPlaygroundView.tsx` - REST API documentation & live testing sandbox (Section 4 spec).
- `/src/components/AnalyticsView.tsx` - Marketability score, retention metrics, and social distribution prep.
- `/server.ts` - Express backend supporting API endpoints (`/api/v1/series/generate`, `/api/v1/series/status/:id`) and Gemini API proxy.
- `/src/App.tsx` - Main container linking all views and state management.
