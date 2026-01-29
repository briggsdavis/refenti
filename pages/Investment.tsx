
import React, { useState, useEffect, useRef } from 'react';

const SECTIONS = [
  { id: 'about', label: 'Who We Are' },
  { id: 'mandate', label: 'Our Outlook' },
  { id: 'activities', label: 'Core Expertise' },
  { id: 'model', label: 'The Approach' },
  { id: 'reach', label: 'Presence' },
];

const Investment: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState(SECTIONS[0].id);
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      let current = SECTIONS[0].id;
      for (const section of SECTIONS) {
        const element = sectionRefs.current[section.id];
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 300) current = section.id;
        }
      }
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = sectionRefs.current[id];
    if (element) {
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.pageYOffset - 120,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-refenti-offwhite min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] md:min-h-[90vh] w-full flex items-end justify-center bg-refenti-offwhite overflow-hidden pb-16 md:pb-32">
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
        <div className="absolute inset-0 bg-gradient-to-t from-refenti-offwhite via-refenti-offwhite/80 to-transparent pointer-events-none" />
        <div className="relative z-10 text-center space-y-6 md:space-y-14 px-4 max-w-6xl mx-auto reveal active">
          <div className="space-y-3 md:space-y-6">
            <p className="text-refenti-gold font-sans font-bold uppercase tracking-[0.4em] md:tracking-[0.6em] text-[9px] md:text-xs">Precision in Real Estate</p>
            <h1 className="font-display text-6xl md:text-[10rem] font-light text-refenti-charcoal tracking-tighter leading-none uppercase">Investment</h1>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex flex-col md:flex-row gap-12 lg:gap-24 relative">
        {/* Navigation Sidebar - Hidden on mobile/tablet for better UX */}
        <aside className="hidden lg:block w-64 xl:w-72 h-fit sticky top-48 z-20 reveal active">
          <div className="space-y-8">
            <p className="text-refenti-gold font-sans font-bold uppercase tracking-[0.4em] text-[10px] border-b border-gray-100 pb-4">Strategy</p>
            <nav className="flex flex-col gap-6">
              {SECTIONS.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`
                    text-left text-[11px] font-bold uppercase tracking-widest transition-all duration-700 flex items-center gap-6 group
                    ${activeSection === section.id ? 'text-refenti-gold' : 'text-gray-400 hover:text-refenti-charcoal'}
                  `}
                >
                  <span className={`h-px bg-current transition-all duration-700 ${activeSection === section.id ? 'w-12' : 'w-6 group-hover:w-12'}`} />
                  {section.label}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        <div className="flex-1 space-y-24 md:space-y-48 lg:space-y-72 pb-32 md:pb-64">
          {/* Section: Who We Are */}
          <section id="about" ref={el => { sectionRefs.current['about'] = el; }} className="pt-12 md:pt-40 space-y-12 md:space-y-16 reveal">
            <div className="space-y-4 md:space-y-6">
              <p className="text-refenti-gold font-sans font-bold uppercase tracking-ultra text-[9px] md:text-[10px]">A Foundation of Trust</p>
              <h2 className="font-display text-4xl sm:text-6xl md:text-8xl font-light text-refenti-charcoal uppercase leading-none">The <span className="text-refenti-gold italic">Group</span></h2>
            </div>
            <div className="grid md:grid-cols-2 gap-10 md:gap-16 text-lg md:text-xl font-light leading-relaxed text-gray-700">
              <div className="space-y-6 md:space-y-8">
                <p className="text-justify">
                  Refenti Realty Group identifies and realizes the potential of urban landscapes. We build with a long-term mindset that values execution above all.
                </p>
                <div className="aspect-square rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl">
                  <img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover" alt="High-Rise Vision" />
                </div>
              </div>
              <div className="space-y-6 md:space-y-8 md:pt-24">
                <div className="aspect-[4/5] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl mb-6 md:mb-8">
                  <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover" alt="Urban Landscape" />
                </div>
                <p className="text-justify">
                  We focus on high-quality assets in markets primed for growth, ensuring every project is an engine for long-term performance.
                </p>
              </div>
            </div>
          </section>

          {/* Section: Our Outlook */}
          <section id="mandate" ref={el => { sectionRefs.current['mandate'] = el; }} className="reveal">
            <div className="bg-refenti-charcoal p-8 md:p-16 lg:p-24 rounded-[2.5rem] md:rounded-[4rem] text-white shadow-2xl relative overflow-hidden">
              <div className="relative z-10 space-y-12 md:space-y-16">
                <div className="space-y-4 md:space-y-6">
                  <p className="text-refenti-gold font-sans font-bold uppercase tracking-ultra text-[9px] md:text-[10px]">Strategic Horizon</p>
                  <h2 className="font-display text-4xl sm:text-5xl md:text-7xl font-light uppercase leading-none">A Clear <span className="text-refenti-gold italic">Outlook</span></h2>
                </div>
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                   <p className="text-xl md:text-3xl lg:text-4xl font-light text-gray-300 leading-tight text-justify">
                    We create developments that stand as benchmarks for quality, offering immediate impact and enduring value.
                  </p>
                  <div className="aspect-video rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-xl border border-white/10">
                    <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover opacity-80" alt="Building Structure" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16 pt-10 md:pt-16 border-t border-white/10">
                  {[
                    { title: "Direct Capital", desc: "Collaborating with partners who share our commitment to long-term quality." },
                    { title: "Design Partners", desc: "Working with the best architectural and technical minds in the industry." },
                    { title: "Verified Assets", desc: "Every project is developed with a focus on high-demand urban classes." }
                  ].map((s, i) => (
                    <div key={i} className="space-y-4 md:space-y-6">
                      <p className="text-refenti-gold font-sans font-bold uppercase tracking-widest text-[9px] md:text-[10px]">{s.title}</p>
                      <p className="text-white/60 text-sm font-light leading-relaxed text-justify">{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Section: Core Expertise */}
          <section id="activities" ref={el => { sectionRefs.current['activities'] = el; }} className="reveal space-y-12 md:space-y-24">
            <div className="text-center space-y-4 md:space-y-6">
              <p className="text-refenti-gold font-sans font-bold uppercase tracking-ultra text-[9px] md:text-[10px]">Expertise</p>
              <h2 className="font-display text-4xl sm:text-6xl md:text-8xl font-light text-refenti-charcoal uppercase leading-none">Our <span className="text-refenti-gold italic">Craft</span></h2>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
              {[
                { title: 'Development', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=600', desc: 'Developing landmarks that integrate perfectly with their urban surroundings.' },
                { title: 'Management', image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=600', desc: 'Ensuring that every project we deliver remains a top-tier asset for years to come.' },
                { title: 'Vision', image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=600', desc: 'Identifying the next great urban node and building its infrastructure.' }
              ].map((act, i) => (
                <div key={i} className="group bg-white rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-1000">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={act.image} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" alt={act.title} />
                  </div>
                  <div className="p-8 md:p-10 space-y-4 md:space-y-6">
                    <h3 className="font-display text-2xl md:text-3xl font-light text-refenti-charcoal leading-none">{act.title}</h3>
                    <p className="text-gray-500 text-sm md:text-base font-light leading-relaxed text-justify">{act.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section: The Approach */}
          <section id="model" ref={el => { sectionRefs.current['model'] = el; }} className="space-y-16 md:space-y-32 reveal">
            <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">
              <div className="space-y-8 md:space-y-12">
                <div className="space-y-4 md:space-y-6">
                  <p className="text-refenti-gold font-sans font-bold uppercase tracking-ultra text-[9px] md:text-[10px]">Execution</p>
                  <h2 className="font-display text-4xl sm:text-6xl md:text-8xl font-light text-refenti-charcoal uppercase leading-none">The <span className="text-refenti-gold italic">Approach</span></h2>
                </div>
                <div className="space-y-6 md:space-y-8 text-lg md:text-xl font-light leading-relaxed text-gray-700">
                  <p className="text-justify">
                    We operate with control over the vision and strategy of every project. By leading the coordination in-house, we ensure quality is never lost in translation.
                  </p>
                  <div className="w-16 md:w-24 h-px bg-refenti-gold/40" />
                  <p className="text-refenti-charcoal font-medium italic text-xl md:text-2xl font-display">
                    "Precision is non-negotiable. We build for performance."
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="aspect-[4/5] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-2xl relative z-10">
                  <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" alt="Focused Design" />
                </div>
                <div className="hidden md:block absolute -bottom-10 -right-10 w-full h-full border-2 border-refenti-gold/20 rounded-[4rem] -z-10" />
              </div>
            </div>
          </section>

          {/* Section: Presence */}
          <section id="reach" ref={el => { sectionRefs.current['reach'] = el; }} className="space-y-16 md:space-y-32 reveal pb-24">
            <div className="grid md:grid-cols-2 gap-12 md:gap-24">
              <div className="space-y-8 md:space-y-12">
                <div className="space-y-4 md:space-y-6">
                  <p className="text-refenti-gold font-sans font-bold uppercase tracking-ultra text-[9px] md:text-[10px]">Footprint</p>
                  <h2 className="font-display text-4xl sm:text-6xl md:text-8xl font-light text-refenti-charcoal uppercase leading-none">Global <span className="text-refenti-gold italic">Reach</span></h2>
                </div>
                <div className="grid grid-cols-2 gap-8 md:gap-12">
                  <div className="space-y-6 md:space-y-8">
                    <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-gray-400 border-b border-gray-100 pb-2">Portfolio</p>
                    <ul className="text-base md:text-lg space-y-3 md:space-y-4 font-light text-gray-700">
                      <li>Boutique Living</li>
                      <li>Mixed-Use Hubs</li>
                      <li>Workspaces</li>
                      <li>Hotel Suites</li>
                    </ul>
                  </div>
                  <div className="space-y-6 md:space-y-8">
                    <p className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-refenti-gold border-b border-refenti-gold/20 pb-2">Focus</p>
                    <ul className="text-base md:text-lg space-y-3 md:space-y-4 font-bold text-refenti-charcoal">
                      <li>Urban Nodes</li>
                      <li>Modern Living</li>
                      <li>Landmark Assets</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="space-y-12 md:space-y-16">
                <div className="space-y-6 md:space-y-8">
                  <div className="group">
                    <p className="font-display text-3xl md:text-4xl text-refenti-charcoal group-hover:text-refenti-gold transition-colors duration-500">Ethiopia</p>
                    <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest mt-2">Core Hub</p>
                  </div>
                  <div className="group">
                    <p className="font-display text-3xl md:text-4xl text-refenti-charcoal group-hover:text-refenti-gold transition-colors duration-500">Dubai, UAE</p>
                    <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-widest mt-2">Expansion & Connection</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Investment;
