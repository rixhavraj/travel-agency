import { motion } from 'framer-motion';
import { FaCalendarAlt, FaArrowRight, FaShareAlt, FaRegHeart } from 'react-icons/fa';

const BlogSection = ({ data = [] }) => {
  if (!data || data.length === 0) return null;

  return (
    <section className="py-24 bg-primary text-white relative">
      <div className="container mx-auto px-4 md:px-8">
        
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl font-heading font-bold text-white"
            >
              Check Out Our <span className="text-accent">Blog Post</span>
            </motion.h2>
          </div>
          <button className="mt-6 md:mt-0 text-white/75 hover:text-accent transition-colors flex items-center gap-2 cursor-pointer">
            View all post <FaArrowRight />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((post, index) => (
            <motion.article 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-secondary rounded-[2rem] overflow-hidden shadow-lg border border-white/10 flex flex-col hover:-translate-y-1 transition-transform duration-300"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden group">
                <img 
                  src={post.local_img_path ? `https://travel-agency-2kkx.onrender.com${post.local_img_path}` : ''} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-white flex items-center gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full border border-accent"></span>
                  Ranthambore, Rajasthan
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-xs font-semibold text-white/60 mb-4 uppercase tracking-wider">
                  <span className="flex items-center gap-1.5 text-accent"><FaCalendarAlt /> {post.date}</span>
                  <span className="w-1 h-1 rounded-full bg-white/20"></span>
                  <span>{post.readTime}</span>
                </div>
                
                <h3 className="text-2xl font-bold font-heading text-white mb-3 leading-snug hover:text-accent transition-colors cursor-pointer">
                  {post.title}
                </h3>
                
                <p className="text-white/70 mb-6 line-clamp-2 leading-relaxed">
                  {post.description}
                </p>
                
                <div className="mt-auto pt-6 border-t border-white/10 flex justify-between items-center">
                  <button className="bg-accent hover:bg-accent/90 text-white px-6 py-2.5 rounded-xl font-bold transition-all text-sm shadow-sm hover:shadow-md cursor-pointer">
                    Read more
                  </button>
                  <div className="flex gap-2">
                    <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-red-500 hover:border-red-500/20 hover:bg-red-500/10 transition-all cursor-pointer">
                      <FaRegHeart />
                    </button>
                    <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-accent hover:border-accent/20 hover:bg-accent/10 transition-all cursor-pointer">
                      <FaShareAlt />
                    </button>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
};

export default BlogSection;
