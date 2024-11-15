import { Skeleton } from "../ui/skeleton";
import { FC } from "react";
import Image from "next/image";

const PopularCardGameSkeleton: FC = () => {
  const imgFire = "/assets/images/img-fire.png";
  return (
    <section className="px-4 md:px-32 mt-10">
      <div className="flex flex-row items-center gap-3">
        <Image src={imgFire} width={25} height={25} alt="fire icon" />
        <h2 className="text-2xl font-semibold">Popular Games</h2>
      </div>
      <p className="text-gray-400 mb-5">
        List of popular games that you can play
      </p>
      <div className="flex flex-row flex-wrap gap-5">
        {Array(6)
          .fill(0)
          .map((_, index) => (
            <div
              key={index}
              className="relative w-[400px] h-[150px] group overflow-hidden rounded-xl shadow-md"
            >
              <Skeleton className="w-full h-full rounded-xl" />
              <div className="absolute bottom-0 left-0 right-0 bg-[#3D93BF] p-3 opacity-90">
                <Skeleton className="h-6 w-32 mb-1" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
          ))}
      </div>
    </section>
  );
};

export default PopularCardGameSkeleton;
