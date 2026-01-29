
import React, { useState, useEffect } from 'react';
import { getEvents, getNews } from '../constants';
import { NewsItem, EventItem } from '../types';

const NewsCard: React.FC<{ item: NewsItem; index: number }> = ({ item, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div 
      className="group relative bg-white overflow-hidden rounded-[2.5rem] shadow-sm transition-all duration-1000 reveal active h-fit"
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="aspect-[16/10] overflow-hidden relative">
        <img 
          src={item.image} 
          alt={item.title} 
          className="w-full h-full object-cover grayscale-[0.3] group-hover:grayscale-0 transition-transform duration-1000"
        />
        <div className="absolute top-6 left-6">
          <span className="bg-refenti-gold text-white px-4 py-1.5 rounded-full text-[8px] font-bold uppercase tracking-ultra">
            {item.category}
          </span>
        </div>
      </div>
      <div className="p-8 space-y-4">
        <p className="text-gray-800 text-[8px] font-bold uppercase tracking-ultra">{item.date}</p>
        <h3 className="font-display text-3xl font-light text-refenti-charcoal leading-none">
          {item.title}
        </h3>
        <p className="text-gray-700 font-light text-sm leading-relaxed text-justify">
          {item.excerpt}
        </p>
        
        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-refenti-gold text-[8px] font-bold uppercase tracking-ultra border-b border-transparent hover:border-refenti-gold pb-1 transition-all flex items-center gap-2"
        >
          {isExpanded ? 'Close Brief' : 'View Brief'}
        </button>

        <div 
          className={`overflow-hidden transition-all duration-1000 ease-in-out ${isExpanded ? 'max-h-[500px] opacity-100 mt-6 pt-6 border-t border-gray-100' : 'max-h-0 opacity-0'}`}
        >
          <p className="text-gray-700 font-light text-[15px] leading-relaxed italic text-justify">
            {item.content || item.excerpt}
          </p>
        </div>
      </div>
    </div>
  );
};

const EventsNews: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const events = getEvents();
  const news = getNews();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-refenti-offwhite min-h-screen">
      <section className="relative h-[80vh] w-full flex items-end justify-center bg-refenti-offwhite overflow-hidden pb-24">
        <div 
          className="absolute inset-[-5%]"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?auto=format&fit=crop&q=80&w=2000')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `translateY(${-scrollY * 0.1}px)`,
            willChange: 'transform'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-refenti-offwhite via-refenti-offwhite/80 to-transparent pointer-events-none" />
        
        <div className="relative z-10 text-center space-y-8 px-4 max-w-6xl mx-auto reveal active">
          <div className="space-y-6">
            <p className="text-refenti-gold font-sans font-bold uppercase tracking-[0.7em] text-[10px] md:text-xs">Institutional Updates</p>
            <h1 className="font-display text-7xl md:text-[9rem] font-light text-refenti-charcoal tracking-tighter leading-none uppercase">News</h1>
          </div>
        </div>
      </section>

      <div className="px-6 md:px-12 py-24 md:py-40">
        <div className="max-w-7xl mx-auto space-y-32 md:space-y-48">
          <section className="space-y-16">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-gray-300 pb-8 reveal active">
              <div className="space-y-2">
                <p className="text-refenti-gold font-sans font-bold uppercase tracking-ultra text-[8px]">Sector Insights</p>
                <h2 className="font-display text-4xl md:text-6xl font-light text-refenti-charcoal uppercase">Asset <br className="hidden md:block" /> Milestones</h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
              {news.map((item, idx) => (
                <NewsCard key={item.id} item={item} index={idx} />
              ))}
            </div>
          </section>

          <section className="space-y-20">
             <div className="text-center space-y-4 reveal active">
                <p className="text-refenti-gold font-sans font-bold uppercase tracking-ultra text-[9px]">Strategic Engagements</p>
                <h2 className="font-display text-5xl md:text-7xl font-light text-refenti-charcoal uppercase">Technical Summits</h2>
             </div>

             <div className="space-y-8 max-w-5xl mx-auto">
               {events.map((event, idx) => (
                 <div 
                   key={event.id}
                   className="group bg-white p-8 md:p-12 rounded-[3rem] shadow-sm border border-gray-200 flex flex-col md:flex-row items-center gap-10 md:gap-16 transition-all duration-700 reveal active"
                   style={{ transitionDelay: `${idx * 200}ms` }}
                 >
                   <div className="w-full md:w-1/3 aspect-square overflow-hidden rounded-[2rem] shadow-inner bg-gray-50 flex-shrink-0">
                      <img src={event.image} className="w-full h-full object-cover" alt={event.title} />
                   </div>
                   <div className="flex-1 space-y-6">
                      <div className="space-y-2">
                        <div className="flex items-center gap-4">
                          <span className="text-refenti-gold font-sans font-bold uppercase tracking-ultra text-[10px]">{event.date}</span>
                          <span className="w-8 h-px bg-gray-300" />
                          <span className="text-gray-800 font-sans font-bold uppercase tracking-ultra text-[10px]">{event.location}</span>
                        </div>
                        <h3 className="font-display text-4xl font-light text-refenti-charcoal leading-none">{event.title}</h3>
                      </div>
                      <p className="text-gray-800 font-light text-base leading-relaxed line-clamp-3 text-justify">
                        {event.details}
                      </p>
                      <button className="bg-refenti-charcoal text-white px-10 py-4 rounded-xl text-[10px] font-bold uppercase tracking-ultra transition-all duration-500 hover:bg-refenti-gold shadow-xl">
                        Inquire for Details
                      </button>
                   </div>
                 </div>
               ))}
             </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default EventsNews;
