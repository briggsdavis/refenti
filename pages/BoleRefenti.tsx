
import React, { useState, useEffect } from 'react';

const BoleRefenti: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const keyFeatures = [
    "Boutique Luxury Apartments",
    "5,000 Built-Up Area",
    "500 Plot Size",
    "Secure Basement Parking",
    "Private Reservoir Infrastructure",
    "Exclusive Lifestyle Lounge",
    "Service-Oriented Arrival Zone",
    "Single-Unit Luxury Floors"
  ];

  const detailSections = [
    {
      title: "Boutique Quality Management",
      subtitle: "Service Excellence",
      text: "The ground floor serves as the heart for the building services. This area incorporates a professional reception and structured parking management. This infrastructure is designed to provide a high-security, service-oriented arrival experience for residents. The management model mirrors luxury standards to maintain the premium market positioning of the asset.",
      image: "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1200"
    },
    {
      title: "Low-Density Residential Layout",
      subtitle: "Absolute Privacy",
      text: "The residential stack is engineered for maximum privacy. It features a unique single-unit per floor configuration on the third through seventh levels. The second floor contains two units, while higher levels transition to total floor exclusivity. This architectural choice targets those seeking high-privacy urban residences with 360-degree exterior views.",
      image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1200"
    },
    {
      title: "Penthouse and Private Amenities",
      subtitle: "The Signature Asset",
      text: "The property is capped by a high-value duplex penthouse occupying the eighth and ninth floors. A distinguishing feature of this unit is the inclusion of a private swimming pool. Dedicated lifestyle spaces, including a resident-only lounge, further enhance the standing of the building as a top-tier luxury residence.",
      image: "https://images.unsplash.com/photo-1512918766775-256e15637686?auto=format&fit=crop&q=80&w=1200"
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
          <h1 className="font-display text-7xl md:text-[11rem] font-light text-refenti-charcoal tracking-tighter leading-none uppercase">Refenti Bole</h1>
          <p className="text-refenti-gold font-sans font-bold uppercase tracking-[0.6em] text-[10px] md:text-xs">Boutique Residential Collection</p>
        </div>
      </section>

      {/* Asset Narrative Section */}
      <section className="py-32 px-8 md:px-12 bg-white reveal">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-3">
              <p className="text-refenti-gold font-sans font-bold uppercase tracking-ultra text-[9px]">Asset Narrative</p>
              <h2 className="font-display text-4xl md:text-6xl font-light text-refenti-charcoal uppercase leading-tight">
                Project <span className="text-refenti-gold italic">Vision</span>
              </h2>
            </div>
            <p className="text-sm md:text-base text-gray-700 font-light leading-relaxed max-w-lg text-justify">
              Refenti Bole is a boutique residential development focused on high-end, low-density living. The project utilizes a service-oriented model structured to prioritize privacy and exclusive site access. Every architectural choice has been made to target a niche market seeking total floor exclusivity and 360-degree views.
            </p>
          </div>
          <div className="relative aspect-[16/10] overflow-hidden rounded-[2.5rem] shadow-2xl">
             <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" alt="Bole Perspective" />
          </div>
        </div>
      </section>

      {/* Project Features Section */}
      <section className="py-24 px-8 bg-refenti-offwhite reveal border-t border-gray-100">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="space-y-3">
            <p className="text-refenti-gold font-sans font-bold uppercase tracking-ultra text-[9px]">Scope of Attributes</p>
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
      <section className="bg-white py-32">
        <div className="max-w-7xl mx-auto px-8 md:px-12 mb-16">
           <div className="space-y-3">
              <p className="text-refenti-gold font-sans font-bold uppercase tracking-ultra text-[9px]">Technical Depth</p>
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

export default BoleRefenti;
