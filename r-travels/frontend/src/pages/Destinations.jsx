import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fetchHomeData } from '../utils/api';
import { DestinationCard } from '../components/home/PopularDestinations';
import HeroCarousel from '../components/common/HeroCarousel';

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [filteredDestinations, setFilteredDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [selectedDifficulty, setSelectedDifficulty] = useState([]);
  const [selectedDuration, setSelectedDuration] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState([]);

  const heroImages = [
    "https://images.pexels.com/photos/1001435/pexels-photo-1001435.jpeg?auto=compress&cs=tinysrgb&w=2000&q=80",
    "https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=2000&q=80",
    "https://images.pexels.com/photos/210186/pexels-photo-210186.jpeg?auto=compress&cs=tinysrgb&w=2000&q=80"
  ];

  // Helper to categorize items for client-side filtering
  const getDestinationMeta = (name) => {
    const n = name.toLowerCase();
    let difficulty = 'moderate';
    let duration = '4-7';
    let activities = ['trekking'];

    if (n.includes('kedarnath') || n.includes('badrinath') || n.includes('auli') || n.includes('munsiyari')) {
      difficulty = 'challenging';
    } else if (n.includes('nainital') || n.includes('mussoorie') || n.includes('corbett') || n.includes('kainchi')) {
      difficulty = 'easy';
    }

    if (n.includes('kedarnath') || n.includes('badrinath') || n.includes('auli') || n.includes('munsiyari')) {
      duration = '8+';
    } else if (n.includes('rishikesh') || n.includes('kainchi')) {
      duration = '1-3';
    }

    if (n.includes('corbett')) {
      activities = ['safari'];
    } else if (n.includes('auli')) {
      activities = ['skiing', 'trekking'];
    } else if (n.includes('rishikesh')) {
      activities = ['rafting', 'trekking', 'camping'];
    } else if (n.includes('nainital') || n.includes('mussoorie')) {
      activities = ['camping', 'trekking'];
    }

    return { difficulty, duration, activities };
  };

  useEffect(() => {
    let isMounted = true;
    fetchHomeData().then(data => {
      if (isMounted) {
        const dests = data?.destinations || [];
        setDestinations(dests);
        setFilteredDestinations(dests);
        setLoading(false);
      }
    });
    return () => { isMounted = false };
  }, []);

  // Filter effect
  useEffect(() => {
    let result = destinations;

    if (selectedDifficulty.length > 0) {
      result = result.filter(d => {
        const { difficulty } = getDestinationMeta(d.name);
        return selectedDifficulty.includes(difficulty);
      });
    }

    if (selectedDuration.length > 0) {
      result = result.filter(d => {
        const { duration } = getDestinationMeta(d.name);
        return selectedDuration.includes(duration);
      });
    }

    if (selectedActivity.length > 0) {
      result = result.filter(d => {
        const { activities } = getDestinationMeta(d.name);
        return activities.some(act => selectedActivity.includes(act));
      });
    }

    setFilteredDestinations(result);
  }, [selectedDifficulty, selectedDuration, selectedActivity, destinations]);

  const handleCheckboxChange = (value, list, setList) => {
    if (list.includes(value)) {
      setList(list.filter(item => item !== value));
    } else {
      setList([...list, value]);
    }
  };

  const clearFilters = () => {
    setSelectedDifficulty([]);
    setSelectedDuration([]);
    setSelectedActivity([]);
  };

  return (
    <div className="min-h-screen bg-background pb-20 text-[#0F172A]">
      
      {/* Hero Banner */}
      <div className="relative pt-40 pb-20 mb-16 overflow-hidden bg-primary">
        <HeroCarousel images={heroImages} interval={5500} />
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-transparent z-10" />
        
        <div className="container mx-auto px-4 md:px-8 relative z-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-heading font-extrabold text-white mb-4 uppercase tracking-wide"
          >
            Explore Our <span className="text-accent">Destinations</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-white/80 max-w-2xl font-light"
          >
            From the serene lakes of Nainital to the spiritual heights of Kedarnath, discover the perfect getaway with Pragati Trails.
          </motion.p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8">
        
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Sidebar Filter Panel */}
          <div className="lg:w-1/4 w-full bg-white p-6 rounded-[2rem] border border-gray-200/80 shadow-sm h-fit">
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-100">
              <h3 className="font-heading font-bold text-xl text-primary">Filters</h3>
              <button 
                onClick={clearFilters}
                className="text-xs font-semibold text-accent hover:underline cursor-pointer"
              >
                Clear All
              </button>
            </div>

            {/* Difficulty Filter */}
            <div className="mb-6">
              <h4 className="font-bold text-sm text-primary mb-3 uppercase tracking-wider">Difficulty</h4>
              <div className="space-y-2">
                {[
                  { id: 'easy', label: 'Easy' },
                  { id: 'moderate', label: 'Moderate' },
                  { id: 'challenging', label: 'Challenging' }
                ].map(item => (
                  <label key={item.id} className="flex items-center gap-3 text-sm text-gray-600 hover:text-primary cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={selectedDifficulty.includes(item.id)}
                      onChange={() => handleCheckboxChange(item.id, selectedDifficulty, setSelectedDifficulty)}
                      className="w-4 h-4 rounded text-accent focus:ring-accent border-gray-300"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Duration Filter */}
            <div className="mb-6">
              <h4 className="font-bold text-sm text-primary mb-3 uppercase tracking-wider">Duration</h4>
              <div className="space-y-2">
                {[
                  { id: '1-3', label: '1 - 3 Days' },
                  { id: '4-7', label: '4 - 7 Days' },
                  { id: '8+', label: '8+ Days' }
                ].map(item => (
                  <label key={item.id} className="flex items-center gap-3 text-sm text-gray-600 hover:text-primary cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={selectedDuration.includes(item.id)}
                      onChange={() => handleCheckboxChange(item.id, selectedDuration, setSelectedDuration)}
                      className="w-4 h-4 rounded text-accent focus:ring-accent border-gray-300"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Activity Type Filter */}
            <div>
              <h4 className="font-bold text-sm text-primary mb-3 uppercase tracking-wider">Activity Type</h4>
              <div className="space-y-2">
                {[
                  { id: 'trekking', label: 'Trekking' },
                  { id: 'camping', label: 'Camping' },
                  { id: 'rafting', label: 'Rafting' },
                  { id: 'safari', label: 'Safari' },
                  { id: 'skiing', label: 'Skiing' }
                ].map(item => (
                  <label key={item.id} className="flex items-center gap-3 text-sm text-gray-600 hover:text-primary cursor-pointer select-none">
                    <input 
                      type="checkbox" 
                      checked={selectedActivity.includes(item.id)}
                      onChange={() => handleCheckboxChange(item.id, selectedActivity, setSelectedActivity)}
                      className="w-4 h-4 rounded text-accent focus:ring-accent border-gray-300"
                    />
                    <span>{item.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Grid */}
          <div className="lg:w-3/4 w-full">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {loading ? (
                Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="h-80 bg-gray-200 rounded-[2rem] animate-pulse overflow-hidden relative">
                    <div className="absolute bottom-6 left-6 right-6 space-y-3">
                      <div className="w-24 h-4 bg-gray-300 rounded"></div>
                      <div className="w-full h-8 bg-gray-300 rounded"></div>
                      <div className="w-3/4 h-8 bg-gray-300 rounded"></div>
                    </div>
                  </div>
                ))
              ) : (
                filteredDestinations.map((dest, index) => (
                  <DestinationCard 
                    key={index} 
                    dest={dest} 
                    index={index} 
                  />
                ))
              )}
            </div>

            {!loading && filteredDestinations.length === 0 && (
              <div className="text-center py-20 bg-white rounded-[2rem] border border-gray-200/80 p-8 shadow-sm">
                <p className="text-xl text-gray-500 font-medium">No destinations match the selected filters.</p>
                <button 
                  onClick={clearFilters}
                  className="mt-4 px-6 py-2.5 bg-accent hover:bg-accent/90 text-white font-bold rounded-full transition-colors cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            )}
          </div>

        </div>
      </div>

    </div>
  );
};

export default Destinations;
