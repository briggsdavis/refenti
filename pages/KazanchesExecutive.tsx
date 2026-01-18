
import React, { useState, useEffect } from 'react';
import { PROJECTS } from '../constants';

const KazanchesExecutive: React.FC = () => {
  const property = PROJECTS[1];
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const specs = [
    { label: "Connectivity", val: "Tier-IV Data Ready" },
    { label: "Efficiency", val: "Smart Lighting Control" },
    { label: "Health", val: "HEPA Filtration System" },
    { label: "Security", val: "Biometric Access Control" }
  ];

  return (
    <div className="bg-refenti-offwhite min-h-screen">
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
        <div className="absolute inset-0 bg-gradient-to-t from-refenti-offwhite via-refenti-offwhite/80 to-transparent" />
        
        <div className="relative z-10 text-center space-y-12 px-4 max-w-6xl mx-auto pt-40 reveal">
          <div className="space-y-6">
            <p className="text-refenti-gold font-sans font-bold uppercase tracking-[0.7em] text-[10px] md:text-xs">Corporate Excellence</p>
            <h1 className="font-display text-7xl md:text-[9rem] font-light text-refenti-charcoal tracking-tighter leading-none uppercase">Kazanches Executive</h1>
          </div>
        </div>
      </section>

      <section className="py-20 px-12 bg-refenti-offwhite">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center reveal">
          <div className="space-y-8">
            <h2 className="font-display text-5xl font-light text-refenti-charcoal leading-tight uppercase italic">
              Empowering Global <br/> <span className="text-refenti-gold italic">Leadership.</span>
            </h2>
            <p className="text-lg text-gray-500 font-light leading-loose">
              Designed as a node for international enterprise, the Kazanches Executive project combines structural rigidity with the flexibility required by modern industries.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-4">
              {specs.map((spec, idx) => (
                <div key={idx} className="border-l-2 border-refenti-gold pl-6 space-y-2">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{spec.label}</p>
                  <p className="font-display text-xl text-refenti-charcoal">{spec.val}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative aspect-square rounded-[3rem] overflow-hidden shadow-2xl border border-gray-100">
            <img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      <section className="py-20 px-8 bg-white/40 rounded-[4rem] mx-4 mb-20 reveal border border-gray-100/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10">
            {[
              { title: "Conference Suites", desc: "Equipped with spatial acoustics and multi-channel telepresence capability." },
              { title: "Executive Lounges", desc: "Private enclaves designed for focused interaction and high-stakes negotiation." },
              { title: "Smart Dining", desc: "A curated gastronomic experience tailored for the business elite." }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-12 rounded-[3rem] shadow-2xl border border-gray-50 flex flex-col justify-between h-full group hover:scale-[1.02] transition-transform">
                <div className="space-y-6">
                   <span className="text-refenti-gold text-4xl font-display opacity-20">0{idx + 1}</span>
                   <h3 className="font-display text-3xl font-light text-refenti-charcoal uppercase italic">{item.title}</h3>
                   <p className="text-gray-400 text-sm font-light leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-8 text-center reveal">
        <div className="max-w-4xl mx-auto space-y-12">
          <h2 className="font-display text-6xl md:text-8xl font-light text-refenti-charcoal uppercase leading-none">
            Scale Your <br/> <span className="text-refenti-gold italic">Enterprise</span>
          </h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-10">
            <button className="bg-refenti-charcoal text-white px-20 py-6 rounded-2xl font-sans font-bold uppercase tracking-[0.3em] text-[11px] hover:bg-refenti-gold transition-all shadow-2xl">
              Request Leasing Terms
            </button>
            <button className="bg-white border-2 border-refenti-gold text-refenti-gold px-16 py-6 rounded-2xl font-sans font-bold uppercase tracking-[0.3em] text-[11px] hover:bg-refenti-gold hover:text-white transition-all shadow-2xl">
              Download Brochure
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default KazanchesExecutive;
