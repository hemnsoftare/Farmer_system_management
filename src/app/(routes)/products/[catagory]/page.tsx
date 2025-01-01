"use client";
import CatagoryProducts from "@/components/products/CatagoryProducts";
import React, { useEffect, useState } from "react";
import HeaderDilter from "@/components/products/HeaderFilter";
import FilterItem from "@/components/products/FilterItem";
import NewProducts from "@/components/home/NewProducts";
import { ProductFormInput, typeFilter } from "../../../../type";
import Filtered from "@/components/products/Filter";
import { getProducts } from "@/lib/action/uploadimage";
import Link from "next/link";
import { Loader } from "@/app/loader";
import ForProducts from "@/components/home/ForProducts";
import { getAllItemNames } from "@/lib/action/fovarit";
import { useUser } from "@clerk/nextjs";
import { brand } from "@/util/data";
import { set } from "zod";

const MyComponent = ({ params }: { params: { catagory: string } }) => {
  const [filter, setFilter] = useState<{ [key: string]: boolean }>({});

  const [selected, setSelected] = useState(params.catagory.replace("%20", " "));
  const [openFilter, setopenFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState<typeFilter>({
    brand: [],
    color: [],
    discount: false,
    price: [1, 100000],
  });
  const [products, setproducts] = useState<ProductFormInput[]>([]);
  const [sortBy, setsortBy] = useState<string>("new");
  const [load, setload] = useState(true);
  const [favoriteId, setfavoriteId] = useState([]);
  const { user } = useUser();
  const isEqual = (a: typeFilter, b: typeFilter) =>
    JSON.stringify(a) === JSON.stringify(b);

  const handleFilter = (filter: typeFilter) => {
    if (!isEqual(filter, filterProducts)) {
      setFilterProducts(filter);
    }
  };

  const handelDelete = (type: string, item: string) => {
    const update: typeFilter = { ...filterProducts };
    if (type === "brand") {
      update.brand = filterProducts.brand.filter((brand) => brand !== item);
    } else if (type === "color") {
      update.color = filterProducts.color.filter((color) => color !== item);
    } else if (type === "discount") {
      update.discount = false;
    }
    handleFilter(update);
    setSelected(selected + " ");
  };

  const handleOpen = (type: string) => {
    setFilter((prev) => ({ ...prev, [type]: !prev[type] }));
  };
  useEffect(() => {
    // Effect to fetch products whenever filters or selected category changes
    const getData = async () => {
      setload(true);
      try {
        const productsData = await getProducts(
          selected.trim(),
          sortBy,
          filterProducts
        );
        setproducts(productsData);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setload(false);
      }
    };
    getData();
  }, [filterProducts, selected, sortBy]);

  // useEffect(() => {
  //   // Effect to reset filters whenever selected category changes
  //   setFilterProducts({
  //     brand: [],
  //     color: [],
  //     discount: false,
  //     price: [1, 1000],
  //   });
  // }, [selected]);
  useEffect(() => {
    const getdata = async () => {
      const data = await getAllItemNames(user?.id);
      setfavoriteId(data as string[]);
    };
    getdata();
  }, [user]);
  return (
    <div className="flex flex-col w-full gap-5 px-3  pt-5 ">
      <p className="text-16 dark:text-gray-500 py-6">
        <Link
          href={"/"}
          className="hover:text-blue-800 dark:text-blue-600 px-2 hover:underline"
        >
          home
        </Link>
        &gt; <span className="cursor-pointer"> products </span>
      </p>
      <CatagoryProducts
        handleSelected={(name) => {
          setSelected(name);
          setFilterProducts({
            brand: [],
            color: [],
            discount: false,
            price: [1, 100000],
          });
        }}
        catagory={params.catagory}
      />
      <HeaderDilter
        key={selected}
        onOpen={handleOpen}
        selected={selected}
        filters={filterProducts}
        filter={filter}
        onFilter={handleFilter}
        length={products.length}
        selectedSortBy={(item) => {
          setsortBy(item);
        }}
        onClear={() => {
          setSelected(selected + " ");
          const data = {
            brand: [],
            color: [],
            discount: false,
            price: [1, 100000],
          };
          handleFilter(data as typeFilter);
        }}
        openfilter={openFilter}
        closeFilter={() => {
          console.log("in close ");
          setopenFilter(!openFilter);
        }}
      />
      <div className="flex items-center duration-300 dark:text-white dark:border-gray-500 transition-all animate-in  overflow-x-auto sm:overflow-hidden flex-nowrap sm:flex-wrap text-12 justify-start gap-3 w-full ">
        <Filtered type="price" item={filterProducts.price} />
        <Filtered
          type="discount"
          item={filterProducts.discount}
          onDelete={handelDelete}
        />
        <Filtered
          type="color"
          onDelete={handelDelete}
          item={filterProducts.color}
        />
        <Filtered
          type="brand"
          onDelete={handelDelete}
          item={filterProducts.brand}
        />
      </div>
      <div className="grid grid-cols-4 gap-2">
        <div className="hidden  md:block">
          <FilterItem
            key={selected}
            onOpen={handleOpen}
            filter={filter}
            selected={selected}
            onClear={() => {
              setFilterProducts({
                brand: [],
                color: [],
                discount: false,
                price: [1, 100000],
              });
            }}
            filters={filterProducts}
            onFilter={handleFilter}
            type="page"
          />
        </div>

        {load ? (
          <div className="flex w-full items-center justify-between px-3">
            <Loader />
            <Loader />
          </div>
        ) : products.length > 0 ? (
          <div className="sm:col-span-3 col-span-4 grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 md:grid-cols-2 gap-3 w-full">
            {products.map((item) => (
              <NewProducts
                key={item.name}
                favoriteId={favoriteId}
                addFavoriteid={() => {
                  setproducts((prev) =>
                    prev.map(
                      (itemp) =>
                        itemp.name === item.name
                          ? {
                              ...itemp,
                              numberFavorite: itemp.numberFavorite - 1,
                            } // Update numberFavorite
                          : itemp // Keep other items unchanged
                    )
                  );
                  setfavoriteId((pre) => [...pre, item.name]);
                }}
                deleteFavoriteId={() => {
                  setproducts((prev) =>
                    prev.map(
                      (itemp) =>
                        itemp.name === item.name
                          ? {
                              ...itemp,
                              numberFavorite: itemp.numberFavorite - 1,
                            } // Update numberFavorite
                          : itemp // Keep other items unchanged
                    )
                  );

                  setfavoriteId(
                    (prev) => prev.filter((itemp) => itemp !== item.name) // Remove the product name from favorites
                  );
                }}
                itemDb={item}
                title="catagory"
              />
            ))}
          </div>
        ) : (
          <h2 className="font-bold flex items-center justify-center col-span-3 text-30 text-center w-full ">
            No products available
          </h2>
        )}
      </div>
      <br />
    </div>
  );
};

export default MyComponent;

// "use client";
// import CatagoryProducts from "@/components/products/CatagoryProducts";
// import React, { useEffect, useState } from "react";
// import HeaderDilter from "@/components/products/HeaderFilter";
// import FilterItem from "@/components/products/FilterItem";
// import NewProducts from "@/components/home/NewProducts";
// import { ProductFormInput, typeFilter } from "../../../../type";
// import Filtered from "@/components/products/Filter";
// import { getProducts } from "@/lib/action/uploadimage";
// import Link from "next/link";
// import { Loader } from "@/app/loader";

// const MyComponent = ({ params }: { params: { catagory: string } }) => {
//   const [selected, setSelected] = useState(params.catagory.replace("%20", " "));
//   const [filterProducts, setFilterProducts] = useState<typeFilter>({
//     brand: [],
//     color: [],
//     discount: false,
//     price: [1, 1000],
//   });
//   const [products, setproducts] = useState<ProductFormInput[]>([]);
//   const [sortBy, setsortBy] = useState<string>("new");
//   const [load, setload] = useState(true);
//   const isEqual = (a: typeFilter, b: typeFilter) => {
//     // console.log(a, b);
//     return JSON.stringify(a) === JSON.stringify(b);
//   };
//   const handleFilter = (filter: typeFilter) => {
//     // console.log(isEqual(filter, filterProducts));
//     console.log(filter.discount, filterProducts.discount);
//     if (isEqual(filter, filterProducts)) {
//       // console.log(filter);

//       return null;
//     } else {
//       // console.log(filter);
//       setFilterProducts(filter);
//     }
//   };
//   // console.log(filterProducts);
//   // console.log(filterProducts);
//   const handelDelete = (type: string, item: string) => {
//     let update: any = [];
//     if (type === "brand") {
//       update = (filterProducts.brand as string[]).filter(
//         (brand) => brand !== item
//       );
//     }
//     if (type === "color") {
//       update = (filterProducts.color as string[]).filter(
//         (color) => color !== item
//       );
//     }
//     if (type === "discount") {
//       update = false;
//     }
//     setSelected(selected + " ");
//     setFilterProducts({ ...filterProducts, [type]: update });
//   };

//   useEffect(() => {
//     const getdata = async () => {
//       setload(true); // Set loading to true at the start of data fetching
//       try {
//         const productsDaa = await getProducts(
//           filterProducts,
//           selected.trim(),
//           sortBy
//         );
//         setproducts(productsDaa); // Set the fetched data to products state
//       } catch (error) {
//         console.error("Error fetching products:", error); // Handle any errors if necessary
//       } finally {
//         setload(false); // Set loading to false after data is fetched
//       }
//     };
//     getdata();
//   }, [
//     filterProducts.brand,
//     filterProducts.color,
//     filterProducts.discount,
//     filterProducts.price,
//     filterProducts,
//     selected,
//     sortBy,
//   ]);
// useEffect(() => {
//   setFilterProducts({
//     brand: [],
//     color: [],
//     discount: false,
//     price: [1, 1000],
//   });

// }, [selected]);
//   console.log(filterProducts);
//   return (
//     <div className="flex flex-col w-full gap-5 pt-5 ">
//       <p className="text-16 py-6">
//         <Link href={"/"} className="hover:text-blue-800 hover:underline">
//           home
//         </Link>
//         &gt; products
//       </p>
//       <CatagoryProducts
//         handleSelected={(name) => {
//           setSelected(name + " ");
//         }}
//         catagory={params.catagory}
//       />
//       <HeaderDilter
//         length={products.length}
//         selectedSortBy={(item) => {
//           console.log("in onclick");
//           setsortBy(item);
//         }}
//         onClear={() => {
//           setSelected(selected + " ");
//           setFilterProducts({
//             brand: [],
//             color: [],
//             discount: false,
//             price: [1, 1000],
//           });
//         }}
//       />
//       <div className="flex items-center duration-300 transition-all animate-in flex-wrap text-12 justify-start gap-3 w-full ">
//         <Filtered
//           type="color"
//           onDelete={handelDelete}
//           item={filterProducts.color}
//         />
//         <Filtered
//           type="discount"
//           item={filterProducts.discount}
//           onDelete={handelDelete}
//         />
//         <Filtered type="price" item={filterProducts.price} />
//         <Filtered
//           type="brand"
//           onDelete={handelDelete}
//           item={filterProducts.brand}
//         />
//       </div>
//       <div className="grid grid-cols-4 gap-2">
//         <div className="">
//           <FilterItem
//             key={selected}
//             selected={selected}
//             filters={filterProducts}
//             onFilter={handleFilter}
//           />
//         </div>
//         {load ? (
//           <Loader />
//         ) : products.length > 0 ? (
//           <div className="col-span-3 grid lg:grid-cols-3 2xl:grid-cols-4 md:grid-cols-2 gap-3 w-full">
//             {products.map((item) => (
//               <NewProducts key={item.name} itemDb={item} title="catagory" />
//             ))}
//           </div>
//         ) : (
//           <h2 className="font-bold fle items-center justify-center col-span-3 text-30 bg-red-50 text-center w-full ">
//             have not product
//           </h2>
//         )}
//         {/* <Loader /> */}
//       </div>
//       <br />
//     </div>
//   );
// };

// export default MyComponent;
