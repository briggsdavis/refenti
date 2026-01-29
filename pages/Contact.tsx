
import React, { useEffect, useState, useRef } from 'react';
import { getInquiries, saveInquiries } from '../constants';
import { Inquiry } from '../types';

const Contact: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', type: 'Partnership', message: '' });
  const [isSent, setIsSent] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const inquiryTypes = ['Partnership', 'Investment', 'Stakeholder'];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    const newInquiry: Inquiry = {
      ...formData,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    const current = getInquiries();
    saveInquiries([...current, newInquiry]);
    
    setIsSent(true);
    setFormData({ name: '', email: '', type: 'Partnership', message: '' });
    setTimeout(() => setIsSent(false), 5000);
  };

  const selectType = (type: string) => {
    setFormData({ ...formData, type });
    setIsDropdownOpen(false);
  };

  return (
    <div className="bg-refenti-offwhite min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-end justify-center bg-refenti-offwhite overflow-hidden pb-16 md:pb-32">
        <div 
          className="absolute inset-[-5%]"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=1600')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `translateY(${-scrollY * 0.1}px)`,
            willChange: 'transform'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-refenti-offwhite via-refenti-offwhite/70 to-transparent pointer-events-none" />
        <div className="relative z-10 text-center space-y-8 md:space-y-12 px-4 max-w-6xl mx-auto reveal active">
          <div className="space-y-4">
            <h1 className="font-display text-6xl md:text-8xl lg:text-[9rem] font-light text-refenti-charcoal tracking-tight leading-none uppercase">Contact</h1>
            <p className="text-refenti-gold font-sans font-bold uppercase tracking-[0.5em] text-[10px]">Direct Engagement</p>
          </div>
        </div>
      </section>

      <div className="py-12 md:py-24 px-6 md:px-8 relative z-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-12 gap-12 md:gap-16">
            <div className="md:col-span-5 space-y-8 md:space-y-12 reveal">
              <div className="space-y-4 md:space-y-6">
                <h2 className="font-display text-4xl md:text-5xl font-light text-refenti-charcoal uppercase leading-none">Connect <br/><span className="text-refenti-gold italic">With Us</span></h2>
                <p className="text-refenti-gold font-display font-bold uppercase tracking-widest text-[10px] md:text-xs">Inquiry Portal</p>
              </div>
              
              <div className="space-y-8 md:space-y-10">
                {[
                  { label: 'Management', val: 'info@refenti.com' },
                  { label: 'Connect', val: '+251 986 1986 86' },
                  { label: 'Our Hub', val: 'Refenti (Bole Bulbula), Addis Ababa, Ethiopia' }
                ].map(item => (
                  <div key={item.label} className="space-y-1 md:space-y-2 reveal">
                    <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">{item.label}</p>
                    <p className="text-xl md:text-2xl font-light break-words">{item.val}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-7 bg-white p-8 md:p-16 rounded-[2.5rem] md:rounded-[3rem] shadow-2xl border border-gray-50 reveal">
              {isSent ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6 py-20">
                   <div className="w-16 h-16 rounded-full bg-refenti-gold/10 flex items-center justify-center mb-4">
                     <svg className="w-8 h-8 text-refenti-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                     </svg>
                   </div>
                   <h3 className="font-display text-4xl text-refenti-charcoal uppercase tracking-tighter">Received.</h3>
                   <p className="text-gray-400 font-light">Your inquiry has been logged for review by our team.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-8 md:space-y-12">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                    <div className="space-y-3 md:space-y-4 reveal">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Full Name</label>
                      <input 
                        type="text" 
                        required
                        placeholder="Representative Name" 
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        className="w-full border-b border-gray-100 py-3 md:py-4 focus:outline-none focus:border-refenti-gold transition-colors text-base md:text-lg font-light bg-transparent"
                      />
                    </div>
                    <div className="space-y-3 md:space-y-4 reveal">
                      <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Email Address</label>
                      <input 
                        type="email" 
                        required
                        placeholder="Contact Email" 
                        value={formData.email}
                        onChange={e => setFormData({...formData, email: e.target.value})}
                        className="w-full border-b border-gray-100 py-3 md:py-4 focus:outline-none focus:border-refenti-gold transition-colors text-base md:text-lg font-light bg-transparent"
                      />
                    </div>
                  </div>
                  
                  {/* Inquiry Type Section */}
                  <div className="space-y-3 md:space-y-4 reveal relative" ref={dropdownRef}>
                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Inquiry Type</label>
                    <div className="relative">
                      <button
                        type="button"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className={`
                          w-full border-b border-gray-100 py-3 md:py-4 flex items-center justify-between
                          text-left text-base md:text-lg font-light transition-all
                          ${isDropdownOpen ? 'border-refenti-gold text-refenti-gold' : 'text-refenti-charcoal hover:border-refenti-gold/50'}
                        `}
                      >
                        <span>{formData.type}</span>
                        <svg 
                          className={`w-4 h-4 transition-transform duration-500 ${isDropdownOpen ? 'rotate-180' : ''}`} 
                          fill="none" stroke="currentColor" viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </button>

                      {/* Dropdown Options List - Remade for total opacity and highest z-index */}
                      <div 
                        className={`
                          absolute top-full left-0 w-full mt-2 bg-white rounded-3xl shadow-[0_40px_80px_-15px_rgba(0,0,0,0.15)] 
                          border border-gray-100 overflow-hidden z-[999] transition-all duration-500 origin-top
                          ${isDropdownOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 -translate-y-4 pointer-events-none'}
                        `}
                        style={{ backgroundColor: '#ffffff' }}
                      >
                        <div className="py-2 bg-white">
                          {inquiryTypes.map((type) => (
                            <button
                              key={type}
                              type="button"
                              onClick={() => selectType(type)}
                              className={`
                                w-full text-left px-8 py-5 text-[11px] font-bold uppercase tracking-widest transition-all
                                ${formData.type === type ? 'text-refenti-gold bg-refenti-offwhite' : 'text-gray-500 hover:text-refenti-charcoal hover:bg-gray-50'}
                              `}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 md:space-y-4 reveal">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Your Message</label>
                    <textarea 
                      rows={4} 
                      placeholder="Tell us about your requirements or interest..." 
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                      className="w-full border-b border-gray-100 py-3 md:py-4 focus:outline-none focus:border-refenti-gold transition-colors text-base md:text-lg font-light resize-none bg-transparent"
                    />
                  </div>

                  <button className="w-full bg-refenti-charcoal text-white py-5 md:py-6 rounded-xl md:rounded-2xl font-sans font-bold uppercase tracking-widest text-[10px] md:text-xs hover:bg-refenti-gold transition-all duration-500 shadow-2xl reveal group">
                    <span className="flex items-center justify-center gap-4">
                      Submit Inquiry
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
