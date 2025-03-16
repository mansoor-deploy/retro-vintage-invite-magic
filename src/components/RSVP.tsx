
import { useState } from 'react';
import { Check, X } from 'lucide-react';
import { useIntersectionObserver } from '@/lib/animations';
import { eventData } from '@/lib/data';
import { cn } from '@/lib/utils';

const RSVP = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [attending, setAttending] = useState<string>('');
  const [guests, setGuests] = useState('0');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  
  const [ref, isIntersecting] = useIntersectionObserver({
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would submit to a backend
    console.log({ name, email, attending, guests, message });
    setSubmitted(true);
    
    // Reset form
    setTimeout(() => {
      setName('');
      setEmail('');
      setAttending('');
      setGuests('0');
      setMessage('');
      setSubmitted(false);
    }, 5000);
  };

  return (
    <section 
      id="rsvp" 
      ref={ref as React.RefObject<HTMLDivElement>}
      className="section-padding bg-retro-cream relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-retro-magenta/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-retro-teal/20 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-retro-navy">
            RSVP
          </h2>
          <p className="text-retro-navy/70">
            Please let us know if you can make it by {new Date(eventData.rsvpDeadline).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
        
        <div 
          className={cn(
            "max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-6 md:p-8 border border-retro-magenta/10",
            isIntersecting && "animate-slide-up"
          )}
        >
          {submitted ? (
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-retro-teal/20 text-retro-teal mb-6">
                <Check size={32} />
              </div>
              <h3 className="text-2xl font-display font-bold text-retro-navy mb-3">
                Thank You!
              </h3>
              <p className="text-retro-navy/70">
                Your RSVP has been successfully submitted. We look forward to celebrating with you!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-retro-navy mb-1">Name</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-retro-navy/20 focus:border-retro-magenta focus:ring focus:ring-retro-magenta/20 focus:outline-none transition-colors"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-retro-navy mb-1">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2 rounded-lg border border-retro-navy/20 focus:border-retro-magenta focus:ring focus:ring-retro-magenta/20 focus:outline-none transition-colors"
                    placeholder="Your email address"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-retro-navy mb-1">Attending?</label>
                  <div className="flex space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="attending"
                        value="yes"
                        checked={attending === 'yes'}
                        onChange={() => setAttending('yes')}
                        className="text-retro-magenta focus:ring-retro-magenta/20"
                      />
                      <span className="ml-2 text-retro-navy">Yes</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="attending"
                        value="no"
                        checked={attending === 'no'}
                        onChange={() => setAttending('no')}
                        className="text-retro-magenta focus:ring-retro-magenta/20"
                      />
                      <span className="ml-2 text-retro-navy">No</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="guests" className="block text-sm font-medium text-retro-navy mb-1">Number of Guests</label>
                  <select
                    id="guests"
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-retro-navy/20 focus:border-retro-magenta focus:ring focus:ring-retro-magenta/20 focus:outline-none transition-colors"
                  >
                    <option value="0">Just me</option>
                    <option value="1">1 guest</option>
                    <option value="2">2 guests</option>
                    <option value="3">3 guests</option>
                    <option value="4">4 guests</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-retro-navy mb-1">Message (Optional)</label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-retro-navy/20 focus:border-retro-magenta focus:ring focus:ring-retro-magenta/20 focus:outline-none transition-colors"
                  placeholder="Any special requests or message for the birthday person"
                ></textarea>
              </div>
              
              <div>
                <button
                  type="submit"
                  className="w-full button-primary"
                >
                  Submit RSVP
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default RSVP;
