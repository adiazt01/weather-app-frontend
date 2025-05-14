import type { AutoComplete } from "@/features/weather/interface/autocomplete.interface";
import { AddToFavoriteButton } from "@/features/weather/components/buttons/AddToFavoriteButton";

interface SearchResultItemProps {
  city: AutoComplete;
  isAuthenticated: boolean;
  onSelect: (city: AutoComplete) => void;
}

export const SearchResultItem = ({
  city,
  isAuthenticated,
  onSelect,
}: SearchResultItemProps) => {
  return (
    <div
      onClick={() => onSelect(city)}
      className="flex items-center justify-between cursor-pointer"
    >
      <div className="flex items-center">
        <span>{city.name}</span>
        <span className="ml-2 text-sm text-muted-foreground">{city.country}</span>
      </div>
      {isAuthenticated && (
        <AddToFavoriteButton city={city} />
      )}
    </div>
  );
};