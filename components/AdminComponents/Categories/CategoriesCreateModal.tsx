"use client";

import React, { useState, useEffect } from "react";
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
import { createCategory, updateCategory } from "@/features/admin/adminThunk";
import { CategoryType } from "@/types/types";
import { AppDispatch } from "@/store/store";
import { Bounce, toast } from "react-toastify";

const formSchema = z.object({
  ct_name: z
    .string()
    .min(2, { message: "Category name must be at least 2 characters" })
    .max(50, { message: "Category name must be at most 50 characters" }),
  ct_code: z
    .string()
    .min(2, { message: "Category code must be at least 2 characters" }),
  ct_game_publisher: z
    .string()
    .min(2, { message: "Game publisher must be at least 2 characters" }),
  ct_currency_type: z
    .string()
    .min(2, { message: "Currency type must be at least 2 characters" }),
  ct_image: z.any(),
  ct_image_cover: z.any(),
  ct_currency_type_image: z.any(),
});

interface CategoriesCreateModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: CategoryType | null;
  onSuccess?: () => void;
}

const CategoriesCreateModal: React.FC<CategoriesCreateModalProps> = ({
  isOpen,
  onOpenChange,
  initialData,
  onSuccess,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ct_name: "",
      ct_code: "",
      ct_game_publisher: "",
      ct_currency_type: "",
      ct_image: null,
      ct_image_cover: null,
      ct_currency_type_image: null,
    },
  });

  useEffect(() => {
    if (isOpen && initialData) {
      form.reset({
        ct_name: initialData.ct_name,
        ct_code: initialData.ct_code,
        ct_game_publisher: initialData.ct_game_publisher,
        ct_currency_type: initialData.ct_currency_type,
      });
    } else if (isOpen) {
      form.reset({
        ct_name: "",
        ct_code: "",
        ct_game_publisher: "",
        ct_currency_type: "",
        ct_image: null,
        ct_image_cover: null,
        ct_currency_type_image: null,
      });
    }
  }, [isOpen, initialData, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("ct_name", values.ct_name);
      formData.append("ct_code", values.ct_code);
      formData.append("ct_game_publisher", values.ct_game_publisher);
      formData.append("ct_currency_type", values.ct_currency_type);

      if (values.ct_image[0]) {
        formData.append("ct_image", values.ct_image[0]);
      }
      if (values.ct_image_cover[0]) {
        formData.append("ct_image_cover", values.ct_image_cover[0]);
      }
      if (values.ct_currency_type_image[0]) {
        formData.append(
          "ct_currency_type_image",
          values.ct_currency_type_image[0]
        );
      }

      if (initialData) {
        await dispatch(
          updateCategory({
            categoryId: initialData.ct_id!,
            data: formData,
          })
        ).unwrap();
        toast.success("Category Successfully Updated", {
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
        await dispatch(createCategory(formData)).unwrap();
        toast.success("Category Successfully Created", {
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

      if (onSuccess) {
        onSuccess();
      }

      onOpenChange(false);
      form.reset();
    } catch (error) {
      toast.error(
        `Failed to ${initialData ? "update" : "create"} category: ${error}`,
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Category" : "Create Category"}
          </DialogTitle>
          <DialogDescription>
            {initialData
              ? "Update existing category details"
              : "Create a new category"}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="ct_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter category name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ct_code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter category code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ct_game_publisher"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Game Publisher</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter game publisher" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ct_currency_type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Currency Type</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter currency type" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ct_image"
              render={({ field: { onChange } }) => (
                <FormItem>
                  <FormLabel>Category Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => onChange(e.target.files)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ct_image_cover"
              render={({ field: { onChange } }) => (
                <FormItem>
                  <FormLabel>Cover Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => onChange(e.target.files)}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="ct_currency_type_image"
              render={({ field: { onChange } }) => (
                <FormItem>
                  <FormLabel>Currency Type Image</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) => onChange(e.target.files)}
                    />
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
              <Button type="submit" disabled={loading}>
                {loading
                  ? "Processing..."
                  : initialData
                  ? "Update Category"
                  : "Create Category"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CategoriesCreateModal;
