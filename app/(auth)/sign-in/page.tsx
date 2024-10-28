"use client";

import React from "react";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

// Schema for form validation
const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type SignInFormValues = z.infer<typeof formSchema>;

const Login = () => {
  // Initialize the useForm hook with zod schema
  const form = useForm<SignInFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const imgLogin = "/assets/images/img-sign-in.svg";
  const logoDiamond = "/assets/logos/logo-rifqi-top-up.svg";

  return (
    <div className="w-full flex">
      <div className="flex flex-1 flex-col items-center justify-center min-h-screen bg-[#285CC4]">
        <div className="w-1/2">
          <img src={imgLogin} alt="login" />
        </div>
        <div className="mt-10">
          <p className="text-white text-lg text-center">
            Level up your gaming experience with Rifqi top-ups!
          </p>
          <p className="text-white text-sm text-center">
            Login to your account now!
          </p>
        </div>
      </div>
      <div className="flex flex-1 justify-center">
        <div className="mt-16">
          <div className="flex justify-center">
            <div>
              <Image
                src={logoDiamond}
                alt="logo"
                className="w-10 border border-1 rounded-full"
                width={50}
                height={50}
              />
            </div>
            <div className="flex items-center justify-center">
              <h2>
                <span className="text-[#285CC4] font-bold text-2xl">Rifqi</span>
                <span className="text-[#FBB017] font-bold text-2xl">
                  Top-up
                </span>
              </h2>
            </div>
          </div>
          <div className="mt-5">
            <h2 className="text-3xl font-semibold">Welcome Back Gamers!</h2>
            <p className="text-lg text-gray-400">
              Please, login to your account
            </p>
          </div>

          <div className="mt-5">
            <Form {...form}>
              <form
                className="space-y-4 w-full"
                onSubmit={form.handleSubmit((data) => console.log(data))}
              >
                <div className="flex flex-col gap-2">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Enter your email address"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage>
                          {form.formState.errors.email?.message}
                        </FormMessage>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Enter your password"
                            isPassword
                            {...field}
                          />
                        </FormControl>
                        <FormMessage>
                          {form.formState.errors.password?.message}
                        </FormMessage>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-row justify-between text-center">
                  <div className="flex items-center">
                    <input type="checkbox" className="mr-1" />
                    <label className="text-sm font-semibold">Remember me</label>
                  </div>
                  <p className="text-[#285CC4] text-sm underline">
                    <Link href="/auth/forgot-password">Forgot Password?</Link>
                  </p>
                </div>
                <Button type="submit" className="w-full bg-[#285CC4]">
                  Sign In
                </Button>
                <div className="my-1 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                  <p className="mx-2 mb-0 text-center font-semibold text-slate-500">
                    Or
                  </p>
                </div>
                <Button
                  type="button"
                  className="w-full border border-black hover:bg-[#285CC4] hover:text-white"
                  variant="ghost"
                >
                  Sign In with Google
                </Button>
                <p className="text-center text-gray-400 mt-1">
                  Don't have an account?{" "}
                  <span className="text-[#285CC4] font-semibold underline">
                    <Link href="/sign-up">Sign Up</Link>
                  </span>
                </p>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
