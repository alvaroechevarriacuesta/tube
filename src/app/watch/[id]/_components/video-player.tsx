'use client';

import { useRef, useState, useEffect } from 'react';
import Hls from 'hls.js';
import type { VideoModel } from '@/generated/prisma/models/Video';

type VideoPlayerProps = {
  id: string;
  video: VideoModel;
};

export function VideoPlayer({ id, video }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hlsRef = useRef<Hls | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const handlePlay = async () => {
    if (!videoRef.current) return;

    setLoading(true);
    setError('');

    try {
      const res = await fetch(`/api/video/${id}/manifest`);
      if (!res.ok) {
        const errorText = await res.text();
        setError(errorText || 'Failed to fetch manifest');
        setLoading(false);
        return;
      }

      const { url } = await res.json();
      const video = videoRef.current;

      if (Hls.isSupported()) {
        // Clean up existing Hls instance if any
        if (hlsRef.current) {
          hlsRef.current.destroy();
        }

        const hls = new Hls();
        hlsRef.current = hls;
        hls.loadSource(url);
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          setLoading(false);
          video.play();
        });

        hls.on(Hls.Events.ERROR, (event, data) => {
          if (data.fatal) {
            switch (data.type) {
              case Hls.ErrorTypes.NETWORK_ERROR:
                setError('Network error. Please try again.');
                hls.startLoad();
                break;
              case Hls.ErrorTypes.MEDIA_ERROR:
                setError('Media error. Attempting to recover...');
                hls.recoverMediaError();
                break;
              default:
                setError('Fatal error. Cannot recover.');
                hls.destroy();
                break;
            }
          }
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // Native HLS support (Safari)
        video.src = url;
        setLoading(false);
        video.play();
      } else {
        setError('HLS is not supported in this browser');
        setLoading(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load video');
      setLoading(false);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      setCurrentTime(video.currentTime);
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
    };

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('play', () => setIsPlaying(true));
    video.addEventListener('pause', () => setIsPlaying(false));

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('play', () => setIsPlaying(true));
      video.removeEventListener('pause', () => setIsPlaying(false));
    };
  }, []);

  useEffect(() => {
    // Cleanup HLS instance on unmount
    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, []);

  const formatTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
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
          id="video"
          className="w-full h-full"
          controls
          playsInline
        />
      </div>
      <div className="mt-4 space-y-2">
        {!loading && !error && (
          <button
            onClick={handlePlay}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
          >
            Play
          </button>
        )}
        {loading && <p className="text-muted-foreground">Loading…</p>}
        {error && <p className="text-destructive">{error}</p>}
        {isPlaying && duration > 0 && (
          <div className="flex items-center gap-4">
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
              {formatTime(currentTime)} /{' '}
              {formatTime(duration || video.duration)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
