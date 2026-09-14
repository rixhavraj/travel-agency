import { useState, useEffect } from 'react';
import HeroSection from '../components/home/HeroSection';
import SmartBookingWidget from '../components/home/SmartBookingWidget';
import AITripPlanner from '../components/home/AITripPlanner';
import PopularDestinations from '../components/home/PopularDestinations';
import TourPackages from '../components/home/TourPackages';
import WhyChooseUs from '../components/home/WhyChooseUs';
import Testimonials from '../components/home/Testimonials';
import Partners from '../components/home/Partners';
import BlogSection from '../components/home/BlogSection';
import StatisticsSection from '../components/home/StatisticsSection';
import { fetchHomeData } from '../utils/api';

const Home = () => {
  const [homeData, setHomeData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    fetchHomeData().then(data => {
      if (isMounted) {
        setHomeData(data);
        setLoading(false);
      }
    });
    return () => { isMounted = false };
  }, []);



  return (
    <div className="min-h-screen bg-primary text-white">
      <HeroSection data={homeData?.hero} />
      
      {/* Search & Booking Section - pulled up to overlap hero slightly */}
      <div className="relative z-20 -mt-12 sm:-mt-24 mb-12 sm:mb-16 container mx-auto px-4 md:px-8">
        <SmartBookingWidget />
      </div>

      <AITripPlanner />
      <StatisticsSection />

      <PopularDestinations data={homeData?.destinations} loading={loading} />
      <TourPackages data={homeData?.packages} />
      <WhyChooseUs data={homeData?.whyChooseUs} />
      <Testimonials />
      <Partners />
      <BlogSection data={homeData?.blogs} />
    </div>
  );
};

export default Home;
