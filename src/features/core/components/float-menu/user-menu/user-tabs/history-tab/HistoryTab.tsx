import { TabsContent } from "@/components/ui/tabs"
import { useSearchHistoryStore } from "@/features/core/stores/search-history.store"
import { CityItem } from "../city-item/CityItem"

interface HistoryTabProps {
    setUserMenuOpen: (open: boolean) => void
}

export const HistoryTab = ({ setUserMenuOpen }: HistoryTabProps) => {
    const { searchHistory } = useSearchHistoryStore((state) => state)

    return (
        <TabsContent value="history" className="mt-4 space-y-2">
            {searchHistory.length > 0 ? (
                searchHistory.map((city) => (
                    <CityItem city={city} key={city.id} setUserMenuOpen={setUserMenuOpen} />
                ))
            ) : (
                <p className="text-center text-muted-foreground py-4">No hay historial de búsqueda</p>
            )}
        </TabsContent>
    )
}