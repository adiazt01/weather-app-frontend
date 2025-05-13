import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandList, Command } from "@/components/ui/command";
import { Skeleton } from "@/components/ui/skeleton";
import { useFavoritesStore } from "@/features/weather/stores/favorites.store";
import { useAuthStore } from "@/features/auth/stores/auth.store";
import { useSearchHistoryStore } from "../../../stores/search-history.store";
import { useSearchParams } from "react-router";
import { useCitySearch } from "../../../hooks/useCitySearch";
import { SearchResultItem } from "./search-result-item/SearchResultItem";
import type { AutoComplete } from "@/features/weather/interface/autocomplete.interface";
import { useState } from "react";
import type { CityFavoriteSchema } from "@/features/weather/schemas/city-favorites.schema";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SearchDialog = ({ open, onOpenChange }: SearchDialogProps) => {
  const { favorites, toggleFavorite } = useFavoritesStore();
  const { isAuthenticated } = useAuthStore();
  const { addCityToHistory } = useSearchHistoryStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [_, setSearchParams] = useSearchParams();

  const { searchResults, isLoading } = useCitySearch({
    open: open,
    query: searchQuery,
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleSelectCity = (city: AutoComplete) => {
    addCityToHistory({
      country: city.country,
      createdAt: new Date(),
      id: city.id,
      latitude: city.latitude,
      longitude: city.longitude,
      name: city.name,
      region: city.region,
      updatedAt: new Date(),
    });
    onOpenChange(false);
    setSearchParams({ city: city.name });
  };

  const handleToggleFavorite = (city: CityFavoriteSchema) => {
    toggleFavorite(city);
  };

  const isFavorite = (cityId: string) => favorites.some((fav) => fav.id === cityId);

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <Command shouldFilter={false}>
        <CommandInput
          placeholder="Buscar ciudades..."
          value={searchQuery}
          onValueChange={handleSearch}
        />
        <CommandList>
          {isLoading && (
            <CommandEmpty>
              <Skeleton className="h-full mx-2 px-2 py-3.5" />
            </CommandEmpty>
          )}

          {!isLoading && searchResults.length === 0 && searchQuery.length > 2 && (
            <CommandEmpty>No se encontraron resultados.</CommandEmpty>
          )}

          {searchResults.length > 0 && (
            <CommandGroup>
              {searchResults.map((city) => (
                <SearchResultItem
                  key={city.id}
                  city={city}
                  isAuthenticated={isAuthenticated}
                  isFavorite={isFavorite(city.id)}
                  onSelect={handleSelectCity}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </CommandGroup>
          )}

          <div className="py-2 px-2">
            <kbd className="text-xs text-muted-foreground flex items-center justify-center gap-1">
              Presiona <span className="rounded border px-1 bg-muted">⌘K</span> para abrir la búsqueda
            </kbd>
          </div>
        </CommandList>
      </Command>
    </CommandDialog>
  );
};
