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
  username: z.string().min(3),
  email: z.string().email(),
  phone: z.string().min(10).max(13),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
});

type SignUpFormValues = z.infer<typeof formSchema>;

const Login = () => {
  // Initialize the useForm hook with zod schema
  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
  });

  const imgRegister = "/assets/images/img-sign-up.svg";
  const logoDiamond = "/assets/logos/logo-rifqi-top-up.svg";

  return (
    <div className="w-full flex">
      <div className="flex flex-1 flex-col items-center justify-center min-h-screen bg-[#285CC4]">
        <div className="w-1/2">
          <img src={imgRegister} alt="login" />
        </div>
        <div className="mt-10">
          <p className="text-white text-lg text-center">
            Start your journey with us Rifqi top-ups!
          </p>
          <p className="text-white text-sm text-center">
            Create a free account now! And start exploring the world of Top Up.
          </p>
        </div>
      </div>
      <div className="flex flex-1 justify-center py-14">
        <div>
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
            <h2 className="text-3xl font-semibold">Create an account</h2>
            <p className="text-lg text-gray-400">
              Please fill in the form to create an account
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
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter your username"
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
                          {form.formState.errors.password?.message}
                        </FormMessage>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter your phone number"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage>
                          {form.formState.errors.password?.message}
                        </FormMessage>
                      </FormItem>
                    )}
                  />

                  <div className="flex flex-row gap-3">
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
                              {...field}
                              isPassword
                            />
                          </FormControl>
                          <FormMessage>
                            {form.formState.errors.password?.message}
                          </FormMessage>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="confirmPassword"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input
                              type="confirmPassword"
                              placeholder="Enter your password"
                              {...field}
                              isPassword
                            />
                          </FormControl>
                          <FormMessage>
                            {form.formState.errors.password?.message}
                          </FormMessage>
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full bg-[#285CC4]">
                  Sign Up
                </Button>
                <p className="text-center text-gray-400 mt-1">
                  Already have an account?{" "}
                  <span className="text-[#285CC4] font-semibold underline">
                    <Link href="/sign-in">Sign In</Link>
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
