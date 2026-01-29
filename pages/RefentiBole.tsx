
import React from 'react';
import { getProjects } from '../constants';

const RefentiBole: React.FC = () => {
  const property = getProjects()[0]; // Base image/location info

  const keyFeatures = [
    "Boutique Luxury Apartments",
    "5,000 Built-Up Area",
    "500 Plot Size",
    "Secure Basement Parking",
    "Private Reservoir Infrastructure",
    "Exclusive Lifestyle Lounge",
    "Concierge-Style Arrival Zone",
    "Single-Unit Luxury Floors"
  ];

  const detailFeatures = [
    {
      title: "Boutique Operational Management",
      text: "The ground floor serves as the operational hub for the building concierge services. This area incorporates a professional reception and structured parking management. This infrastructure is designed to provide a high-security, service-oriented arrival experience for residents. The management model mirrors luxury hospitality standards to maintain the premium market positioning of the asset."
    },
    {
      title: "Low-Density Residential Configuration",
      text: "The residential stack is engineered for maximum privacy. It features a unique single-unit per floor configuration on the third through seventh levels. The second floor contains two units, while higher levels transition to total floor exclusivity. This architectural choice targets a niche market segment seeking high-privacy urban residences with 360-degree exterior views."
    },
    {
      title: "Penthouse and Private Amenities",
      text: "The property is capped by a high-value duplex penthouse occupying the eighth and ninth floors. A distinguishing technical feature of this unit is the inclusion of a private swimming pool. Dedicated lifestyle spaces, including a resident-only lounge, further enhance the competitive standing of the building as a top-tier luxury asset."
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative h-[70vh] w-full bg-white overflow-hidden reveal">
        <img src={property.image} className="w-full h-full object-cover opacity-90" alt="Refenti Bole" />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
      </section>

      {/* Narrative & Title Section */}
      <section className="py-24 px-8 bg-white reveal">
        <div className="max-w-6xl mx-auto text-center space-y-16">
          <div className="space-y-4">
            <p className="text-refenti-gold font-sans font-bold uppercase tracking-[0.5em] text-[10px]">Boutique Collection</p>
            <h1 className="font-display text-7xl md:text-9xl font-light text-refenti-charcoal tracking-tight leading-none uppercase">Refenti Bole</h1>
          </div>
          <p className="text-3xl md:text-4xl font-display font-light leading-tight text-refenti-charcoal max-w-4xl mx-auto">
            Refenti Bole is a boutique residential development focused on high-end, low-density living. The project utilizes a concierge-style service model. The asset is structured to prioritize <span className="text-refenti-gold italic">resident privacy</span> and exclusive site access within a modern architectural frame.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-12 max-w-4xl mx-auto">
            {[
              { val: 'Concierge', label: 'Service Model' },
              { val: 'Low Density', label: 'Privacy Focus' },
              { val: 'Modern', label: 'Architecture' },
              { val: 'Exclusive', label: 'Site Access' }
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <p className="text-refenti-gold text-2xl md:text-3xl font-display">{stat.val}</p>
                <p className="text-[9px] uppercase tracking-[0.3em] text-gray-400 font-bold mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features Grid */}
      <section className="py-20 px-8 bg-refenti-offwhite reveal">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex items-center gap-6">
            <h2 className="font-display text-4xl md:text-5xl font-light text-refenti-charcoal uppercase">
              Key <span className="text-refenti-gold italic">Features</span>
            </h2>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {keyFeatures.map((feature, idx) => (
              <div 
                key={idx} 
                className="bg-white px-8 py-6 rounded-[2rem] shadow-sm border border-gray-100 flex items-center justify-center text-center group hover:shadow-md hover:-translate-y-1 transition-all duration-500 reveal"
                style={{ transitionDelay: `${idx * 50}ms` }}
              >
                <span className="text-[10px] font-bold uppercase tracking-widest text-refenti-charcoal group-hover:text-refenti-gold transition-colors">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Features */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto space-y-32">
          {detailFeatures.map((feature, idx) => (
            <div 
              key={idx}
              className={`flex flex-col md:flex-row items-center gap-16 reveal ${idx % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="w-full md:w-3/5 overflow-hidden rounded-[3rem] shadow-xl bg-white border border-gray-50">
                <div className="h-full w-full">
                  <img 
                    src={`https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1200&sig=${idx + 42}`} 
                    className="w-full h-full object-cover aspect-[16/10]" 
                    alt={feature.title}
                  />
                </div>
              </div>
              <div className="w-full md:w-2/5 space-y-6">
                <span className="text-refenti-gold font-display text-6xl font-light opacity-20 leading-none">0{idx + 1}</span>
                <h3 className="font-display text-4xl font-light tracking-tight text-refenti-charcoal uppercase leading-tight">{feature.title}</h3>
                <div className="space-y-4">
                  <p className="text-gray-600 font-light leading-relaxed text-lg">
                    {feature.text}
                  </p>
                </div>
                <div className="w-24 h-[1px] bg-refenti-gold" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-40 px-8 bg-white text-center reveal">
        <div className="max-w-4xl mx-auto space-y-16">
          <div className="space-y-4">
            <h2 className="font-display text-6xl md:text-8xl font-light tracking-tight text-refenti-charcoal uppercase leading-none">Elevate Your <br/><span className="text-refenti-gold italic">Standard</span></h2>
            <p className="text-gray-400 font-light text-xl">
              Private viewings and boutique dossiers are available upon request for verified inquiries.
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-center gap-8">
            <button className="bg-refenti-charcoal text-white px-14 py-5 rounded-xl font-sans font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-refenti-gold transition-all shadow-xl active:scale-95">
              Request Dossier
            </button>
            <a 
              href="https://wa.me/251986198686"
              className="border border-gray-200 text-refenti-charcoal rounded-xl px-14 py-5 font-sans font-bold uppercase tracking-[0.2em] text-[11px] hover:bg-refenti-offwhite transition-all text-center"
            >
              WhatsApp Advisor
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default RefentiBole;
