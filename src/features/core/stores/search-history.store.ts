import type { CityFavorite } from "@/features/weather/interface/city-favorite.interface";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SearchHistoryState {
  searchHistory: CityFavorite[];
  addCityToHistory: (city: CityFavorite) => void;
  clearHistory: () => void;
}

export const useSearchHistoryStore = create<SearchHistoryState>()(
  persist(
    (set) => ({
      searchHistory: [],
      addCityToHistory: (city) =>
        set((state) => {
          const exists = state.searchHistory.some((item) => item.id === city.id);
          const updatedHistory = exists
            ? [city, ...state.searchHistory.filter((item) => item.id !== city.id)]
            : [city, ...state.searchHistory];
          return { searchHistory: updatedHistory.slice(0, 5) };
        }),
      clearHistory: () => set({ searchHistory: [] }),
    }),
    {
      name: "search-history-storage",
    }
  )
);