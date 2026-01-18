
import React, { useState, useEffect, useRef } from 'react';

const RisingCard: React.FC = () => {
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
      const end = -rect.height * 0.5;
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
        const next = prev + diff * 0.03;
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

  const translateY = 150 - (smoothedProgress * 300);
  const opacity = smoothedProgress < 0.1 ? smoothedProgress * 10 : smoothedProgress > 0.8 ? (1 - smoothedProgress) * 5 : 1;

  return (
    <div ref={sectionRef} className="relative h-[60vh] flex items-center justify-center overflow-hidden">
      <div 
        className="max-w-5xl w-full bg-refenti-charcoal text-white p-12 md:p-16 rounded-[4rem] shadow-2xl relative z-10 mx-8"
        style={{ 
          transform: `translateY(${translateY}px)`,
          opacity: opacity,
          transition: 'none'
        }}
      >
        <div className="space-y-6 text-center">
          <p className="text-refenti-gold font-sans font-bold uppercase tracking-[0.6em] text-xs">The Refenti Heritage</p>
          <h2 className="font-display text-4xl md:text-6xl font-light leading-none italic">A Legacy Forged in Concrete and Digital.</h2>
          <div className="w-24 h-[1px] bg-refenti-gold mx-auto" />
          <p className="text-gray-400 text-lg font-light leading-relaxed max-w-2xl mx-auto">
            Refenti isn't just about the structures we build; it's about the standard we uphold. From the first blueprint to the final digital signature, we are redefining luxury.
          </p>
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03] select-none">
        <span className="font-display text-[40vw] leading-none uppercase font-bold text-refenti-charcoal">Legacy</span>
      </div>
    </div>
  );
};

const About: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-refenti-offwhite min-h-screen">
      <section className="relative h-screen w-full flex items-end justify-center bg-refenti-offwhite overflow-hidden pb-32">
        <div 
          className="absolute inset-0 transition-transform duration-1000 ease-out"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `scale(${1 + scrollY * 0.0001}) translateY(${scrollY * 0.1}px)`,
          }}
        />
        {/* Higher white/beige gradient for better readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-refenti-offwhite via-refenti-offwhite/80 to-transparent" />
        
        <div className="relative z-10 text-center space-y-12 px-4 max-w-6xl mx-auto reveal">
          <div className="space-y-6">
            <p className="text-refenti-gold font-sans font-bold uppercase tracking-[0.7em] text-[10px] md:text-xs">Corporate Identity</p>
            <h1 className="font-display text-7xl md:text-[9rem] font-light text-refenti-charcoal tracking-tighter leading-none uppercase">About Refenti</h1>
          </div>
        </div>
      </section>

      <div className="pt-20 pb-20 px-12 bg-refenti-offwhite">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-12 gap-16 items-start relative mb-24">
            <div className="md:col-span-5 md:mt-12 space-y-8 reveal">
              <p className="text-refenti-gold font-sans font-bold uppercase tracking-[0.5em] text-[10px]">The Mission</p>
              <h2 className="font-display text-5xl md:text-6xl font-light uppercase text-refenti-charcoal leading-none">Visionary <br/><span className="text-refenti-gold italic">Assets</span></h2>
              <p className="text-xl leading-relaxed text-gray-500 font-light">
                We translate visionary architectural concepts into tangible luxury assets, bridging the gap between global investment standards and the burgeoning African landscape.
              </p>
              <div className="h-24 w-[1px] bg-refenti-gold/20" />
            </div>

            <div className="md:col-span-6 md:col-start-7 relative reveal">
              <div className="aspect-[4/5] overflow-hidden rounded-[4rem] shadow-2xl border border-gray-100 p-4 bg-white">
                <img 
                  src="https://images.unsplash.com/photo-1481277542470-605612bd2d61?auto=format&fit=crop&q=80&w=1000" 
                  className="w-full h-full object-cover rounded-[3rem]" 
                />
              </div>
              <div className="absolute -bottom-8 -left-8 bg-white p-8 rounded-[2.5rem] shadow-2xl max-w-xs hidden md:block border border-gray-50 reveal">
                <h3 className="font-display text-3xl font-light mb-4 text-refenti-gold italic">The Vision</h3>
                <p className="text-sm text-gray-400 leading-relaxed font-light">
                  To be the primary portal for premium property acquisition in Pan-Africa, synonymous with structural integrity.
                </p>
              </div>
            </div>
          </div>

          <RisingCard />

          <div className="mt-20 grid md:grid-cols-2 gap-16 items-center bg-white p-12 md:p-20 rounded-[5rem] border border-gray-100 reveal shadow-2xl">
            <div className="space-y-8">
              <p className="text-refenti-gold font-sans font-bold uppercase tracking-[0.4em] text-[10px]">Methodology</p>
              <h2 className="font-display text-5xl font-light text-refenti-charcoal leading-none uppercase">Architectural <br/>Intimacy</h2>
              <p className="text-gray-500 leading-loose text-lg font-light">
                Refenti is more than a brokerage; we are the boutique arm of Pan Africa Real Estate Plc. Leveraging over two decades of structural expertise, we curate properties that are as much investments in art as they are in real estate.
              </p>
              <div className="flex items-center gap-6">
                <div className="w-16 h-[1px] bg-refenti-gold" />
                <p className="text-refenti-gold font-sans font-bold uppercase tracking-[0.3em] text-[10px]">Institutional Excellence</p>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square overflow-hidden rounded-[4rem] shadow-2xl">
                <img src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -top-12 -right-12 text-refenti-gold font-display text-[15rem] font-light opacity-5">24</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
