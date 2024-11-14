import React from "react";
import { Skeleton } from "../ui/skeleton";
import Image from "next/image";

const CardGameSkeleton = () => {
  const imgCart = "/assets/images/img-cart.png";
  return (
    <section className="px-4 md:px-32 mt-10">
      <div className="flex flex-row items-center gap-3">
        <Image src={imgCart} width={25} height={25} alt="cart" />
        <h2 className="text-2xl font-semibold">All Games</h2>
      </div>
      <p className="text-gray-400 mb-5">List of games</p>
      <div className="flex flex-row flex-wrap gap-5">
        {Array(8)
          .fill(0)
          .map((_, index) => (
            <div key={index} className="w-[180px] h-[280px]">
              <Skeleton className="w-full h-full rounded-2xl" />
              <div className="absolute inset-0 flex flex-col justify-end p-4">
                <Skeleton className="h-6 w-2/3 rounded-md mb-2" />
                <Skeleton className="h-4 w-1/2 rounded-md" />
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default CardGameSkeleton;
