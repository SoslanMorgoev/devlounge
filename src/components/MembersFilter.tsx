import { useFilterStore } from "../store/filterStore";
import type { CategoryFilter } from "../types";

function MembersFilter() {
    const search = useFilterStore((state) => state.search);
    const setSearch = useFilterStore((state) => state.setSearch);
    const category = useFilterStore((state) => state.category);
    const setCategory = useFilterStore((state) => state.setCategory);
    const onlineOnly = useFilterStore((state) => state.onlineOnly);
    const setOnlineOnly = useFilterStore((state) => state.setOnlineOnly);
    return (
        <>
            <input value={search} onChange={(e) => setSearch(e.target.value)} />
            <input type="checkbox" checked={onlineOnly} onChange={(e) => setOnlineOnly(e.target.checked)} />
            <select value={category} onChange={(e) => setCategory(e.target.value as CategoryFilter)}>
                <option value={"all"}>All</option>
                <option value={"frontend"}>Frontend</option>
                <option value={"backend"}>Backend</option>
                <option value={"fullstack"}>Fullstack</option>
            </select>
            <button onClick={() => { setCategory("all"); setSearch(""); setOnlineOnly(false) }}>Reset</button>
        </>
    )
}
export default MembersFilter;
