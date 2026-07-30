import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import { FaAward, FaMapMarkedAlt, FaUsers, FaSmileBeam } from 'react-icons/fa';

const stats = [
  { icon: FaAward, value: 10, suffix: '+', label: 'Years Experience' },
  { icon: FaMapMarkedAlt, value: 500, suffix: '+', label: 'Tour Packages' },
  { icon: FaUsers, value: 25, suffix: 'k+', label: 'Happy Travelers' },
  { icon: FaSmileBeam, value: 98, suffix: '%', label: 'Satisfaction' },
];

const Counter = ({ value, suffix }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start > end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.ceil(start));
        }
      }, 16);
      
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
};

const StatisticsSection = () => {
  return (
    <section className="py-20 bg-primary relative z-10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="bg-primary text-white rounded-[40px] p-10 md:p-16 shadow-[0_30px_60px_rgba(11,31,58,0.2)] relative overflow-hidden">
          
          {/* Decorative background */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-[80px]" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/40 rounded-full blur-[80px]" />

          <div className="flex flex-col lg:flex-row items-center gap-12 relative z-10">
            
            <div className="lg:w-1/3 text-center lg:text-left">
              <h2 className="text-sm font-bold text-accent uppercase tracking-[0.2em] mb-3">Why Travel With Us</h2>
              <h3 className="text-3xl md:text-4xl font-heading font-bold mb-4">Your Journey, Our Commitment</h3>
              <p className="text-white/80 text-sm md:text-base">
                We craft more than just trips — we create memories that last a lifetime with exceptional service and local expertise.
              </p>
            </div>

            <div className="lg:w-2/3 w-full grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
              {stats.map((stat, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col items-center text-center p-6 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm"
                >
                  <stat.icon className="text-3xl text-accent mb-4" />
                  <h4 className="text-4xl md:text-5xl font-heading font-bold mb-2">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </h4>
                  <p className="text-xs md:text-sm text-white/70 uppercase tracking-wider">{stat.label}</p>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
