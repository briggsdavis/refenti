
import React, { useState, useEffect } from 'react';

const BulbulaResidential: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const keyFeatures = [
    "Mixed-Use Commercial and Hotel",
    "30,000 Built-Up Area",
    "4,622 Plot Size",
    "Premium Hotel Floors 5 to 10",
    "7,000 Daily Footfall Baseline",
    "Two-Level Basement Parking",
    "800 Ground Terrace",
    "Refenti Role: Developer and Operator"
  ];

  const detailSections = [
    {
      title: "Commercial Asset Specification",
      subtitle: "Professional Retail & Office",
      text: "The asset features high-capacity commercial and retail zones designed for professional tenant operations and high-volume pedestrian traffic. The floor plate incorporates wide circulation areas to ensure smooth traffic flow across the ground, first, and second levels. Professional office spaces occupy the third floor, providing a stabilized daytime occupancy base for the complex.",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1200"
    },
    {
      title: "Leisure and Lifestyle Infrastructure",
      subtitle: "Destination Social Hub",
      text: "The development includes specialized open-air hospitality zones, notably a signature ground-floor terrace and a garden-style restaurant facility. The top floor is designated for a premium restaurant and swimming pool concept, serving as the building's primary leisure anchor. These features are positioned to maximize the property value as a regional dining and social destination.",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1200"
    },
    {
      title: "Hospitality and Amenity Integration",
      subtitle: "The Hotel Ecosystem",
      text: "The hotel component consists of planned rooms and suites integrated with a comprehensive amenity floor on the fourth level. This level includes a gym, spa, and reception. This structural layout ensures hotel guests have direct internal access to the retail and dining ecosystem. The operational launch of these floors is intended to diversify the asset revenue streams and increase total property valuation.",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=1200"
    }
  ];

  return (
    <div className="bg-refenti-offwhite min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[85vh] w-full flex items-end justify-center overflow-hidden pb-24">
        <div 
          className="absolute inset-[-5%]"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1449156001437-37c645d9bc01?auto=format&fit=crop&q=80&w=2000')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `translateY(${-scrollY * 0.12}px)`,
            willChange: 'transform'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-refenti-offwhite via-refenti-offwhite/40 to-transparent pointer-events-none" />
        
        <div className="relative z-10 text-center space-y-4 px-6 max-w-6xl mx-auto reveal active">
          <h1 className="font-display text-7xl md:text-[11rem] font-light text-refenti-charcoal tracking-tighter leading-none uppercase">Refenti Bulbula</h1>
          <p className="text-refenti-gold font-sans font-bold uppercase tracking-[0.6em] text-[10px] md:text-xs">Mixed-Use Asset Collection</p>
        </div>
      </section>

      {/* Asset Narrative Section */}
      <section className="py-32 px-8 md:px-12 bg-white reveal">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-3">
              <p className="text-refenti-gold font-sans font-bold uppercase tracking-ultra text-[9px]">Asset Narrative</p>
              <h2 className="font-display text-4xl md:text-6xl font-light text-refenti-charcoal uppercase leading-tight">Project <span className="text-refenti-gold italic">Convergence</span></h2>
            </div>
            <p className="text-sm md:text-base text-gray-700 font-light leading-relaxed max-w-lg text-justify">
              Refenti Bulbula is a flagship mixed-use asset in the Bole Bulbula district. This project integrates premium commercial space with a high-capacity hotel component designed to operate as a self-sustaining urban destination. With a plot size of 4,622 sqm and an estimated daily footfall of 7,000, it represents a core node for commercial activity and leisure.
            </p>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-[2.5rem] shadow-2xl">
             <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" alt="Bulbula Commercial Hub" />
          </div>
        </div>
      </section>

      {/* Project Features Section */}
      <section className="py-24 px-8 bg-refenti-offwhite reveal border-t border-gray-100">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="space-y-3">
            <p className="text-refenti-gold font-sans font-bold uppercase tracking-ultra text-[9px]">Operational Data</p>
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
              <p className="text-refenti-gold font-sans font-bold uppercase tracking-ultra text-[9px]">Technical Specs</p>
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

export default BulbulaResidential;
