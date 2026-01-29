
import React, { useState, useEffect } from 'react';

const KazanchesExecutive: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const keyFeatures = [
    "City-Scale Mixed-Use Hub",
    "104,000 Built-Up Area",
    "28-Story Landmark Structure",
    "25,000 Luxury Apartments",
    "15,000 Hotel Infrastructure",
    "5,000 Event Facility",
    "31,000 Commercial and Office",
    "26,000 Parking Capacity"
  ];

  const detailSections = [
    {
      title: "Urban Commercial and Office Engine",
      subtitle: "The Business Center",
      text: "The development allocates 31,000 to professional office and modern mall spaces designed to handle major commercial footfall. This retail core is positioned to attract brands and corporate tenants seeking a central city presence. The layout is optimized for high occupancy and long-term commercial stability.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200"
    },
    {
      title: "Strategic Event and Hospitality Wing",
      subtitle: "International Gathering Hub",
      text: "A significant 5,000 zone is dedicated to Meetings, Conferences, and Exhibitions. This area provides high-capacity event infrastructure. This is paired with 15,000 of hotel space to cater to the international business community. The integration of these components establishes the project as a primary venue for regional gatherings.",
      image: "https://images.unsplash.com/photo-1540575861501-7cf05a4b125a?auto=format&fit=crop&q=80&w=1200"
    },
    {
      title: "Modern Residential Integration",
      subtitle: "Vertical Living Experience",
      text: "The project includes 25,000 of residential apartments positioned within the 28-story frame. This provides a live-work environment in the heart of the business district. Residents have immediate vertical access to the dining, networking, and commercial services of the building.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200"
    }
  ];

  return (
    <div className="bg-refenti-offwhite min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[85vh] w-full flex items-end justify-center overflow-hidden pb-24">
        <div 
          className="absolute inset-[-5%]"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `translateY(${-scrollY * 0.12}px)`,
            willChange: 'transform'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-refenti-offwhite via-refenti-offwhite/40 to-transparent pointer-events-none" />
        
        <div className="relative z-10 text-center space-y-4 px-6 max-w-6xl mx-auto reveal active">
          <p className="text-refenti-gold font-sans font-bold uppercase tracking-[0.6em] text-[10px] md:text-xs">Landmark Asset Collection</p>
          <h1 className="font-display text-7xl md:text-[11rem] font-light text-refenti-charcoal tracking-tighter leading-none uppercase">Refenti Kazanchis</h1>
        </div>
      </section>

      {/* Asset Narrative Section */}
      <section className="py-32 px-8 md:px-12 bg-white reveal">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-3">
              <p className="text-refenti-gold font-sans font-bold uppercase tracking-ultra text-[9px]">Asset Narrative</p>
              <h2 className="font-display text-4xl md:text-6xl font-light text-refenti-charcoal uppercase leading-tight">Project <span className="text-refenti-gold italic">Identity</span></h2>
            </div>
            <p className="text-sm md:text-base text-gray-700 font-light leading-relaxed max-w-lg text-justify">
              Refenti Kazanchis is a city-scale mixed-use development designed to serve as a landmark urban hub. This project integrates multiple high-capacity spaces—commercial, residential, and hospitality—to create a vibrant, high-value destination. At 28 stories, it represents the structural future of the Kazanchis business district.
            </p>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-[2.5rem] shadow-2xl">
             <img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" alt="Kazanchis Rendering" />
          </div>
        </div>
      </section>

      {/* Project Features Section */}
      <section className="py-24 px-8 bg-refenti-offwhite reveal border-t border-gray-100">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="space-y-3">
            <p className="text-refenti-gold font-sans font-bold uppercase tracking-ultra text-[9px]">Functional Scope</p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-refenti-charcoal uppercase">Project <span className="text-refenti-gold italic">Features</span></h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-200 border border-gray-200 rounded-[3rem] overflow-hidden shadow-sm">
            {keyFeatures.map((feature, idx) => (
              <div key={idx} className="bg-white p-10 md:p-14 flex flex-col justify-center items-center text-center group hover:bg-refenti-offwhite transition-colors duration-500">
                <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-4 group-hover:text-refenti-gold">Attribute 0{idx + 1}</span>
                <p className="font-display text-xl md:text-2xl text-refenti-charcoal leading-tight">{feature}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Attributes Section */}
      <section className="bg-white pb-32">
        <div className="max-w-7xl mx-auto px-8 md:px-12 py-24">
           <div className="space-y-3">
              <p className="text-refenti-gold font-sans font-bold uppercase tracking-ultra text-[9px]">Core Pillars</p>
              <h2 className="font-display text-4xl md:text-6xl font-light text-refenti-charcoal uppercase">Main <span className="text-refenti-gold italic">Attributes</span></h2>
            </div>
        </div>
        <div className="max-w-7xl mx-auto px-8 md:px-12">
          {detailSections.map((section, idx) => (
            <div 
              key={idx} 
              className={`flex flex-col md:flex-row items-center gap-16 md:gap-32 py-24 md:py-40 border-b border-gray-50 last:border-0 reveal ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="w-full md:w-1/2 aspect-[4/5] rounded-[4rem] overflow-hidden shadow-2xl relative">
                <img src={section.image} className="w-full h-full object-cover" alt={section.title} />
                <div className="absolute inset-0 bg-refenti-charcoal/5 pointer-events-none" />
              </div>
              
              <div className="w-full md:w-1/2 space-y-8">
                <div className="space-y-3">
                  <p className="text-refenti-gold font-sans font-bold uppercase tracking-widest text-[10px]">{section.subtitle}</p>
                  <h3 className="font-display text-5xl md:text-7xl font-light text-refenti-charcoal leading-none uppercase">
                    {section.title.split(' ').slice(0, -1).join(' ')} <br/>
                    <span className="text-refenti-gold italic">{section.title.split(' ').slice(-1)}</span>
                  </h3>
                </div>
                <div className="w-20 h-px bg-refenti-gold" />
                <p className="text-gray-700 font-light text-sm leading-relaxed max-w-lg text-justify">
                  {section.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default KazanchesExecutive;
