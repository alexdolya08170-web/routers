export interface PortfolioItem {
  id: number;
  title: string;
  image: string;
}

export type EventCategory = 'Web Apps' | 'SaaS/B2B' | 'SPA' | 'BOTS';

export interface EventProject {
  id: number;
  title: string;
  description: string;
  category: EventCategory;
  techStack: string[];
  link: string;
  fullDescription?: string;
  features?: string[];
}

export interface ServiceItem {
  id: number;
  title: string;
  description: string;
  features: string[];
}

export interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  period: string;
  description: string[];
}

export interface AboutData {
  services: ServiceItem[];
  experience: ExperienceItem[];
  skills: string[];
}