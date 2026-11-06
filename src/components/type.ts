export type User = {
  id: number;
  name: string;
  age: number;
  category: Category;
  online: boolean;
};
export type Message = {
  id: string;
  userId: number;
  from: "me" | "them";
  text: string;
};
export type Category = "frontend" | "backend" | "fullstack";
export type CategoryFilter = Category | "all";
export type SelectedUser = User | null;
