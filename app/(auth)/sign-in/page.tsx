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
import { useRouter } from "next/navigation";
import { Bounce, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { loginUser } from "@/features/auth/authThunk";

// Schema for form validation
const formSchema = z.object({
  input: z.string().min(5, "Username or email must be at least 5 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type SignInFormValues = z.infer<typeof formSchema>;

const Login = () => {
  const form = useForm<SignInFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      input: "",
      password: "",
    },
  });

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { status, errorMessage } = useSelector(
    (state: RootState) => state.loginReducer
  );

  const imgLogin = "/assets/images/img-sign-in.svg";
  const logoDiamond = "/assets/logos/logo-rifqi-top-up.svg";

  const onSubmit = async (data: SignInFormValues) => {
    try {
      const dataValue = {
        input: data.input,
        us_password: data.password,
      };
      await dispatch(loginUser(dataValue)).unwrap();

      toast.success("Login Success", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      router.push("/");
    } catch (error: any) {
      console.log(errorMessage);
      const message = errorMessage || error.message;
      toast.error(`User Login Failed: ${message}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <div className="w-full flex">
      <div className="flex flex-1 flex-col items-center justify-center min-h-screen bg-[#285CC4]">
        <div className="w-1/2">
          <img src={imgLogin} alt="login" />
        </div>
        <div className="mt-10 text-white text-center">
          <p className="text-lg">
            Level up your gaming experience with Rifqi top-ups!
          </p>
          <p className="text-sm">Login to your account now!</p>
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
            <div className="flex items-center">
              <h2 className="text-[#285CC4] font-bold text-2xl">
                Rifqi<span className="text-[#FBB017]">Top-up</span>
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
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <div className="flex flex-col gap-2">
                  <FormField
                    control={form.control}
                    name="input"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Username or Email Address</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter your username or email"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage>
                          {form.formState.errors.input?.message}
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

                <div className="flex flex-row justify-between items-center text-center">
                  <label className="flex items-center text-sm font-normal">
                    <input type="checkbox" className="mr-1" /> Remember me
                  </label>
                  <p className="text-[#285CC4] text-sm underline">
                    <Link href="/auth/forgot-password">Forgot Password?</Link>
                  </p>
                </div>

                <Button type="submit" className="w-full bg-[#285CC4]">
                  {status === "loading" ? "Signing In..." : "Sign In"}
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
