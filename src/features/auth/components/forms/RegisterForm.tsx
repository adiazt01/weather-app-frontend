import { useNavigate } from "react-router";
import { useAuthStore } from "../../stores/auth.store";
import type { IRegisterFormInputs } from "../../interface/auth-forms.interface";
import { registerSchema } from "../../schemas/auth.schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import type { AuthUser } from "../../interface/auth-user.interface";
import type { SignUpParams } from "../../interface/auth-service.interface";
import { toast } from "sonner";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ErrorMessageInput } from "@/features/shared/components/forms/inputs/ErrorMessageInput";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Eye, EyeClosed, KeyRound, Loader } from "lucide-react";
import { AnimatePresence } from "motion/react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { motion } from "motion/react"
import type { ErrorApi } from "@/features/shared/interfaces/errors-api.interface";

export const RegisterForm = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const signUp = useAuthStore((state) => state.signUp);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<IRegisterFormInputs>({
    resolver: yupResolver(registerSchema),
    mode: "onChange",
  });

  const mutation = useMutation<AuthUser, ErrorApi, SignUpParams>({
    mutationFn: signUp,
    onSuccess: () => {
      toast.success("Registro exitoso");
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
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit: SubmitHandler<IRegisterFormInputs> = (data) => {
    mutation.mutate({
      email: data.email,
      password: data.password,
      username: data.username,
    });
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>

      <Card className="overflow-hidden">
        <CardContent className="grid p-0">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">
                  Bienvenido!
                </h1>
                <p className="text-balance text-muted-foreground">
                  Regístrate para continuar
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
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="mario123"
                  {...register("username")}
                  required
                />
                <ErrorMessageInput error={errors.username?.message} />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Contraseña</Label>
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
                <ErrorMessageInput error={errors.password?.message} />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                <div className="flex items-center">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder={showConfirmPassword ? "Confirmar contraseña" : "********"}
                    className="flex-1"
                    {...register("confirmPassword")}
                    required
                  />
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        type="button"
                        variant="outline"
                        className="ml-2 text-sm"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      >
                        {showConfirmPassword ? (
                          <Eye className="h-4 w-4" />
                        ) : (
                          <EyeClosed className="h-4 w-4" />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      {showConfirmPassword
                        ? "Ocultar contraseña"
                        : "Mostrar contraseña"}
                    </TooltipContent>
                  </Tooltip>
                </div>
                <ErrorMessageInput error={errors.confirmPassword?.message} />
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={mutation.isPending}
              >
                {mutation.isPending ? (
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Registrarse"
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
                      <AlertDescription>{errors.root.message}</AlertDescription>
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
