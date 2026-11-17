import { useEffect, useRef } from "react";
import { useFilterStore } from "../store/filterStore";
import type { CategoryFilter } from "../types";

function MembersFilter() {
    const inputRef = useRef<HTMLInputElement>(null);
    const search = useFilterStore((state) => state.search);
    const setSearch = useFilterStore((state) => state.setSearch);
    const category = useFilterStore((state) => state.category);
    const setCategory = useFilterStore((state) => state.setCategory);
    useEffect(() => {
        inputRef.current?.focus();
    }, []);
    return (
        <div className="filters">

            <input ref={inputRef} value={search} onChange={(e) => setSearch(e.target.value)} />
            <select value={category} onChange={(e) => setCategory(e.target.value as CategoryFilter)}>
                <option value={"all"}>All</option>
                <option value={"frontend"}>Frontend</option>
                <option value={"backend"}>Backend</option>
                <option value={"fullstack"}>Fullstack</option>
            </select>

            <button onClick={() => { setCategory("all"); setSearch("") }}>Reset</button>
        </div>
    )
}
export default MembersFilter;
