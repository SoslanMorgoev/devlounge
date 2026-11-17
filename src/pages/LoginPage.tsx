import { useState } from "react"
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router";


export function LogInPage() {
    const [mode, setMode] = useState<"signup" | "login">("login");
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    function switchMode(newMode: "signup" | "login") {
        setMode(newMode);
        setPassword("");
        setErrorMessage("");
    }

    return (
        <div >
            <h3>{mode === "login" ? "LogIn" : "SignUp"}</h3>
            <div className="registrationList">
                <form className="registration" onSubmit={async (e) => {
                    e.preventDefault();
                    if (mode === "signup") {
                        const { error } = await supabase.auth.signUp({ email, password });
                        if (error) {
                            setErrorMessage(error.message);
                            return;
                        }
                    } else {
                        const { error } = await supabase.auth.signInWithPassword({ email, password });
                        if (error) {
                            setErrorMessage(error.message);
                            return;
                        }
                    }

                    navigate("/");
                }}>
                    {mode === "signup" && <label >
                        Name:
                        <input value={userName} placeholder="Enter your name" onChange={(e) => setUserName(e.target.value)} />
                    </label>}
                    <label >
                        Email:
                        <input type="email" value={email} placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
                    </label>
                    <label >
                        Password:
                        <input type="password" value={password} placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} />
                    </label>

                    <button type="submit">Submit</button>
                </form>
                {errorMessage && <p className="red">{errorMessage}</p>}
                {mode === "signup" ?
                    (<div>
                        <p>Already have account?</p>
                        <button onClick={() => switchMode("login")}>LogIn</button>
                    </div>)
                    :
                    (<div>
                        <p>Don't have account yet?</p>
                        <button onClick={() => switchMode("signup")}>SignUp</button>
                    </div>)}
            </div>




        </div>
    )
}