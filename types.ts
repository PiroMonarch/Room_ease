
export interface Roommate {
  id: string;
  name: string;
  avatar: string;
  balance: number;
  status: 'Friendly Nudge' | 'Pay' | 'Synced';
}

export interface Expense {
  id: string;
  title: string;
  amount: number;
  date: string;
  category: string;
  payerId: string;
}

export interface Utility {
  id: string;
  title: string;
  icon: string;
  due: string;
  cost: number;
  mine: number;
  color: string;
  isShared: boolean;
}

export enum Category {
  Food = 'Food',
  Utility = 'Utility',
  Travel = 'Travel',
  WiFi = 'WiFi',
  Groceries = 'Groceries'
}
