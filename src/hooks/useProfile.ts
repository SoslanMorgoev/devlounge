import { useQuery } from "@tanstack/react-query";
import type { User } from "../types";
import { supabase } from "../lib/supabase";

export function useProfile(id: string | undefined) {
  return useQuery<User>({
    queryKey: ["profiles", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", id)
        .single();
      if (error) throw error;
      return data;
    },
  });
}
