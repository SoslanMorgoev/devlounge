import { useState } from "react";
import MembersList from "../components/MembersList";
import MembersFilter from "../components/MembersFilter";
import { useFilterStore } from "../store/filterStore";
import type { SelectedUser } from "../types";
import { useProfiles } from "../hooks/useProfiles";

function MembersPage() {
    const { data, isPending, isError } = useProfiles();
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
