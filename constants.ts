
import { Project, EventItem } from './types';

export const PROJECTS: Project[] = [
  {
    id: 'bole',
    name: 'Bole High-Rise',
    type: 'Sales',
    location: 'Bole, Addis Ababa',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&q=80&w=1200',
    description: 'A masterpiece of contemporary architecture situated in the heart of Addis Ababa’s most prestigious district.',
    features: ['Panoramic City Views', 'Private Concierge', 'Infinity Sky Pool', 'Smart Home Integration', 'Underground Parking']
  },
  {
    id: 'kasanches',
    name: 'Kasanches Executive',
    type: 'Leasing',
    location: 'Kasanches, Addis Ababa',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=1200',
    description: 'Premium office spaces and luxury executive suites designed for global industry leaders.',
  },
  {
    id: 'bulbula',
    name: 'Bulbula Residential',
    type: 'Leasing',
    location: 'Bulbula, Addis Ababa',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200',
    description: 'Modern living spaces that blend comfort with sophisticated urban design.',
  }
];

export const EVENTS: EventItem[] = [
  {
    id: '1',
    title: 'Private Investor Gala',
    date: 'Dec 15, 2024',
    location: 'Sheraton Addis',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=600',
    details: 'An exclusive evening for high-net-worth individuals to discuss our upcoming 2025 pipeline. Featuring live orchestral accompaniment and a curated tasting menu by executive chefs. Admission is strictly by formal invitation.'
  },
  {
    id: '2',
    title: 'Bole Penthouse Reveal',
    date: 'Jan 20, 2025',
    location: 'Refenti Showroom',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=600',
    details: 'Witness the unveiling of our flagship triplex penthouse. A guided tour through the 4,500 sq ft space showcasing Italian marble finishes and bespoke automation systems. Refreshments will be served in the rooftop garden.'
  },
  {
    id: '3',
    title: 'Urban Design Symposium',
    date: 'Feb 05, 2025',
    location: 'Pan Africa HQ',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=600',
    details: 'A roundtable discussion with leading architects on the future of sustainable high-rise development in East Africa. This event aims to bridge digital innovation with vernacular architectural principles.'
  }
];