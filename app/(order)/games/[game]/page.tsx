"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchCategoryDetail } from "@/features/category/categoryThunk";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Status } from "@/utils/Status";
import { Globe, MessageSquareMore, ShoppingCart, Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { fetchProductDetail } from "@/features/product/productThunk";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  accountId: z.string().min(5, "Account ID must be at least 5 characters"),
  product: z.string().min(1, "Please select a product"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  promo: z.string().optional(),
  email: z.string().email("Invalid email address"),
  whatsapp: z.string().min(10, "Invalid whatsapp number"),
});

type OrderFormValues = z.infer<typeof formSchema>;

const GameDetail = () => {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      accountId: "",
      product: "",
      quantity: 1,
      promo: "",
      email: "",
      whatsapp: "",
    },
  });

  const params = useParams();
  const categoryCode = params.game as string;

  const dispatch = useDispatch<AppDispatch>();
  const { status, errorMessage, categoryDetail } = useSelector(
    (state: RootState) => state.categoryDetailReducer
  );

  const { productDetail } = useSelector(
    (state: RootState) => state.productDetailReducer
  );

  useEffect(() => {
    if (categoryCode) {
      dispatch(fetchCategoryDetail(categoryCode));
    }
  }, [categoryCode, dispatch]);

  const categoryDetailId = categoryDetail?.[0]?.ct_id;

  useEffect(() => {
    if (categoryDetailId) {
      dispatch(fetchProductDetail(categoryDetailId));
    }
  }, [categoryDetailId, dispatch]);

  const sections = [
    {
      title: "Instant Process",
      products: productDetail.slice(0, 6),
    },
  ];

  return (
    <section className="">
      {categoryDetail.length > 0 ? (
        categoryDetail.map((category) => (
          <div className="relative" key={category.ct_id}>
            {/* Cover Image */}
            <div className="relative h-56 w-full lg:h-[340px]">
              <Image
                src={category.ct_image_cover}
                layout="fill"
                objectFit="cover"
                alt={category.ct_name}
              />
            </div>

            {/* Detail game */}
            <div className="min-h-[120px] bg-[#3D92BF] shadow-2xl md:min-h-[140px]">
              <div className="container px-4 md:px-8 lg:px-32 flex flex-row flex-wrap items-center gap-4">
                <div className="flex-shrink-0 my-5">
                  <Image
                    src={category.ct_image}
                    width={160}
                    height={160}
                    alt={category.ct_name}
                    className="rounded-md shadow-lg"
                  />
                </div>

                <div className="flex-1 mt-5">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="flex flex-row gap-3">
                        <h1 className="text-2xl font-semibold text-white">
                          {category.ct_name}
                        </h1>
                        <Badge>{category.ct_currency_type}</Badge>
                      </div>
                      <p className="text-white">{category.ct_game_publisher}</p>
                    </div>
                  </div>

                  <div className="flex flex-col flex-wrap md:flex-row  mt-4 gap-3 text-sm text-white">
                    <div className="flex items-center gap-2">
                      <Zap color="#fbff00" size={16} />
                      <p>1-3 Minute Process</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <MessageSquareMore size={16} color="#06005b" />
                      <p>Customer Support: 24/7</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe size={16} color="#60faa5" />
                      <p>Region: Indonesia</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* main content */}
            <div className="px-4 md:px-8 lg:px-32 py-8 bg-gradient-detail">
              <div className="flex flex-row gap-5">
                {/* card to steps */}
                <div className="basis-1/3">
                  <Card className="bg-blue-80 text-white">
                    <CardContent className="text-xs mt-3">
                      <h4 className="mb-3">
                        Follow these steps to enjoy{" "}
                        <span className="font-bold">
                          {category.ct_currency_type}
                        </span>{" "}
                        at a low price and with guaranteed safety.
                      </h4>
                      {Array.isArray(category.ct_steps) &&
                        category.ct_steps.map((step: any, index: number) => (
                          <div key={index}>
                            <ul className="flex flex-row gap-2">
                              <li>
                                <p>{index + 1}.</p>
                              </li>
                              <li>
                                <p>{step.description}</p>
                              </li>
                            </ul>
                          </div>
                        ))}
                      <p className="mt-10">
                        For Customer Support, please contact Admin on our
                        official Whatsapp at +62 123-4567-8910 {""}
                        <span className="text-yellow-500">
                          <a href="https://wa.me/12345678910">or click here</a>
                        </span>
                      </p>
                    </CardContent>
                  </Card>
                </div>
                {/* FORM DOWN BELOW */}
                <div className="basis-2/3">
                  <Form {...form}>
                    <form className="space-y-5 w-full">
                      {/* account detail*/}
                      <div className="rounded-xl bg-[#006994] shadow-2xl">
                        <div className="flex border-b border-blue-400">
                          <div className="flex h-10 w-10 items-center justify-center rounded-tl-xl bg-gradient-to-b from-amber-400 to-amber-600 text-base md:text-xl font-bold text-white">
                            1
                          </div>
                          <h3 className="flex w-full items-center rounded-tr-xl bg-gradient-to-b from-blue-800/50 to-blue-900/50 px-4 text-sm md:text-lg font-semibold text-white">
                            Enter your Account ID
                          </h3>
                        </div>

                        <div className="p-4 sm:px-6 sm:pb-4 flex flex-row gap-3">
                          <FormField
                            control={form.control}
                            name="accountId"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white">
                                  Account ID
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    type="text"
                                    placeholder="Enter your account ID"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />

                          <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white">
                                  Username
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    type="text"
                                    placeholder="Enter your username"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="px-4 pb-4 text-[10px] sm:px-6 sm:pb-6">
                          <div>
                            <p className="text-white">
                              <em>Contoh = IlhamGanteng#1234</em>
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Amount */}
                      <div className="rounded-xl bg-[#006994] shadow-2xl">
                        <div className="flex border-b border-blue-400">
                          <div className="flex h-10 w-10 items-center justify-center rounded-tl-xl bg-gradient-to-b from-amber-400 to-amber-600 text-base md:text-xl font-bold text-white">
                            2
                          </div>
                          <h3 className="flex w-full items-center rounded-tr-xl bg-gradient-to-b from-blue-800/50 to-blue-900/50 px-4 text-sm md:text-lg font-semibold text-white">
                            Choose the Amount Purchase
                          </h3>
                        </div>

                        <div className="p-4 sm:px-6 sm:pb-4">
                          <FormField
                            control={form.control}
                            name="product"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={(value) => {
                                      field.onChange(value);
                                      setSelectedProduct(value);
                                    }}
                                    defaultValue={field.value}
                                    className="space-y-6"
                                  >
                                    {sections.map((section, idx) => (
                                      <div key={idx}>
                                        <h4 className="mb-3 text-sm md:text-lg font-semibold text-white">
                                          {section.title}
                                        </h4>
                                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                                          {section.products.map((product) => (
                                            <Card
                                              key={product.pr_id}
                                              className={`relative overflow-hidden transition-all rounded-2xl ${
                                                selectedProduct ===
                                                product.pr_id
                                                  ? "bg-white text-yellow-400"
                                                  : "bg-sky-100/90"
                                              } hover:bg-sky-200/90`}
                                            >
                                              <label
                                                htmlFor={product.pr_id}
                                                className="flex cursor-pointer items-center justify-between p-4"
                                              >
                                                <div className="space-y-1">
                                                  <div className="font-medium text-sm">
                                                    {product.pr_name}
                                                  </div>
                                                  <div className="text-sm text-blue-900">
                                                    Rp{" "}
                                                    {product.pr_price.toLocaleString(
                                                      "id-ID"
                                                    )}
                                                  </div>
                                                </div>
                                                <div className="flex items-center gap-4">
                                                  <RadioGroupItem
                                                    value={product.pr_id}
                                                    id={product.pr_id}
                                                    className="border-blue-600 opacity-0 absolute"
                                                  />
                                                  {category.ct_currency_type && (
                                                    <Image
                                                      src={
                                                        category.ct_currency_type_image
                                                      }
                                                      width={40}
                                                      height={40}
                                                      alt={
                                                        category.ct_currency_type
                                                      }
                                                      className="h-10 w-10 object-contain"
                                                    />
                                                  )}
                                                </div>
                                              </label>
                                            </Card>
                                          ))}
                                        </div>
                                      </div>
                                    ))}
                                  </RadioGroup>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      {/* Quantity */}
                      <div className="rounded-xl bg-[#006994] shadow-2xl">
                        <div className="flex border-b border-blue-400">
                          <div className="flex h-10 w-10 items-center justify-center rounded-tl-xl bg-gradient-to-b from-amber-400 to-amber-600 text-base md:text-xl font-bold text-white">
                            3
                          </div>
                          <h3 className="flex w-full items-center rounded-tr-xl bg-gradient-to-b from-blue-800/50 to-blue-900/50 px-4 text-sm md:text-lg font-semibold text-white">
                            Enter Quantity Purchase
                          </h3>
                        </div>

                        <div className="p-4 sm:px-6 sm:pb-4">
                          <FormField
                            control={form.control}
                            name="quantity"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white">
                                  Quantity
                                </FormLabel>
                                <FormControl>
                                  <div className="flex items-center space-x-2">
                                    <div className="flex-grow">
                                      <Input
                                        type="number"
                                        placeholder="Enter the quantity"
                                        {...field}
                                        value={field.value}
                                        className=" w-full text-start no-spinner"
                                      />
                                    </div>

                                    <Button
                                      type="button"
                                      onClick={() =>
                                        form.setValue(
                                          "quantity",
                                          field.value + 1
                                        )
                                      }
                                      className="bg-blue-900 text-white ml-2 rounded-lg hover:bg-blue-700"
                                    >
                                      +
                                    </Button>
                                    <Button
                                      type="button"
                                      onClick={() =>
                                        form.setValue(
                                          "quantity",
                                          Math.max(1, field.value - 1)
                                        )
                                      }
                                      disabled={field.value <= 1}
                                      className={`bg-blue-900 text-white rounded-lg ${
                                        field.value <= 1
                                          ? "opacity-50 cursor-not-allowed"
                                          : "hover:bg-blue-700"
                                      }`}
                                    >
                                      -
                                    </Button>
                                  </div>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      {/* Code Promo */}
                      <div className="rounded-xl bg-[#006994] shadow-2xl">
                        <div className="flex border-b border-blue-400">
                          <div className="flex h-10 w-10 items-center justify-center rounded-tl-xl bg-gradient-to-b from-amber-400 to-amber-600 text-base md:text-xl font-bold text-white">
                            4
                          </div>
                          <h3 className="flex w-full items-center rounded-tr-xl bg-gradient-to-b from-blue-800/50 to-blue-900/50 px-4 text-sm md:text-lg font-semibold text-white">
                            Enter Promo Code (Optional)
                          </h3>
                        </div>

                        <div className="p-4 sm:px-6 sm:pb-4">
                          <FormField
                            control={form.control}
                            name="promo"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white">
                                  Promo Code
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    type="text"
                                    placeholder="Enter your promo code"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      {/* Detail Contact */}
                      <div className="rounded-xl bg-[#006994] shadow-2xl">
                        <div className="flex border-b border-blue-400">
                          <div className="flex h-10 w-10 items-center justify-center rounded-tl-xl bg-gradient-to-b from-amber-400 to-amber-600 text-base md:text-xl font-bold text-white">
                            5
                          </div>
                          <h3 className="flex w-full items-center rounded-tr-xl bg-gradient-to-b from-blue-800/50 to-blue-900/50 px-4 text-sm md:text-lg font-semibold text-white">
                            Contact Detail
                          </h3>
                        </div>

                        <div className="p-4 sm:px-6 sm:pb-4">
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white">
                                  Email
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    type="text"
                                    placeholder="Enter your email address"
                                    {...field}
                                    className="mb-4"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          {/* wa number */}
                          <FormField
                            control={form.control}
                            name="whatsapp"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel className="text-white">
                                  Whatsapp Number
                                </FormLabel>
                                <FormControl>
                                  <Input
                                    type="text"
                                    placeholder="Enter your whatsapp number"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div>
                          <p className="px-4 pb-4 text-[10px] sm:px-6 sm:pb-6 text-white">
                            <em>
                              *Proof of transaction will be sent to the email
                              you filled in above.
                            </em>
                          </p>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <div className="">
                        <Button
                          type="submit"
                          className="w-full bg-[#F5960B] text-white rounded-lg hover:bg-[#FBBB2E]"
                        >
                          <ShoppingCart size={24} />
                          Create Order
                        </Button>
                      </div>
                    </form>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        ))
      ) : (
        <Card>
          <CardContent>
            {status === Status.LOADING ? (
              <p>Loading...</p>
            ) : status === Status.FAILED ? (
              <p>{errorMessage}</p>
            ) : (
              <p>No data found</p>
            )}
          </CardContent>
        </Card>
      )}
    </section>
  );
};

export default GameDetail;
