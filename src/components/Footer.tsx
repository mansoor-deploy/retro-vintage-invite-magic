
import { Heart } from 'lucide-react';
import { eventData } from '@/lib/data';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-8 bg-retro-navy text-white">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <div className="font-display text-2xl font-bold mb-2 text-retro-magenta">
            Retro Royale
          </div>
          
          <p className="mb-6 text-white/70">
            Celebrating {eventData.birthdayPerson}'s {eventData.age}th Birthday
          </p>
          
          <div className="flex items-center justify-center text-white/50 text-sm">
            <span>© {currentYear} </span>
            <Heart className="mx-1 w-4 h-4 text-retro-magenta" />
            <span> Made with love</span>
          </div>
          
          <div className="mt-6">
            <a
              href="#hero"
              className="inline-block text-white/70 hover:text-white transition-colors"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Back to Top
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
