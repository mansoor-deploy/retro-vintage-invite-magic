
import { useState, useEffect, useRef } from 'react';
import { X, Video } from 'lucide-react';
import { eventData } from '@/lib/data';
import { cn } from '@/lib/utils';
import { audioEvents } from '@/components/MusicPlayer';
import { useIsMobile } from '@/hooks/use-mobile';

const VideoMessage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenOpened, setHasBeenOpened] = useState(false);
  const [hasBeenSeen, setHasBeenSeen] = useState(false);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const isBottom = scrollPosition > documentHeight - 100;

      // Mark as seen the first time it becomes visible
      if (isBottom && !hasBeenSeen) {
        setHasBeenSeen(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hasBeenSeen]);

  const openVideo = () => {
    setIsVisible(true);
    setHasBeenOpened(true);
    // Dispatch event to notify music player to pause
    window.dispatchEvent(new Event(audioEvents.VIDEO_STARTED));
  };

  const closeVideo = () => {
    setIsVisible(false);
    // Dispatch event to notify music player that video has ended
    window.dispatchEvent(new Event(audioEvents.VIDEO_ENDED));
  };

  return (
    <>
      {hasBeenSeen && (
        <div 
          className={cn(
            "video-bubble transition-all duration-500",
            hasBeenOpened && !isVisible ? "opacity-60 hover:opacity-100" : "",
            !hasBeenOpened && hasBeenSeen ? "animate-scale-up" : "",
            "transform translate-x-1/2"
          )}
          onClick={openVideo}
          style={{ 
            left: isMobile ? '0' : '0',
            bottom: isMobile ? '16px' : '32px',
            opacity: hasBeenOpened && !isVisible ? 0.6 : 1,
            position: 'fixed',
            zIndex: 50
          }}
        >
          <Video size={24} />
        </div>
      )}

      {isVisible && (
        <div 
          ref={videoContainerRef}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm transition-all duration-300 animate-scale-up"
        >
          <div className="relative w-full max-w-3xl px-4 md:px-0 rounded-lg">
            <button 
              className="absolute -top-10 right-0 text-white hover:text-retro-magenta transition-colors"
              onClick={closeVideo}
            >
              <X size={24} />
            </button>
            <div className="aspect-video rounded-lg overflow-hidden shadow-2xl border-2 border-retro-magenta">
              <iframe 
                src={eventData.videoMessage.url}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Birthday video message"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoMessage;
