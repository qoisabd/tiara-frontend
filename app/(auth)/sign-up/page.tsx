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
import { Status } from "@/utils/Status";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { registerUser } from "@/features/auth/authThunk";
import { Bounce, toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { ApiErrorType } from "@/types/types";
import { FaArrowLeft } from "react-icons/fa";

const formSchema = z
  .object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.string().email("Invalid email address"),
    phone: z
      .string()
      .min(10, "Phone Number must contain at least 10 character(s)")
      .max(13, "Phone Number must contain at most 13 character(s)"),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type SignUpFormValues = z.infer<typeof formSchema>;

const Register = () => {
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

  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();
  const { status, errorMessage } = useSelector(
    (state: RootState) => state.registerReducer
  );

  const imgRegister = "/assets/images/img-sign-up.svg";
  const logoDiamond = "/assets/logos/logo-rifqi-top-up.svg";

  const onSubmit = async (data: SignUpFormValues) => {
    try {
      const dataValue = {
        us_username: data.username,
        us_email: data.email,
        us_phone_number: data.phone,
        us_password: data.password,
      };
      await dispatch(registerUser(dataValue));
      toast.success(
        "User Created Successfully. Please check your email to activate your account.",
        {
          position: "top-right",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        }
      );
      router.push("/sign-in");
    } catch (error) {
      const errorMessages = (error as ApiErrorType).message || "Unknown error";
      toast.error(`User Creation Failed: ${errorMessages || errorMessage}`, {
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
      <div className="absolute top-4 left-4">
        <Link
          href="/"
          className="flex items-center text-black sm:text-white hover:text-[#FBB017]"
        >
          <FaArrowLeft className="mr-2" /> Back to Home
        </Link>
      </div>
      <div className="sm:flex hidden flex-1 flex-col items-center justify-center min-h-screen bg-[#285CC4]">
        <div className="w-1/2">
          <img src={imgRegister} alt="login" />
        </div>
        <div className="mt-10">
          <p className="text-white text-lg text-center">
            Start your journey with us Tiara Games!
          </p>
          <p className="text-white text-sm text-center">
            Create a free account now! And start exploring the world of Top Up.
          </p>
        </div>
      </div>
      <div className="flex flex-1 justify-center py-14 px-3">
        <div>
          <div className="flex justify-center">
            <Image
              src={logoDiamond}
              alt="logo"
              className="w-10 border border-1 rounded-full"
              width={50}
              height={50}
            />
            <div className="flex items-center">
              <h2 className="text-[#285CC4] font-bold text-2xl">
                Tiara<span className="text-[#FBB017]"> Games</span>
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
                onSubmit={form.handleSubmit(onSubmit)}
              >
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
                        {form.formState.errors.username?.message}
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
                        {form.formState.errors.email?.message}
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
                        {form.formState.errors.phone?.message}
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
                            type="password"
                            placeholder="Confirm your password"
                            {...field}
                            isPassword
                          />
                        </FormControl>
                        <FormMessage>
                          {form.formState.errors.confirmPassword?.message}
                        </FormMessage>
                      </FormItem>
                    )}
                  />
                </div>

                <Button type="submit" className="w-full bg-[#285CC4]">
                  {status === Status.LOADING ? "Signing Up..." : "Sign Up"}
                </Button>
                {status === Status.FAILED && (
                  <p className="text-center text-red-500 mt-1">
                    {errorMessage}
                  </p>
                )}
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

export default Register;
