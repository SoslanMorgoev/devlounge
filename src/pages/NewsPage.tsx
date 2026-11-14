import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

type Article = {
    id: number;
    title: string;
    user: {
        name: string;
        profile_image_90: string;
    }
    description: string;
    url: string;
    tag_list: string[];
    readable_publish_date: string;
    public_reactions_count: number;
    comments_count: number;
}

const tipsTag = ["javascript", "google", "ruby", "webdev", "beginners", "go", "react", "typescript", "tailwind", "developer"];
export function NewsPage() {
    const [searchTag, setSearchTag] = useState("");
    const [input, setInput] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const { data, isPending, isError, error } = useQuery<Article[]>({
        queryKey: ["news", searchTag],
        queryFn: () => fetch(`https://dev.to/api/articles?per_page=50&tag=${searchTag}`).then((res) => { if (!res.ok) throw new Error(`Error ${res.status}`); return res.json() })
    });
    const [showTips, setShowTips] = useState(false);
    useEffect(() => {
        inputRef.current?.focus();
    }, []);
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
                <span className="tagSearchSpan">
                    <input ref={inputRef} value={input} placeholder="Search by tag: " onChange={(e) => setInput(e.target.value)} />
                    <button onClick={() => setShowTips(p => !p)}>?</button>
                </span>
            </div>
            {showTips && (
                <div className="tagTips">
                    {tipsTag.map(tag => <button key={tag} className={tag === searchTag ? "tagTip tagTipActive" : "tagTip"} onClick={() => setInput(tag)}>
                        #{tag}
                    </button>)}
                </div>)
            }
            <div className="newsContainer">
                {isError ? (
                    <p>{error.message}</p>
                ) : isPending ? (
                    <p>Loading...</p>
                ) : data.length === 0 ? (
                    <p>No articles with this tag</p>
                ) : (<ul className="newsList">{data.map(item => (
                    <li key={item.id} className="article">
                        <div className="articleAuthor">
                            <img src={item.user.profile_image_90} alt={item.user.name} />
                            <span>{item.user.name}</span>
                            <span>{item.readable_publish_date}</span>
                        </div>

                        <a href={item.url} target="_blank" rel="noreferrer">{item.title}</a>
                        <p>{item.description}</p>
                        <div className="articleTags">
                            {item.tag_list.map(tag => <button key={tag} className={tag === searchTag ? "tagTip tagTipActive" : "tagTip"} onClick={() => setInput(tag)}>#{tag}</button>)}
                        </div>
                        <div className="articleStatus">
                            <span>💬{item.comments_count}</span>
                            <span>❤️{item.public_reactions_count}</span>
                        </div>
                    </li>
                ))}
                </ul>)}

            </div>
        </div>

    );
}