
import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { eventData } from '@/lib/data';
import { useIsMobile } from '@/hooks/use-mobile';

// Create a custom event system for communication between components
export const audioEvents = {
  TOGGLE_AUDIO: 'toggle-audio',
  VIDEO_STARTED: 'video-started',
  VIDEO_ENDED: 'video-ended'
};

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [wasPreviouslyPlaying, setWasPreviouslyPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    audioRef.current = new Audio(eventData.music.url);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;
    
    // Event listener for when video starts playing
    const handleVideoStart = () => {
      if (audioRef.current && isPlaying) {
        setWasPreviouslyPlaying(true);
        audioRef.current.pause();
        setIsPlaying(false);
      }
    };

    // Event listener for when video ends
    const handleVideoEnd = () => {
      if (audioRef.current && wasPreviouslyPlaying) {
        audioRef.current.play();
        setIsPlaying(true);
        setWasPreviouslyPlaying(false);
      }
    };

    window.addEventListener(audioEvents.VIDEO_STARTED, handleVideoStart);
    window.addEventListener(audioEvents.VIDEO_ENDED, handleVideoEnd);
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      window.removeEventListener(audioEvents.VIDEO_STARTED, handleVideoStart);
      window.removeEventListener(audioEvents.VIDEO_ENDED, handleVideoEnd);
    };
  }, [isPlaying, wasPreviouslyPlaying]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.error("Error playing audio:", error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className={`fixed ${isMobile ? 'bottom-4 right-4' : 'bottom-6 right-6'} z-50`}>
      <button
        onClick={togglePlay}
        className="glass-morphism rounded-full p-3 text-retro-magenta transition-all duration-300 hover:scale-105"
        aria-label={isPlaying ? "Mute background music" : "Play background music"}
      >
        {isPlaying ? (
          <Volume2 size={20} className="animate-pulse-soft" />
        ) : (
          <VolumeX size={20} />
        )}
      </button>
    </div>
  );
};

export default MusicPlayer;
