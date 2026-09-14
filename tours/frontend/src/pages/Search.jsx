import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fetchHomeData, fetchDestinationDetails, fetchUnsplashPhotos } from '../utils/api';
import { fetchDestinationWeather } from '../utils/serpApi';
import { FaMapMarkerAlt, FaSpinner, FaCalendarDay, FaUserFriends, FaExclamationTriangle } from 'react-icons/fa';
import { TourPackageCard } from '../components/home/TourPackages';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const days = searchParams.get('days') || '3';
  const travelers = searchParams.get('travelers') || '2';

  const [loading, setLoading] = useState(true);
  
  // Real Database Data
  const [matchedPackages, setMatchedPackages] = useState([]);
  const [matchedDestinations, setMatchedDestinations] = useState([]);

  // Wikipedia / Unsplash / Weather
  const [destinationData, setDestinationData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // 1. Search our own database FIRST
        let pkgs = [];
        let dests = [];
        
        const homeData = await fetchHomeData();
        if (homeData) {
          const qLower = query.toLowerCase();
          
          // Find matching packages (query might not exist in db)
          pkgs = homeData.packages.filter(p => p.title.toLowerCase().includes(qLower));
          setMatchedPackages(pkgs);

          // Find matching destinations
          dests = homeData.destinations.filter(d => d.name.toLowerCase().includes(qLower) || (d.state && d.state.toLowerCase().includes(qLower)));
          setMatchedDestinations(dests);
        }

        // 2. Fetch Wikipedia info & image for rich content
        const data = await fetchDestinationDetails(query);
        if (data) {
          setDestinationData(data);
        } else {
          // If Wikipedia fails but we have packages, don't show a hard error
          if (pkgs.length === 0 && dests.length === 0) {
            setError(`No tours or guides found for "${query}". Try searching for Kedarnath, Nainital, etc.`);
          }
        }

        // 3. Fetch Weather
        const weather = await fetchDestinationWeather(query);
        setWeatherData(weather);

        // 4. Fetch Unsplash Photos via Backend
        const unsplashData = await fetchUnsplashPhotos(query);
        setPhotos(unsplashData);

      } catch (err) {
        console.error("Search Error:", err);
        setError("Failed to fetch search results.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [query]);

  return (
    <div className="min-h-screen bg-background pt-24 pb-24">
      <div className="container mx-auto px-4 md:px-8">
        
        {/* Search Header */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-200 pb-8">
          <div>
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-primary mb-4">
              Search Results for <span className="text-accent">"{query}"</span>
            </h1>
            <div className="h-1 w-20 bg-accent rounded-full mb-4"></div>
            
            <div className="flex gap-4 text-sm font-semibold text-gray-500">
              <span className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full"><FaCalendarDay className="text-accent" /> {days} Days</span>
              <span className="flex items-center gap-2 bg-gray-100 px-3 py-1.5 rounded-full"><FaUserFriends className="text-accent" /> {travelers} Travelers</span>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-muted">
            <FaSpinner className="text-4xl animate-spin text-accent mb-4" />
            <p className="text-lg">Searching best packages for {query}...</p>
          </div>
        ) : error ? (
          <div className="bg-white p-12 rounded-3xl text-center border border-gray-100 shadow-sm max-w-2xl mx-auto">
            <FaExclamationTriangle className="text-5xl text-yellow-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-primary mb-2">Oops!</h2>
            <p className="text-muted text-lg">{error}</p>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-16"
          >

            {/* Matching Packages from Database */}
            {matchedPackages.length > 0 ? (
              <div>
                <h3 className="text-3xl font-heading font-bold text-primary mb-8 border-l-4 border-accent pl-4">Recommended Tour Packages</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {matchedPackages.map((pkg, i) => (
                    <TourPackageCard key={i} pkg={pkg} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-red-50 text-red-600 p-8 rounded-3xl border border-red-100 flex flex-col items-center justify-center text-center shadow-sm">
                <FaExclamationTriangle className="text-5xl mb-4" />
                <h3 className="text-3xl font-heading font-bold mb-2">Packages Not Available</h3>
                <p className="text-lg">We currently do not have any pre-curated packages for "{query}".</p>
                <p className="mt-4 text-gray-700">However, you can still view the destination overview below and request a custom itinerary!</p>
              </div>
            )}

            {/* Wikipedia & Weather Overview */}
            {destinationData && (
              <div>
                <h3 className="text-3xl font-heading font-bold text-primary mb-8 border-l-4 border-accent pl-4">Destination Overview</h3>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  
                  {/* Main Destination Info */}
                  <div className="lg:col-span-2 flex flex-col gap-8">
                    <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
                      {destinationData.img ? (
                        <div className="w-full h-80 md:h-[400px] overflow-hidden relative">
                          <img 
                            src={destinationData.img} 
                            alt={destinationData.title} 
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end p-8">
                            <h2 className="text-4xl font-heading font-bold text-white flex items-center gap-3">
                              <FaMapMarkerAlt className="text-accent" />
                              {destinationData.title}
                            </h2>
                          </div>
                        </div>
                      ) : (
                        <div className="p-8 pb-0">
                          <h2 className="text-4xl font-heading font-bold text-primary flex items-center gap-3">
                            <FaMapMarkerAlt className="text-accent" />
                            {destinationData.title}
                          </h2>
                        </div>
                      )}
                      
                      <div className="p-8">
                        <h3 className="text-xl font-bold text-primary mb-4 border-b pb-2">About this place</h3>
                        <p className="text-gray-600 leading-relaxed text-lg">
                          {destinationData.description}
                        </p>
                      </div>
                    </div>

                    {/* Unsplash Photos Gallery */}
                    {photos && photos.length > 0 && (
                      <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                        <h3 className="text-xl font-bold text-primary mb-6 border-b pb-2">Visual Gallery</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                          {photos.map((photo) => (
                            <div key={photo.id} className="rounded-xl overflow-hidden aspect-square group relative">
                              <img 
                                src={photo.thumb} 
                                alt={photo.alt_description || "Destination photo"} 
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                              />
                              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                                <a href={photo.author_link} target="_blank" rel="noreferrer" className="text-white text-xs hover:underline">
                                  Photo by {photo.author} on Unsplash
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Sidebar (Weather & Quick Actions) */}
                  <div className="lg:col-span-1 flex flex-col gap-6">
                    
                    {/* Weather Widget */}
                    <div className="bg-primary rounded-3xl p-8 text-white relative overflow-hidden shadow-lg border border-white/10">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-[40px] -mr-10 -mt-10"></div>
                      <h3 className="text-white/80 uppercase tracking-widest text-xs font-bold mb-6">Live Weather Status</h3>
                      
                      <div className="flex items-center gap-4">
                        <div className="text-6xl">{weatherData?.icon || '🌤️'}</div>
                        <div>
                          <div className="text-5xl font-bold font-heading">{weatherData?.temperature || '--'}°C</div>
                          <div className="text-white/70 text-lg mt-1">{weatherData?.condition || 'Loading...'}</div>
                        </div>
                      </div>
                    </div>

                    {/* Action Widget */}
                    <div className="bg-white rounded-[2rem] p-8 border border-gray-200/80 shadow-sm text-center">
                      <h3 className="text-xl font-bold text-primary mb-2">Create Custom Itinerary</h3>
                      <p className="text-muted text-sm mb-6">Want a tailored experience for {travelers} guests for {days} days? Our experts are ready.</p>
                      <a href={`/contact?subject=Custom Itinerary for ${query} (${days} Days, ${travelers} Travelers)`} className="block w-full">
                        <button className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-4 rounded-xl transition-colors text-lg cursor-pointer">
                          Request Custom Quote
                        </button>
                      </a>
                    </div>

                  </div>
                </div>
              </div>
            )}
            
          </motion.div>
        )}
        
      </div>
    </div>
  );
};

export default Search;
