
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

const Index = () => {
  useEffect(() => {
    // Disable right-click to prevent downloading images
    const handleContextMenu = (e: MouseEvent) => {
      if ((e.target as HTMLElement).tagName === 'IMG') {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
    };
  }, []);

  return (
    <div className="min-h-screen bg-retro-cream">
      <Header />
      <MusicPlayer />
      <VideoMessage />
      
      <main>
        <Hero />
        <Countdown />
        <EventDetails />
        <Gallery />
        <RSVP />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
