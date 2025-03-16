
import { useState } from 'react';
import { X } from 'lucide-react';
import { eventData } from '@/lib/data';
import { useIntersectionObserver } from '@/lib/animations';
import { cn } from '@/lib/utils';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [ref, isIntersecting] = useIntersectionObserver({
    threshold: 0.2,
  });

  const openLightbox = (src: string) => {
    setSelectedImage(src);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = '';
  };

  return (
    <section 
      id="gallery" 
      ref={ref as React.RefObject<HTMLDivElement>}
      className="section-padding bg-white relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 w-full h-20 bg-retro-lines bg-repeat-x"></div>
      
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-retro-navy">
            Gallery
          </h2>
          <p className="text-retro-navy/70">
            Memories from past celebrations
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {eventData.gallery.map((image, index) => (
            <div 
              key={image.id}
              className={cn(
                "group relative overflow-hidden rounded-lg shadow-md cursor-pointer transform transition-all duration-300 hover:-translate-y-2 hover:shadow-lg",
                isIntersecting && "animate-scale-up",
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => openLightbox(image.src)}
            >
              <div className="absolute inset-0 bg-retro-magenta/20 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent text-white translate-y-10 group-hover:translate-y-0 transition-transform z-20">
                <p className="font-medium">{image.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button 
            className="absolute top-4 right-4 text-white hover:text-retro-magenta transition-colors"
            onClick={closeLightbox}
          >
            <X size={32} />
          </button>
          <img 
            src={selectedImage} 
            alt="Full size preview" 
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl animate-scale-up"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};

export default Gallery;
