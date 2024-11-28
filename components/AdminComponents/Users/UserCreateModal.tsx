"use client";

import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createUser, updateUserById } from "@/features/admin/adminThunk";
import { RegisterType } from "@/types/types";
import { AppDispatch } from "@/store/store";
import { Bounce, toast } from "react-toastify";

const formSchema = z.object({
  us_username: z
    .string()
    .min(3, { message: "Username must be at least 2 characters" })
    .max(20, { message: "Username must be at most 20 characters" }),
  us_email: z.string().email({ message: "Invalid email address" }),
  us_password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  us_phone_number: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .max(15, { message: "Phone number must be at most 15 digits" }),
});

interface UserCreateModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: RegisterType | null;
  onSuccess?: () => void;
}

const UserCreateModal: React.FC<UserCreateModalProps> = ({
  isOpen,
  onOpenChange,
  initialData,
  onSuccess,
}) => {
  const dispatch = useDispatch<AppDispatch>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      us_username: "",
      us_email: "",
      us_password: "",
      us_phone_number: "",
    },
  });

  // Reset form when modal opens with initial data
  useEffect(() => {
    if (isOpen && initialData) {
      form.reset({
        us_username: initialData.us_username,
        us_email: initialData.us_email,
        us_password: "", // Don't show existing password
        us_phone_number: initialData.us_phone_number,
      });
    } else if (isOpen) {
      form.reset({
        us_username: "",
        us_email: "",
        us_password: "",
        us_phone_number: "",
      });
    }
  }, [isOpen, initialData, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (initialData) {
        await dispatch(
          updateUserById({
            userId: initialData.us_id as number,
            data: values,
          })
        ).unwrap();

        toast.success("User Successfully Updated", {
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
      } else {
        await dispatch(createUser(values)).unwrap();
        toast.success("User Successfully Created", {
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

      // Call onSuccess callback to refresh the data
      if (onSuccess) {
        onSuccess();
      }

      onOpenChange(false);
      form.reset();
    } catch (error) {
      toast.error(
        `Failed to ${initialData ? "update" : "create"} user: ${error}`,
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        }
      );
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initialData ? "Edit User" : "Create User"}</DialogTitle>
          <DialogDescription>
            {initialData
              ? "Update existing user details"
              : "Create a new user account"}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="us_username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="us_email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="us_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder={
                        initialData ? "Enter new password" : "Enter password"
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="us_phone_number"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit">
                {initialData ? "Update User" : "Create User"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default UserCreateModal;
