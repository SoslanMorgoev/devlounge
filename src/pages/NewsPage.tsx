import { useQuery } from "@tanstack/react-query";
const apiUrl = "https://dev.to/api/articles?per_page=+10";
type Article = {
    id: number;
    title: string;
    description: string;
    url: string;
}
export function NewsPage() {
    const { data, isPending, isError, error } = useQuery<Article[]>({
        queryKey: ["news"],
        queryFn: () => fetch(apiUrl).then((res) => { if (!res.ok) throw new Error(`Error ${res.status}`); return res.json() })
    });
    if (isPending) return <p>Loading...</p>;
    if (isError) return <p>{error.message}</p>
    return (

        <ul className="newsList">{data.map(item => (
            <li key={item.id}>
                <a href={item.url} target="_blank" rel="noreferrer">{item.title}</a>
                <p>{item.description}</p>
            </li>
        ))}
        </ul>

    );
}