
import { useState, useEffect } from 'react';
import { eventData } from '@/lib/data';
import { useIntersectionObserver } from '@/lib/animations';
import { cn } from '@/lib/utils';

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

const calculateTimeLeft = (): TimeLeft => {
  const difference = new Date(eventData.date).getTime() - new Date().getTime();
  
  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }
  
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / (1000 * 60)) % 60),
    seconds: Math.floor((difference / 1000) % 60)
  };
};

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());
  const [ref, isIntersecting] = useIntersectionObserver({
    threshold: 0.3,
  });
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds }
  ];
  
  return (
    <section
      id="countdown"
      ref={ref as React.RefObject<HTMLDivElement>}
      className="section-padding bg-white relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-20 bg-retro-lines bg-repeat-x"></div>
      <div className="absolute bottom-0 left-0 w-full h-20 bg-retro-lines bg-repeat-x"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-retro-navy">
            Celebrate With Us In
          </h2>
          <p className="text-retro-navy/70">
            Mark your calendar for {new Date(eventData.date).toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })} at {new Date(eventData.date).toLocaleTimeString('en-US', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {timeUnits.map((unit, index) => (
            <div 
              key={unit.label}
              className={cn(
                "retro-card flex flex-col items-center justify-center py-6 md:py-8",
                isIntersecting && "animate-scale-up",
                isIntersecting && `animation-delay-${index * 100}`
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-4xl md:text-5xl font-display font-bold text-retro-magenta mb-2">
                {unit.value.toString().padStart(2, '0')}
              </div>
              <div className="text-retro-navy/70 font-medium">
                {unit.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Countdown;
