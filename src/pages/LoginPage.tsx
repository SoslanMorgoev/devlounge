import { useState } from "react"
import { supabase } from "../lib/supabase";


export function LogInPage() {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div >
            <form className="logInClass" onSubmit={async (e) => {
                e.preventDefault();
                const { data, error } = await supabase.auth.signUp({ email, password });
                console.log(data, error);
                setUserName("");
                setEmail("");
                setPassword("");
            }}>
                <label form="userName" >
                    Name:
                    <input id="userName" placeholder="Enter your name" onChange={(e) => setUserName(e.target.value)} />
                </label>
                <label form="email">
                    Email:
                    <input id="email" type="email" value={email} placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label form="password">
                    Password:
                    <input id="password" type="password" value={password} placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
                </label>

                <button type="submit">Submit</button>
            </form>


        </div>
    )
}