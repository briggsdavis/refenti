
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProjects } from '../constants';

const Projects: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const projects = getProjects();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-refenti-offwhite min-h-screen pb-16">
      {/* Cinematic Hero Banner */}
      <section className="relative h-screen w-full flex items-end justify-center bg-refenti-offwhite overflow-hidden pb-32 md:pb-48">
        <div 
          className="absolute inset-[-10%]"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2400')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `translateY(${-scrollY * 0.15}px)`,
            willChange: 'transform'
          }}
        />
        {/* Deep gradient overlay for text legibility and transition to off-white */}
        <div className="absolute inset-0 bg-gradient-to-t from-refenti-offwhite via-refenti-offwhite/60 to-black/20 pointer-events-none" />
        
        <div className="relative z-10 text-center space-y-12 px-4 max-w-7xl mx-auto reveal active">
          <div className="space-y-6 md:space-y-10">
            <p className="text-refenti-gold font-sans font-bold uppercase tracking-ultra text-[10px] md:text-xs">
              Refined Urban Assets
            </p>
            <h1 className="font-display text-7xl md:text-[12rem] font-light text-refenti-charcoal tracking-tighter leading-none uppercase">
              Portfolio
            </h1>
          </div>
        </div>
      </section>

      {/* Project Grid */}
      <div className="pt-24 md:pt-40 px-6 md:px-12 relative z-10 -mt-16 md:-mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
            {projects.map((project, idx) => (
              <div 
                key={project.id} 
                className="group block reveal active space-y-10"
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                <div className="overflow-hidden aspect-[16/10] rounded-[3.5rem] shadow-2xl border border-gray-100 bg-white p-2 transition-all duration-1000 group-hover:shadow-refenti-gold/10">
                  <img 
                    src={project.image} 
                    className="w-full h-full object-cover rounded-[2.5rem] grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" 
                    alt={project.name}
                  />
                </div>
                <div className="px-6 md:px-10 space-y-6">
                  <div className="space-y-3">
                    <p className="text-refenti-gold text-[10px] font-bold tracking-[0.4em] uppercase">
                      {project.assetClass}
                    </p>
                    <h2 className="font-display text-4xl md:text-6xl font-light text-refenti-charcoal leading-none transition-colors duration-500 group-hover:text-refenti-gold">
                      {project.name}
                    </h2>
                    <p className="text-gray-400 font-sans font-bold uppercase tracking-widest text-[9px]">
                      {project.location}
                    </p>
                  </div>
                  <p className="text-gray-600 font-light text-sm leading-relaxed max-w-lg text-justify">
                    {project.description}
                  </p>
                  
                  <Link 
                    to={`/projects/${project.id}`}
                    className="inline-flex items-center gap-6 bg-refenti-charcoal text-white px-12 py-5 rounded-2xl text-[10px] font-bold uppercase tracking-ultra hover:bg-refenti-gold transition-all shadow-xl group/btn"
                  >
                    Asset Specifications
                    <span className="group-hover/btn:translate-x-2 transition-transform duration-500">→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
