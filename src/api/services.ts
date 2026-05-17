import { apiClient } from './client';
import type { AboutData, EventProject, PortfolioItem } from './types';

export async function getPortfolioItems(): Promise<PortfolioItem[]> {
  const { data } = await apiClient.get<PortfolioItem[]>('/portfolio.json');
  return data;
}

export async function getEventProjects(): Promise<EventProject[]> {
  const { data } = await apiClient.get<EventProject[]>('/events.json');
  return data;
}

export async function getAboutData(): Promise<AboutData> {
  const { data } = await apiClient.get<AboutData>('/about.json');
  return data;
}
