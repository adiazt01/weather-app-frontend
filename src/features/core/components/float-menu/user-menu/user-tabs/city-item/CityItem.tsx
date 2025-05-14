import { AddToFavoriteButton } from "@/features/weather/components/buttons/AddToFavoriteButton"
import type { CityFavorite } from "@/features/weather/interface/city-favorite.interface"
import { motion } from "motion/react"
import { useSearchParams } from "react-router"

interface CityItemProps {
    city: CityFavorite
    setUserMenuOpen: (open: boolean) => void
}

export const CityItem = ({ city, setUserMenuOpen }: CityItemProps) => {
    const [_, setSearchParams] = useSearchParams();

    const handleSelectCity = (city: CityFavorite) => {
        setSearchParams({ city: city.name });
        setUserMenuOpen(false);
    };

    return (
        <motion.div
            key={city.id}
            exit={{
                opacity: 0,
            }}
            className="flex items-center justify-between p-3 px-4 border rounded-md
                            hover:bg-muted transition-all duration-200 ease-in-out cursor-pointer"
            whileHover={{ scale: 1.02 }}
            onClick={() => handleSelectCity(city)}
        >
            <div className="flex w-full items-center gap-2">
                <div>
                    <p className="font-medium">{city.name}</p>
                    <p className="text-sm text-muted-foreground">{city.country}</p>
                </div>
            </div>
            <AddToFavoriteButton city={city} />
        </motion.div>
    )
}