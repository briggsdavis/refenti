
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PROJECTS } from '../constants';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(PROJECTS[0]);
  const location = useLocation();
  const menuTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects', isDropdown: true },
    { name: 'Contact', path: '/contact' },
  ];

  const handleMouseEnter = () => {
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    setIsMenuOpen(true);
  };

  const handleMouseLeave = () => {
    menuTimeoutRef.current = window.setTimeout(() => {
      setIsMenuOpen(false);
    }, 150);
  };

  return (
    <div className="fixed top-8 left-0 w-full z-[100] px-4 pointer-events-none">
      <div className="max-w-fit mx-auto relative pointer-events-auto">
        <nav className={`
          glass-nav rounded-full px-8 py-4 
          shadow-lg transition-all duration-500
          ${scrolled ? 'scale-95 -translate-y-2 opacity-95' : 'scale-100'}
        `}>
          <ul className="flex items-center gap-8">
            <li className="mr-4">
              <Link to="/" className="font-display font-bold text-refenti-gold tracking-tighter text-lg leading-none">
                REFENTI
              </Link>
            </li>
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              if (link.isDropdown) {
                return (
                  <li 
                    key={link.path}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className="relative"
                  >
                    <button
                      className={`
                        relative text-[10px] font-bold tracking-[0.2em] uppercase transition-colors py-1 flex items-center gap-2
                        text-refenti-charcoal hover:text-refenti-gold
                        ${isActive || isMenuOpen ? 'text-refenti-gold' : ''}
                      `}
                    >
                      {link.name}
                      <svg 
                        className={`w-2 h-2 transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`} 
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"
                      >
                        <path d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  </li>
                );
              }
              return (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className={`
                      relative text-[10px] font-bold tracking-[0.2em] uppercase transition-colors py-1
                      text-refenti-charcoal hover:text-refenti-gold
                      ${isActive ? 'border-b-2 border-refenti-gold' : ''}
                    `}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Mega Menu Dropdown */}
        <div 
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`
            absolute top-[calc(100%+1rem)] left-1/2 -translate-x-1/2 w-[850px] 
            glass-nav rounded-[3rem] shadow-2xl overflow-hidden
            transition-all duration-500 ease-out origin-top
            ${isMenuOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-4 scale-95 pointer-events-none'}
          `}
        >
          <div className="flex min-h-[450px]">
            {/* Project List */}
            <div className="w-1/3 p-10 space-y-8 border-r border-gray-100/20">
              <p className="text-[10px] font-bold text-refenti-gold tracking-[0.4em] uppercase mb-12">Collections</p>
              <div className="space-y-6">
                {PROJECTS.map((project) => (
                  <Link
                    key={project.id}
                    to={`/projects/${project.id}`}
                    onMouseEnter={() => setHoveredProject(project)}
                    onClick={() => setIsMenuOpen(false)}
                    className={`
                      group flex items-center justify-between text-left transition-all duration-300
                      ${hoveredProject.id === project.id ? 'translate-x-2' : ''}
                    `}
                  >
                    <div className="space-y-1">
                      <h4 className={`
                        font-display text-2xl transition-colors
                        ${hoveredProject.id === project.id ? 'text-refenti-gold' : 'text-refenti-charcoal'}
                      `}>
                        {project.name}
                      </h4>
                      <p className="text-[9px] font-bold text-gray-400 tracking-widest uppercase">{project.location}</p>
                    </div>
                    {hoveredProject.id === project.id && (
                      <div className="w-1.5 h-1.5 rounded-full bg-refenti-gold shadow-[0_0_10px_rgba(212,175,55,0.8)]" />
                    )}
                  </Link>
                ))}
              </div>
              
              <div className="pt-10">
                <Link 
                  to="/projects"
                  onClick={() => setIsMenuOpen(false)}
                  className="inline-block px-6 py-3 rounded-full bg-refenti-charcoal/5 border border-refenti-charcoal/10 text-[9px] font-bold text-refenti-charcoal hover:bg-refenti-gold hover:text-white hover:border-refenti-gold tracking-widest uppercase transition-all"
                >
                  Browse Full Portfolio
                </Link>
              </div>
            </div>

            {/* Project Preview Image */}
            <div className="w-2/3 relative p-8">
              <div className="w-full h-full rounded-[2.5rem] overflow-hidden relative shadow-inner">
                {PROJECTS.map((project) => (
                  <div
                    key={`img-${project.id}`}
                    className={`
                      absolute inset-0 transition-opacity duration-700 ease-in-out
                      ${hoveredProject.id === project.id ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}
                    `}
                  >
                    <img 
                      src={project.image} 
                      className="w-full h-full object-cover" 
                      alt={project.name}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-10 left-10 text-white space-y-2">
                       <p className="text-[10px] font-bold tracking-[0.5em] uppercase text-refenti-gold">{project.type} Exclusive</p>
                       <h3 className="font-display text-4xl font-light">{project.name}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
