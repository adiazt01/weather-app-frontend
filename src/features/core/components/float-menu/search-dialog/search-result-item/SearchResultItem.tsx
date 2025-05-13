import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import type { AutoComplete } from "@/features/weather/interface/autocomplete.interface";
import type { CityFavoriteSchema } from "@/features/weather/schemas/city-favorites.schema";

interface SearchResultItemProps {
  city: AutoComplete;
  isAuthenticated: boolean;
  isFavorite: boolean;
  onSelect: (city: AutoComplete) => void;
  onToggleFavorite: (city: CityFavoriteSchema) => void;
}

export const SearchResultItem = ({
  city,
  isAuthenticated,
  isFavorite,
  onSelect,
  onToggleFavorite,
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
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite({ 
                country: city.country,
                latitude: city.latitude,
                longitude: city.longitude,
                name: city.name,
                region: city.region,
            });
          }}
        >
          <Star
            className={isFavorite ? "fill-yellow-400 text-yellow-400" : ""}
            size={16}
          />
        </Button>
      )}
    </div>
  );
};