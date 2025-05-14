import { useState } from "react";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/features/auth/stores/auth.store";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { LoginForm } from "@/features/auth/components/forms/LoginForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RegisterForm } from "@/features/auth/components/forms/RegisterForm";
import { Separator } from "@/components/ui/separator";
import { motion } from "motion/react";
import { UserTabs } from "./user-tabs/UserTabs";
import { User } from "lucide-react";

export const UserMenu = () => {
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const { isAuthenticated, user, logout } = useAuthStore((state) => state);

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
                        <UserTabs setUserMenuOpen={setUserMenuOpen} />
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
                        </Button>
                    )}
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};