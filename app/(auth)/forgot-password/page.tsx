"use client";
import React from "react";
import Link from "next/link";
import { MoveLeft } from "lucide-react";
import Image from "next/image";
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
import { Bounce, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { forgotPassword } from "@/features/auth/authThunk";
import { useRouter } from "next/navigation";
import { ApiErrorType } from "@/types/types";

const formSchema = z.object({
  email: z.string().email(),
});

type ForgotPasswordFormValues = z.infer<typeof formSchema>;

const ForgotPassword = () => {
  const form = useForm<ForgotPasswordFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const { status } = useSelector((state: RootState) => state.sendEmailReducer);

  const handleSubmit = async (data: ForgotPasswordFormValues) => {
    try {
      const dataValue = {
        us_email: data.email,
      };
      await dispatch(forgotPassword(dataValue)).unwrap();

      toast.success("Reset password instructions sent to your email", {
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
      router.push("/forgot-password/check-your-email");
    } catch (error) {
      const errorMessage = (error as ApiErrorType).message || "Unknown error";
      toast.error(`Failed to send email: ${errorMessage}`, {
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

  const imgForgotPassword = "assets/images/img-forgot-password.svg";

  return (
    <div className="flex h-screen bg-gray-100">
      {/* left side */}
      <div className="hidden md:flex w-1/2 bg-[#285CC4] items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-5xl font-bold text-white mb-4">
            Forgot Password
          </h1>
          <p className="text-white text-lg">
            Please enter your email to reset your password and regain access to
            your account.
          </p>
          <div className="mt-8 flex items-center justify-center">
            <Image
              src={imgForgotPassword}
              alt="Forgot Password"
              width={450}
              height={450}
            />
          </div>
        </div>
      </div>

      {/* right side */}
      <div className="flex flex-col w-full md:w-1/2 items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <Link
            href="/sign-in"
            className="text-blue-600 text-sm font-medium hover:underline text-center"
          >
            <MoveLeft size={24} className="inline-block" /> Back to Login
          </Link>
          <h2 className="text-3xl font-bold text-gray-800 mt-4">
            Forgot Password
          </h2>
          <p className="mt-2 text-gray-600">
            Enter the email associated with your account, and we'll send an
            email with instructions to reset your password.
          </p>
          <div className="mt-5">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)}>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="you@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage>
                        {form.formState.errors.email?.message}
                      </FormMessage>
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          </div>
          <div className="mt-5">
            <Button
              type="submit"
              onClick={form.handleSubmit(handleSubmit)}
              className={`w-full ${
                status === "LOADING"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#285CC4] hover:bg-[#1A4C8B]"
              } text-white`}
              disabled={status === "loading"}
            >
              {status === "loading" ? "Loading..." : "Reset Password"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
