
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
            <h1 className="font-display text-7xl md:text-[12rem] font-light text-refenti-charcoal tracking-tighter leading-none uppercase">
              Portfolio
            </h1>
            <p className="text-refenti-gold font-sans font-bold uppercase tracking-ultra text-[10px] md:text-xs">
              Refined Urban Assets
            </p>
          </div>
        </div>
      </section>

      {/* Project Grid */}
      <div className="pt-24 md:pt-40 px-6 md:px-12 relative z-10 -mt-16 md:-mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-32">
            {projects.map((project, idx) => (
              <Link 
                key={project.id} 
                to={`/projects/${project.id}`}
                className="group block reveal active space-y-10 cursor-pointer"
                style={{ transitionDelay: `${idx * 150}ms` }}
              >
                {/* Project Image Container */}
                <div className="overflow-hidden aspect-[16/10] rounded-[3.5rem] shadow-2xl transition-all duration-1000 group-hover:shadow-refenti-gold/20 group-hover:-translate-y-2">
                  <img 
                    src={project.image} 
                    className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105" 
                    alt={project.name}
                  />
                </div>

                {/* Project Info Container */}
                <div className="px-6 md:px-10 space-y-6">
                  <div className="space-y-3">
                    <div className="flex items-center gap-4">
                      <p className="text-refenti-gold text-[10px] font-bold tracking-[0.4em] uppercase">
                        {project.assetClass}
                      </p>
                      <div className="h-px w-8 bg-gray-200" />
                    </div>
                    <h2 className="font-display text-4xl md:text-6xl font-light text-refenti-charcoal leading-none transition-colors duration-700 group-hover:text-refenti-gold">
                      {project.name}
                    </h2>
                    <p className="text-gray-400 font-sans font-bold uppercase tracking-widest text-[9px]">
                      {project.location}
                    </p>
                  </div>
                  <p className="text-gray-600 font-light text-sm leading-relaxed max-w-lg text-justify opacity-80 group-hover:opacity-100 transition-opacity duration-700">
                    {project.description}
                  </p>
                  
                  <div className="pt-4">
                    <span className="inline-flex items-center gap-4 text-[9px] font-bold uppercase tracking-ultra text-refenti-gold opacity-0 group-hover:opacity-100 translate-x-[-10px] group-hover:translate-x-0 transition-all duration-700">
                      View Asset Narrative
                      <span className="text-lg">→</span>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;
