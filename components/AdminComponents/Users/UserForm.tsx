"use client";

import React from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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

// Zod validation schema
const formSchema = z.object({
  us_username: z
    .string()
    .min(2, { message: "Username must be at least 2 characters" }),
  us_email: z.string().email({ message: "Invalid email address" }),
  us_password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
  us_phone_number: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" }),
});

interface UserFormProps {
  initialData?: RegisterType | null;
  onClose: () => void;
}

const UserForm: React.FC<UserFormProps> = ({ initialData, onClose }) => {
  const dispatch = useDispatch<AppDispatch>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      us_username: "",
      us_email: "",
      us_password: "",
      us_phone_number: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      if (initialData) {
        // Update existing user
        await dispatch(
          updateUserById({
            userId: initialData.us_id!,
            data: {
              ...values,
              us_id: initialData?.us_id || 0,
            },
          })
        );
      } else {
        // Create new user
        await dispatch(createUser(values));
      }
      onClose();
    } catch (error) {
      console.error("Error saving user:", error);
    }
  };

  return (
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
                  placeholder="Enter password"
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
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">
            {initialData ? "Update User" : "Create User"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default UserForm;
