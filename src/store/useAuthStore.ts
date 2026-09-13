import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User } from '../types';

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, name?: string) => void;
  logout: () => void;
  updateProfile: (updatedData: Partial<User>) => void;
}

const DEFAULT_USER: User = {
  id: 'usr-101',
  name: 'Eleanor Vance',
  email: 'eleanor.vance@example.com',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  phone: '+1 (555) 234-5678',
  location: 'Boston, Massachusetts, USA',
  joinedDate: 'January 2024',
  bio: 'Avid reader, literary enthusiast, and collector of vintage hardcover classics. Passionate about speculative fiction, philosophy, and historical memoirs.',
  favoriteGenres: ['Literary Fiction', 'Science Fiction', 'Philosophy', 'Self Development']
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: DEFAULT_USER,
      isAuthenticated: true,
      login: (email, name) =>
        set((state) => ({
          isAuthenticated: true,
          user: {
            ...(state.user || DEFAULT_USER),
            email,
            name: name || email.split('@')[0].replace('.', ' ')
          }
        })),
      logout: () =>
        set({
          user: null,
          isAuthenticated: false
        }),
      updateProfile: (updatedData) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updatedData } : null
        }))
    }),
    {
      name: 'lumina-auth-storage'
    }
  )
);
