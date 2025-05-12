import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';
import type { CityFavorite } from '../interface/city-favorite.interface';
import { addCityFavorite, getCitiesFavorites, removeCityFavorite } from '../services/city-favorites.service';
import { useAuthStore } from '@/features/auth/stores/auth.store';
import type { CityFavoriteSchema } from '../schemas/city-favorites.schema';

interface FavoritesState {
    favorites: CityFavorite[];
    fetchFavorites: () => Promise<void>;
    addFavorite: (favorite: CityFavoriteSchema) => Promise<void>;
    removeFavorite: (id: string) => Promise<void>;
}

export const useFavoritesStore = create<FavoritesState>()(
    devtools(
        persist<FavoritesState>(
            (set, get) => ({
                favorites: [],
                fetchFavorites: async () => {
                    const { isAuthenticated } = useAuthStore.getState();

                    if (!isAuthenticated) throw new Error('User not authenticated');

                    try {
                        const response = await getCitiesFavorites();
                        set({ favorites: response.data });
                    } catch (error) {
                        throw error;
                    }
                },
                addFavorite: async (favorite: CityFavoriteSchema) => {
                    const { isAuthenticated } = useAuthStore.getState();

                    if (!isAuthenticated) throw new Error('User not authenticated');

                    try {
                        const newCityFavorite = await addCityFavorite({ cityFavorite: { ...favorite } });

                        set((state) => ({
                            favorites: [...state.favorites, newCityFavorite],  
                        }));
                    } catch (error) {
                        throw error;
                    }
                },
                removeFavorite: async (id: string) => {
                    const { isAuthenticated } = useAuthStore.getState();

                    if (!isAuthenticated) throw new Error('User not authenticated');

                    try {
                        await removeCityFavorite(Number(id));

                        set((state) => ({
                            favorites: state.favorites.filter((favorite) => favorite.id !== id),
                        }));
                    } catch (error) {
                        throw error;
                    }
                },
                findOneCityFavorite: (id: string) => {
                    const { favorites } = get();

                    return favorites.find((favorite) => favorite.id === id);
                }
            }),
            {
                name: 'favorites-storage',
                storage: createJSONStorage(() => localStorage),
            }
        )
    )
);