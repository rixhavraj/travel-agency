import { useRef } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { FaClock, FaStar, FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Link } from 'react-router-dom';

export const TourPackageCard = ({ pkg }) => {
  return (
    <Link to={`/package/${pkg.title}`} className="group bg-secondary/40 backdrop-blur-md rounded-3xl overflow-hidden border border-white/10 hover:border-accent/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(214,165,93,0.15)] flex flex-col h-full cursor-pointer block">
      
      {/* Image */}
      <div className="relative h-60 overflow-hidden">
        <img src={pkg.local_img_path ? `http://localhost:5000${pkg.local_img_path}` : ''} alt={pkg.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute top-4 right-4 bg-white/90 text-primary px-2 py-1 rounded text-xs font-bold flex items-center gap-1 shadow-lg backdrop-blur-sm z-10">
          <FaStar className="text-accent" /> {pkg.rating}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center gap-2 text-accent text-sm font-semibold mb-3">
          <FaClock />
          <span>{pkg.duration}</span>
        </div>
        
        <h4 className="text-2xl font-heading font-bold mb-4 line-clamp-2 text-white">{pkg.title}</h4>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {pkg.highlights.split('|').map((hl, i) => (
            <span key={i} className="text-xs bg-white/5 text-white/80 px-2 py-1 rounded border border-white/10">
              {hl}
            </span>
          ))}
        </div>

        <div className="mt-auto pt-6 border-t border-white/10 flex justify-between items-center">
          <div>
            <p className="text-sm text-white/60 mb-0.5">Starts from</p>
            <p className="text-xl font-bold text-accent">{pkg.price}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors text-white">
            <FaArrowRight />
          </div>
        </div>
      </div>
    </Link>
  );
};

const TourPackages = ({ data = [] }) => {
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  if (!data || data.length === 0) return null;

  return (
    <section className="py-24 bg-primary text-white relative overflow-hidden">
      
      {/* Background Decorative element */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-secondary/20 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <h2 className="text-sm font-bold text-accent uppercase tracking-[0.2em] mb-3">Best Selling</h2>
            <h3 className="text-4xl md:text-5xl font-heading font-bold">Handpicked Packages</h3>
          </div>
          
          {/* Custom Navigation */}
          <div className="flex gap-4 mt-6 md:mt-0">
            <button ref={prevRef} className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center hover:bg-accent hover:border-accent hover:text-primary transition-colors z-20 disabled:opacity-50">
              <FaChevronLeft />
            </button>
            <button ref={nextRef} className="w-12 h-12 rounded-full border border-white/30 flex items-center justify-center hover:bg-accent hover:border-accent hover:text-primary transition-colors z-20 disabled:opacity-50">
              <FaChevronRight />
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={30}
          slidesPerView={1}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
          onInit={(swiper) => {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
            swiper.navigation.init();
            swiper.navigation.update();
          }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-12"
        >
          {data.map((pkg, index) => (
            <SwiperSlide key={index}>
              <TourPackageCard pkg={pkg} />
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
};

export default TourPackages;
