import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-20 pb-10">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-3 mb-6">
              <img src="/pragati-trails-logo.jpeg" alt="Pragati Trails Logo" className="h-16 w-auto object-contain bg-white rounded-full p-1 shadow-md" />
              <span className="text-3xl font-heading font-bold">
                Radha swami <span className="text-accent">Travels</span>
              </span>
            </Link>
            <p className="text-muted/80 mb-6 text-sm leading-relaxed">
              Radha Swami Travels The Green Valley Farm Tours & Travel is a trusted tour company specializing in Uttarakhand, Himachal Pradesh, and spiritual tourism. We focus on comfortable travel, quality accommodations, affordable pricing, and excellent customer service to make every trip memorable and hassle-free.
            </p>
            <div className="flex flex-col gap-3">
              <h4 className="font-semibold text-lg">Subscribe Newsletter</h4>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  className="bg-secondary/40 border border-white/10 text-white px-4 py-3 rounded-l-xl outline-none focus:border-accent w-full text-sm placeholder:text-gray-500"
                />
                <button className="bg-accent hover:bg-accent/90 text-white font-bold px-6 py-3 rounded-r-xl transition-colors text-sm cursor-pointer">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Quick Links & Destinations */}
          <div>
            <h4 className="text-xl font-heading font-semibold mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-1/2 after:h-0.5 after:bg-accent">
              Quick Links
            </h4>
            <ul className="flex flex-col gap-3">
              {['Home', 'About Us', 'Tour Packages', 'Destinations', 'Travel Blog', 'Contact Us'].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-muted/80 hover:text-accent transition-colors text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/50"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Popular Destinations */}
          <div>
            <h4 className="text-xl font-heading font-semibold mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-1/2 after:h-0.5 after:bg-accent">
              Destinations
            </h4>
            <ul className="flex flex-col gap-3">
              {['Nainital & Mussoorie', 'Kainchi Dham', 'Kedarnath & Badrinath', 'Jim Corbett', 'Auli & Munsiyari', 'Rishikesh'].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-muted/80 hover:text-accent transition-colors text-sm flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/50"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-heading font-semibold mb-6 relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-1/2 after:h-0.5 after:bg-accent">
              Contact Info
            </h4>
            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-3 text-sm text-muted/80">
                <FaMapMarkerAlt className="text-accent mt-1 text-lg shrink-0" />
                <span>Chhatisghar<br/> India</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted/80">
                <FaPhoneAlt className="text-accent text-lg shrink-0" />
                <a href="tel:+919540640023" className="hover:text-accent transition-colors">+91 123456789</a> / <a href="tel:+918287410265" className="hover:text-accent transition-colors">123456789</a>
              </li>
              <li className="flex items-center gap-3 text-sm text-muted/80">
                <FaEnvelope className="text-accent text-lg shrink-0" />
                <a href="mailto:info@pragatitrails.com" className="hover:text-accent transition-colors">info@radhaswami.com</a>
              </li>
            </ul>
            <div className="flex gap-4 mt-8">
              {[FaFacebookF, FaTwitter, FaInstagram, FaYoutube].map((Icon, idx) => (
                <a key={idx} href="#" className="w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center hover:bg-accent hover:text-white transition-all duration-300">
                  <Icon />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted/60">
          <div className="flex flex-col items-center md:items-start gap-1">
            <p>&copy; {new Date().getFullYear()} Radha swami Tours & Travel. All rights reserved.</p>
            <p className="text-accent font-semibold">Designed & Built by <Link to="https://rixhavraj.github.io/portfolio/" target="_blank" rel="noopener noreferrer" className="text-accent font-semibold">Rishav and team</Link></p>
          </div>
          <div className="flex gap-4">
            <Link to="#" className="hover:text-accent transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-accent transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
