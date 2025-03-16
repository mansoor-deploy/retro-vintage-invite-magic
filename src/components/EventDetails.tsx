
import { MapPin, Calendar, Clock, User } from 'lucide-react';
import { eventData } from '@/lib/data';
import { useIntersectionObserver } from '@/lib/animations';
import { cn } from '@/lib/utils';

const EventDetails = () => {
  const [ref, isIntersecting] = useIntersectionObserver({
    threshold: 0.3,
    rootMargin: '0px 0px -100px 0px',
  });

  const eventDate = new Date(eventData.date);
  
  const details = [
    {
      icon: <Calendar className="w-6 h-6 text-retro-magenta" />,
      title: "Date",
      content: eventDate.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric',
        month: 'long', 
        day: 'numeric'
      })
    },
    {
      icon: <Clock className="w-6 h-6 text-retro-magenta" />,
      title: "Time",
      content: eventDate.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit'
      })
    },
    {
      icon: <MapPin className="w-6 h-6 text-retro-magenta" />,
      title: "Venue",
      content: (
        <div>
          <div>{eventData.venue.name}</div>
          <div className="text-sm text-retro-navy/70">{eventData.venue.address}</div>
          <a 
            href={eventData.venue.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-retro-teal hover:underline inline-block mt-1"
          >
            View on Google Maps
          </a>
        </div>
      )
    },
    {
      icon: <User className="w-6 h-6 text-retro-magenta" />,
      title: "Dress Code",
      content: eventData.dress
    }
  ];

  return (
    <section 
      id="details" 
      ref={ref as React.RefObject<HTMLDivElement>}
      className="section-padding bg-retro-cream relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-64 h-64 bg-retro-yellow/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-retro-teal/20 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-retro-navy">
            Event Details
          </h2>
          <p className="text-retro-navy/70">
            Everything you need to know about the celebration
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {details.map((detail, index) => (
            <div 
              key={detail.title}
              className={cn(
                "retro-card flex flex-col items-center text-center p-6",
                isIntersecting && "animate-slide-up",
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="mb-4 rounded-full bg-retro-magenta/10 p-3">
                {detail.icon}
              </div>
              <h3 className="font-display font-bold text-xl mb-2 text-retro-navy">
                {detail.title}
              </h3>
              <div className="text-retro-navy/80">
                {detail.content}
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 bg-white p-6 md:p-8 rounded-lg shadow-md border border-retro-magenta/10">
          <div className="text-center mb-6">
            <h3 className="font-display font-bold text-2xl mb-2 text-retro-navy">
              Contact Information
            </h3>
            <p className="text-retro-navy/70">
              For any questions or special arrangements
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="font-medium text-retro-navy">Contact Person</div>
              <div className="text-retro-navy/70">{eventData.contact.name}</div>
            </div>
            <div>
              <div className="font-medium text-retro-navy">Phone</div>
              <div className="text-retro-navy/70">{eventData.contact.phone}</div>
            </div>
            <div>
              <div className="font-medium text-retro-navy">Email</div>
              <div className="text-retro-navy/70">{eventData.contact.email}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventDetails;
