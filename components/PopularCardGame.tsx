"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { fetchCategoryCard } from "@/features/category/categoryThunk";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { Status } from "@/utils/Status";
import PopularCardGameSkeleton from "./skeleton/PopularCardGameSkeleton";

const PopularCardGame = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { category, status, errorMessage } = useSelector(
    (state: RootState) => state.categoryReducer
  );

  useEffect(() => {
    dispatch(fetchCategoryCard());
  }, [dispatch]);

  const imgFire = "/assets/images/img-fire.png";

  const popularGames = category.filter((game) =>
    [
      "Mobile Legends",
      "Free Fire",
      "PUBG Mobile",
      "Honor of Kings",
      "Valorant",
      "Genshin Impact",
      "Honkai: Star Rail",
    ].includes(game.ct_name)
  );

  if (status === Status.LOADING) {
    return <PopularCardGameSkeleton />;
  }

  if (status === Status.FAILED) {
    return <p>{errorMessage}</p>;
  }

  return (
    <section className="px-4 md:px-32 mt-10">
      <div className="flex flex-row items-center gap-3 text-white">
        <Image src={imgFire} width={25} height={25} alt="fire icon" />
        <h2 className="text-2xl font-semibold">Popular Games</h2>
      </div>
      <p className="text-white mb-5">List of popular games that you can play</p>

      <div className="flex flex-row flex-wrap gap-3 sm:gap-5">
        {popularGames?.map((item, index) => (
          <div
            key={index}
            className="relative w-[170px] xl:w-[400px] h-[120px] sm:h-[150px] group overflow-hidden rounded-xl shadow-md transform transition duration-300 ease-in-out hover:shadow-xl"
          >
            <Link href={`/games/${item.ct_code}`}>
              <div className="relative w-full h-full">
                <Image
                  src={item.ct_image}
                  layout="fill"
                  objectFit="cover"
                  alt={item.ct_name}
                  className="filter grayscale transition duration-500 ease-in-out transform group-hover:grayscale-0 group-hover:scale-110"
                />

                <div className="absolute bottom-0 left-0 right-0 bg-[#3D93BF] p-3 opacity-90 group-hover:opacity-100 transition duration-300 ease-in-out">
                  <h3 className="text-md font-semibold text-white">
                    {item.ct_name}
                  </h3>
                  <p className="text-xs text-yellow-400">
                    {item.ct_game_publisher}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularCardGame;
