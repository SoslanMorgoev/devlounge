import { useState } from "react";
import MembersList from "../components/MembersList";
import MembersFilter from "../components/MembersFilter";
import { users } from "../data/users";
import { useFilterStore } from "../store/filterStore";
import type { SelectedUser } from "../types";

function MembersPage() {
    const search = useFilterStore((state) => state.search);
    const category = useFilterStore((state) => state.category);
    const onlineOnly = useFilterStore((state) => state.onlineOnly);
    const [selectedUser, setSelectedUser] = useState<SelectedUser>(null);

    const byCategory = category === "all" ? users : users.filter(user => user.category === category);
    const byOnline = onlineOnly ? byCategory.filter(user => user.online) : byCategory;
    const bySearch = byOnline.filter(user => user.name.toLowerCase().includes(search.toLowerCase().trim()) || user.category.toLowerCase().includes(search.toLowerCase().trim()));

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
