import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';
import { jwtDecode } from 'jwt-decode';
import { signIn, signUp } from '../services/auth.service';
import type { AuthUser } from '../interface/auth-user.interface';
import type { SignInParams, SignUpParams } from '../interface/auth-service.interface';
import { useFavoritesStore } from '@/features/weather/stores/favorites.store';

interface AuthState {
  user: AuthUser | null;
  signIn: (params: SignInParams) => Promise<AuthUser>;
  signUp: (params: SignUpParams) => Promise<AuthUser>;
  isAuthenticated: boolean;
  logout: () => void;
}

interface JwtDecoded {
  email: string;
  id: number;
  iat?: number;
  exp?: number;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist<AuthState>(
      (set) => ({
        user: null,
        isAuthenticated: false,
        signIn: async ({ email, password }: SignInParams) => {
          const user = await signIn({ email, password });
          const decoded: JwtDecoded = jwtDecode(user.token);

          const authenticatedUser = {
            id: decoded.id,
            email: decoded.email,
            token: user.token,
            username: user.username,
          };

          set({ user: authenticatedUser });
          set((state) => ({ ...state, user: authenticatedUser }));
          set({ isAuthenticated: true });

          return authenticatedUser;
        },
        signUp: async ({ email, password, username }: SignUpParams) => {
          const user = await signUp({ email, password, username });
          const decoded: JwtDecoded = jwtDecode(user.token);

          const authenticatedUser = {
            id: decoded.id,
            email: decoded.email,
            token: user.token,
            username: user.username,
          };

          set((state) => ({ ...state, user: authenticatedUser }));
          set({ isAuthenticated: true });

          return authenticatedUser;
        },
        logout: () => {
          set({ user: null, isAuthenticated: false });
        },
      }),
      {
        name: 'auth-storage',
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);

useAuthStore.subscribe((state) => {
  if (!state.isAuthenticated) {
    const clearFavorites = useFavoritesStore.getState().clearFavorites;
    if (clearFavorites) {
      clearFavorites();
    }
  }
});