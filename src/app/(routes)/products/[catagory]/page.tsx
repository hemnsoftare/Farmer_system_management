"use client";
import CatagoryProducts from "@/components/products/CatagoryProducts";
import React, { useCallback, useEffect, useState } from "react";
import { newProdcuts } from "@/app/util/data";
import HeaderDilter from "@/components/products/HeaderFilter";
import FilterItem from "@/components/products/FilterItem";
import NewProducts from "@/components/home/NewProducts";
import { ProductFormInput, typeFilter } from "../../../../type";
import Filtered from "@/components/products/Filter";
import { getProducts } from "@/lib/action/uploadimage";

const MyComponent = ({ params }: { params: { catagory: string } }) => {
  const [selected, setSelected] = useState(params.catagory.replace("%20", " "));
  const [filterProducts, setFilterProducts] = useState<typeFilter>({
    brand: [],
    color: [],
    discount: false,
    price: [1, 1000],
  });
  const [products, setproducts] = useState<ProductFormInput[]>([]);
  const isEqual = (a: typeFilter, b: typeFilter) => {
    // console.log(a, b);
    return JSON.stringify(a) === JSON.stringify(b);
  };
  const handleFilter = useCallback((filter: typeFilter) => {
    // console.log(isEqual(filter, filterProducts));
    if (isEqual(filter, filterProducts)) {
      return null;
    } else {
      setFilterProducts(filter);
    }
  }, []);
  // console.log(filterProducts);
  const handelDelete = (type: string, item: string) => {
    let update: string[] = [];
    if (type === "brand") {
      update = (filterProducts.brand as string[]).filter(
        (brand) => brand !== item
      );
    }
    if (type === "color") {
      update = (filterProducts.color as string[]).filter(
        (color) => color !== item
      );
    }

    setFilterProducts({ ...filterProducts, [type]: update });
  };

  useEffect(() => {
    const getdata = async () => {
      const productsDaa = await getProducts(filterProducts, selected);
      setproducts(productsDaa);
    };
    getdata();
  }, [filterProducts, selected]);
  return (
    <div className="flex flex-col w-full gap-5 pt-5 ">
      <p className="text-16 py-6"> home &gt; products</p>
      <CatagoryProducts
        handleSelected={(name) => {
          setSelected(name);
          setFilterProducts({
            brand: [],
            color: [],
            discount: false,
            price: [1, 100],
          });
        }}
        catagory={params.catagory}
      />
      <HeaderDilter />
      <div className="flex items-center duration-300 transition-all animate-in flex-wrap text-12 justify-start gap-3 w-full ">
        <Filtered
          type="color"
          onDelete={handelDelete}
          item={filterProducts.color}
        />
        <Filtered type="discount" item={filterProducts.discount} />
        <Filtered type="price" item={filterProducts.price} />
        <Filtered
          type="brand"
          onDelete={handelDelete}
          item={filterProducts.brand}
        />
      </div>
      <div className="grid grid-cols-4 gap-2">
        <div className="">
          {" "}
          <FilterItem
            key={selected}
            selected={selected}
            filters={filterProducts}
            onFilter={handleFilter}
          />
        </div>
        <div className="col-span-3 grid lg:grid-cols-3 2xl:grid-cols-4 md:grid-cols-2 gap-3 w-full">
          {products.map((item) => (
            <NewProducts key={item.name} itemDb={item} title="catagory" />
          ))}
        </div>
      </div>
      <br />
    </div>
  );
};

export default MyComponent;
