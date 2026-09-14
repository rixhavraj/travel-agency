import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { fetchDestinationWeather } from '../../utils/serpApi';

export const DestinationCard = ({ dest, index }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    let isMounted = true;
    fetchDestinationWeather(dest.name).then(data => {
      if (isMounted) setWeather(data);
    });
    return () => { isMounted = false };
  }, [dest.name]);

  return (
    <Link to={`/package/${encodeURIComponent(dest.name)}`} className="block">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: index * 0.1 }}
        className="group relative rounded-3xl overflow-hidden cursor-pointer aspect-[3/4] shadow-lg hover:shadow-2xl transition-shadow duration-300"
      >
        {/* Background Image */}
        <div className="absolute inset-0 w-full h-full transition-transform duration-700 ease-out group-hover:scale-105">
          <img src={dest.local_img_path ? `http://localhost:5000${dest.local_img_path}` : dest.img} alt={dest.name} className="w-full h-full object-cover" />
        </div>
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-300" />
      
      {/* Live Weather Badge */}
      <div className="absolute top-4 right-4 z-20">
        {weather ? (
          <div className="bg-black/40 backdrop-blur-md text-white px-3 py-1.5 rounded-full flex items-center gap-2 text-sm border border-white/20 shadow-lg">
            <span>{weather.icon}</span>
            <span className="font-semibold">{weather.temperature}°C</span>
          </div>
        ) : (
          <div className="bg-black/40 backdrop-blur-md text-white px-3 py-1.5 rounded-full flex items-center gap-2 text-sm border border-white/20 animate-pulse">
            <span className="w-4 h-4 rounded-full bg-white/50"></span>
            <span className="w-8 h-4 rounded bg-white/50"></span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 w-full p-6 text-white z-10">
        <div className="flex justify-between items-end">
          <div>
            <h4 className="text-2xl font-heading font-bold mb-1 group-hover:text-accent transition-colors">{dest.name}</h4>
            <p className="text-white/80 text-sm flex items-center gap-2">
              {dest.state}
            </p>
          </div>
          <div className="bg-accent text-white px-2 py-1 rounded text-sm font-bold flex items-center gap-1 shadow-lg">
            <FaStar className="text-[10px]" /> {dest.rating}
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-white/20 flex justify-between items-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
          <span className="text-sm text-white/80">Starting from</span>
          <span className="font-bold text-lg text-accent">{dest.price}</span>
        </div>
      </div>
    </motion.div>
    </Link>
  );
};

const PopularDestinations = ({ data = [], loading = false }) => {
  if (!loading && (!data || data.length === 0)) return null;

  return (
    <section className="py-24 bg-primary text-white">
      <div className="container mx-auto px-4 md:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-sm font-bold text-accent uppercase tracking-[0.2em] mb-3">Explore</h2>
            <h3 className="text-4xl md:text-5xl font-heading font-bold text-white">Popular Destinations</h3>
          </div>
          <button className="mt-6 md:mt-0 text-white font-semibold border-b-2 border-accent hover:text-accent transition-colors pb-1 cursor-pointer">
            View All Destinations
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {loading ? (
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="h-80 bg-secondary/20 rounded-3xl border border-white/5 animate-pulse overflow-hidden relative">
                <div className="absolute inset-0 bg-white/5"></div>
                <div className="absolute bottom-6 left-6 right-6 space-y-3">
                  <div className="w-24 h-4 bg-white/20 rounded"></div>
                  <div className="w-full h-8 bg-white/30 rounded"></div>
                  <div className="w-3/4 h-8 bg-white/30 rounded"></div>
                </div>
              </div>
            ))
          ) : (
            data.map((dest, index) => (
              <DestinationCard key={index} dest={dest} index={index} />
            ))
          )}
        </div>

      </div>
    </section>
  );
};

export default PopularDestinations;
