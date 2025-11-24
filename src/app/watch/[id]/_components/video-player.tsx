"use client";

import { useRef, useState } from "react";
import type { VideoModel } from "@/generated/prisma/models/Video";

type VideoPlayerProps = {
  videoPath: string;
  video: VideoModel;
};

export function VideoPlayer({ videoPath, video }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    }
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  return (
    <div className="w-full">
      <div className="relative w-full bg-black rounded-lg overflow-hidden aspect-video">
        <video
          ref={videoRef}
          src={videoPath}
          className="w-full h-full"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          controls
          playsInline
        />
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-4">
          <button
            onClick={handlePlayPause}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? "⏸ Pause" : "▶ Play"}
          </button>
          <div className="flex-1">
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
            />
          </div>
          <span className="text-sm text-muted-foreground min-w-[80px] text-right">
            {formatTime(currentTime)} / {formatTime(duration || video.duration)}
          </span>
        </div>
      </div>
    </div>
  );
}

