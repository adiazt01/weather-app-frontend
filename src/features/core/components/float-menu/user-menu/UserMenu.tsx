import { useState } from "react";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { History, User } from "lucide-react";
import { useAuthStore } from "@/features/auth/stores/auth.store";
import { useSearchHistoryStore } from "@/features/core/stores/search-history.store";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { LoginForm } from "@/features/auth/components/forms/LoginForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RegisterForm } from "@/features/auth/components/forms/RegisterForm";
import { Separator } from "@/components/ui/separator";
import { useFavoritesStore } from "@/features/weather/stores/favorites.store";
import type { CityFavorite } from "@/features/weather/interface/city-favorite.interface";
import { AnimatePresence, motion } from "motion/react";
import { useSearchParams } from "react-router";
import { AddToFavoriteButton } from "@/features/weather/components/buttons/AddToFavoriteButton";

export const UserMenu = () => {
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const { isAuthenticated, user, logout } = useAuthStore((state) => state);
    const { searchHistory } = useSearchHistoryStore((state) => state)
    const [_, setSearchParams] = useSearchParams();

    const handleSelectCity = (city: CityFavorite) => {
        setSearchParams({ city: city.name });
        setUserMenuOpen(false);
    };

    const { favorites } = useFavoritesStore((state) => state);

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

                        <Tabs className="mt-4" defaultValue="favorites">
                            <TabsList className="w-full">
                                <TabsTrigger value="favorites" className="flex-1">
                                    Favoritos
                                </TabsTrigger>
                                <TabsTrigger value="history" className="flex-1">
                                    Historial
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="favorites" className="mt-4 space-y-3">
                                <AnimatePresence>
                                    {favorites.length > 0 ? (
                                        favorites.map((city) => (
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
                                        ))
                                    ) : (
                                        <p className="text-center text-muted-foreground py-4">No tienes ciudades favoritas</p>
                                    )}
                                </AnimatePresence>
                            </TabsContent>
                            <TabsContent value="history" className="mt-4 space-y-2">
                                {searchHistory.length > 0 ? (
                                    searchHistory.map((city) => (
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
                                                    <p className="font-medium flex flex-row items-center gap-1">
                                                        <History className="" size={16} />
                                                        {city.name}
                                                    </p>
                                                    <p className="text-sm text-muted-foreground">{city.country}</p>
                                                </div>
                                            </div>
                                            <AddToFavoriteButton city={city} />

                                        </motion.div>
                                    ))
                                ) : (
                                    <p className="text-center text-muted-foreground py-4">No hay historial de búsqueda</p>
                                )}
                            </TabsContent>
                        </Tabs>
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
                <SheetFooter>
                    {isAuthenticated && (
                        <Button variant="destructive" onClick={logout}>
                            Cerrar sesión
                        </Button>)
                    }
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};