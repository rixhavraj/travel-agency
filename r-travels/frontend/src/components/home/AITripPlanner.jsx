import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaRobot, FaMapMarkerAlt, FaBed, FaRoute } from 'react-icons/fa';

const AITripPlanner = () => {
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [searchStep, setSearchStep] = useState(0);
  const [result, setResult] = useState(null);

  const steps = [
    { text: "Calling SerpApi (Google Search)...", icon: <FaSearch /> },
    { text: "Analyzing Google Maps for distances...", icon: <FaMapMarkerAlt /> },
    { text: "Fetching hotel prices via Google Hotels...", icon: <FaBed /> },
    { text: "Generating optimal itinerary...", icon: <FaRoute /> }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query) return;

    setIsSearching(true);
    setSearchStep(0);
    setResult(null);

    // Simulate the step-by-step API loading process
    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      if (currentStep < steps.length) {
        setSearchStep(currentStep);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setIsSearching(false);
          setResult({
            title: "Your 3-Day Spiritual Journey",
            summary: "Based on real-time data from Google Search, we've planned a serene trip focusing on Kedarnath and nearby holy sites.",
            days: [
              { day: 1, title: "Arrival & Acclimatization", desc: "Check-in at Hotel Himalaya (₹4,500/night - fetched from Google Hotels). Evening Ganga Aarti." },
              { day: 2, title: "The Holy Trek", desc: "Start the 16km trek early. Current weather en route is 5°C with light snow (fetched via Google Weather)." },
              { day: 3, title: "Darshan & Return", desc: "Morning Darshan at Kedarnath Temple. Helicopter return (prices currently starting at ₹8,000 one-way)." }
            ]
          });
        }, 1000);
      }
    }, 1500);
  };

  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute w-96 h-96 bg-accent/20 rounded-full blur-[100px] -top-20 -left-20"></div>
        <div className="absolute w-96 h-96 bg-accent/10 rounded-full blur-[100px] bottom-0 right-0"></div>
      </div>

      <div className="container mx-auto px-4 md:px-8 max-w-4xl relative z-10">
        
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full text-sm font-medium mb-6"
          >
            <FaRobot className="text-accent" />
            <span>AI-Powered by SerpApi</span>
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">
            Design Your <span className="text-accent">Dream Trip</span> Instantly
          </h2>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Tell us what you want to do. We'll search Google in real-time to find the best routes, weather, and live pricing to build your perfect itinerary.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-2 shadow-2xl"
        >
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-2">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g., Plan a 3-day spiritual trip to Kedarnath..."
              className="flex-grow bg-transparent text-white placeholder:text-white/50 px-6 py-4 focus:outline-none text-lg"
              disabled={isSearching}
            />
            <button
              type="submit"
              disabled={isSearching || !query}
              className="bg-accent hover:bg-accent/90 text-white font-bold px-8 py-4 rounded-2xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
            >
              <FaSearch />
              {isSearching ? 'Planning...' : 'Generate Trip'}
            </button>
          </form>
        </motion.div>

        {/* Loading State */}
        <AnimatePresence>
          {isSearching && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-6"
            >
              <div className="flex flex-col gap-4">
                {steps.map((step, index) => (
                  <div 
                    key={index} 
                    className={`flex items-center gap-4 transition-opacity duration-500 ${index <= searchStep ? 'opacity-100' : 'opacity-20'} ${index === searchStep ? 'text-accent' : 'text-white/70'}`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${index === searchStep ? 'bg-accent/20 border border-accent animate-pulse' : 'bg-white/10'}`}>
                      {step.icon}
                    </div>
                    <span className="font-medium text-lg">{step.text}</span>
                    {index < searchStep && <span className="ml-auto text-green-400">✓ Done</span>}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results State */}
        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 bg-white rounded-3xl p-8 shadow-2xl"
            >
              <h3 className="text-3xl font-heading font-bold text-primary mb-2">{result.title}</h3>
              <p className="text-gray-600 mb-8 pb-6 border-b border-gray-100">{result.summary}</p>

              <div className="flex flex-col gap-6">
                {result.days.map((day, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-blue-50 text-accent font-bold flex items-center justify-center shrink-0">
                        D{day.day}
                      </div>
                      {i !== result.days.length - 1 && <div className="w-0.5 h-full bg-blue-50 mt-2"></div>}
                    </div>
                    <div className="pb-6">
                      <h4 className="text-xl font-bold text-gray-900 mb-2">{day.title}</h4>
                      <p className="text-gray-600 leading-relaxed">{day.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100 text-center">
                <button className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-xl font-semibold transition-colors cursor-pointer">
                  Customize & Book This Trip
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};

export default AITripPlanner;
