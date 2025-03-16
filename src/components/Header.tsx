
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useScrollProgress } from "@/lib/animations";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const progress = useScrollProgress();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-40 transition-all duration-300",
        isScrolled ? "py-2 glass-morphism" : "py-4 bg-transparent"
      )}
    >
      <div className="relative container mx-auto px-4 flex items-center justify-between">
        <div className="text-retro-magenta font-display font-bold text-xl md:text-2xl">
          Retro Royale
        </div>

        {/* Progress bar */}
        <div className="absolute left-0 bottom-0 h-0.5 bg-retro-magenta/30 w-full">
          <div
            className="h-full bg-retro-magenta"
            style={{ width: `${progress * 100}%` }}
          ></div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {["hero", "countdown", "details", "gallery", "rsvp"].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className="text-retro-navy font-medium hover:text-retro-magenta transition-colors capitalize"
            >
              {item}
            </button>
          ))}
        </nav>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-retro-navy"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 glass-morphism py-4 animate-slide-down">
          <nav className="flex flex-col items-center space-y-4">
            {["hero", "countdown", "details", "gallery", "rsvp"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-retro-navy font-medium hover:text-retro-magenta transition-colors capitalize py-2"
              >
                {item}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
