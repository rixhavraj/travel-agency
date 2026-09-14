import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaMapMarkerAlt, FaCalendarDay, FaUserFriends, FaSearch } from 'react-icons/fa';

const SmartBookingWidget = () => {
  const [destination, setDestination] = useState('');
  const [days, setDays] = useState('3');
  const [travelers, setTravelers] = useState('2');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (destination.trim()) {
      navigate(`/search?q=${encodeURIComponent(destination.trim())}&days=${encodeURIComponent(days)}&travelers=${encodeURIComponent(travelers)}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="container mx-auto relative z-30">
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 sm:p-6 md:p-8 rounded-3xl shadow-[0_20px_40px_rgba(0,0,0,0.2)]"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 items-center">
          
          {/* Destination */}
          <div className="bg-white/80 hover:bg-white transition-colors rounded-2xl p-4 flex items-center gap-4 cursor-text">
            <FaMapMarkerAlt className="text-accent text-xl shrink-0" />
            <div className="flex-grow w-full">
              <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-1">Destination</label>
              <input 
                type="text" 
                placeholder="Where to?" 
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                onKeyDown={handleKeyDown}
                className="w-full bg-transparent outline-none text-primary font-semibold placeholder:text-primary/50 text-sm md:text-base" 
              />
            </div>
          </div>

          {/* Number of Days */}
          <div className="bg-white/80 hover:bg-white transition-colors rounded-2xl p-4 flex items-center gap-4 cursor-text">
            <FaCalendarDay className="text-accent text-xl shrink-0" />
            <div className="flex-grow w-full">
              <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-1">Duration</label>
              <div className="flex items-center gap-2">
                <input 
                  type="number" 
                  min="1"
                  max="30"
                  value={days}
                  onChange={(e) => setDays(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-12 bg-transparent outline-none text-primary font-semibold text-sm md:text-base border-b border-dashed border-primary/30 text-center" 
                />
                <span className="text-primary font-semibold text-sm md:text-base">Days</span>
              </div>
            </div>
          </div>

          {/* Travelers */}
          <div className="bg-white/80 hover:bg-white transition-colors rounded-2xl p-4 flex items-center gap-4 cursor-text">
            <FaUserFriends className="text-accent text-xl shrink-0" />
            <div className="flex-grow w-full">
              <label className="block text-xs font-bold text-muted uppercase tracking-wider mb-1">Travelers</label>
              <div className="flex items-center gap-2">
                <input 
                  type="number" 
                  min="1"
                  max="50"
                  value={travelers}
                  onChange={(e) => setTravelers(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="w-12 bg-transparent outline-none text-primary font-semibold text-sm md:text-base border-b border-dashed border-primary/30 text-center" 
                />
                <span className="text-primary font-semibold text-sm md:text-base">Guests</span>
              </div>
            </div>
          </div>

          {/* Search Button */}
          <button 
            onClick={handleSearch}
            className="bg-accent hover:bg-accent/90 text-white font-bold rounded-2xl p-4 h-full flex items-center justify-center gap-3 transition-transform hover:scale-[1.02] active:scale-95 group cursor-pointer"
          >
            <FaSearch className="text-xl group-hover:animate-bounce" />
            <span className="lg:hidden text-lg">Search Tours</span>
          </button>

        </div>
      </motion.div>
    </div>
  );
};

export default SmartBookingWidget;
