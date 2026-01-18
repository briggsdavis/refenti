
import React, { useState, useEffect, useRef } from 'react';
import { PROJECTS } from '../constants';

const FeatureSection: React.FC<{ feature: string; index: number }> = ({ feature, index }) => {
  const [targetProgress, setTargetProgress] = useState(0);
  const [smoothedProgress, setSmoothedProgress] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      const start = windowHeight;
      const end = windowHeight * 0.15;
      const current = rect.top;
      
      let p = (start - current) / (start - end);
      p = Math.min(Math.max(p, 0), 1);
      setTargetProgress(p);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const animate = () => {
      setSmoothedProgress((prev) => {
        const diff = targetProgress - prev;
        const next = prev + diff * 0.025;
        if (Math.abs(diff) < 0.0001) return targetProgress;
        return next;
      });
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [targetProgress]);

  const isLeft = index % 2 === 0;
  const widthPercentage = 40 + (smoothedProgress * 60);

  return (
    <div 
      ref={sectionRef}
      className={`max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-24 py-16 px-8 md:px-12 ${!isLeft ? 'md:flex-row-reverse' : ''}`}
    >
      <div className={`w-full md:w-1/2 h-[50vh] md:h-[60vh] flex ${isLeft ? 'justify-end' : 'justify-start'}`}>
        <div 
          className="h-full overflow-hidden rounded-[3.5rem] shadow-2xl relative"
          style={{ 
            width: `${widthPercentage}%`,
            transition: 'none' 
          }}
        >
          <div 
            className="absolute h-full"
            style={{ 
              width: '50vw',
              right: isLeft ? 0 : 'auto',
              left: !isLeft ? 0 : 'auto'
            }}
          >
            <img 
              src={`https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1200&sig=${index + 105}`} 
              className="w-full h-full object-cover"
              alt={feature}
            />
          </div>
        </div>
      </div>

      <div className={`w-full md:w-1/2 space-y-6 reveal px-4 md:px-12`}>
        <div className="space-y-2">
          <span className="text-refenti-gold font-display text-7xl font-light opacity-10 leading-none select-none">
            0{index + 1}
          </span>
          <h3 className="font-display text-4xl md:text-5xl font-light tracking-tight text-refenti-charcoal leading-[1.1]">
            {feature}
          </h3>
        </div>
        <div className="space-y-4 max-w-lg">
          <p className="text-gray-500 font-light leading-relaxed text-lg">
            At Bole High-Rise, {feature.toLowerCase()} is more than an amenity—it is a cornerstone of the resident experience.
          </p>
          <div className="flex items-center gap-6">
            <div className="w-12 h-[1px] bg-refenti-gold" />
            <p className="text-refenti-gold font-sans font-bold uppercase tracking-[0.3em] text-[10px]">Standard of Excellence</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const BoleRefenti: React.FC = () => {
  const property = PROJECTS[0];
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const amenities = [
    "24/7 Valet & Concierge",
    "Rooftop Helipad",
    "Wellness Center & Spa",
    "Private Cinema",
    "Wine Cellar",
    "Infinity Sky Pool"
  ];

  return (
    <div className="bg-refenti-offwhite min-h-screen">
      {/* Standard Hero Banner */}
      <section className="relative h-screen w-full flex items-end justify-center bg-refenti-offwhite overflow-hidden pb-32">
        <div 
          className="absolute inset-0 transition-transform duration-1000 ease-out"
          style={{ 
            backgroundImage: `url('${property.image}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `scale(${1 + scrollY * 0.0001}) translateY(${scrollY * 0.1}px)`,
          }}
        />
        {/* Deeper gradient for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-refenti-offwhite via-refenti-offwhite/80 to-transparent" />
        
        <div className="relative z-10 text-center space-y-12 px-4 max-w-6xl mx-auto reveal">
          <div className="space-y-6">
            <p className="text-refenti-gold font-sans font-bold uppercase tracking-[0.7em] text-[10px] md:text-xs">The Signature Collection</p>
            <h1 className="font-display text-7xl md:text-[10rem] font-light text-refenti-charcoal tracking-tighter leading-none uppercase">Bole High-Rise</h1>
          </div>
        </div>
      </section>

      {/* Discreet Top Action Bar */}
      <section className="sticky top-[80px] z-40 bg-refenti-offwhite/80 backdrop-blur-md border-b border-gray-100 reveal">
        <div className="max-w-7xl mx-auto px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-refenti-charcoal font-sans font-bold uppercase tracking-[0.2em] text-[10px]">Project Inquiry Portal</p>
          <div className="flex items-center gap-6">
            <button className="text-refenti-charcoal hover:text-refenti-gold transition-colors font-sans font-bold uppercase tracking-widest text-[10px] border-b border-transparent hover:border-refenti-gold pb-1">
              Download Brochure
            </button>
            <button className="bg-refenti-charcoal text-white px-8 py-3 rounded-full font-sans font-bold uppercase tracking-widest text-[9px] hover:bg-refenti-gold transition-all">
              Acquire Investment Dossier
            </button>
          </div>
        </div>
      </section>

      <section className="py-20 px-12 bg-refenti-offwhite reveal">
        <div className="max-w-5xl mx-auto text-center space-y-10">
          <p className="text-2xl md:text-4xl font-display font-light leading-tight text-refenti-charcoal">
            A high-rise sanctuary that redefines the skyline. Experience the pinnacle of Refenti's architectural vision.
          </p>
          
          <div className="flex flex-wrap justify-center gap-16 pt-8">
            {[
              { val: '32', label: 'Storeys' },
              { val: '24/7', label: 'Concierge' },
              { val: '180°', label: 'Vistas' }
            ].map(stat => (
              <div key={stat.label} className="text-center group">
                <p className="text-refenti-gold text-5xl md:text-6xl font-display group-hover:scale-110 transition-transform duration-700">{stat.val}</p>
                <p className="text-[10px] uppercase tracking-[0.5em] text-gray-400 font-bold mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities Section */}
      <section className="py-16 px-8 bg-refenti-offwhite reveal">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 space-y-4">
            <h2 className="font-display text-5xl font-light text-refenti-charcoal uppercase italic">The Amenities</h2>
            <div className="w-16 h-[1px] bg-refenti-gold mx-auto" />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {amenities.map((amenity, idx) => (
              <div key={idx} className="bg-white p-10 rounded-[2.5rem] border border-gray-50 shadow-2xl text-center group hover:bg-refenti-offwhite transition-colors">
                <p className="text-refenti-gold font-sans font-bold uppercase tracking-widest text-[10px] mb-4">Exclusivity {idx + 1}</p>
                <p className="font-display text-2xl text-refenti-charcoal">{amenity}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-refenti-offwhite pb-32">
        <div className="w-full">
          {property.features?.map((feature, idx) => (
            <FeatureSection key={feature} feature={feature} index={idx} />
          ))}
        </div>
      </section>

      {/* Discreet Closing Section */}
      <footer className="py-24 px-8 bg-white text-center reveal border-t border-gray-100">
        <div className="max-w-3xl mx-auto space-y-8">
          <h2 className="font-display text-4xl font-light text-refenti-charcoal uppercase leading-none">
            Define Your <span className="text-refenti-gold italic">Legacy</span>
          </h2>
          <p className="text-gray-400 text-base font-light tracking-wide leading-relaxed">
            Limited residential units remaining. Discover a level of exclusivity reserved for the most discerning investors.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default BoleRefenti;
