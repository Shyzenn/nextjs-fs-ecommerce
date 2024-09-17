"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signInSchema, TSignInSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { handleCredentialsSignIn } from "@/app/authActions";
import { useState } from "react";
import LoadingButton from "@/components/loading-button";

const Login = () => {
  const [manualError, setManualError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TSignInSchema>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (values: TSignInSchema) => {
    try {
      const result = await handleCredentialsSignIn(values);
      if (result?.message) {
        setManualError(result.message);
      }
    } catch (error) {
      console.log("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <Card className="w-[400px] mx-auto my-72">
      <CardHeader>
        <CardTitle className="text-center text-2xl">Login</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="username">Username</Label>
              <Input
                {...register("username")}
                id="username"
                placeholder="username"
                type="text"
              />
              {errors.username && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.username.message}
                </p>
              )}
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Password</Label>
              <Input
                {...register("password")}
                id="password"
                placeholder="password"
                type="password"
              />
              {errors.password && (
                <p className="mt-2 text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
            {manualError && (
              <p className="mt-2 text-sm text-red-500 text-center">
                {manualError}
              </p>
            )}
          </div>
          <Button
            className="w-full py-5 mt-5"
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? <LoadingButton /> : "Sign in"}
          </Button>
          <p className="mt-2 text-sm text-slate-500">
            Don&apos;t have an account? Sign up{" "}
            <Link href="/register" className="text-black font-semibold">
              here
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
};

export default Login;
