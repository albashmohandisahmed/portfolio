type PageVideoShellProps = {
  children: React.ReactNode;
  className?: string;
  poster: string;
  video: string;
};

export function PageVideoShell({ children, className = "", poster, video }: PageVideoShellProps) {
  return (
    <div className={`page-video-shell ${className}`}>
      <div className="page-video-background" aria-hidden="true">
        <video className="page-video-media" autoPlay muted loop playsInline preload="metadata" poster={poster}>
          <source src={video} type="video/mp4" />
        </video>
        <div className="page-video-scrim" />
      </div>
      <div className="page-video-content">{children}</div>
    </div>
  );
}
