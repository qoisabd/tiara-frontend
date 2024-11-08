"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { fetchCategoryDetail } from "@/features/home/homeThunk";
import { useParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Status } from "@/utils/Status";
import { Globe, MessageSquareMore, Zap } from "lucide-react";
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

const formSchema = z.object({
  account: z.string().min(5, "Account ID must be at least 5 characters"),
});

type OrderFormValues = z.infer<typeof formSchema>;

const GameDetail = () => {
  const form = useForm<OrderFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      account: "",
    },
  });

  const params = useParams();
  const categoryCode = params.game as string;

  const dispatch = useDispatch<AppDispatch>();
  const { status, errorMessage, categoryDetail } = useSelector(
    (state: RootState) => state.categoryDetailReducer
  );

  useEffect(() => {
    if (categoryCode) {
      console.log("Fetching data for:", categoryCode);
      dispatch(fetchCategoryDetail(categoryCode));
    }
  }, [categoryCode, dispatch]);

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
            <div className="min-h-[120px] bg-blue-400 shadow-2xl md:min-h-[140px]">
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

            {/* Steps */}
            <div className="px-4 md:px-8 lg:px-32 py-8">
              <div className="flex flex-row gap-5">
                <div className="basis-1/3">
                  {/* card to steps */}
                  <Card className="bg-blue-80 text-white">
                    <CardContent className="text-xs mt-3">
                      <h4 className="mb-3">
                        Langkah-langkah mengisi{" "}
                        <span className="font-bold">
                          {category.ct_currency_type}
                        </span>
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
                  <div className="rounded-xl bg-[#10597E] shadow-2xl">
                    <div className="flex border-b border-blue-500">
                      <div className="flex items-center justify-center rounded-tl-xl bg-gradient-to-b from-yellow-400 to-yellow-600 px-4 py-2 text-xl font-semibold">
                        1
                      </div>
                      <h3 className="flex w-full items-center justify-between rounded-tr-xl bg-gradient-to-b from-blue-70 to-blue-80 px-2 py-2 text-base font-semibold leading-6 text-white sm:px-4">
                        Enter your Account ID
                      </h3>
                    </div>

                    <div className="grid grid-cols-2 gap-4 p-4 sm:px-6 sm:pb-4">
                      {/* //TODO: CREATE USING REACT HOOK FORM AND USING FORM SCHEMA */}
                      <Form {...form}>
                        <form className="space-4-y w-full">
                          <FormField
                            control={form.control}
                            name="account"
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
                              </FormItem>
                            )}
                          />
                        </form>
                      </Form>
                    </div>
                    <div className="px-4 pb-4 text-[10px] sm:px-6 sm:pb-6">
                      <div>
                        <p className="text-white">
                          <em>Contoh = IlhamGanteng#1234</em>
                        </p>
                      </div>
                    </div>
                  </div>
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
