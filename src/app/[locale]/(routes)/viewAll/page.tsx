"use client";
import NewProducts from "@/components/home/NewProducts";
import CatagoryProducts from "@/components/products/CatagoryProducts";
import React, { useEffect, useState } from "react";
import {
  collection,
  getDocs,
  getFirestore,
  limit,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { app } from "@/config/firebaseConfig";
import { ProductFormInput } from "@/lib/action";
import { Loader } from "@/app/[locale]/loader";
import { useUser } from "@clerk/nextjs";
import { getAllItemNames, getfavorite } from "@/lib/action/fovarit";
import { useTranslations } from "next-intl";
import { set } from "zod";
import ForProducts from "@/components/home/ForProducts";

const Page = () => {
  const [type, setType] = useState("");
  const db = getFirestore(app);
  const [products, setProducts] = useState<ProductFormInput[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [load, setLoad] = useState(true);
  const [favoriteId, setFavoriteId] = useState<string[]>([]);
  const { user } = useUser();
  const t = useTranslations("viewAll");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const typeParam = params.get("type");
    setType(typeParam || "");
  }, []);

  // Function to translate text to Turkish using a reliable API
  const translateToTurkish = async (text: string) => {
    if (!text) return text;
    try {
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|tr`
      );
      const data = await response.json();
      return data.responseData.translatedText || text;
    } catch (error) {
      console.error("Translation error:", error);
      return text; // Return original text if translation fails
    }
  };

  useEffect(() => {
    const getData = async (col: string) => {
      setLoad(true);
      const getid = await getAllItemNames(user?.id);
      console.log("get id ");
      console.log(getid);

      setFavoriteId(getid as string[]);
      let q: any;
      if (col !== "discount") {
        q = selectedCategory
          ? query(
              collection(db, "Products"),
              where("category", "==", selectedCategory),
              orderBy(col, "desc"),
              limit(30)
            )
          : query(collection(db, "Products"), orderBy(col, "desc"));
      } else {
        q = selectedCategory
          ? query(
              collection(db, "Products"),
              where("category", "==", selectedCategory),
              where("isDiscount", "==", true),
              limit(30)
            )
          : query(
              collection(db, "Products"),
              where("isDiscount", "==", true),
              limit(30)
            );
      }

      try {
        const snapshot = await getDocs(q);
        const fetchedProducts: ProductFormInput[] = [];

        for (const item of snapshot.docs) {
          const product = item.data() as ProductFormInput;

          // Translate name to Turkish
          const translatedProduct = {
            ...product,
            id: item.id,
            name: await translateToTurkish(product.name),
          };

          fetchedProducts.push({ ...translatedProduct });
        }

        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoad(false);
      }
    };

    if (type === "New") {
      getData("date");
    } else if (type === "discount") {
      getData("discount");
    } else {
      getData("numberSale");
    }
  }, [db, type, selectedCategory, user]);

  useEffect(() => {
    const getdata = async () => {
      if (user?.id) {
        try {
          const data = await getAllItemNames(user.id);
          setFavoriteId(data as string[]);
        } catch (error) {
          console.error("Error fetching favorite items:", error);
        }
      }
    };
    getdata();
  }, [user]);
  console.log("favoriteId", favoriteId);
  return (
    <div className="flex items-center w-full py-8 gap-3 justify-center flex-col">
      <h1 className="self-start px-3 dark:text-gray-600 text-26 sm:text-30 my-3 font-semibold">
        {t("last")} {products.length < 30 ? products.length : "30"}{" "}
        {t(
          type === "New"
            ? "last7NewProducts"
            : type === "discount"
              ? "last4DiscountProducts"
              : "last7NumberSaleProducts"
        )}
      </h1>

      <CatagoryProducts
        handleSelected={(name) => {
          setProducts([]);
          setSelectedCategory(name);
        }}
      />

      {!load && products.length > 0 ? (
        <div
          className="
        w-full
        "
        >
          <ForProducts load={load} products={products} title="viewAll" />
          {/* {products.map((item, index) => (
            <NewProducts
              favoriteId={favoriteId}
              addFavoriteid={() => {
                setProducts((prev) =>
                  prev.map((itemp) =>
                    itemp.id === item.id
                      ? {
                          ...itemp,
                          numberFavorite: itemp.numberFavorite - 1,
                        }
                      : itemp
                  )
                );
                setFavoriteId((prev) => [...prev, item.id]);
              }}
              deleteFavoriteId={() => {
                setProducts((prev) =>
                  prev.map((itemp) =>
                    itemp.id === item.id
                      ? {
                          ...itemp,
                          numberFavorite: itemp.numberFavorite - 1,
                        }
                      : itemp
                  )
                );
                setFavoriteId((prev) =>
                  prev.filter((itemp) => itemp !== item.id)
                );
              }}
              key={index}
              // itemDb={item}
              itemDb={item} // ✅ Correct type assertion
            />
          ))} */}
        </div>
      ) : load ? (
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Loader />
          <Loader />
          <Loader />
          <Loader />
        </div>
      ) : (
        <h1 className="text-30 font-black my-[200px]">{t("message")}</h1>
      )}
    </div>
  );
};

export default Page;
