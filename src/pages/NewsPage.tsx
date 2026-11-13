import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

type Article = {
    id: number;
    title: string;
    description: string;
    url: string;
    tag_list: string[];
}

// const searchTags = ["javascript", "google", "ruby", "webdev", "beginners", "go", "react", "typescript", "tailwind", "developer"];
export function NewsPage() {
    const [searchTag, setSearchTag] = useState("");
    const [input, setInput] = useState("");
    const { data, isPending, isError, error } = useQuery<Article[]>({
        queryKey: ["news", searchTag],
        queryFn: () => fetch(`https://dev.to/api/articles?per_page=50&tag=${searchTag}`).then((res) => { if (!res.ok) throw new Error(`Error ${res.status}`); return res.json() })
    });


    useEffect(() => {
        const searchTimer = setTimeout(() => {
            setSearchTag(input.trim().toLowerCase());
        }, 500);
        return () => { clearTimeout(searchTimer) }

    }, [input]);

    return (
        <div className="newsPage">
            <div className="newsNavigation">
                <h3>News</h3>
                <input value={input} placeholder="Search by tag: " onChange={(e) => setInput(e.target.value)} />
            </div>
            <div className="newsContainer">
                {isError ? (
                    <p>{error.message}</p>
                ) : isPending ? (
                    <p>Loading...</p>
                ) : data.length === 0 ? (
                    <p>No articles with this tag</p>
                ) : (<ul className="newsList">{data.map(item => (
                    <li key={item.id}>
                        <a href={item.url} target="_blank" rel="noreferrer">{item.title}</a>
                        <p>{item.description}</p>
                        <p>{item.tag_list.map(tag => (`#${tag} `))}</p>
                    </li>
                ))}
                </ul>)}

            </div>
        </div>

    );
}