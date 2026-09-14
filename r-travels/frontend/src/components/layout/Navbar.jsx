import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

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

  return (
    <>
      {/* Top Bar for Contact Info */}
      <div className={`hidden md:block w-full bg-gray-900 text-white/90 text-xs py-2 transition-all duration-300 ${scrolled ? 'h-0 opacity-0 overflow-hidden py-0' : 'h-auto opacity-100'}`}>
        <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <FaPhoneAlt className="text-accent" /> +91 95406 40023 | 82874 10265
            </span>
            <span className="flex items-center gap-2">
              <FaEnvelope className="text-accent" /> info@pragatitrails.com
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FaMapMarkerAlt className="text-accent" /> Greater Noida, Uttar Pradesh
          </div>
        </div>
      </div>

      <header
        className={`fixed left-0 w-full z-50 transition-all duration-300 ease-in-out ${scrolled
          ? 'top-0 bg-primary/95 backdrop-blur-md shadow-lg py-4'
          : 'top-8 bg-transparent py-4'
          }`}
      >
        <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 z-50 relative">
            <img src="/pragati-trails-logo.jpeg" alt="Pragati Trails Logo" className="h-12 w-auto object-contain bg-white rounded-full p-0.5 shadow-md" />
            <span className={`text-2xl font-heading font-bold hidden sm:block ${
              scrolled ? 'text-white' : (location.pathname === '/contact' || location.pathname === '/book' || location.pathname.startsWith('/search') ? 'text-primary drop-shadow-sm' : 'text-white drop-shadow-md')
            }`}>
              Pragati<span className="text-accent">Trails</span>
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
            className="lg:hidden z-50 relative text-2xl cursor-pointer"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <HiX className="text-white" />
            ) : (
              <HiMenuAlt4 className={
                scrolled ? 'text-white' : (location.pathname === '/contact' || location.pathname === '/book' || location.pathname.startsWith('/search') ? 'text-primary' : 'text-white')
              } />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-primary flex flex-col justify-center items-center h-screen"
          >
            <ul className="flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                >
                  <Link
                    to={link.path}
                    className="text-white text-3xl font-heading hover:text-accent transition-colors"
                  >
                    {link.name}
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
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
