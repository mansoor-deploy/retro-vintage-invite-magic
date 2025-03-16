
import { useState, useEffect } from 'react';
import { X, Video } from 'lucide-react';
import { eventData } from '@/lib/data';
import { cn } from '@/lib/utils';

const VideoMessage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [hasBeenOpened, setHasBeenOpened] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const isBottom = scrollPosition > documentHeight - 100;
      setIsAtBottom(isBottom);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const openVideo = () => {
    setIsVisible(true);
    setHasBeenOpened(true);
  };

  const closeVideo = () => {
    setIsVisible(false);
  };

  return (
    <>
      {(isAtBottom || hasBeenOpened) && (
        <div 
          className={cn(
            "video-bubble transition-all duration-500",
            hasBeenOpened && !isVisible ? "opacity-60 hover:opacity-100" : "animate-bounce-subtle"
          )}
          onClick={openVideo}
        >
          <Video size={24} />
        </div>
      )}

      {isVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm transition-all duration-300 animate-scale-up">
          <div className="relative w-full max-w-3xl rounded-lg">
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
