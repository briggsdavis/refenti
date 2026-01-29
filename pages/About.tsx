
import React, { useState, useEffect, useRef } from 'react';

const SECTIONS = [
  { id: 'about-refenti', label: 'Our Philosophy' },
  { id: 'stand-for', label: 'The Foundation' },
  { id: 'governance', label: 'Future Vision' },
];

const About: React.FC = () => {
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
      const offset = 120;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-refenti-offwhite min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[70vh] md:min-h-[90vh] w-full flex items-end justify-center bg-refenti-offwhite overflow-hidden pb-16 md:pb-32">
        <div 
          className="absolute inset-[-5%]"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `translateY(${-scrollY * 0.12}px)`,
            willChange: 'transform'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-refenti-offwhite via-refenti-offwhite/70 to-transparent pointer-events-none" />
        <div className="relative z-10 text-center space-y-6 md:space-y-14 px-4 max-w-6xl mx-auto reveal active">
          <div className="space-y-3 md:space-y-6">
            <p className="text-refenti-gold font-sans font-bold uppercase tracking-[0.4em] md:tracking-[0.6em] text-[9px] md:text-xs">Crafting a Legacy</p>
            <h1 className="font-display text-6xl md:text-[10rem] font-light text-refenti-charcoal tracking-tighter leading-none uppercase">About</h1>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex flex-col md:flex-row gap-12 lg:gap-24 relative">
        {/* Sticky Sidebar Navigation - Hidden on mobile/tablet for better UX */}
        <aside className="hidden lg:block w-64 xl:w-72 h-fit sticky top-48 z-20 reveal active">
          <div className="space-y-8">
            <p className="text-refenti-gold font-sans font-bold uppercase tracking-[0.4em] text-[10px] border-b border-gray-100 pb-4">Perspective</p>
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
          {/* Section: Our Philosophy */}
          <section id="about-refenti" ref={el => { sectionRefs.current['about-refenti'] = el; }} className="pt-12 md:pt-40">
            <div className="space-y-12 md:space-y-16 reveal">
              <div className="space-y-4">
                 <h2 className="font-display text-4xl sm:text-6xl md:text-8xl font-light text-refenti-charcoal leading-none uppercase">Building <br/> for the <span className="text-refenti-gold italic">Future</span></h2>
                 <div className="w-24 md:w-32 h-px bg-refenti-gold/40" />
              </div>
              
              <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
                <div className="space-y-6 md:space-y-10 text-lg md:text-2xl font-light leading-relaxed text-gray-700">
                  <p className="reveal text-justify">
                    Refenti Realty Group transforms how we perceive urban space. Part of Solstice Ventures Holding, we create environments that feel deliberate, permanent, and deeply connected to the city's identity.
                  </p>
                  <div className="relative aspect-video rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-lg reveal">
                    <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" alt="Architectural Detail" />
                  </div>
                  <p className="text-base md:text-lg text-gray-500 leading-relaxed reveal text-justify">
                    Our vision is built on architectural intent. Every decision is weighed against a standard of lasting quality and aesthetic purity.
                  </p>
                </div>
                <div className="aspect-[4/5] rounded-[2.5rem] md:rounded-[4rem] overflow-hidden shadow-2xl reveal">
                  <img src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" alt="Interior Luxury" />
                </div>
              </div>
            </div>
          </section>

          {/* Decorative Wide Image */}
          <section className="reveal">
            <div className="w-full aspect-[21/9] rounded-[2rem] md:rounded-[4rem] overflow-hidden shadow-sm border border-gray-100">
              <img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover grayscale-[0.2] opacity-90" alt="Building Atmosphere" />
            </div>
          </section>

          {/* Section: The Foundation */}
          <section id="stand-for" ref={el => { sectionRefs.current['stand-for'] = el; }}>
             <div className="space-y-12 md:space-y-24">
                <div className="max-w-3xl space-y-4 md:space-y-6">
                  <p className="text-refenti-gold font-sans font-bold uppercase tracking-ultra text-[9px] md:text-[10px]">What Guides Us</p>
                  <h2 className="font-display text-4xl sm:text-5xl md:text-7xl font-light text-refenti-charcoal uppercase leading-tight">Our <span className="text-refenti-gold italic">Foundation</span></h2>
                </div>
                
                <div className="grid md:grid-cols-2 gap-10 lg:gap-24">
                  <div className="space-y-6 md:space-y-8 reveal">
                    <div className="aspect-video rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-xl mb-6 md:mb-10">
                      <img src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" alt="Office Space" />
                    </div>
                    <h3 className="font-display text-3xl md:text-4xl font-light text-refenti-charcoal uppercase italic">A Sense of Place</h3>
                    <p className="text-gray-700 font-light text-base md:text-lg leading-relaxed text-justify">
                      Every building should have a soul. By focusing on low-density designs and high-privacy layouts, we create sanctuaries that offer a retreat from the urban bustle.
                    </p>
                  </div>
                  <div className="space-y-6 md:space-y-8 reveal md:pt-24 lg:pt-32">
                    <div className="aspect-video rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-xl mb-6 md:mb-10">
                      <img src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" alt="Residential Excellence" />
                    </div>
                    <h3 className="font-display text-3xl md:text-4xl font-light text-refenti-charcoal uppercase italic">Proven Quality</h3>
                    <p className="text-gray-700 font-light text-base md:text-lg leading-relaxed text-justify">
                      Excellence is a choice. We prioritize the integrity of the asset, ensuring that what we build today remains a landmark for generations.
                    </p>
                  </div>
                </div>
             </div>
          </section>

          {/* Section: Future Vision */}
          <section id="governance" ref={el => { sectionRefs.current['governance'] = el; }}>
            <div className="bg-refenti-charcoal p-8 md:p-16 lg:p-24 rounded-[2.5rem] md:rounded-[4rem] text-white shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center gap-10 lg:gap-16 reveal">
              <div className="absolute inset-0 opacity-10 pointer-events-none">
                <img src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&q=80&w=1600" className="w-full h-full object-cover" alt="" />
              </div>
              <div className="relative z-10 lg:w-3/5 space-y-6 md:space-y-10">
                <div className="space-y-3 md:space-y-4">
                  <p className="text-refenti-gold font-sans font-bold uppercase tracking-ultra text-[9px] md:text-[10px]">A Clear Horizon</p>
                  <h3 className="font-display text-4xl sm:text-5xl md:text-7xl font-light uppercase leading-tight">
                    The Path <span className="text-refenti-gold italic">Forward</span>
                  </h3>
                </div>
                <p className="text-gray-300 font-light leading-relaxed text-lg md:text-2xl text-justify">
                  We look at real estate through a long-term lens. By maintaining control over every phase of our projects, we ensure that our developments are not just sustainable, but truly exceptional.
                </p>
                <div className="pt-4 md:pt-8">
                  <div className="w-16 md:w-24 h-px bg-refenti-gold mb-4 md:mb-6" />
                  <p className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-refenti-gold">Aligned with Modern Living</p>
                </div>
              </div>
              <div className="lg:w-2/5 w-full aspect-square rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl relative z-10 border border-white/10">
                <img src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover" alt="Future Development" />
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default About;
