import { useQuery } from "@tanstack/react-query";
import { supabase } from "../lib/supabase";
import type { User } from "../types";

export function useProfiles() {
  return useQuery<User[]>({
    queryKey: ["profiles"],
    queryFn: async () => {
      const { data, error } = await supabase.from("profiles").select("*");
      if (error) throw error;
      return data;
    },
  });
}
