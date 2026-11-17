import { create } from "zustand";
import type { CategoryFilter } from "../types";

type FilterState = {
  search: string;
  category: CategoryFilter;
  setSearch: (value: string) => void;
  setCategory: (value: CategoryFilter) => void;
};

export const useFilterStore = create<FilterState>()((set) => ({
  search: "",
  category: "all",
  setSearch: (value) => set({ search: value }),
  setCategory: (value) => set({ category: value }),
}));
