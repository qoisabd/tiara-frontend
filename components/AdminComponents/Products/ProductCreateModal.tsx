"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  createProduct,
  fetchNameCategory,
  updateProductById,
} from "@/features/admin/adminThunk";
import { ProductType, CategoryType } from "@/types/types";
import { AppDispatch, RootState } from "@/store/store";
import { Bounce, toast } from "react-toastify";

const formSchema = z.object({
  pr_name: z
    .string()
    .min(2, { message: "Product name must be at least 2 characters" })
    .max(50, { message: "Product name must be at most 50 characters" }),
  pr_ct_id: z.string().min(1, { message: "Category is required" }),
  pr_price: z.string().min(1, { message: "Price is required" }),
});

interface ProductCreateModalProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  initialData?: ProductType | null;
  onSuccess?: () => void;
}

const ProductCreateModal: React.FC<ProductCreateModalProps> = ({
  isOpen,
  onOpenChange,
  initialData,
  onSuccess,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories } = useSelector(
    (state: RootState) => state.adminCategoryReducer
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pr_name: "",
      pr_ct_id: "",
      pr_price: "",
    },
  });

  useEffect(() => {
    if (isOpen) {
      dispatch(fetchNameCategory());
    }
  }, [isOpen, dispatch]);

  useEffect(() => {
    if (isOpen && initialData) {
      form.reset({
        pr_name: initialData.pr_name,
        pr_ct_id: initialData.pr_ct_id.toString(),
        pr_price: initialData.pr_price.toString(),
      });
    } else if (isOpen) {
      form.reset({
        pr_name: "",
        pr_ct_id: "",
        pr_price: "",
      });
    }
  }, [isOpen, initialData, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const productData: ProductType = {
        pr_name: values.pr_name,
        pr_ct_id: parseInt(values.pr_ct_id),
        pr_price: parseFloat(values.pr_price),
      };

      if (initialData) {
        await dispatch(
          updateProductById({
            productId: initialData.pr_id!,
            data: productData,
          })
        ).unwrap();
        toast.success("Product Successfully Updated", {
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
        // Create new product
        await dispatch(createProduct(productData)).unwrap();
        toast.success("Product Successfully Created", {
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
        `Failed to ${initialData ? "update" : "create"} product: ${error}`,
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
          <DialogTitle>
            {initialData ? "Edit Product" : "Create Product"}
          </DialogTitle>
          <DialogDescription>
            {initialData
              ? "Update existing product details"
              : "Create a new product"}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="pr_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter product name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pr_ct_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category: CategoryType) => (
                        <SelectItem
                          key={category.ct_id}
                          value={category.ct_id?.toString() ?? ""}
                        >
                          {category.ct_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="pr_price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="Enter price" {...field} />
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
                {initialData ? "Update Product" : "Create Product"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductCreateModal;
