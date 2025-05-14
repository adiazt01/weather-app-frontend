import { Button } from "@/components/ui/button";
import { useFavoritesStore } from "../../stores/favorites.store";
import { Star } from "lucide-react";
import type { CityFavoriteSchema } from "../../schemas/city-favorites.schema";
import { motion } from "motion/react";

interface AddToFavoriteButtonProps {
    city: CityFavoriteSchema;
}

export const AddToFavoriteButton = ({
    city,
}: AddToFavoriteButtonProps) => {
    const { favorites, toggleFavorite } = useFavoritesStore((state) => state);

    const isFavorite = (nameCity: string) => favorites.some((fav) => fav.name === nameCity);

    const handleToggleFavorite = (city: CityFavoriteSchema) => {
        toggleFavorite(city);
        
    };

    return (
        <motion.div
            whileHover={{
                scale: 1.1,
            }}
            whileTap={{
                scale: 0.9,
            }}
        >
            <Button
                variant="ghost"
                size="icon"
                className="rounded-full"
                onClick={(e) => {
                    e.stopPropagation();
                    handleToggleFavorite({
                        country: city.country,
                        latitude: city.latitude,
                        longitude: city.longitude,
                        name: city.name,
                        region: city.region,
                    });
                }}
            >
                <Star
                    className={isFavorite(city.name) ? "fill-yellow-400 text-yellow-400" : ""}
                    size={16}
                />
            </Button>
        </motion.div>
    )
}