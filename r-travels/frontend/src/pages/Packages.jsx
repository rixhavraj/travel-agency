import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchHomeData } from '../utils/api';
import { TourPackageCard } from '../components/home/TourPackages';

import HeroCarousel from '../components/common/HeroCarousel';

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  const heroImages = [
    "https://images.pexels.com/photos/1658967/pexels-photo-1658967.jpeg?auto=compress&cs=tinysrgb&w=2000&q=80",
    "https://images.pexels.com/photos/15183980/pexels-photo-15183980.jpeg?auto=compress&cs=tinysrgb&w=2000&q=80",
    "https://images.pexels.com/photos/3374465/pexels-photo-3374465.jpeg?auto=compress&cs=tinysrgb&w=2000&q=80"
  ];

  useEffect(() => {
    let isMounted = true;
    fetchHomeData().then(data => {
      if (isMounted) {
        setPackages(data?.packages || []);
        setLoading(false);
      }
    });
    return () => { isMounted = false };
  }, []);


  return (
    <div className="min-h-screen bg-primary text-white pb-20 relative overflow-hidden">
      
      {/* Background Decorative element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/20 blur-[150px] rounded-full pointer-events-none" />

      {/* Hero Banner */}
      <div className="relative pt-40 pb-20 mb-16 overflow-hidden bg-primary">
        <HeroCarousel images={heroImages} interval={6500} />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-transparent z-10" />
        
        <div className="container mx-auto px-4 md:px-8 relative z-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-heading font-bold text-white mb-4"
          >
            Exclusive <span className="text-accent">Tour Packages</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-white/80 max-w-2xl"
          >
            Handpicked experiences curated for families, groups, and honeymooners.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {loading ? (
            Array.from({ length: 8 }).map((_, index) => (
              <div key={index} className="h-[450px] bg-secondary/40 rounded-3xl border border-white/10 animate-pulse">
                <div className="h-60 bg-white/5 rounded-t-3xl"></div>
                <div className="p-6 space-y-4">
                  <div className="w-24 h-4 bg-white/10 rounded"></div>
                  <div className="w-full h-8 bg-white/10 rounded"></div>
                  <div className="w-2/3 h-8 bg-white/10 rounded"></div>
                  <div className="flex gap-2">
                    <div className="w-16 h-6 bg-white/5 rounded"></div>
                    <div className="w-20 h-6 bg-white/5 rounded"></div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            packages.map((pkg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <TourPackageCard pkg={pkg} />
              </motion.div>
            ))
          )}
        </div>

        {!loading && packages.length === 0 && (
          <div className="text-center py-20">
            <p className="text-xl text-white/50">No packages found. Please check your connection.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default Packages;
