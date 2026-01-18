
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PROJECTS } from '../constants';

const Projects: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const getProjectLink = (id: string) => {
    switch(id) {
      case 'bole': return '/projects/bole';
      case 'kasanches': return '/projects/kasanches';
      case 'bulbula': return '/projects/bulbula';
      default: return '#';
    }
  };

  return (
    <div className="bg-refenti-offwhite min-h-screen pb-16">
      <section className="relative h-screen w-full flex items-end justify-center bg-refenti-offwhite overflow-hidden pb-32">
        <div 
          className="absolute inset-0 transition-transform duration-1000 ease-out"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1449156001437-37c645d9bc01?auto=format&fit=crop&q=80&w=2000')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `scale(${1 + scrollY * 0.0001}) translateY(${scrollY * 0.1}px)`,
          }}
        />
        {/* Deeper gradient for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-refenti-offwhite via-refenti-offwhite/80 to-transparent" />
        
        <div className="relative z-10 text-center space-y-12 px-4 max-w-6xl mx-auto reveal">
          <div className="space-y-6">
            <p className="text-refenti-gold font-sans font-bold uppercase tracking-[0.7em] text-[10px] md:text-xs">The Refenti Portfolio</p>
            <h1 className="font-display text-7xl md:text-[9rem] font-light text-refenti-charcoal tracking-tighter leading-none uppercase">Global Collections</h1>
          </div>
        </div>
      </section>

      <div className="pt-16 px-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 space-y-6 reveal">
            <h2 className="font-display text-6xl md:text-8xl font-light text-refenti-charcoal tracking-tight leading-none uppercase italic">Exclusive <br/> Properties</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {PROJECTS.map((project) => (
              <Link 
                key={project.id} 
                to={getProjectLink(project.id)}
                className="group block reveal"
              >
                <div className="overflow-hidden aspect-video rounded-[3.5rem] shadow-2xl border border-gray-50 mb-8 bg-white p-2">
                  <img 
                    src={project.image} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 rounded-[2.5rem]" 
                    alt={project.name}
                  />
                </div>
                <div className="px-10 space-y-2">
                  <p className="text-refenti-gold text-[10px] font-bold tracking-[0.4em] uppercase">{project.type}</p>
                  <h2 className="font-display text-4xl md:text-5xl font-light text-refenti-charcoal group-hover:text-refenti-gold transition-colors leading-tight">{project.name}</h2>
                  <p className="text-gray-400 font-light text-lg">{project.location}</p>
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
