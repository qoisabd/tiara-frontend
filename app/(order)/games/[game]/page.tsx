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
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { fetchProductDetail } from "@/features/product/productThunk";
import { createOrder } from "@/features/order/orderThunk";
import { OrderType, UserType } from "@/types/types";
import useSnap from "@/hooks/useSnap";
import Navbar from "@/components/Navbar";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import PromoModal from "@/components/PromoModal";
import { orderSteps } from "@/lib/orderSteps";
import { ApiErrorType } from "@/types/types";

const formSchema = z.object({
  account_name: z.string().min(3, "Username must be at least 3 characters"),
  account_id: z.string().min(5, "Account ID must be at least 5 characters"),
  order_product: z.number().min(1, "Please select a product"),
  order_quantity: z.number().min(1, "Quantity must be at least 1"),
  order_promo_code: z.string().optional(),
  order_email: z.string().email("Invalid email address"),
  order_whatsapp: z.string().min(10, "Invalid whatsapp number"),
});

type OrderFormValues = z.infer<typeof formSchema>;

const GameDetail = () => {
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [user, setUser] = useState<UserType | null>(null);
  const { snapEmbed } = useSnap();

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      account_name: "",
      account_id: "",
      order_product: 1,
      order_quantity: 1,
      order_promo_code: "",
      order_email: "",
      order_whatsapp: "",
    },
  });

  const params = useParams();
  const categoryCode = params.game as string;

  const handleSelectPromo = (code: string) => {
    form.setValue("order_promo_code", code);
  };

  const dispatch = useDispatch<AppDispatch>();
  const { status, errorMessage, categoryDetail } = useSelector(
    (state: RootState) => state.categoryDetailReducer
  );

  const { productDetail } = useSelector(
    (state: RootState) => state.productDetailReducer
  );

  useEffect(() => {
    const token = Cookies.get(process.env.NEXT_PUBLIC_COOKIE_NAME || "");
    if (token) {
      try {
        const decoded: UserType = jwtDecode(token);

        if (decoded.exp * 1000 > Date.now()) {
          setUser(decoded);
          form.setValue("order_email", decoded.us_email);
          form.setValue("order_whatsapp", decoded.us_phone_number);
        } else {
          console.warn("Token has expired.");
          Cookies.remove(process.env.NEXT_PUBLIC_COOKIE_NAME || "");
        }
      } catch (err) {
        console.error("Failed to decode token", err);
      }
    }
  }, []);

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
      products: productDetail,
    },
  ];

  const onSubmit = async (data: OrderFormValues) => {
    try {
      const orderProduct: any = productDetail.find(
        (product) => product.pr_id === selectedProduct
      );
      const userId = user ? user.us_id : 4;

      const orderData: OrderType = {
        account_id: parseInt(data.account_id, 10),
        account_name: data.account_name,
        id: orderProduct.pr_id,
        name: orderProduct.pr_name,
        quantity: data.order_quantity,
        price: orderProduct.pr_price,
        order_email: data.order_email,
        category_name: categoryDetail[0].ct_name,
      };
      const result = await dispatch(
        createOrder({
          oi_product: [orderData],
          or_total_amount: data.order_quantity * orderProduct.pr_price,
          userId: userId,
          email: data.order_email,
          voucher_code: data.order_promo_code || null,
        })
      ).unwrap();

      // Open Midtrans snap after successful order creation
      if (result && result.order.or_platform_token) {
        snapEmbed(result.order.or_platform_token, {
          onSuccess: function (result: unknown) {
            console.log("Payment success:", result);
          },
          onPending: function (result: unknown) {
            console.log("Payment pending:", result);
          },
          onError: function (result: unknown) {
            console.log("Payment error:", result);
          },
          onClose: function () {
            console.log(
              "Customer closed the popup without finishing the payment"
            );
          },
        });
      }
      console.log("Order created successfully", result);
    } catch (error) {
      const errorMessage = (error as ApiErrorType).message || "Unknown error";
      console.error("Failed to create order", errorMessage);
    }
  };

  return (
    <section className="">
      <Navbar />
      {categoryDetail.length > 0 ? (
        categoryDetail.map((category) => (
          <div className="relative" key={category.ct_id}>
            <div className="relative h-56 w-full lg:h-[340px]">
              <Image
                src={category.ct_image_cover}
                layout="fill"
                objectFit="cover"
                alt={category.ct_name}
              />
            </div>

            <div className="min-h-[120px] bg-[#3D92BF] shadow-2xl md:min-h-[140px]">
              <div className="container px-4 md:px-8 lg:px-32 flex flex-row flex-wrap items-center gap-4">
                <div className="flex-shrink-0 my-2 sm:my-5">
                  <Image
                    src={category.ct_image}
                    width={160}
                    height={160}
                    alt={category.ct_name}
                    className="rounded-md shadow-lg"
                  />
                </div>

                <div className="flex-1 mt-0 sm:mt-5 mb-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="flex flex-row gap-3">
                        <h1 className="text-sm md:text-2xl font-semibold text-white">
                          {category.ct_name}
                        </h1>
                        <Badge className="text-xs">
                          {category.ct_currency_type}
                        </Badge>
                      </div>
                      <p className="text-white text-xs">
                        {category.ct_game_publisher}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col flex-wrap md:flex-row  mt-4 gap-3 text-xs text-white">
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

            <div className="px-4 md:px-8 lg:px-32 py-8 bg-gradient-detail">
              <div className="flex flex-col sm:flex-row gap-0 sm:gap-5 items-center sm:items-start justify-center">
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
                      {orderSteps.map((step, index) => (
                        <div key={index}>
                          <ul className="flex flex-row gap-2">
                            <li>
                              <p>{step.step}.</p>
                            </li>
                            <li>
                              <p>{step.description}</p>
                            </li>
                          </ul>
                        </div>
                      ))}
                      <p className="mt-3 md:mt-7">
                        For Customer Support, please contact Admin on our
                        official Whatsapp at +62 851-9530-0828 {""}
                        <span className="text-yellow-500">
                          <a href="https://wa.me/6285195300828" target="_blank">
                            or click here
                          </a>
                        </span>
                      </p>
                    </CardContent>
                  </Card>
                </div>
                <div className="flex-grow sm:basis-2/3 flex items-center justify-center mt-5 sm:mt-0">
                  <Form {...form}>
                    <form
                      className="space-y-5 w-full"
                      onSubmit={form.handleSubmit(onSubmit)}
                    >
                      <div className="rounded-xl bg-[#006994] shadow-2xl">
                        <div className="flex border-b border-blue-400">
                          <div className="flex h-10 w-10 items-center justify-center rounded-tl-xl bg-gradient-to-b from-amber-400 to-amber-600 text-base md:text-xl font-bold text-white">
                            1
                          </div>
                          <h3 className="flex w-full items-center rounded-tr-xl bg-gradient-to-b from-blue-800/50 to-blue-900/50 px-4 text-sm md:text-lg font-semibold text-white">
                            Enter your Account Detail
                          </h3>
                        </div>

                        <div className="p-4 sm:px-6 sm:pb-4 flex flex-row gap-3">
                          <div className="flex-grow">
                            <FormField
                              control={form.control}
                              name="account_name"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="text-white">
                                    Account Name
                                  </FormLabel>
                                  <FormControl>
                                    <Input
                                      type="text"
                                      placeholder="Enter your Account Name"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="flex-grow">
                            <FormField
                              control={form.control}
                              name="account_id"
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
                          </div>
                        </div>
                        <div className="px-4 pb-4 text-[10px] sm:px-6 sm:pb-6">
                          <div>
                            <p className="text-white">
                              <em>Contoh = Tiara#1234</em>
                            </p>
                          </div>
                        </div>
                      </div>

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
                            name="order_product"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={(value) => {
                                      field.onChange(value);
                                      setSelectedProduct(value);
                                    }}
                                    defaultValue={field.value.toString()}
                                    className="space-y-6"
                                  >
                                    {sections.map((section, idx) => (
                                      <div key={idx}>
                                        <h4 className="mb-3 text-sm md:text-lg font-semibold text-white">
                                          {section.title}
                                        </h4>
                                        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
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
                                                  <div className="font-medium text-xs lg:text-base">
                                                    {product.pr_name}
                                                  </div>
                                                  <div className="text-xs lg:text-sm text-blue-900">
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
                            name="order_quantity"
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
                                          "order_quantity",
                                          Number(field.value) + 1
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
                                          "order_quantity",
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
                            name="order_promo_code"
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
                          <PromoModal onSelectPromo={handleSelectPromo} />
                        </div>
                      </div>

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
                            name="order_email"
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
                                    disabled={user !== null}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="order_whatsapp"
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
