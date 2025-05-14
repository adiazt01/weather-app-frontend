import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FavoritesTab } from "./favorite-tab/FavoriteTab"
import { HistoryTab } from "./history-tab/HistoryTab"

interface UserTabsProps {
    setUserMenuOpen: (open: boolean) => void
}

export const UserTabs = ({ setUserMenuOpen }: UserTabsProps) => {
    return (
        <Tabs className="mt-4" defaultValue="favorites">
            <TabsList className="w-full">
                <TabsTrigger value="favorites" className="flex-1">
                    Favoritos
                </TabsTrigger>
                <TabsTrigger value="history" className="flex-1">
                    Historial
                </TabsTrigger>
            </TabsList>
            <FavoritesTab setUserMenuOpen={setUserMenuOpen} />
            <HistoryTab setUserMenuOpen={setUserMenuOpen} />
        </Tabs>
    )
}