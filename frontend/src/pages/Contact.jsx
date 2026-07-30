import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FaPhoneAlt, FaMapMarkerAlt, FaPaperPlane } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Contact = () => {
  const [searchParams] = useSearchParams();
  const subjectParam = searchParams.get('subject');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: subjectParam || '',
    message: ''
  });

  useEffect(() => {
    if (subjectParam) {
      setFormData(prev => ({ ...prev, subject: subjectParam }));
    }
  }, [subjectParam]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you! Your message has been sent successfully. We will contact you shortly.');
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-primary mb-4">Contact Us</h1>
          <p className="text-lg text-gray-500">Have questions or want to book a trip? Get in touch with us.</p>
        </div>

        {/* Main Card exactly like screenshot */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] overflow-hidden"
        >
          <div className="flex flex-col lg:flex-row">
            
            {/* Left Side: Form */}
            <div className="lg:w-1/2 p-8 md:p-12 lg:pr-16 lg:border-r border-gray-100">
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                
                <div>
                  <input 
                    type="text" 
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your Name" 
                    required
                    className="w-full border border-gray-200 rounded-sm px-4 py-3 outline-none focus:border-accent text-gray-700 transition-colors"
                  />
                </div>

                <div>
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your Email" 
                    required
                    className="w-full border border-gray-200 rounded-sm px-4 py-3 outline-none focus:border-accent text-gray-700 transition-colors"
                  />
                </div>

                <div>
                  <input 
                    type="text" 
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject" 
                    required
                    className="w-full border border-gray-200 rounded-sm px-4 py-3 outline-none focus:border-accent text-gray-700 transition-colors"
                  />
                </div>

                <div>
                  <textarea 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your Message" 
                    required
                    rows="6"
                    className="w-full border border-gray-200 rounded-sm px-4 py-3 outline-none focus:border-accent text-gray-700 resize-none transition-colors"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  className="bg-[#FF5A36] hover:bg-[#E04B2A] text-white font-bold py-4 px-8 mt-2 w-max transition-colors text-sm tracking-wider"
                >
                  SEND MESSAGE
                </button>

              </form>
            </div>

            {/* Right Side: Map and Info */}
            <div className="lg:w-1/2 p-8 md:p-12 flex flex-col">
              
              {/* Google Map Embedded */}
              <div className="w-full h-64 md:h-80 bg-gray-200 mb-10 overflow-hidden">
                {/* Embedded Map for Greater Noida */}
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112173.65584852932!2d77.42065849507963!3d28.497525338148842!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cea64b8e8d839%3A0x8670b8822064df19!2sGreater%20Noida%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Greater Noida Map"
                  className="grayscale hover:grayscale-0 transition-all duration-700"
                ></iframe>
              </div>

              {/* Contact Info Columns */}
              <div className="flex flex-col sm:flex-row gap-8 justify-between mt-auto">
                
                {/* Column 1 */}
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 text-lg mb-4">Chhatisghar HQ</h4>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <FaPhoneAlt className="text-[#FF5A36] mt-1" />
                      <a href="tel:+919540640023" className="text-gray-500 hover:text-[#FF5A36] transition-colors">(+91) 1234789</a>
                    </li>
                    <li className="flex items-start gap-3">
                      <FaMapMarkerAlt className="text-[#FF5A36] mt-1 text-xl shrink-0" />
                      <span className="text-gray-500">Chhatisghar, India</span>
                    </li>
                  </ul>
                </div>

                {/* Column 2 */}
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 text-lg mb-4">Support Desk</h4>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <FaPhoneAlt className="text-[#FF5A36] mt-1" />
                      <a href="tel:+918287410265" className="text-gray-500 hover:text-[#FF5A36] transition-colors">(+91) 123456789</a>
                    </li>
                    <li className="flex items-start gap-3">
                      <FaMapMarkerAlt className="text-[#FF5A36] mt-1 text-xl shrink-0" />
                      <span className="text-gray-500">Support Center, Chhatisghar</span>
                    </li>
                  </ul>
                </div>

              </div>

            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Contact;
