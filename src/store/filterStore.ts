import { create } from "zustand";
import type { CategoryFilter } from "../types";

type FilterState = {
  search: string;
  category: CategoryFilter;
  onlineOnly: boolean;
  setSearch: (value: string) => void;
  setCategory: (value: CategoryFilter) => void;
  setOnlineOnly: (value: boolean) => void;
};

export const useFilterStore = create<FilterState>()((set) => ({
  search: "",
  category: "all",
  onlineOnly: false,
  setSearch: (value) => set({ search: value }),
  setCategory: (value) => set({ category: value }),
  setOnlineOnly: (value) => set({ onlineOnly: value }),
}));
