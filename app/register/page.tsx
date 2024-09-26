"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { signUpSchema, TSignUpSchema } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import LoadingButton from "@/components/loading-button";
import { registerUser } from "@/lib/action";

const Register = () => {
  const router = useRouter();
  const notify = () =>
    toast("Successfuly Registered!", {
      icon: "🍻",
    });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
  });

  const handleErrors = (errors: Record<string, string>) => {
    Object.keys(errors).forEach((field) => {
      setError(field as keyof TSignUpSchema, {
        type: "server",
        message: errors[field],
      });
    });
  };

  const onSubmit = async (data: TSignUpSchema) => {
    try {
      const responseData = await registerUser(data);

      if (responseData.errors) {
        handleErrors(responseData.errors);
      } else if (responseData.success) {
        router.push("/auth/signin");
        notify();
      }
    } catch (error) {
      if (error instanceof Error) {
        try {
          const errorData = JSON.parse(error.message);
          if (errorData.errors) {
            handleErrors(errorData.errors);
          } else {
            alert("An unexpected error occurred.");
          }
        } catch {
          alert("An unexpected error occurred.");
        }
      } else {
        alert("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center overflow-y-auto h-screen py-5">
      <Card className="w-[400px] ">
        <CardHeader>
          <CardTitle className="text-center text-2xl">Register</CardTitle>
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
                    {`${errors.username.message}`}
                  </p>
                )}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  {...register("email")}
                  id="email"
                  placeholder="email@example.com"
                  type="email"
                />
                {errors.email && (
                  <p className="mt-2 text-sm text-red-500">
                    {`${errors.email.message}`}
                  </p>
                )}
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  {...register("phone")}
                  id="phone"
                  placeholder="09123456789"
                  type="number"
                />
                {errors.phone && (
                  <p className="mt-2 text-sm text-red-500">
                    {`${errors.phone.message}`}
                  </p>
                )}
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="address">Address</Label>
                <Textarea
                  {...register("address")}
                  id="address"
                  placeholder="House Number, Street Name
                              Barangay, City/Municipality
                              Province
                              Philippines"
                />
                {errors.address && (
                  <p className="mt-2 text-sm text-red-500">
                    {`${errors.address.message}`}
                  </p>
                )}
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  {...register("password")}
                  id="password"
                  type="password"
                  placeholder="password"
                />
                {errors.password && (
                  <p className="mt-2 text-sm text-red-500">
                    {`${errors.password.message}`}
                  </p>
                )}
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  {...register("confirmPassword")}
                  id="confirmPassword"
                  type="password"
                  placeholder="confirm password"
                />
                {errors.confirmPassword && (
                  <p className="mt-2 text-sm text-red-500">
                    {`${errors.confirmPassword.message}`}
                  </p>
                )}
              </div>
            </div>
            <Button
              className="w-full py-5 mt-5 text-center"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? <LoadingButton /> : "Sign Up"}
            </Button>
            <p className="mt-2 text-sm text-slate-500">
              Already have an account? Sign in {""}
              <Link href={"/auth/signin"} className="text-black font-semibold">
                here
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
