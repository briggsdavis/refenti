
export interface Project {
  id: string;
  name: string;
  type: 'Sales' | 'Leasing';
  location: string;
  image: string;
  description: string;
  features?: string[];
}

export interface EventItem {
  id: string;
  title: string;
  date: string;
  location: string;
  image: string;
  details?: string;
}