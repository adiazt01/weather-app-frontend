import { useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { History, Star, User } from "lucide-react";
import { useAuthStore } from "@/features/auth/stores/auth.store";
import { useSearchHistoryStore } from "@/features/core/stores/search-history.store";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { LoginForm } from "@/features/auth/components/forms/LoginForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RegisterForm } from "@/features/auth/components/forms/RegisterForm";
import { Separator } from "@/components/ui/separator";
import { useFavoritesStore } from "@/features/weather/stores/favorites.store";
import type { CityFavorite } from "@/features/weather/interface/city-favorite.interface";
import { motion } from "motion/react";
import { useSearchParams } from "react-router";

export const UserMenu = () => {
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const { isAuthenticated, user, logout } = useAuthStore((state) => state);
    const { searchHistory } = useSearchHistoryStore((state) => state)
    const { favorites, addFavorite, removeFavorite } = useFavoritesStore((state) => state);
    const [_, setSearchParams] = useSearchParams();

    const handleAddFavorite = (city: CityFavorite) => {
        addFavorite(city);
    };

    const handleSelectCity = (city: CityFavorite) => {
        setSearchParams({ city: city.name });
        setUserMenuOpen(false);
    };

    const handleRemoveFavorite = (id: string) => {
        removeFavorite(id);
    };

    const isFavorite = (id: string) => {
        return favorites.some((favorite) => favorite.id === id);
    };

    return (
        <Sheet open={userMenuOpen} onOpenChange={setUserMenuOpen}>
            <SheetTrigger asChild>
                <motion.div
                    whileHover={{
                        scale: 1.2,
                    }}
                    whileTap={{ scale: 0.9 }}
                >
                    <Button size="icon" className="rounded-full h-12 w-12 shadow-lg">
                        <User className="size-6" />
                    </Button>
                </motion.div>
            </SheetTrigger>
            <SheetContent side="right" className="px-4">
                <SheetHeader className="pb-0">
                    <SheetTitle>Perfil</SheetTitle>
                </SheetHeader>
                {isAuthenticated ? (
                    <div>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-row items-center gap-3">
                                <Avatar className="size-12 border">
                                    <AvatarImage />
                                    <AvatarFallback>{user?.email.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="font-medium text-lg">{user?.username}</p>
                                </div>
                            </div>
                            <Separator />
                        </div>

                        <Tabs defaultValue="favorites">
                            <TabsList className="w-full">
                                <TabsTrigger value="favorites" className="flex-1">
                                    Favoritos
                                </TabsTrigger>
                                <TabsTrigger value="history" className="flex-1">
                                    Historial
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="favorites" className="mt-4 space-y-2">
                                {favorites.length > 0 ? (
                                    favorites.map((city) => (
                                        <div
                                            key={city.id}
                                            className="flex items-center justify-between p-3 rounded-md hover:bg-muted cursor-pointer"

                                        >
                                            <div>
                                                <p className="font-medium">{city.name}</p>
                                                <p className="text-sm text-muted-foreground">{city.country}</p>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="icon"

                                            >
                                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                            </Button>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center text-muted-foreground py-4">No tienes ciudades favoritas</p>
                                )}
                            </TabsContent>
                            <TabsContent value="history" className="mt-4 space-y-2">
                                {searchHistory.length > 0 ? (
                                    searchHistory.map((city) => (
                                        <div
                                            key={city.id}
                                            className="flex items-center justify-between p-3 rounded-md hover:bg-muted cursor-pointer"

                                            onClick={() => {
                                                handleSelectCity(city);
                                            }}
                                        >
                                            <div className="flex items-center gap-2">
                                                <History className="h-4 w-4 text-muted-foreground" />
                                                <div>
                                                    <p className="font-medium">{city.name}</p>
                                                    <p className="text-sm text-muted-foreground">{city.country}</p>
                                                </div>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    isFavorite(String(city.id))
                                                        ? handleRemoveFavorite(String(city.id))
                                                        : handleAddFavorite(city);
                                                }}
                                            >
                                                <Star
                                                    className={`h-4 w-4 ${isFavorite(String(city.id)) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"}`}
                                                />
                                            </Button>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-center text-muted-foreground py-4">No hay historial de búsqueda</p>
                                )}
                            </TabsContent>
                        </Tabs>

                        <Button variant="destructive" className="w-full" onClick={logout}>
                            Cerrar sesión
                        </Button>
                    </div>
                ) : (
                    <div className="py-6 space-y-4">
                        <p className="text-center text-muted-foreground">
                            Inicia sesión para guardar tus ciudades favoritas y ver tu historial
                        </p>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button className="w-full" >
                                    Iniciar sesión
                                </Button>
                            </DialogTrigger>
                            <DialogContent >
                                <DialogHeader>
                                    <DialogTitle>
                                        Inicio de sesion
                                    </DialogTitle>
                                </DialogHeader>
                                <Tabs defaultValue="login">
                                    <TabsList className="w-full">
                                        <TabsTrigger value="login" className="flex-1">
                                            Iniciar sesión
                                        </TabsTrigger>
                                        <TabsTrigger value="register" className="flex-1">
                                            Registrarse
                                        </TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="login" className="mt-4">
                                        <LoginForm />
                                    </TabsContent>
                                    <TabsContent value="register" className="mt-4">
                                        <RegisterForm />
                                    </TabsContent>
                                </Tabs>
                            </DialogContent>
                        </Dialog>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    );
};