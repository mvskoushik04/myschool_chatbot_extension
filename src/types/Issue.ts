export interface Issue {
    id: string;
    description: string;
    timestamp: string;
    status: 'open' | 'resolved';
  }