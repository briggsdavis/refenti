
import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation, Navigate, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Investment from './pages/Investment';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import EventsNews from './pages/EventsNews';
import Contact from './pages/Contact';
import Admin from './pages/Admin';

// Specific Project Pages
import BoleRefenti from './pages/BoleRefenti';
import KazanchesExecutive from './pages/KazanchesExecutive';
import BulbulaResidential from './pages/BulbulaResidential';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const useReveal = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { 
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    reveals.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useReveal();
  return <div className="animate-in fade-in duration-1000">{children}</div>;
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <ScrollToTop />
      <AppContent />
    </HashRouter>
  );
};

const AppContent: React.FC = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-refenti-offwhite text-refenti-charcoal font-sans selection:bg-refenti-gold selection:text-white">
      {!isAdmin && <Navbar />}
      <main>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/investment" element={<Investment />} />
            <Route path="/projects" element={<Projects />} />
            
            <Route path="/projects/bole" element={<BoleRefenti />} />
            <Route path="/projects/kazanchis" element={<KazanchesExecutive />} />
            <Route path="/projects/bulbula" element={<BulbulaResidential />} />
            
            <Route path="/projects/:id" element={<ProjectDetail />} />
            
            <Route path="/news" element={<EventsNews />} />
            <Route path="/contact" element={<Contact />} />
            
            <Route path="/admin/*" element={<Admin />} />
            
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </main>
      
      {!isAdmin && (
        <>
          <footer className="bg-white border-t border-gray-100 py-16 px-8 reveal">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-12">
              <div className="space-y-4 max-w-sm">
                <h2 className="font-display text-2xl font-light text-refenti-gold tracking-tight">Refenti Realty Group</h2>
                <p className="text-gray-700 font-light leading-relaxed text-[13px]">
                  A specialized real estate group defining new standards in urban living through precision and architectural intent.
                </p>
                <Link 
                  to="/admin" 
                  className="inline-block text-[8px] font-bold uppercase tracking-ultra text-gray-600 hover:text-refenti-gold transition-colors pt-4"
                >
                  Admin Access
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-10 w-full md:w-auto">
                <div className="space-y-4">
                  <h4 className="font-sans font-bold text-[8px] tracking-ultra uppercase text-gray-500">Links</h4>
                  <ul className="space-y-2 text-refenti-charcoal font-light text-[12px]">
                    <li><Link to="/" className="hover:text-refenti-gold transition-colors">Home</Link></li>
                    <li><Link to="/about" className="hover:text-refenti-gold transition-colors">About</Link></li>
                    <li><Link to="/investment" className="hover:text-refenti-gold transition-colors">Investment</Link></li>
                    <li><Link to="/projects" className="hover:text-refenti-gold transition-colors">Portfolio</Link></li>
                    <li><Link to="/news" className="hover:text-refenti-gold transition-colors">News</Link></li>
                    <li><Link to="/contact" className="hover:text-refenti-gold transition-colors">Contact</Link></li>
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="font-sans font-bold text-[8px] tracking-ultra uppercase text-gray-500">Principles</h4>
                  <ul className="space-y-2 text-refenti-charcoal font-light text-[12px]">
                    <li>Investor Care</li>
                    <li>Asset Standards</li>
                    <li>Global Reach</li>
                  </ul>
                </div>
                <div className="space-y-4 col-span-2 md:col-span-1">
                  <h4 className="font-sans font-bold text-[8px] tracking-ultra uppercase text-gray-500">Contact</h4>
                  <ul className="space-y-2 text-refenti-charcoal font-light text-[12px]">
                    <li>info@refenti.com</li>
                    <li>+251 986 1986 86</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-gray-100 flex justify-between items-center text-[8px] text-gray-600 tracking-ultra uppercase">
              <span>© 2024 Refenti Group | Urban Destinations</span>
              <span>Made by <a href="https://briggsdavis.com" target="_blank" rel="noopener noreferrer" className="hover:text-refenti-gold transition-colors">BriggsDavis</a></span>
            </div>
          </footer>
        </>
      )}
    </div>
  );
};

export default App;
