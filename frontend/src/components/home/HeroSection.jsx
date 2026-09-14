import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';

const HeroSection = ({ data = [] }) => {
  const navigate = useNavigate();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 400]);
  const opacity = useTransform(scrollY, [0, 800], [1, 0]);

  // Default image if data is empty
  const defaultImages = [
    'https://images.pexels.com/photos/1001435/pexels-photo-1001435.jpeg?auto=compress&cs=tinysrgb&w=2000&q=80',
    'https://images.pexels.com/photos/3374465/pexels-photo-3374465.jpeg?auto=compress&cs=tinysrgb&w=2000&q=80',
    'https://images.pexels.com/photos/1658967/pexels-photo-1658967.jpeg?auto=compress&cs=tinysrgb&w=2000&q=80'
  ];

  const heroImages = data && data.length > 0 
    ? data.map(item => `https://travel-agency-2kkx.onrender.com${item.local_img_path}`)
    : defaultImages;

  return (
    <section className="relative min-h-[620px] h-[100svh] max-h-[860px] w-full overflow-hidden flex items-center justify-center">
      
      {/* Background Swiper Carousel */}
      <motion.div 
        style={{ y, opacity }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/60 via-primary/30 to-background z-10" />
        
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          speed={2000}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          allowTouchMove={false}
          className="w-full h-[120%]"
        >
          {heroImages.map((img, index) => (
            <SwiperSlide key={index}>
              <div 
                className="w-full h-full bg-cover bg-center bg-no-repeat transition-transform duration-[10000ms] ease-linear scale-100 hover:scale-110"
                style={{ 
                  backgroundImage: `url('${img}')`,
                  animation: 'zoomIn 10s infinite alternate' // Add subtle continuous zoom
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </motion.div>

      {/* Floating Clouds (Simplified with CSS animation or static for now) */}
      <div className="absolute inset-0 z-10 pointer-events-none opacity-40">
        <div className="absolute top-1/4 left-[-10%] w-[40%] h-[20%] bg-white/20 blur-[100px] rounded-full animate-pulse" />
        <div className="absolute top-1/3 right-[-5%] w-[30%] h-[25%] bg-white/10 blur-[120px] rounded-full animate-pulse delay-1000" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-5 md:px-8 z-20 relative text-center pt-16 md:pt-20 pointer-events-none">
        <motion.h1 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-[2.65rem] leading-[1.04] sm:text-5xl md:text-7xl lg:text-8xl font-heading font-extrabold text-white mb-5 md:mb-6 drop-shadow-xl pointer-events-auto uppercase tracking-[0.03em] md:tracking-wide"
        >
          Radha Swami <br className="hidden md:block"/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-sky-400">
            Tours & Travel
          </span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-base sm:text-lg md:text-2xl text-white/95 max-w-3xl mx-auto mb-8 md:mb-10 font-light drop-shadow-md pointer-events-auto leading-relaxed"
        >
          Specializing in Udaipur, Kashmir, and spiritual tourism with comfortable travel and affordable pricing.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 pointer-events-auto"
        >
          <button onClick={() => navigate('/packages')} className="px-8 py-4 bg-accent hover:bg-accent/90 text-white font-bold rounded-full text-lg transition-all hover:scale-105 hover:shadow-[0_0_25px_rgba(0,145,255,0.4)] w-full sm:w-auto cursor-pointer">
            Explore Tours
          </button>
          <button onClick={() => document.getElementById('traveller-stories')?.scrollIntoView({ behavior: 'smooth' })} className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold rounded-full text-lg transition-all hover:scale-105 flex items-center justify-center gap-3 w-full sm:w-auto cursor-pointer">
            <span className="w-8 h-8 rounded-full bg-white text-accent flex items-center justify-center shadow-md">
              <FaPlay className="text-xs ml-1" />
            </span>
            Watch Story
          </button>
        </motion.div>
      </div>

      <style>{`
        @keyframes zoomIn {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
