"use client";
import React, { Suspense } from "react";
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
import { sendEmailVerification } from "@/features/auth/authThunk";
import { useRouter, useSearchParams } from "next/navigation";
import { ApiErrorType } from "@/types/types";

const formSchema = z.object({
  email: z.string().email(),
});

type SendEmailVerificationFormValues = z.infer<typeof formSchema>;

const EmailVerificationForm = () => {
  const searchParams = useSearchParams();
  const emailFromQuery = searchParams.get("email") || "";

  const form = useForm<SendEmailVerificationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: emailFromQuery.includes("@") ? emailFromQuery : "",
    },
  });

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { status } = useSelector((state: RootState) => state.sendEmailReducer);

  const handleSubmit = async (data: SendEmailVerificationFormValues) => {
    try {
      const dataValue = {
        us_email: data.email,
      };
      await dispatch(sendEmailVerification(dataValue)).unwrap();

      toast.success(
        "Verification email sent, please check your email to verify your account",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          transition: Bounce,
        }
      );

      router.push("/sign-in");
    } catch (error) {
      const errorMessage = (error as ApiErrorType).message || "Unknown error";
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        transition: Bounce,
      });
    }
  };

  return (
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
                    disabled={!!emailFromQuery}
                  />
                </FormControl>
                <FormMessage>
                  {form.formState.errors.email?.message}
                </FormMessage>
              </FormItem>
            )}
          />
          <div className="mt-5">
            <Button
              type="submit"
              onClick={form.handleSubmit(handleSubmit)}
              className={`w-full ${
                status === "LOADING"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#285CC4] hover:bg-[#1A4C8B]"
              } text-white`}
              disabled={status === "LOADING"}
            >
              {status === "loading" ? "Loading..." : "Send Verification Email"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

const SendVerifyEmail = () => {
  const imgVerifyEmail = "assets/images/img-verify-email.svg";

  return (
    <div className="flex h-screen bg-gray-100">
      {/* left side */}
      <div className="hidden md:flex w-1/2 bg-[#285CC4] items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-5xl font-bold text-white mb-4">
            Send Verification Email
          </h1>
          <p className="text-white text-lg">
            Please enter your email to active your account
          </p>
          <div className="mt-8 flex items-center justify-center">
            <Image
              src={imgVerifyEmail}
              alt="Forgot Password"
              width={450}
              height={450}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full md:w-1/2 items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <Link
            href="/sign-in"
            className="text-blue-600 text-sm font-medium hover:underline text-center"
          >
            <MoveLeft size={24} className="inline-block" /> Back to Login
          </Link>
          <h2 className="text-3xl font-bold text-gray-800 mt-4">
            Send Verification Email
          </h2>
          <p className="mt-2 text-gray-600">
            Enter the email associated with your account, and we'll send an
            email with instructions to verify your email address.
          </p>
          <Suspense fallback={<div>Loading...</div>}>
            <EmailVerificationForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default SendVerifyEmail;
