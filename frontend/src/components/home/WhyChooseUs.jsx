import { motion } from 'framer-motion';

const features = [
  {
    num: '01',
    title: 'Local Expertise',
    desc: 'Our team knows the hidden spots, best timings, and real experiences that make your trip feel effortless.',
  },
  {
    num: '02',
    title: 'Tailored Trips',
    desc: "We don't sell generic routes — we shape every journey around your mood, pace, and travel style.",
  },
  {
    num: '03',
    title: 'Comfortable Rides',
    desc: 'Verified drivers, clean vehicles, and smooth routes designed for safe, comfortable journeys.',
  },
  {
    num: '04',
    title: 'Honest Pricing',
    desc: 'Clear costs, fair rates, and custom quotes that fit your requirements.',
  },
];

const WhyChooseUs = ({ data = [] }) => {
  return (
    <section className="py-24 bg-primary text-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          {/* Left Side: Text & Features */}
          <div className="lg:w-1/2 w-full">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl font-heading font-bold text-white mb-12"
            >
              Why Choose <span className="text-accent">Us?</span>
            </motion.h2>
 
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
              {features.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col"
                >
                  <span className="text-5xl font-heading font-bold text-white/20 mb-4">{item.num}</span>
                  <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                  <p className="text-white/70 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Side: Image Grid */}
          <div className="lg:w-1/2 w-full">
            <div className="grid grid-cols-2 gap-4">
              {data && data.length >= 5 && (
                <>
                  {/* Top Large Image */}
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="col-span-2 rounded-3xl overflow-hidden aspect-[2/1]"
                  >
                    <img 
                      src={`https://travel-agency-2kkx.onrender.com${data[0].local_img_path}`} 
                      alt="Taj Mahal" 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </motion.div>
                  
                  {/* Middle Row Images */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="col-span-1 rounded-3xl overflow-hidden aspect-[4/3]"
                  >
                    <img 
                      src={`https://travel-agency-2kkx.onrender.com${data[1].local_img_path}`} 
                      alt="Temple" 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="col-span-1 rounded-3xl overflow-hidden aspect-[4/3]"
                  >
                    <img 
                      src={`https://travel-agency-2kkx.onrender.com${data[2].local_img_path}`} 
                      alt="Hawa Mahal Top" 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </motion.div>

                  {/* Bottom Row Images */}
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                    className="col-span-1 rounded-3xl overflow-hidden aspect-[4/3]"
                  >
                    <img 
                      src={`https://travel-agency-2kkx.onrender.com${data[3].local_img_path}`} 
                      alt="India Travel" 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </motion.div>
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="col-span-1 rounded-3xl overflow-hidden aspect-[4/3]"
                  >
                    <img 
                      src={`https://travel-agency-2kkx.onrender.com${data[4].local_img_path}`} 
                      alt="Hawa Mahal Bottom" 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    />
                  </motion.div>
                </>
              )}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
