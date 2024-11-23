"use client";
import React from "react";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { updateResetPassword } from "@/features/auth/authThunk";
import { Bounce, toast } from "react-toastify";
import { Status } from "@/utils/Status";
import { ApiErrorType } from "@/types/types";

const formSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z
      .string()
      .min(8, "Password must be at least 8 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type CreateNewPasswordFormValues = z.infer<typeof formSchema>;

const CreateNewPassword = () => {
  const form = useForm<CreateNewPasswordFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();
  const { status } = useSelector(
    (state: RootState) => state.updateResetPasswordReducer
  );

  const imgNewPassword = "/assets/images/img-create-new-password.svg";

  const onSubmit = async (data: CreateNewPasswordFormValues) => {
    try {
      const dataValue = {
        us_password: data.password,
      };

      await dispatch(updateResetPassword(dataValue)).unwrap();
      toast.success("Password updated successfully. You can now log in.", {
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
      router.push("/create-new-password/success");
    } catch (error) {
      const errorMessage = (error as ApiErrorType).message || "Unknown error";
      toast.error(`Failed to update password: ${errorMessage}`, {
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
    <div className="flex h-screen bg-gray-100">
      {/* Bagian Kiri */}
      <div className="hidden md:flex w-1/2 bg-[#285CC4] items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-5xl font-bold text-white mb-4">
            Create New Password
          </h1>
          <p className="text-white text-lg">
            Please enter a new password to secure your account.
          </p>
          <div className="mt-8 flex items-center justify-center">
            <Image
              src={imgNewPassword}
              alt="Create New Password Illustration"
              width={450}
              height={450}
            />
          </div>
        </div>
      </div>

      {/* Bagian Kanan */}
      <div className="flex flex-col w-full md:w-1/2 items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-gray-800 mt-4">
            Create New Password
          </h2>
          <p className="mt-2 text-gray-600">
            Enter a new password for your account. Make sure it's strong and
            secure.
          </p>
          <Form {...form}>
            <form
              className="space-y-4 w-full mt-5"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="Enter your new password"
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
                        placeholder="Confirm your new password"
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
              <Button
                type="submit"
                className="w-full mt-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition duration-150"
              >
                {status === Status.LOADING ? "Loading..." : "Update Password"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CreateNewPassword;
