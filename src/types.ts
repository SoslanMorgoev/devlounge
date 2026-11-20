export type User = {
  id: string;
  name: string;
  category: Category;
  status: string;
  created_at: string;
};
export type Message = {
  id: string;
  sender_id: string;
  receiver_id: string;
  text: string;
  created_at: string;
};
export type Category = "frontend" | "backend" | "fullstack";
export type CategoryFilter = Category | "all";
export type SelectedUser = User | null;
