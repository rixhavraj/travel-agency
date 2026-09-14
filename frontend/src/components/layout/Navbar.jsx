import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { FiArrowUpRight } from 'react-icons/fi';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Destinations', path: '/destinations' },
  { name: 'Packages', path: '/packages' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* Top Bar for Contact Info */}
      <div className={`hidden md:block w-full bg-gray-900 text-white/90 text-xs py-2 transition-all duration-300 ${scrolled ? 'h-0 opacity-0 overflow-hidden py-0' : 'h-auto opacity-100'}`}>
        <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <FaPhoneAlt className="text-accent" /> +91 123456789
            </span>
            <span className="flex items-center gap-2">
              <FaEnvelope className="text-accent" /> info@radhaswami.com
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-accent" /> Chhatisghar
          </div>
        </div>
      </div>

      <header
        className={`fixed left-0 w-full z-50 transition-all duration-300 ease-in-out ${scrolled
          ? 'top-0 bg-primary/95 backdrop-blur-md shadow-lg py-3 md:py-4'
          : 'top-0 md:top-8 bg-primary/30 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none py-3 md:py-4'
          }`}
      >
        <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 z-50 relative">
            <img src="/pragati-trails-logo.jpeg" alt="Pragati Trails Logo" className="h-12 w-auto object-contain bg-white rounded-full p-0.5 shadow-md" />
            <span className={`text-2xl font-heading font-bold hidden sm:block ${
              scrolled ? 'text-white' : (location.pathname === '/contact' || location.pathname === '/book' || location.pathname.startsWith('/search') ? 'text-primary drop-shadow-sm' : 'text-white drop-shadow-md')
            }`}>
              Radha Swami Travels<span className="text-accent"></span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <ul className="flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path || (link.path !== '/' && location.pathname.startsWith(link.path));
                return (
                  <li key={link.name} className="relative">
                    <Link
                      to={link.path}
                      className={`text-sm font-medium hover:text-accent transition-colors pb-1 ${
                        scrolled ? 'text-white/90' : (location.pathname === '/contact' || location.pathname === '/book' || location.pathname.startsWith('/search') ? 'text-primary font-bold drop-shadow-sm' : 'text-white/90 drop-shadow-md')
                      } ${isActive ? 'text-accent border-b-2 border-accent' : ''}`}
                    >
                      {link.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Link to="/book">
              <button className="bg-accent hover:bg-accent/90 text-white font-bold px-6 py-2.5 rounded-full transition-all hover:shadow-lg hover:-translate-y-0.5 cursor-pointer">
                Book Now
              </button>
            </Link>
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
            className="lg:hidden z-50 relative flex h-11 w-11 items-center justify-center rounded-xl bg-primary/80 backdrop-blur-md cursor-pointer transition-colors hover:bg-primary"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="relative flex h-5 w-6 flex-col items-end justify-center gap-1.5">
              <span className={`block h-0.5 rounded-full bg-white transition-all duration-300 ${mobileMenuOpen ? 'absolute w-6 rotate-45' : 'w-6'}`} />
              <span className={`block h-0.5 rounded-full bg-white transition-all duration-300 ${mobileMenuOpen ? 'scale-0 opacity-0' : 'w-4'}`} />
              <span className={`block h-0.5 rounded-full bg-white transition-all duration-300 ${mobileMenuOpen ? 'absolute w-6 -rotate-45' : 'w-5'}`} />
            </span>
          </button>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-black/45 backdrop-blur-[2px]"
            onClick={() => setMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              onClick={(event) => event.stopPropagation()}
              className="absolute right-0 top-0 flex min-h-[100svh] w-[min(88vw,390px)] flex-col justify-start bg-primary px-5 pb-24 pt-28 shadow-2xl sm:w-[min(78vw,420px)]"
            >
            <ul className="flex w-full flex-col items-center gap-1">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.18 + i * 0.08, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full"
                >
                  <Link
                    to={link.path}
                    className={`group relative flex min-h-[4.25rem] w-full items-center rounded-2xl px-5 font-heading transition-all duration-300 ${location.pathname === link.path ? 'bg-white/10 text-accent' : 'text-white/90 hover:bg-white/[0.06] hover:text-white'}`}
                  >
                    <span className="text-[1.65rem] leading-none">{link.name}</span>
                    <FiArrowUpRight className={`ml-auto text-xl transition-all duration-300 ${location.pathname === link.path ? 'translate-x-0 -translate-y-0 text-accent opacity-100' : '-translate-x-2 translate-y-2 text-white/40 opacity-0 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100'}`} />
                    {location.pathname === link.path && (
                      <motion.span layoutId="mobile-active-route" className="absolute left-0 h-8 w-1 rounded-full bg-accent" transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
                    )}
                  </Link>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + navLinks.length * 0.1 }}
                className="mt-4"
              >
                <Link to="/book" onClick={() => setMobileMenuOpen(false)}>
                  <button className="bg-accent text-white font-bold px-8 py-3 rounded-full text-lg hover:bg-accent/90 transition-colors cursor-pointer">
                    Book Now
                  </button>
                </Link>
              </motion.li>
            </ul>
            <div className="absolute bottom-8 left-0 right-0 text-center text-xs font-medium tracking-[0.18em] text-white/35">
              PLAN YOUR NEXT JOURNEY
            </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
