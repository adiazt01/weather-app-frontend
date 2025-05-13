import { create } from 'zustand';
import { persist, createJSONStorage, devtools } from 'zustand/middleware';
import type { CityFavorite } from '../interface/city-favorite.interface';
import { addCityFavorite, getCitiesFavorites, removeCityFavorite } from '../services/city-favorites.service';
import { useAuthStore } from '@/features/auth/stores/auth.store';
import type { CityFavoriteSchema } from '../schemas/city-favorites.schema';

interface FavoritesState {
    favorites: CityFavorite[];
    fetchFavorites: () => Promise<void>;
    clearFavorites: () => void;
    toggleFavorite: (favorite: CityFavoriteSchema) => Promise<void>;
}

export const useFavoritesStore = create<FavoritesState>()(
    devtools(
        persist<FavoritesState>(
            (set, get) => ({
                favorites: [],
                fetchFavorites: async () => {
                    const response = await getCitiesFavorites();
                    set({ favorites: response.data });
                },
                findOneCityFavorite: (id: string) => {
                    const { favorites } = get();

                    return favorites.find((favorite) => favorite.id === id);
                },
                clearFavorites: () => {
                    set({ favorites: [] });
                },
                toggleFavorite: async (favorite: CityFavoriteSchema) => {
                    const { favorites } = get();

                    const exists = favorites.some((item) => item.name === favorite.name);

                    if (exists) {
                        const cityFavoriteToRemove = favorites.find((item) => item.name === favorite.name);
                        if (cityFavoriteToRemove) {
                            await removeCityFavorite(cityFavoriteToRemove.id);

                            set({ favorites: favorites.filter((item) => item.id !== cityFavoriteToRemove.id) });
                        }
                    } else {
                        const newCityFavorite = await addCityFavorite({ cityFavorite: {
                            country: favorite.country,
                            latitude: favorite.latitude,
                            longitude: favorite.longitude,
                            name: favorite.name,
                            region: favorite.region,
                        } });

                        set({ favorites: [...favorites, newCityFavorite] });
                    }
                },
            }),
            {
                name: 'favorites-storage',
                storage: createJSONStorage(() => localStorage),
            }
        )
    )
);