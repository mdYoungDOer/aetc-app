export interface User {
  id: string;
  email: string;
  name?: string;
  role?: 'admin' | 'user' | 'speaker';
}

export interface TicketType {
  id: string;
  name: string;
  price: number;
  currency: string;
  description: string;
  available: boolean;
}

export interface Session {
  id: string;
  title: string;
  description: string;
  startTime: Date;
  endTime: Date;
  speakers: Speaker[];
  venue: string;
}

export interface Speaker {
  id: string;
  name: string;
  title: string;
  bio: string;
  imageUrl?: string;
  company?: string;
}

export interface Conference {
  id: string;
  name: string;
  year: number;
  startDate: Date;
  endDate: Date;
  venue: string;
  description: string;
}

