"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { fetchCategoryCard } from "@/features/category/categoryThunk";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { Status } from "@/utils/Status";
import CardGameSkeleton from "./skeleton/CardGameSkeleton";

const CardGame = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { category, status, errorMessage } = useSelector(
    (state: RootState) => state.categoryReducer
  );

  const [visibleGames, setVisibleGames] = useState(12);

  useEffect(() => {
    dispatch(fetchCategoryCard());
  }, [dispatch]);

  const handleLoadMore = () => {
    setVisibleGames((prev) => prev + 6);
  };

  const imgCart = "/assets/images/img-cart.png";

  const displayedGames = category?.slice(0, visibleGames);

  if (status === Status.LOADING) {
    return <CardGameSkeleton />;
  }

  if (status === Status.FAILED) {
    return <p>{errorMessage}</p>;
  }

  return (
    <section className="px-4 md:px-32 mt-10 pb-16">
      <div className="flex flex-row items-center gap-3 text-white">
        <Image src={imgCart} width={25} height={25} alt="cart" />
        <h2 className="text-2xl font-semibold">All Games</h2>
      </div>
      <p className="text-white mb-5">List of games</p>

      <div className="flex flex-row flex-wrap gap-2 sm:gap-5">
        {displayedGames?.map((item, index) => (
          <div
            key={index}
            className="relative w-[109px] sm:w-[180px] h-[163px] sm:h-[280px] group overflow-hidden rounded-2xl shadow-md transform transition duration-300 ease-in-out hover:shadow-2xl"
          >
            <Link href={`/games/${item.ct_code}`}>
              <div className="relative w-full h-full">
                <Image
                  src={item.ct_image}
                  layout="fill"
                  objectFit="cover"
                  alt={item.ct_name}
                  className="transform transition duration-500 ease-in-out group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out flex flex-col justify-end p-4">
                  <h3 className="text-lg font-semibold text-white">
                    {item.ct_name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-300">
                    {item.ct_game_publisher}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {category && visibleGames < category.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={handleLoadMore}
            className="bg-[#0e587c] hover:bg-[#007d98] text-white font-semibold py-2 px-6 rounded-lg transition duration-300"
          >
            Load More Games ...
          </button>
        </div>
      )}
    </section>
  );
};

export default CardGame;
