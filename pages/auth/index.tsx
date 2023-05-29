import { useRouter } from "next/router";
import {  useState } from "react";
import React from "react";
import styles from "../../styles/home.module.scss";
import { supabase } from "../../utils/supabase";

export default function Auth() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [nameFirst, setNameFirst] = useState("");
    const [nameLast, setNameLast] = useState("");

    const handleRegistr = async (email: string) => {
        try {
            setLoading(true);
            const { data: {user}, error } = await supabase.auth.signUp({ email, password });
            if (error) throw error;
            console.log(user);
            await supabase.from('users').insert({
                id: user?.id,
                email:email,
                name_first: nameFirst,
                name_last: nameLast
            })
        } catch (error) {
            alert(error.error_description || error.message);
        } finally {
            setLoading(false);
        }
    }

    const handleLogin = async (email: string) => {
        try {
            setLoading(true);
            const { data: {user}, error } = await supabase.auth.signInWithPassword({ email, password });
            if (error) throw error;
        } catch (error) {
            alert(error.error_description || error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
      <main className={styles.container}>
        <div>
          <h1>NextGram</h1>
          <h2>Auth</h2>
        </div>

        <button
            onClick={(e) => {
                setIsRegister(!isRegister);
            }}
            className="button block"
            disabled={loading}
            >
            <span>{isRegister ? "Sign In" : "Sign Up"}</span>
        </button>

        {isRegister? 
            <div className={styles.images}>
                <div>
                    <input
                        className="inputField"
                        type="email"
                        placeholder="Your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}>
                    </input>
                    <input
                        className="inputField"
                        type="password"
                        placeholder="Your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}>
                    </input>
                </div>
                <div>
                    <input
                        className="inputField"
                        type="text"
                        placeholder="First name"
                        value={nameFirst}
                        onChange={(e) => setNameFirst(e.target.value)}>
                    </input>
                    <input
                        className="inputField"
                        type="text"
                        placeholder="Last name"
                        value={nameLast}
                        onChange={(e) => setNameLast(e.target.value)}>
                    </input>
                </div>
                <div>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            handleRegistr(email);
                        }}
                        className="button block"
                        disabled={loading}
                        >
                        <span>{loading ? "Loading" : "Sign Up"}</span>
                    </button>
                </div>
            </div>        
        :
            <div className={styles.images}>
                <div>
                    <input
                        className="inputField"
                        type="email"
                        placeholder="Your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}>
                    </input>
                    <input
                        className="inputField"
                        type="password"
                        placeholder="Your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}>
                    </input>
                </div>
                <div>
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            handleLogin(email);
                        }}
                        className="button block"
                        disabled={loading}
                        >
                        <span>{loading ? "Loading" : "Sign In"}</span>
                    </button>
                </div>
            </div>
        }
        <div><a href="/">Home</a></div>
      </main>
    );
  }
  