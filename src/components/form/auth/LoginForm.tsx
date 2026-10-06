import { zodResolver } from "@hookform/resolvers/zod";
import { isAxiosError } from "axios";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import Button from "@/components/ui/button/Button";
import Input from "@/components/ui/input/Input";
import Label from "@/components/ui/input/Label";
import { useLoginMutation } from "@/hooks/mutations/useLoginMutation";
import { type LoginFormData, loginSchema } from "@/schemas/login.schema";
import type { ApiErrorResponse } from "@/types/api";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const loginMutation = useLoginMutation();

  const {
    register,
    handleSubmit,
    resetField,
    setError,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const isLoginLocked = loginMutation.isPending || loginMutation.isSuccess;

  const onSubmit = (data: LoginFormData) => {
    if (isLoginLocked) return;

    loginMutation.mutate(data, {
      onSuccess: () => {
        navigate("/");
      },
      onError: (error) => {
        resetField("password");

        if (
          isAxiosError<ApiErrorResponse>(error) &&
          error.response?.status === 401
        ) {
          setError("root.server", {
            type: "server",
            message: "Email atau password salah.",
          });

          return;
        }
      },
    });
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Login
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Masukkan email dan password anda untuk masuk kedalam aplikasi!
            </p>
          </div>
          <div>
            {errors.root?.server && (
              <div className="mb-4 w-max-md">
                <p className="text-sm text-error-500 dark:text-error-400">
                  Email atau password salah. Silahkan coba lagi.
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="email">
                    Email <span className="text-error-500">*</span>{" "}
                  </Label>
                  <Input
                    type="email"
                    placeholder="info@gmail.com"
                    id="email"
                    {...register("email")}
                    error={!!errors.email}
                    hint={errors.email?.message}
                  />
                </div>
                <div>
                  <Label htmlFor="password">
                    Password <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      id="password"
                      {...register("password")}
                      error={!!errors.password}
                      hint={errors.password?.message}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className={`absolute z-30 -translate-y-1/2 cursor-pointer right-4  ${errors.password ? "top-1/3" : "top-1/2"}`}
                    >
                      {showPassword ? (
                        <Eye
                          size={20}
                          className="text-gray-500 dark:text-gray-400"
                        />
                      ) : (
                        <EyeOff
                          size={20}
                          className="text-gray-500 dark:text-gray-400"
                        />
                      )}
                    </button>
                  </div>
                </div>
                <div>
                  <Button
                    className="w-full"
                    size="sm"
                    type="submit"
                    disabled={isLoginLocked}
                  >
                    {loginMutation.isPending ? "Sedang masuk..." : "Login"}
                  </Button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Tidak punya akun? {""}
                <Link
                  to="#"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Daftar sekarang
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
