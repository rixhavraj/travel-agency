import { motion } from 'framer-motion';
import { FaHotel, FaPlaneDeparture, FaSuitcaseRolling, FaBuilding, FaMapMarkedAlt } from 'react-icons/fa';

const partners = [
  { name: 'Taj Hotels', type: 'Hospitality Partner', icon: FaHotel },
  { name: 'Marriott Bonvoy', type: 'Luxury Stays', icon: FaBuilding },
  { name: 'Air India', type: 'Airline Partner', icon: FaPlaneDeparture },
  { name: 'MakeMyTrip', type: 'Booking Partner', icon: FaSuitcaseRolling },
  { name: 'ITC Hotels', type: 'Premium Partner', icon: FaMapMarkedAlt },
];

// Duplicate the array to create a seamless infinite loop
const loopedPartners = [...partners, ...partners, ...partners];

const Partners = () => {
  return (
    <section className="py-12 sm:py-16 bg-primary border-y border-white/10 overflow-hidden text-white">
      <div className="container mx-auto px-5 md:px-8 max-w-6xl relative z-10 mb-7 sm:mb-8">
        <div className="text-center">
          <h3 className="text-sm font-bold text-white/50 uppercase tracking-widest mb-2">Our Trusted Partners</h3>
          <p className="text-white/70 text-xs sm:text-sm max-w-sm mx-auto leading-relaxed">We collaborate with the best in the industry to bring you premium experiences.</p>
        </div>
      </div>

      {/* Infinite Marquee Container */}
      <div className="relative w-full overflow-hidden">
        {/* Fading Edges */}
        <div className="absolute top-0 left-0 w-24 sm:w-48 h-full bg-gradient-to-r from-primary to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-24 sm:w-48 h-full bg-gradient-to-l from-primary to-transparent z-10 pointer-events-none" />

        {/* Marquee Track */}
        <div className="flex w-max animate-partner-marquee hover:pause-marquee items-center py-4">
          {loopedPartners.map((partner, index) => {
            const Icon = partner.icon;
            return (
              <div key={index} className="w-[205px] sm:w-[300px] shrink-0 mx-2 sm:mx-4 flex justify-center">
                <div className="flex items-center gap-4 opacity-50 hover:opacity-100 hover:scale-105 transition-all duration-300 cursor-pointer grayscale hover:grayscale-0">
                  <div className="w-11 h-11 rounded-xl bg-secondary border border-white/10 flex items-center justify-center text-white shadow-sm">
                    <Icon className="text-xl" />
                  </div>
                  <div className="flex flex-col">
                    <h4 className="text-base sm:text-2xl font-heading font-black text-white tracking-tight leading-none">
                      {partner.name}
                    </h4>
                    <span className="text-[10px] uppercase font-bold text-accent tracking-widest mt-1">
                      {partner.type}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @keyframes partner-marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.3333%); }
        }
        .animate-partner-marquee {
          /* Adjust timing based on how fast you want the loop */
          animation: partner-marquee 25s linear infinite;
        }
        .hover\\:pause-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

    </section>
  );
};

export default Partners;
