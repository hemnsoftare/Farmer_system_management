import { addfavorite, deleteFavorite } from "@/lib/action/fovarit";
import { favorite } from "@/lib/action";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";

const CardFavorite = ({
  userId,
  item,
  deleteFavoriteId,
  favoriteId,
  addFavoriteid,
}: {
  click?: () => void;
  userId?: string;
  item: favorite;
  deleteFavoriteId?: () => void;
  addFavoriteid?: () => void;
  favoriteId?: string[];
}) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent click event from propagating to the <Link>
    e.preventDefault(); // Prevent default behavior of the <Link>
  };
  return (
    <Link
      href={`/products/${item.categroy}/${item.name}`}
      className="flex flex-col relative gap-3 w-full dark:shadow-secondary  rounded-sm sm:rounded-lg justify-center items-center shadow-md shadow-blue-200 p-2"
    >
      {/* Item Image */}
      {userId && (
        <>
          {favoriteId && favoriteId.some((id) => id === item.id) ? (
            <FaHeart
              color="#f45e0c"
              onClick={(e) => {
                handleFavoriteClick(e);
                deleteFavoriteId();
                deleteFavorite(userId, item.numberFavorite, item.id).finally(
                  () => {}
                );
              }}
              className="absolute p-3 box-content sm:size-[25px] size-[23px]  top-2 z-50 right-2 cursor-pointer"
            />
          ) : (
            <FaRegHeart
              color="#f45e0c"
              onClick={(e) => {
                handleFavoriteClick(e);
                addfavorite({
                  id: userId,
                  item: {
                    name: item.name,
                    categroy: item.categroy,
                    price: item.price,
                    colors: item.colors,
                    id: item.id,
                    numberFavorite: item.numberFavorite,
                    image: item.image,
                  },
                });
                addFavoriteid();
              }}
              className="absolute p-3 sm:size-[25px] box-content size-[23px] top-2 z-50 right-2 cursor-pointer"
            />
          )}
        </>
      )}
      <Image
        src={item.image}
        alt={item.name}
        width={150}
        height={150}
        className="w-full sm:min-h-[200px] sm:max-h-[200px] above-405:min-h-[190px] min-h-[140px] max-h-[140px] above-405:max-h-[190px] rounded-lg "
      />

      {/* Item Name */}
      <h2 className="text-sm text-start w-full sm:text-lg text-secondary-400">
        {item.name}
      </h2>

      {/* Price and Quantity */}
      <div className="flex justify-between w-full items-center">
        <h2 className="text-sm sm:text-lg">{item.price}$</h2>
      </div>
    </Link>
  );
};

export default CardFavorite;
