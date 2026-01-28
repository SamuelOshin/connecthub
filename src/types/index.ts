export interface User {
  id: string;
  name: string;
  age: number;
  location: string;
  avatarUrl: string;
  isVerified: boolean;
  isPremium: boolean;
  bio?: string;
}
