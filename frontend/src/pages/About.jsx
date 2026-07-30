import { motion } from 'framer-motion';
import { FaAward, FaUsers, FaMapMarkedAlt, FaCheckCircle, FaStar } from 'react-icons/fa';
import HeroCarousel from '../components/common/HeroCarousel';

const About = () => {
  const heroImages = [
    "https://images.pexels.com/photos/1367192/pexels-photo-1367192.jpeg?auto=compress&cs=tinysrgb&w=2000&q=80",
    "https://images.pexels.com/photos/3374465/pexels-photo-3374465.jpeg?auto=compress&cs=tinysrgb&w=2000&q=80",
    "https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=2000&q=80"
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      
      {/* Hero Banner */}
      <div className="relative pt-40 pb-24 mb-16 overflow-hidden bg-primary">
        <HeroCarousel images={heroImages} interval={6000} />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent z-10" />
        
        <div className="container mx-auto px-4 md:px-8 relative z-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-heading font-bold text-white mb-6"
          >
            About <span className="text-accent">Radha swami</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-white/90 max-w-2xl font-light leading-relaxed"
          >
            Your trusted travel partner for unforgettable journeys across Uttarakhand, Himachal Pradesh, and beyond.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8">
        
        {/* Story Section */}
        <div className="flex flex-col lg:flex-row gap-16 mb-24 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2 space-y-6"
          >
            <h2 className="text-sm font-bold text-accent uppercase tracking-[0.2em]">Our Story</h2>
            <h3 className="text-4xl font-heading font-bold text-primary">Discover the true essence of the Himalayas</h3>
            <p className="text-gray-600 leading-relaxed text-lg">
              Radha swami Tours & Travel was founded with a simple yet profound mission: to make the majestic beauty and spiritual heritage of North India accessible to everyone. We specialize in crafting comfortable, hassle-free, and memorable experiences for families, couples, and spiritual seekers.
            </p>
            <p className="text-gray-600 leading-relaxed text-lg">
              Based in Chhatisghar, our agency is built on the pillars of quality accommodations, transparent pricing, and unparalleled customer service. Whether you're seeking a thrilling adventure in Rishikesh, a peaceful retreat in Nainital, or a sacred yatra to Kedarnath, we curate every detail so you can focus on the journey.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2 grid grid-cols-2 md:grid-cols-3 gap-4"
          >
            <div className="space-y-4">
              <img src="https://travel-agency-2kkx.onrender.com/uploads/dest_Kedarnath.jpg" alt="Kedarnath Temple" className="rounded-3xl h-48 object-cover w-full shadow-lg hover:scale-105 transition-transform duration-500" />
              <img src="https://travel-agency-2kkx.onrender.com/uploads/dest_Rishikesh.jpg" alt="Rishikesh Ganga" className="rounded-3xl h-64 object-cover w-full shadow-lg hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="space-y-4 mt-8">
              <img src="https://travel-agency-2kkx.onrender.com/uploads/dest_Nainital.jpg" alt="Nainital Lake" className="rounded-3xl h-64 object-cover w-full shadow-lg hover:scale-105 transition-transform duration-500" />
              <img src="https://travel-agency-2kkx.onrender.com/uploads/dest_Auli.jpg" alt="Auli Snow" className="rounded-3xl h-48 object-cover w-full shadow-lg hover:scale-105 transition-transform duration-500" />
            </div>
            <div className="space-y-4 mt-16 hidden md:block">
              <img src="https://travel-agency-2kkx.onrender.com/uploads/dest_Badrinath.jpg" alt="Badrinath Temple" className="rounded-3xl h-48 object-cover w-full shadow-lg hover:scale-105 transition-transform duration-500" />
              <img src="https://travel-agency-2kkx.onrender.com/uploads/dest_Mussoorie.jpg" alt="Mussoorie Hills" className="rounded-3xl h-64 object-cover w-full shadow-lg hover:scale-105 transition-transform duration-500" />
            </div>
          </motion.div>
        </div>

        {/* Badges / Credentials Section */}
        <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-sm border border-gray-200/85 mb-24">
          <div className="text-center mb-12">
            <h2 className="text-sm font-bold text-accent uppercase tracking-[0.2em] mb-3">Why Us</h2>
            <h3 className="text-3xl font-heading font-bold text-primary">Our Credentials</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-gray-50/50 rounded-[2rem] border border-gray-100 hover:shadow-md transition-all duration-300">
              <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-3xl mb-4">
                <FaAward />
              </div>
              <h4 className="font-bold text-primary text-xl mb-2">Certified Experts</h4>
              <p className="text-gray-500 text-sm">Government approved and certified travel operators.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-gray-50/50 rounded-[2rem] border border-gray-100 hover:shadow-md transition-all duration-300">
              <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl mb-4">
                <FaStar />
              </div>
              <h4 className="font-bold text-primary text-xl mb-2">5-Star Ratings</h4>
              <p className="text-gray-500 text-sm">Consistently rated excellent by our happy travelers.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-gray-50/50 rounded-[2rem] border border-gray-100 hover:shadow-md transition-all duration-300">
              <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-3xl mb-4">
                <FaUsers />
              </div>
              <h4 className="font-bold text-primary text-xl mb-2">10,000+ Travelers</h4>
              <p className="text-gray-500 text-sm">Trusted by thousands of families and groups.</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-gray-50/50 rounded-[2rem] border border-gray-100 hover:shadow-md transition-all duration-300">
              <div className="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-3xl mb-4">
                <FaCheckCircle />
              </div>
              <h4 className="font-bold text-primary text-xl mb-2">100% Transparent</h4>
              <p className="text-gray-500 text-sm">No hidden costs. What you see is what you pay.</p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-accent uppercase tracking-[0.2em] mb-3">Our Experts</h2>
            <h3 className="text-4xl font-heading font-bold text-primary">Meet The Team</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            
            {/* Team Member 1 */}
            <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-200/85 group hover:shadow-md transition-all duration-300">
              <div className="h-64 bg-gray-200 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2000&auto=format&fit=crop" alt="Team Member" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-6 text-center">
                <h4 className="text-xl font-bold text-primary mb-1">Rishabh Sharma</h4>
                <p className="text-accent text-sm font-semibold mb-3">Founder & Director</p>
                <p className="text-gray-500 text-sm">Passionate explorer with 10+ years of experience in Himalayan tourism.</p>
              </div>
            </div>

            {/* Team Member 2 */}
            <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-200/85 group hover:shadow-md transition-all duration-300">
              <div className="h-64 bg-gray-200 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2000&auto=format&fit=crop" alt="Team Member" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-6 text-center">
                <h4 className="text-xl font-bold text-primary mb-1">Priya Singh</h4>
                <p className="text-accent text-sm font-semibold mb-3">Tour Manager</p>
                <p className="text-gray-500 text-sm">Expert in crafting personalized itineraries and family vacation packages.</p>
              </div>
            </div>

            {/* Team Member 3 */}
            <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-200/85 group hover:shadow-md transition-all duration-300">
              <div className="h-64 bg-gray-200 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2000&auto=format&fit=crop" alt="Team Member" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-6 text-center">
                <h4 className="text-xl font-bold text-primary mb-1">Amit Verma</h4>
                <p className="text-accent text-sm font-semibold mb-3">Head of Operations</p>
                <p className="text-gray-500 text-sm">Ensures seamless execution and high-quality accommodations for every trip.</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default About;
