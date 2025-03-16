
import { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';
import { eventData } from '@/lib/data';
import { cn } from '@/lib/utils';

const Hero = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!titleRef.current) return;
      
      const { clientX, clientY } = e;
      const { left, top, width, height } = titleRef.current.getBoundingClientRect();
      
      const x = (clientX - left) / width - 0.5;
      const y = (clientY - top) / height - 0.5;
      
      titleRef.current.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
    };
    
    const handleMouseLeave = () => {
      if (!titleRef.current) return;
      titleRef.current.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg)`;
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const scrollToNext = () => {
    const nextSection = document.getElementById('countdown');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-retro-cream"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-retro-dots opacity-40"></div>
      <div className="absolute top-0 left-0 w-32 h-32 bg-retro-teal/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-retro-magenta/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/4 right-1/4 w-48 h-48 bg-retro-yellow/30 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 py-16 sm:py-24 relative z-10 text-center staggered-animation">
        <div className="inline-block mb-4 px-3 py-1 rounded-full bg-retro-navy/5 text-retro-navy text-sm font-medium animate-float">
          You're Invited
        </div>
        
        <h1 
          ref={titleRef}
          className={cn(
            "font-display font-bold text-5xl md:text-6xl lg:text-7xl mb-6",
            "bg-clip-text text-transparent bg-retro-gradient",
            "transition-transform duration-200 ease-out"
          )}
        >
          {eventData.birthdayPerson}'s {eventData.age}th
        </h1>
        
        <p className="text-retro-navy/80 text-lg md:text-xl max-w-2xl mx-auto mb-8">
          {eventData.message}
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="button-primary" onClick={scrollToNext}>
            View Details
          </button>
          <a
            href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventData.birthdayPerson}'s+${eventData.age}th+Birthday&dates=${new Date(eventData.date).toISOString().replace(/-|:|\.\d+/g, "")}/${new Date(new Date(eventData.date).getTime() + 3 * 60 * 60 * 1000).toISOString().replace(/-|:|\.\d+/g, "")}&details=${eventData.message}&location=${eventData.venue.address}`}
            target="_blank"
            rel="noopener noreferrer"
            className="button-secondary"
          >
            Add to Calendar
          </a>
        </div>
      </div>
      
      <button 
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-retro-navy hover:text-retro-magenta transition-colors animate-bounce-subtle"
        aria-label="Scroll to countdown"
      >
        <ArrowDown size={32} />
      </button>
    </section>
  );
};

export default Hero;
