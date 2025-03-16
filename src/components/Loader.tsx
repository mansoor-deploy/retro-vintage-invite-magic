
import { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const Loader = ({ onLoadComplete }: { onLoadComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + 4;
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onLoadComplete();
          }, 300);
          return 100;
        }
        return newProgress;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onLoadComplete]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-retro-cream z-50">
      <div className="relative w-24 h-24 mb-8">
        <Loader2 
          size={96} 
          className="text-retro-magenta animate-spin absolute" 
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-retro-navy font-display text-xl font-semibold">
            {progress}%
          </span>
        </div>
      </div>
      
      <div className="w-64 h-2 bg-retro-navy/10 rounded-full overflow-hidden mb-8">
        <div 
          className="h-full bg-retro-gradient transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <h2 
        className={cn(
          "text-center text-retro-navy font-display text-2xl",
          "mb-2 animate-pulse-soft"
        )}
      >
        Crafting Magic Moments
      </h2>
      <p className="text-retro-navy/70 text-center max-w-xs">
        Preparing a special retro celebration just for you...
      </p>
    </div>
  );
};

export default Loader;
