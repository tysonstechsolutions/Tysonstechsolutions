import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Calculate polygon area using Shoelace formula
export function calculatePolygonArea(coordinates: {lat: number, lng: number}[]): number {
  if (coordinates.length < 3) return 0;
  
  const centerLat = coordinates.reduce((sum, c) => sum + c.lat, 0) / coordinates.length;
  const metersPerDegreeLat = 111320;
  const metersPerDegreeLng = 111320 * Math.cos(centerLat * Math.PI / 180);
  
  const points = coordinates.map(c => ({
    x: c.lng * metersPerDegreeLng,
    y: c.lat * metersPerDegreeLat
  }));
  
  let area = 0;
  for (let i = 0; i < points.length; i++) {
    const j = (i + 1) % points.length;
    area += points[i].x * points[j].y;
    area -= points[j].x * points[i].y;
  }
  area = Math.abs(area) / 2;
  
  const sqft = area * 10.764;
  return Math.round(sqft);
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date));
}
