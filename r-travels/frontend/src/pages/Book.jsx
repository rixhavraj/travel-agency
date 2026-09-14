import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import { fetchHomeData } from '../utils/api';
import { FaUser, FaEnvelope, FaPhone, FaCalendarAlt, FaMapMarkerAlt, FaUsers, FaChild, FaHotel, FaRegCommentDots, FaCheckCircle, FaLock } from 'react-icons/fa';

const Book = () => {
  const [searchParams] = useSearchParams();
  const prefilledPackage = searchParams.get('package');

  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    selectedPackage: prefilledPackage || '',
    travelDate: '',
    adults: 2,
    children: 0,
    accommodationType: 'Deluxe',
    specialRequests: ''
  });

  useEffect(() => {
    fetchHomeData().then(data => {
      if (data && data.packages) {
        setPackages(data.packages);
      }
    });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        selectedPackage: '',
        travelDate: '',
        adults: 2,
        children: 0,
        accommodationType: 'Deluxe',
        specialRequests: ''
      });
      
      // Remove success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background pt-24 pb-20">
      <div className="container mx-auto px-4 md:px-8">
        
        <div className="text-center mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4"
          >
            Book Your <span className="text-accent">Dream Trip</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Fill out the form below to request a booking. Our travel experts will get back to you within 24 hours with a confirmed itinerary and payment details.
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
          
          {/* Booking Form (Left Side) */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:w-2/3 bg-white rounded-3xl p-8 shadow-sm border border-gray-100"
          >
            {success ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-20">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
                  <FaCheckCircle className="text-5xl text-green-500" />
                </div>
                <h3 className="text-3xl font-bold text-primary mb-2">Booking Request Sent!</h3>
                <p className="text-gray-600 text-lg max-w-md">
                  Thank you for choosing Pragati Trails. One of our experts will contact you shortly to finalize your trip details.
                </p>
                <button 
                  onClick={() => setSuccess(false)}
                  className="mt-8 px-6 py-2 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
                >
                  Book Another Trip
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Personal Details */}
                <div>
                  <h3 className="text-xl font-bold text-primary mb-4 border-b pb-2">1. Personal Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                      <div className="relative">
                        <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input 
                          type="text" 
                          name="fullName"
                          required
                          value={formData.fullName}
                          onChange={handleChange}
                          placeholder="John Doe"
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                      <div className="relative">
                        <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input 
                          type="email" 
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                        />
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                      <div className="relative">
                        <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input 
                          type="tel" 
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+91 98765 43210"
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trip Details */}
                <div>
                  <h3 className="text-xl font-bold text-primary mb-4 border-b pb-2">2. Trip Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Select Package/Destination *</label>
                      <div className="relative">
                        <FaMapMarkerAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <select 
                          name="selectedPackage"
                          required
                          value={formData.selectedPackage}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all appearance-none"
                        >
                          <option value="" disabled>Choose a package...</option>
                          <option value="Custom Itinerary">I want a Custom Itinerary</option>
                          {packages.map((pkg, idx) => (
                            <option key={idx} value={pkg.title}>{pkg.title} ({pkg.duration})</option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Travel Date *</label>
                      <div className="relative">
                        <FaCalendarAlt className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input 
                          type="date" 
                          name="travelDate"
                          required
                          value={formData.travelDate}
                          onChange={handleChange}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Accommodation Type</label>
                      <div className="relative">
                        <FaHotel className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <select 
                          name="accommodationType"
                          value={formData.accommodationType}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all appearance-none"
                        >
                          <option value="Standard">Standard (3-Star)</option>
                          <option value="Deluxe">Deluxe (4-Star)</option>
                          <option value="Premium">Premium (5-Star)</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Adults (12+ yrs)</label>
                      <div className="relative">
                        <FaUsers className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input 
                          type="number" 
                          name="adults"
                          min="1"
                          required
                          value={formData.adults}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Children (0-11 yrs)</label>
                      <div className="relative">
                        <FaChild className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input 
                          type="number" 
                          name="children"
                          min="0"
                          value={formData.children}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Info */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Special Requests / Notes</label>
                  <div className="relative">
                    <FaRegCommentDots className="absolute left-4 top-4 text-gray-400" />
                    <textarea 
                      name="specialRequests"
                      value={formData.specialRequests}
                      onChange={handleChange}
                      rows="4"
                      placeholder="e.g. Vegetarian food required, flight booking needed..."
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all resize-none"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-accent hover:bg-accent/90 text-primary font-bold py-4 rounded-xl transition-all shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
                >
                  {loading ? (
                    <span className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></span>
                  ) : (
                    "Request Booking Quote"
                  )}
                </button>
                <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mt-4">
                  <FaLock className="text-gray-400" /> Your information is secure. No payment required yet.
                </div>
              </form>
            )}
          </motion.div>

          {/* Trust Indicators (Right Side) */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:w-1/3 space-y-6"
          >
            {/* Image Box */}
            <div className="bg-white p-2 rounded-3xl shadow-sm border border-gray-100 hidden lg:block">
              <img 
                src="https://images.pexels.com/photos/15183980/pexels-photo-15183980.jpeg?auto=compress&cs=tinysrgb&w=800&q=80" 
                alt="Travel Landscape" 
                className="w-full h-48 object-cover rounded-2xl"
              />
            </div>

            {/* Why Book With Us */}
            <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
              <h4 className="font-bold text-primary text-xl mb-4">Why Book With Us?</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <FaCheckCircle className="text-green-500 mt-1" />
                  <div>
                    <strong className="block text-gray-800">Best Price Guarantee</strong>
                    <span className="text-sm text-gray-500">We offer competitive pricing with zero hidden fees.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <FaCheckCircle className="text-green-500 mt-1" />
                  <div>
                    <strong className="block text-gray-800">Expert Guidance</strong>
                    <span className="text-sm text-gray-500">Our local travel experts craft the perfect itinerary.</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <FaCheckCircle className="text-green-500 mt-1" />
                  <div>
                    <strong className="block text-gray-800">24/7 Support</strong>
                    <span className="text-sm text-gray-500">We are always available during your entire trip.</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Need Help */}
            <div className="bg-primary text-white p-6 rounded-3xl shadow-sm">
              <h4 className="font-bold text-xl mb-2">Need Help Booking?</h4>
              <p className="text-white/80 text-sm mb-4">Call our travel experts directly to book over the phone.</p>
              <div className="space-y-2">
                <a href="tel:+919540640023" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 p-3 rounded-xl transition-colors">
                  <FaPhone className="text-accent" />
                  <span className="font-medium">+91 9540640023</span>
                </a>
                <a href="tel:+918287410265" className="flex items-center gap-3 bg-white/10 hover:bg-white/20 p-3 rounded-xl transition-colors">
                  <FaPhone className="text-accent" />
                  <span className="font-medium">+91 8287410265</span>
                </a>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Book;
