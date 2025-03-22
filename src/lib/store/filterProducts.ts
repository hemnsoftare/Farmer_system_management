import { create } from "zustand";
import { FilterProps, typeFilter } from "../action";

interface FilterState {
  category: string;
  sortBy: string;
  filter: {
    brand: string[];
    color: string[];
    discount: boolean;
    price: number[];
  };
  setSortBy: (sortBy: string) => void;
  setCategory: (category: string) => void;
  setAllFilter: (filterData: typeFilter) => void;
  updateBrand: (brand: string) => void;
  updateColor: (color: string) => void;
  updateDiscount: () => void;
  updatePrice: (price: number[]) => void;
  resetAll: () => void;
}

const useFilterProducts = create<FilterState>((set) => ({
  category: "",
  sortBy: "new",
  filter: {
    brand: [],
    color: [],
    discount: false,
    price: [1, 100000],
  },
  setSortBy: (sortBy: string) => {
    console.log(sortBy);
    set({ sortBy });
  },
  setCategory: (category: string) => set({ category }),
  setAllFilter: (filterData: typeFilter) => {
    console.log(filterData);

    // set({ filter: filterData })
  },
  updateBrand: (brand: string) =>
    set((state) => ({
      filter: {
        ...state.filter,
        brand: state.filter.brand.includes(brand)
          ? state.filter.brand.filter((item: string) => item !== brand)
          : [...state.filter.brand, brand],
      },
    })),
  updateColor: (color: string) =>
    set((state) => ({
      filter: {
        ...state.filter,
        color: state.filter.color.includes(color)
          ? state.filter.color.filter((item: string) => item !== color)
          : [...state.filter.color, color],
      },
    })),
  updateDiscount: () =>
    set((state) => ({
      filter: {
        ...state.filter,
        discount: !state.filter.discount,
      },
    })),
  updatePrice: (price: number[]) =>
    set((state) => ({
      filter: {
        ...state.filter,
        price,
      },
    })),
  resetAll: () =>
    set(() => ({
      filter: {
        brand: [],
        color: [],
        discount: false,
        price: [1, 100000],
      },
    })),
}));

export default useFilterProducts;
