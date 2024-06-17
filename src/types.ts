export type Note = {
  title: string;
  details: string;
  category: string;
  id: string;
};

export type Status = 'idle' | 'loading' | 'succeeded' | 'failed';
