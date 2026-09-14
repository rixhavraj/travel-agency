import { motion } from 'framer-motion';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const testimonials = [
  {
    name: 'Olivia Price',
    rating: 4.5,
    text: 'An unforgettable experience! The team planned everything so smoothly that we never felt rushed. Rajasthan felt even more magical with their guidance.',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop'
  },
  {
    name: 'James Wilson',
    rating: 5,
    text: 'The golden triangle tour was executed perfectly. The guides were knowledgeable and the hotels were top-notch. Highly recommended!',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop'
  },
  {
    name: 'Sarah Jenkins',
    rating: 5,
    text: 'Pragati Trails made our family trip to Uttarakhand incredible. From the transport to the stays, everything was flawlessly arranged.',
    img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop'
  },
  {
    name: 'Michael Chang',
    rating: 4.8,
    text: 'A truly breathtaking journey through the Himalayas. The itinerary was perfectly balanced between adventure and relaxation.',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop'
  }
];

// Duplicate the array to create a seamless infinite loop
const loopedTestimonials = [...testimonials, ...testimonials];

const Testimonials = () => {
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FaStar key={i} className={`text-xs ${i <= rating ? 'text-accent' : 'text-gray-700'}`} />
      );
    }
    return stars;
  };

  return (
    <section id="traveller-stories" className="scroll-mt-20 py-16 sm:py-24 bg-primary text-white text-center overflow-hidden">
      <div className="container mx-auto px-4 md:px-8 max-w-5xl relative z-10">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-9 px-2 sm:mb-16"
        >
          <h2 className="text-3xl leading-tight sm:text-4xl md:text-5xl font-heading font-bold text-white mb-4">
            Our Happy <span className="text-accent">Travellers</span>
          </h2>
          <p className="text-sm sm:text-base text-white/70 max-w-2xl mx-auto leading-relaxed">
            Journeys that turned into memories. Hear directly from those who travelled with us.
          </p>
        </motion.div>

      </div>

      {/* Infinite Marquee Container */}
      <div className="relative w-full overflow-hidden py-4 sm:py-10">
        {/* Fading Edges */}
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-primary to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-primary to-transparent z-10 pointer-events-none" />

        {/* Marquee Track */}
        <div className="flex w-max animate-marquee hover:pause-marquee">
          {loopedTestimonials.map((testimonial, index) => (
            <div key={index} className="w-[86vw] max-w-[400px] md:w-[500px] shrink-0 mx-2 sm:mx-4">
              <div className="bg-secondary border border-white/10 rounded-[1.5rem] sm:rounded-[2rem] p-5 sm:p-8 shadow-xl text-left flex flex-col min-h-[280px] sm:min-h-0 h-full hover:-translate-y-2 transition-transform duration-300">
                
                <div className="flex justify-between items-start mb-6">
                  <div className="w-2/3 pr-4">
                    <FaQuoteLeft className="text-accent text-2xl sm:text-3xl mb-3 sm:mb-4 opacity-80" />
                    <p className="text-white/70 text-xs sm:text-sm leading-relaxed">
                      {testimonial.text}
                    </p>
                  </div>
                  <div className="w-1/3">
                    <div className="w-16 h-16 sm:w-24 sm:h-24 rounded-2xl overflow-hidden float-right border-4 border-secondary shadow-md">
                      <img src={testimonial.img} alt={testimonial.name} className="w-full h-full object-cover" />
                    </div>
                  </div>
                </div>

                <div className="mt-auto border-t border-white/10 pt-4 flex justify-between items-center">
                  <span className="font-semibold text-white text-sm">{testimonial.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-accent font-bold text-sm">{testimonial.rating}</span>
                    <div className="flex gap-0.5">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 mt-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <button className="bg-accent hover:bg-accent/90 text-white font-bold px-8 py-3.5 rounded-full shadow-lg shadow-accent/20 transition-all hover:-translate-y-1 cursor-pointer">
            Tell Us Your Story
          </button>
        </motion.div>
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
        .hover\\:pause-marquee:hover {
          animation-play-state: paused;
        }
      `}</style>

    </section>
  );
};

export default Testimonials;
