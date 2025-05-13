import { useNavigate } from "react-router";
import { useAuthStore } from "../../stores/auth.store";
import type { ILoginFormInputs } from "../../interface/auth-forms.interface";
import { useForm, type SubmitHandler } from "react-hook-form";
import { loginSchema } from "../../schemas/auth.schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import type { AuthUser } from "../../interface/auth-user.interface";
import type { SignInParams } from "../../interface/auth-service.interface";
import { toast } from "sonner";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Eye, EyeClosed, KeyRound, Loader } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { ErrorMessageInput } from "@/features/shared/components/forms/inputs/ErrorMessageInput";

export const LoginForm = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const login = useAuthStore((state) => state.signIn);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<ILoginFormInputs>({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
  });

  const mutation = useMutation<AuthUser, Error, SignInParams>({
    mutationFn: login,
    onSuccess: () => {
      toast.success("Inicio de sesión exitoso");
      navigate("/");
    },
    onError: (error) => {
      setError("root", { message: error.message });
      setTimeout(() => {
        clearErrors("root");
      }, 5000);
    },
  });

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<ILoginFormInputs> = (data) => {
    mutation.mutate(data);
  };

  console.log(errors);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Bienvenido de vuelta</h1>
                <p className="text-balance text-muted-foreground">
                  Inicia sesión para continuar
                </p>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register("email")}
                  required
                />
                <ErrorMessageInput error={errors.email?.message} />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Contraseña</Label>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Olvidaste tu contraseña?
                  </a>
                </div>
                <div className="flex items-center">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder={showPassword ? "Contraseña" : "********"}
                    className="flex-1"
                    {...register("password")}
                    required
                  />
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        type="button"
                        variant="outline"
                        className="ml-2 text-sm"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <Eye className="h-4 w-4" />
                        ) : (
                          <EyeClosed className="h-4 w-4" />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      {showPassword
                        ? "Ocultar contraseña"
                        : "Mostrar contraseña"}
                    </TooltipContent>
                  </Tooltip>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-500">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? (
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Iniciar sesión"
                )}
              </Button>
              <AnimatePresence>
                {errors.root && (
                  <motion.div
                    initial={{
                      scale: 0,
                    }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <Alert variant="destructive">
                      <KeyRound className="h-4 w-4" />
                      <AlertTitle>Error al iniciar sesión</AlertTitle>
                      <AlertDescription>{errors.root?.message?.message || "Ha ocurrido un error desconocido"}</AlertDescription>
                    </Alert>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
