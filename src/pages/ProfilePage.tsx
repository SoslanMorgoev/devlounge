import { Link, useParams } from "react-router";
import { supabase } from "../lib/supabase";
import { useQuery } from "@tanstack/react-query";
import type { User } from "../types";

function ProfilePage() {
    const { id } = useParams();
    const { data, isPending, isError } = useQuery<User>({
        queryKey: ["profiles", id],
        queryFn: async () => {
            const { data, error } = await supabase.from("profiles").select("*").eq("id", id).single();
            if (error) throw error;
            return data;
        }
    });

    if (isPending) return <p>Loading...</p>
    if (isError) return (<div>
        <p>User not found</p>
        <Link to={"/"}>Back</Link>
    </div>);
    return (
        <div className="profile">
            <ul className="profileInfo">
                <li>Name: {data.name}</li>
                <li>category: {data.category}</li>
                <li>status: {data.status}</li>

            </ul>
            <div className="userProfileButtons">
                <Link to={`/chat/${data.id}`}>Send message</Link>
                <Link to={"/"}>Back</Link>
            </div>

        </div>
    )
}
export default ProfilePage;
