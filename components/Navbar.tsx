
import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { getProjects } from '../constants';
import { Project } from '../types';

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const location = useLocation();
  const menuTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    
    const p = getProjects();
    setProjects(p);
    if (p.length > 0) setHoveredProject(p[0]);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Investment', path: '/investment' },
    { name: 'Portfolio', path: '/projects', isDropdown: true },
    { name: 'News', path: '/news' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleMouseEnter = () => {
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    setIsMenuOpen(true);
  };

  const handleMouseLeave = () => {
    menuTimeoutRef.current = window.setTimeout(() => {
      setIsMenuOpen(false);
    }, 400); 
  };

  return (
    <div className="fixed top-6 md:top-8 left-0 w-full z-[100] px-4 pointer-events-none">
      <div className="max-w-fit mx-auto relative pointer-events-auto">
        <nav className={`
          glass-nav rounded-full px-8 md:px-12 py-3 md:py-4 
          transition-all duration-700 ease-out border border-white/40 subtle-shadow
          ${scrolled ? 'scale-90 -translate-y-2' : 'scale-100'}
        `}>
          <ul className="flex items-center gap-8 md:gap-10">
            <li>
              <Link to="/" className="font-display font-medium text-refenti-gold tracking-tight text-xl md:text-2xl leading-none">
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
                    className="relative hidden lg:block"
                  >
                    <Link
                      to={link.path}
                      className={`
                        relative text-[9px] font-bold tracking-ultra uppercase transition-all py-1 flex items-center gap-2
                        text-refenti-charcoal/80 hover:text-refenti-gold
                        ${isActive || isMenuOpen ? 'text-refenti-gold' : ''}
                      `}
                    >
                      {link.name}
                      <svg 
                        className={`w-2 h-2 transition-transform duration-700 ${isMenuOpen ? 'rotate-180' : ''}`} 
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"
                      >
                        <path d="M19 9l-7 7-7-7" />
                      </svg>
                    </Link>
                  </li>
                );
              }
              return (
                <li key={link.path} className="hidden lg:block">
                  <Link
                    to={link.path}
                    className={`
                      relative text-[9px] font-bold tracking-ultra uppercase transition-all py-1
                      text-refenti-charcoal/80 hover:text-refenti-gold
                      ${isActive ? 'text-refenti-gold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-refenti-gold' : ''}
                    `}
                  >
                    {link.name}
                  </Link>
                </li>
              );
            })}

            <li className="lg:hidden ml-2 flex items-center border-l border-gray-100/30 pl-6">
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="flex items-center gap-3 text-[9px] font-bold tracking-ultra uppercase text-refenti-charcoal/80 hover:text-refenti-gold transition-colors py-2"
              >
                <span>{isMobileMenuOpen ? 'Close' : 'Menu'}</span>
                <div className="flex flex-col gap-1 w-4">
                  <span className={`h-px w-full bg-current transition-all duration-500 ${isMobileMenuOpen ? 'rotate-45 translate-y-1' : ''}`} />
                  <span className={`h-px w-full bg-current transition-all duration-500 ${isMobileMenuOpen ? 'opacity-0' : ''}`} />
                  <span className={`h-px w-full bg-current transition-all duration-500 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1' : ''}`} />
                </div>
              </button>
            </li>
          </ul>
        </nav>

        {/* Dropdown Desktop */}
        <div 
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`
            absolute top-[calc(100%-0.5rem)] left-1/2 -translate-x-1/2 w-[850px] pt-4
            transition-all duration-1000 cubic-bezier(0.19, 1, 0.22, 1) origin-top
            ${isMenuOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-4 scale-98 pointer-events-none'}
          `}
        >
          <div className="bg-white rounded-[3rem] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.08)] overflow-hidden border border-gray-100/50 flex min-h-[480px]">
            <div className="w-[38%] p-12 space-y-10 border-r border-gray-100 bg-white">
              <p className="text-[8px] font-bold text-refenti-gold tracking-ultra uppercase opacity-80">Refenti Collection</p>
              <div className="space-y-8">
                {projects.map((project) => (
                  <Link
                    key={project.id}
                    to={`/projects/${project.id}`}
                    onMouseEnter={() => setHoveredProject(project)}
                    onClick={() => setIsMenuOpen(false)}
                    className={`
                      group flex items-center justify-between transition-all duration-500
                      ${hoveredProject?.id === project.id ? 'translate-x-2' : ''}
                    `}
                  >
                    <div className="space-y-1">
                      <h4 className={`
                        font-display text-2xl transition-all duration-500
                        ${hoveredProject?.id === project.id ? 'text-refenti-gold' : 'text-refenti-charcoal/80'}
                      `}>
                        {project.name}
                      </h4>
                      <p className="text-[8px] font-bold text-gray-500 tracking-extrawide uppercase">{project.location}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="w-[62%] relative p-10 bg-refenti-offwhite/30">
              <div className="w-full h-full rounded-[2.5rem] overflow-hidden relative shadow-xl">
                {projects.map((project) => (
                  <div
                    key={`img-${project.id}`}
                    className={`
                      absolute inset-0 transition-all duration-1000 cubic-bezier(0.19, 1, 0.22, 1)
                      ${hoveredProject?.id === project.id ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}
                    `}
                  >
                    <img 
                      src={project.image} 
                      className="w-full h-full object-cover" 
                      alt={project.name}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    <div className="absolute bottom-10 left-10 text-white space-y-2 max-w-xs">
                       <p className="text-[8px] font-bold tracking-ultra uppercase text-refenti-gold">{project.assetClass}</p>
                       <h3 className="font-display text-3xl font-light leading-none">{project.name}</h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`
          lg:hidden fixed inset-0 top-[5rem] bg-white z-[-1]
          transition-all duration-700 cubic-bezier(0.19, 1, 0.22, 1) px-8 py-16 overflow-y-auto
          ${isMobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'}
        `}>
          <div className="max-w-md mx-auto space-y-16">
            <div className="space-y-8">
              <p className="text-[8px] font-bold text-refenti-gold tracking-ultra uppercase border-b border-gray-100 pb-4 opacity-70">Refenti Navigation</p>
              <ul className="space-y-6">
                {navLinks.map(link => (
                  <li key={link.path} className="overflow-hidden">
                    <Link 
                      to={link.path}
                      className="font-display text-4xl text-refenti-charcoal/90 hover:text-refenti-gold transition-all block uppercase tracking-tight"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Mobile-specific Project Collection Links */}
            <div className="space-y-8 pt-8 border-t border-gray-100">
              <p className="text-[8px] font-bold text-refenti-gold tracking-ultra uppercase opacity-70">The Collection</p>
              <ul className="space-y-6">
                {projects.map(project => (
                  <li key={project.id} className="overflow-hidden">
                    <Link 
                      to={`/projects/${project.id}`}
                      className="font-display text-3xl text-refenti-charcoal/70 hover:text-refenti-gold transition-all block uppercase tracking-tight"
                    >
                      {project.name}
                    </Link>
                    <p className="text-[8px] font-bold text-gray-400 tracking-extrawide uppercase mt-1">{project.location}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
