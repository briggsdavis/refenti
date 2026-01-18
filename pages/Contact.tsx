
import React, { useEffect, useState } from 'react';

const Contact: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-refenti-offwhite min-h-screen">
      {/* Hero Banner */}
      <section className="relative h-screen w-full flex items-end justify-center bg-refenti-offwhite overflow-hidden pb-32 reveal">
        <div 
          className="absolute inset-0 transition-transform duration-1000 ease-out"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&q=80&w=1600')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transform: `scale(${1 + scrollY * 0.0001}) translateY(${scrollY * 0.1}px)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-refenti-offwhite via-refenti-offwhite/70 to-transparent" />
        
        <div className="relative z-10 text-center space-y-12 px-4 max-w-6xl mx-auto reveal">
          <div className="space-y-4">
            <p className="text-refenti-gold font-sans font-bold uppercase tracking-[0.5em] text-[10px]">Direct Engagement</p>
            <h1 className="font-display text-7xl md:text-[9rem] font-light text-refenti-charcoal tracking-tight leading-none uppercase">Connect</h1>
          </div>
        </div>
      </section>

      <div className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-12 gap-16">
            
            {/* Details */}
            <div className="md:col-span-5 space-y-12 reveal">
              <div className="space-y-6">
                <h2 className="font-display text-5xl font-light text-refenti-charcoal uppercase">Inquiries</h2>
                <p className="text-refenti-gold font-display font-bold uppercase tracking-widest text-xs">The Refenti Group Experience</p>
              </div>
              
              <div className="space-y-10">
                {[
                  { label: 'Email', val: 'info@refenti.com' },
                  { label: 'Phone', val: '+251 986 1986 86' },
                  { label: 'Location', val: 'CBD, Addis Ababa, Ethiopia' }
                ].map(item => (
                  <div key={item.label} className="space-y-2 group">
                    <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">{item.label}</p>
                    <p className="text-2xl font-light group-hover:text-refenti-gold transition-colors">{item.val}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Form */}
            <div className="md:col-span-7 bg-white p-12 md:p-16 rounded-[3rem] shadow-2xl border border-gray-50 reveal">
              <form className="space-y-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-xs uppercase tracking-widest font-bold text-gray-400">Identity</label>
                    <input 
                      type="text" 
                      placeholder="Full Name" 
                      className="w-full border-b border-gray-100 py-4 focus:outline-none focus:border-refenti-gold transition-colors text-lg font-light bg-transparent"
                    />
                  </div>
                  <div className="space-y-4">
                    <label className="text-xs uppercase tracking-widest font-bold text-gray-400">Reach</label>
                    <input 
                      type="email" 
                      placeholder="Email Address" 
                      className="w-full border-b border-gray-100 py-4 focus:outline-none focus:border-refenti-gold transition-colors text-lg font-light bg-transparent"
                    />
                  </div>
                </div>
                
                <div className="space-y-4">
                  <label className="text-xs uppercase tracking-widest font-bold text-gray-400">Nature of Inquiry</label>
                  <select className="w-full border-b border-gray-100 py-4 focus:outline-none focus:border-refenti-gold transition-colors text-lg font-light appearance-none bg-transparent">
                    <option>Property Acquisition</option>
                    <option>Exclusive Leasing</option>
                    <option>Institutional Investment</option>
                  </select>
                </div>

                <div className="space-y-4">
                  <label className="text-xs uppercase tracking-widest font-bold text-gray-400">Detailed Request</label>
                  <textarea 
                    rows={4} 
                    placeholder="Tell us about your architectural requirements..." 
                    className="w-full border-b border-gray-100 py-4 focus:outline-none focus:border-refenti-gold transition-colors text-lg font-light resize-none bg-transparent"
                  />
                </div>

                <button className="w-full bg-refenti-charcoal text-white py-6 rounded-2xl font-sans font-bold uppercase tracking-widest text-xs hover:bg-refenti-gold transition-all duration-500 shadow-2xl">
                  Submit Inquiry
                </button>
              </form>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
