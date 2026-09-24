"use client";

import { useRef, useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

type PageVideoShellProps = {
  children: React.ReactNode;
  className?: string;
  poster: string;
  video: string;
};

export function PageVideoShell({ children, className = "", poster, video }: PageVideoShellProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [visible, setVisible] = useState(false);

  // Show button after a short delay so it doesn't flash on load
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 800);
    return () => clearTimeout(t);
  }, []);

  const toggle = () => {
    const vid = videoRef.current;
    if (!vid) return;
    const next = !muted;
    vid.muted = next;
    if (!next) {
      vid.volume = 0.35;
      vid.play().catch(() => {});
    }
    setMuted(next);
  };

  return (
    <div className={`page-video-shell ${className}`}>
      <div className="page-video-background" aria-hidden="true">
        <video
          ref={videoRef}
          className="page-video-media"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={poster}
        >
          <source src={video} type="video/mp4" />
        </video>
        <div className="page-video-scrim" />
      </div>

      {/* Mute / Unmute Button */}
      <button
        onClick={toggle}
        aria-label={muted ? "Unmute background video" : "Mute background video"}
        title={muted ? "Unmute" : "Mute"}
        style={{
          opacity: visible ? 1 : 0,
          transition: "opacity 0.5s ease",
        }}
        className="fixed bottom-6 right-6 z-50 group flex items-center justify-center w-11 h-11 rounded-full border border-white/20 bg-slate-900/70 backdrop-blur-xl shadow-lg hover:border-cyan-400/60 hover:bg-slate-800/80 transition-all duration-300"
      >
        {muted ? (
          <VolumeX className="h-5 w-5 text-slate-400 group-hover:text-cyan-300 transition-colors" />
        ) : (
          <Volume2 className="h-5 w-5 text-cyan-300 animate-pulse" />
        )}
        {/* Tooltip */}
        <span className="pointer-events-none absolute right-14 whitespace-nowrap rounded-lg border border-white/10 bg-slate-900/90 px-3 py-1 text-xs font-mono text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg backdrop-blur-md">
          {muted ? "Unmute video" : "Mute video"}
        </span>
      </button>

      <div className="page-video-content">{children}</div>
    </div>
  );
}
