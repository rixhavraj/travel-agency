import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaCheckCircle, FaTimesCircle, FaMapMarkerAlt, FaCalendarDay, 
  FaStar, FaArrowLeft, FaClock, FaHeart, FaHiking, FaBed, FaUtensils, FaCar 
} from 'react-icons/fa';
import { fetchHomeData } from '../utils/api';

const PackageDetail = () => {
  const { name } = useParams();
  const [dest, setDest] = useState(null);
  const [loading, setLoading] = useState(true);

  // Booking Form State
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });
  const [bookingStatus, setBookingStatus] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchHomeData();
        if (data) {
          const decodedName = decodeURIComponent(name).toLowerCase();
          
          // Check destinations first
          let found = data.destinations?.find(d => d.name.toLowerCase() === decodedName);
          
          // If not found, check packages
          if (!found && data.packages) {
            const pkg = data.packages.find(p => p.title.toLowerCase() === decodedName);
            if (pkg) {
              // Normalize package data to match destination shape
              found = {
                ...pkg,
                name: pkg.title,
                isPackage: true
              };
            }
          }
          
          setDest(found);
        }
      } catch (err) {
        console.error("Failed to load details", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [name]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email) {
      alert("Please fill out the required fields.");
      return;
    }
    setBookingStatus('submitting');
    setTimeout(() => {
      setBookingStatus('success');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: ''
      });
    }, 1500);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pb-24 animate-pulse">
        {/* Hero Section Skeleton */}
        <div className="relative h-[60vh] md:h-[70vh] w-full bg-gray-300">
          <div className="absolute bottom-12 left-4 md:left-8 container mx-auto">
            <div className="w-3/4 max-w-2xl h-16 bg-white/40 rounded-2xl mb-4"></div>
            <div className="w-48 h-8 bg-white/40 rounded-lg"></div>
          </div>
        </div>
        
        {/* Main Content Area Skeleton */}
        <div className="container mx-auto px-4 md:px-8 mt-12">
          <div className="w-full h-24 bg-gray-200 rounded-3xl mb-12"></div>
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="lg:w-2/3 space-y-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-40 bg-gray-200 rounded-3xl"></div>
              ))}
            </div>
            <div className="lg:w-1/3 h-96 bg-gray-200 rounded-3xl"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!dest) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center pt-32 pb-20">
        <h1 className="text-4xl font-heading font-bold text-primary mb-4">Package Not Found</h1>
        <p className="text-gray-500 mb-8">We couldn't find the tour or destination you're looking for.</p>
        <Link to="/packages" className="bg-accent text-white font-bold px-8 py-4 rounded-full hover:bg-accent/90 transition-colors shadow-md">
          Browse All Packages
        </Link>
      </div>
    );
  }

  const imgSrc = dest.local_img_path ? `http://localhost:5000${dest.local_img_path}` : dest.img;

  // Itinerary Data with Image mappings
  const itinerary = [
    { 
      day: '1', 
      title: 'Arrival & Welcome', 
      desc: 'Arrive at your base point. Group check-in at hotel/resort. Gather in the evening for a detailed orientation briefing about the trek routes, guidelines, and safety parameters. Overnight stay in hotel.',
      img: 'https://images.pexels.com/photos/1001435/pexels-photo-1001435.jpeg?auto=compress&cs=tinysrgb&w=400&q=80'
    },
    { 
      day: '2', 
      title: 'Scenic Trail Ascent', 
      desc: 'Embark on the trail starting with gentle ascents. Pass through beautiful forest bridges and pine meadows. Spot local flora and enjoy spectacular views of the snow-capped Himalayan range.',
      img: 'https://images.pexels.com/photos/3408744/pexels-photo-3408744.jpeg?auto=compress&cs=tinysrgb&w=400&q=80'
    },
    { 
      day: '3', 
      title: 'Ridge Crossing & Lake Views', 
      desc: 'Trek higher towards the high altitude campsites. Enjoy panoramic landscape views as you cross alpine ridges. Witness stunning mountain lakes mirroring the clear blue sky. Evening bonfire at campsite.',
      img: 'https://images.pexels.com/photos/210186/pexels-photo-210186.jpeg?auto=compress&cs=tinysrgb&w=400&q=80'
    },
    { 
      day: '4', 
      title: 'Summit Day & Descent', 
      desc: 'Wake up early for the summit push to experience a glorious Himalayan sunrise. Capture breathtaking photographs at the peak. Head back down to base camp for hot tea and celebration dinner.',
      img: 'https://images.pexels.com/photos/3374465/pexels-photo-3374465.jpeg?auto=compress&cs=tinysrgb&w=400&q=80'
    },
  ];

  // Detailed Inclusions / Exclusions
  const inclusions = [
    'Premium accommodation (Hotel & Camps)',
    'All meals (Breakfast, Lunch & Dinner)',
    'Certified local mountain guides & crew',
    'Private transport & transfers',
    'State forest permits & entry fees',
    'First aid & safety oxygen cylinder support'
  ];

  const exclusions = [
    'Personal trekking gear and equipment',
    'Personal expenses, tips and mineral water',
    'Travel insurance policy premiums',
    'Cost of emergency evacuation',
    'Any cost arising from landslides or roadblocks',
    'Anything not mentioned in the inclusions list'
  ];

  // Gear checklist items
  const gearItems = [
    'Trekking boots (high-ankle, waterproof)',
    '40-60L rucksack with rain cover',
    'Warm clothing (fleece jackets, thermals)',
    'Waterproof gloves and woolen caps',
    'Water bottle & hydration pack',
    'Headlamp / Torch with spare batteries',
    'Personal medical kit & toiletries'
  ];

  return (
    <div className="min-h-screen bg-background pb-24 text-[#0F172A]">
      
      {/* Hero Banner Section */}
      <div className="relative h-[65vh] md:h-[75vh] w-full overflow-hidden">
        <img src={imgSrc} alt={dest.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent" />
        
        {/* Back Button */}
        <div className="absolute top-28 left-4 md:left-8 z-20">
          <button 
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-white bg-black/30 hover:bg-black/50 px-5 py-2.5 rounded-full backdrop-blur-md transition-all text-sm font-semibold cursor-pointer"
          >
            <FaArrowLeft /> Back to Tours
          </button>
        </div>

        {/* Banner Details */}
        <div className="absolute bottom-16 left-4 md:left-8 lg:left-16 text-white container mx-auto z-10 pr-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl"
          >
            <h1 className="text-5xl md:text-7xl font-heading font-extrabold mb-4 drop-shadow-lg leading-tight">
              {dest.name} {dest.isPackage ? '' : 'Trek'}
            </h1>
            
            {/* Meta Line */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-white/90 text-sm md:text-lg mb-8 font-light">
              <span className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-accent" /> {dest.state || 'Uttarakhand'}, India
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/30 hidden sm:inline"></span>
              <span className="flex items-center gap-2">
                <FaClock className="text-accent" /> {dest.duration || '4 Days / 3 Nights'}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-white/30 hidden sm:inline"></span>
              <span className="flex items-center gap-2">
                <FaHiking className="text-accent" /> Moderate - Challenging
              </span>
            </div>

            {/* Book Now Button on Hero */}
            <a href="#booking-form-section">
              <button className="bg-accent hover:bg-accent/90 text-white font-bold px-8 py-4 rounded-full text-lg shadow-lg hover:shadow-xl hover:shadow-accent/20 transition-all hover:scale-105 cursor-pointer">
                Book This Trip
              </button>
            </a>
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-8 mt-12">
        
        {/* Quick Info Panel */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          <div className="bg-white p-6 rounded-[2rem] border border-gray-200/80 shadow-sm flex flex-col items-center text-center">
            <FaClock className="text-3xl text-accent mb-3" />
            <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Duration</span>
            <span className="font-bold text-primary text-base md:text-lg">{dest.duration || '4 Days'}</span>
          </div>

          <div className="bg-white p-6 rounded-[2rem] border border-gray-200/80 shadow-sm flex flex-col items-center text-center">
            <FaHiking className="text-3xl text-accent mb-3" />
            <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Altitude</span>
            <span className="font-bold text-primary text-base md:text-lg">12,500 ft</span>
          </div>

          <div className="bg-white p-6 rounded-[2rem] border border-gray-200/80 shadow-sm flex flex-col items-center text-center">
            <FaBed className="text-3xl text-accent mb-3" />
            <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Starts From</span>
            <span className="font-bold text-accent text-base md:text-lg">{dest.price}</span>
          </div>

          <div className="bg-white p-6 rounded-[2rem] border border-gray-200/80 shadow-sm flex flex-col items-center text-center">
            <FaStar className="text-3xl text-accent mb-3" />
            <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-1">Rating</span>
            <span className="font-bold text-primary text-base md:text-lg flex items-center gap-1">
              {dest.rating || '4.8'} <span className="text-yellow-400 text-sm">★</span>
            </span>
          </div>
        </div>

        {/* Day-By-Day Itinerary */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold font-heading text-primary mb-12 border-b-2 border-accent pb-3 inline-block">
            Day-By-Day Itinerary
          </h3>

          <div className="space-y-12 relative before:absolute before:inset-0 before:ml-6 before:-translate-x-px before:h-full before:w-0.5 before:bg-gray-200">
            {itinerary.map((item, index) => (
              <div key={index} className="relative flex flex-col md:flex-row gap-8 group">
                {/* Timeline dot */}
                <div className="flex items-center justify-center w-12 h-12 rounded-full border-4 border-white bg-accent text-white shadow-md shrink-0 z-10 font-bold text-lg font-heading group-hover:scale-110 transition-transform">
                  {item.day}
                </div>

                {/* Day Content Card */}
                <div className="flex-1 bg-white p-8 rounded-[2rem] border border-gray-200/80 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col md:flex-row gap-8 items-center">
                  <div className="flex-1">
                    <span className="font-bold text-accent text-xs uppercase tracking-widest bg-blue-50 px-3 py-1 rounded-full mb-3 inline-block">
                      Day {item.day}
                    </span>
                    <h4 className="font-bold text-2xl text-primary mb-3">{item.title}</h4>
                    <p className="text-gray-600 text-base leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="w-full md:w-48 h-32 shrink-0 rounded-2xl overflow-hidden shadow-sm">
                    <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Inclusions & Exclusions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {/* Inclusions */}
          <div className="bg-white p-8 rounded-[2rem] border border-gray-200/80 shadow-sm">
            <h3 className="text-2xl font-bold font-heading text-primary mb-6 flex items-center gap-3 border-b border-gray-100 pb-4">
              <FaCheckCircle className="text-green-500" /> Inclusions
            </h3>
            <ul className="space-y-4">
              {inclusions.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-600">
                  <span className="text-green-500 text-lg mt-0.5">+</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Exclusions */}
          <div className="bg-white p-8 rounded-[2rem] border border-gray-200/80 shadow-sm">
            <h3 className="text-2xl font-bold font-heading text-primary mb-6 flex items-center gap-3 border-b border-gray-100 pb-4">
              <FaTimesCircle className="text-red-500" /> Exclusions
            </h3>
            <ul className="space-y-4">
              {exclusions.map((item, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-600">
                  <span className="text-red-500 text-lg mt-0.5">-</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Gear Checklist & Booking Section Side-By-Side */}
        <div id="booking-form-section" className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Gear List (Left) */}
          <div className="w-full lg:w-1/2 bg-white p-8 rounded-[2rem] border border-gray-200/80 shadow-sm">
            <h3 className="text-2xl font-bold font-heading text-primary mb-6 border-b border-gray-100 pb-4 flex items-center gap-3">
              <FaHiking className="text-accent" /> Gear List Checklist
            </h3>
            <p className="text-gray-500 text-sm mb-6 leading-relaxed">
              Ensure you pack the following essential items before departing for a safe and comfortable experience.
            </p>
            <div className="space-y-3">
              {gearItems.map((item, i) => (
                <label key={i} className="flex items-center gap-3 text-sm text-gray-600 cursor-pointer select-none">
                  <input type="checkbox" className="w-4 h-4 rounded text-accent focus:ring-accent border-gray-300" />
                  <span>{item}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Booking Section Form (Right) */}
          <div className="w-full lg:w-1/2 bg-white p-8 rounded-[2rem] border border-gray-200/80 shadow-sm relative">
            <h3 className="text-2xl font-bold font-heading text-primary mb-6 border-b border-gray-100 pb-4">
              Booking Section
            </h3>

            {bookingStatus === 'success' ? (
              <div className="text-center py-8">
                <FaCheckCircle className="text-green-500 text-5xl mx-auto mb-4" />
                <h4 className="text-xl font-bold text-primary mb-2">Booking Requested!</h4>
                <p className="text-gray-500 text-sm">
                  Thank you! Our travel expert will contact you shortly on your email/phone.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">First Name *</label>
                    <input 
                      type="text" 
                      name="firstName" 
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      placeholder="John" 
                      className="border border-gray-200 rounded-xl p-3 outline-none focus:border-accent text-sm bg-gray-50/50"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Last Name *</label>
                    <input 
                      type="text" 
                      name="lastName" 
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      placeholder="Doe" 
                      className="border border-gray-200 rounded-xl p-3 outline-none focus:border-accent text-sm bg-gray-50/50"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Email Address *</label>
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    placeholder="john.doe@example.com" 
                    className="border border-gray-200 rounded-xl p-3 outline-none focus:border-accent text-sm bg-gray-50/50"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">WhatsApp / Phone</label>
                  <input 
                    type="tel" 
                    name="phone" 
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 XXXXX XXXXX" 
                    className="border border-gray-200 rounded-xl p-3 outline-none focus:border-accent text-sm bg-gray-50/50"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Special Message / Requests</label>
                  <textarea 
                    name="message" 
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="3" 
                    placeholder="Any health conditions, dietary restrictions or travel requests..."
                    className="border border-gray-200 rounded-xl p-3 outline-none focus:border-accent text-sm bg-gray-50/50 resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  disabled={bookingStatus === 'submitting'}
                  className="w-full bg-accent hover:bg-accent/90 text-white font-bold py-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {bookingStatus === 'submitting' ? 'Submitting...' : 'Book This Trek'}
                </button>
              </form>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};

export default PackageDetail;
