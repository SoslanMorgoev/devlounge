import { useState } from "react";
import MembersList from "../components/MembersList";
import MembersFilter from "../components/MembersFilter";
import { useFilterStore } from "../store/filterStore";
import type { User, SelectedUser } from "../types";
import { supabase } from "../lib/supabase";
import { useQuery } from "@tanstack/react-query";

function MembersPage() {
    const { data, isPending, isError } = useQuery<User[]>({
        queryKey: ["profiles"],
        queryFn: async () => {
            const { data, error } = await supabase.from("profiles").select("*");
            if (error) throw error;
            return data;
        },
    });
    const search = useFilterStore((state) => state.search);
    const category = useFilterStore((state) => state.category);
    const [selectedUser, setSelectedUser] = useState<SelectedUser>(null);

    if (isPending) return <p>Loading...</p>;
    if (isError) return <p>Ops,something went wrong</p>

    const byCategory = category === "all" ? data : data.filter(user => user.category === category);
    const bySearch = byCategory.filter(user => user.name.toLowerCase().includes(search.toLowerCase().trim()) || user.category.toLowerCase().includes(search.toLowerCase().trim()));

    return (
        <>
            <MembersFilter />
            <MembersList
                members={bySearch}
                selectedUser={selectedUser}
                onSelect={setSelectedUser}
            />
        </>
    )
}

export default MembersPage;
