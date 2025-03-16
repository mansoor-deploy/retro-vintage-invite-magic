
import { useEffect } from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Countdown from '@/components/Countdown';
import EventDetails from '@/components/EventDetails';
import Gallery from '@/components/Gallery';
import RSVP from '@/components/RSVP';
import Footer from '@/components/Footer';
import MusicPlayer from '@/components/MusicPlayer';
import VideoMessage from '@/components/VideoMessage';
import { useIntersectionObserver } from '@/lib/animations';

const Index = () => {
  useEffect(() => {
    // Set up intersection observer for fade-in animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-slide-up');
          entry.target.classList.add('opacity-100');
          // Once the animation is applied, stop observing this element
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    
    // Find all sections that should animate
    const animateSections = document.querySelectorAll('.animate-on-scroll');
    animateSections.forEach(section => {
      section.classList.add('opacity-0');
      observer.observe(section);
    });

    // Disable right-click to prevent downloading images
    const handleContextMenu = (e: MouseEvent) => {
      if ((e.target as HTMLElement).tagName === 'IMG') {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      animateSections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="min-h-screen bg-retro-cream">
      <Header />
      <MusicPlayer />
      <VideoMessage />
      
      <main>
        <Hero />
        <div className="animate-on-scroll">
          <Countdown />
        </div>
        <div className="animate-on-scroll">
          <EventDetails />
        </div>
        <div className="animate-on-scroll">
          <Gallery />
        </div>
        <div className="animate-on-scroll">
          <RSVP />
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
