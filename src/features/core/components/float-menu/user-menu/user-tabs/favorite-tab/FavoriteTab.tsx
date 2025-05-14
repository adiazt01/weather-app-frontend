import { TabsContent } from "@/components/ui/tabs"
import { AnimatePresence } from "motion/react"
import { useFavoritesStore } from "@/features/weather/stores/favorites.store"
import { CityItem } from "../city-item/CityItem"

interface FavoritesTabProps {
    setUserMenuOpen: (open: boolean) => void
}

export const FavoritesTab = ({ setUserMenuOpen }: FavoritesTabProps) => {
    const { favorites } = useFavoritesStore((state) => state)
    return (
        <TabsContent value="favorites" className="mt-4 space-y-3">
            <AnimatePresence>
                {favorites.length > 0 ? (
                    favorites.map((city) => (
                        <CityItem city={city} key={city.id} setUserMenuOpen={setUserMenuOpen} />
                    ))
                ) : (
                    <p className="text-center text-muted-foreground py-4">No tienes ciudades favoritas</p>
                )}
            </AnimatePresence>
        </TabsContent>
    )
}