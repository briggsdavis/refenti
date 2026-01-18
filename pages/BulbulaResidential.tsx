
import React, { useState, useEffect } from 'react';
import { PROJECTS } from '../constants';

const BulbulaResidential: React.FC = () => {
  const property = PROJECTS[2];
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const lifestyle = [
    { title: "Sustainable Microgrid", icon: "☀️" },
    { title: "Organic Gardens", icon: "🌿" },
    { title: "Olympic Pool", icon: "🏊" },
    { title: "Children's Zone", icon: "🎨" }
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
            <p className="text-refenti-gold font-sans font-bold uppercase tracking-[0.7em] text-[10px] md:text-xs">The Modern Homestead</p>
            <h1 className="font-display text-7xl md:text-[9rem] font-light text-refenti-charcoal tracking-tighter leading-none uppercase">Bulbula Residential</h1>
          </div>
        </div>
      </section>

      <section className="py-20 px-12 bg-refenti-offwhite reveal">
        <div className="max-w-5xl mx-auto text-center space-y-10">
          <h2 className="font-display text-5xl md:text-6xl font-light text-refenti-charcoal uppercase italic">
            Where Modernity <span className="text-refenti-gold italic">Breathes.</span>
          </h2>
          <p className="text-xl text-gray-500 font-light leading-relaxed max-w-4xl mx-auto">
            At Bulbula Residential, we focus on the harmony between urban living and environmental serenity. Each unit is a testament to light and space.
          </p>
          <div className="h-16 w-[1px] bg-refenti-gold opacity-30 mx-auto" />
        </div>
      </section>

      <section className="py-16 px-8 bg-white/30 rounded-[6rem] mx-4 shadow-2xl border border-gray-100/50 reveal">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {lifestyle.map((item, idx) => (
              <div key={idx} className="bg-white p-12 rounded-[3rem] border border-gray-50 shadow-2xl text-center group hover:-translate-y-2 transition-transform duration-500">
                <span className="text-5xl mb-6 block">{item.icon}</span>
                <h3 className="font-display text-2xl font-light text-refenti-charcoal mb-4 uppercase italic">{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-8 reveal">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7 aspect-[16/9] rounded-[4rem] overflow-hidden shadow-2xl">
             <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" />
          </div>
          <div className="md:col-span-5 space-y-8 pl-8">
             <h3 className="font-display text-5xl font-light text-refenti-charcoal leading-tight">Curated <br/><span className="text-refenti-gold italic">Interiors</span></h3>
             <p className="text-gray-500 font-light leading-loose text-lg">
                Our interiors leverage local craftsmanship and international design standards. Floor-to-ceiling glass ensures your home is flooded with natural radiance.
             </p>
             <button className="text-refenti-gold font-sans font-bold uppercase tracking-widest text-[10px] border-b border-refenti-gold pb-2">View Interior Gallery</button>
          </div>
        </div>
      </section>

      <section className="py-24 px-8 text-center reveal">
        <div className="max-w-4xl mx-auto space-y-12">
          <h2 className="font-display text-6xl md:text-8xl font-light text-refenti-charcoal uppercase leading-none">
            Secure Your <br/> <span className="text-refenti-gold italic">Family Space</span>
          </h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-10">
            <button className="bg-refenti-charcoal text-white px-20 py-6 rounded-2xl font-sans font-bold uppercase tracking-[0.3em] text-[11px] hover:bg-refenti-gold transition-all shadow-2xl">
              Check Availability
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

export default BulbulaResidential;
