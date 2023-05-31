import { useRouter } from "next/router";
import { useState } from "react";
import React from "react";
import { supabase } from "../../utils/supabase";
import { Box, Button, Container, Grid, Paper, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

const Item = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

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
            const {
                data: { user },
                error,
            } = await supabase.auth.signUp({ email, password });
            if (error) throw error;
            router.push("/");
            await supabase.from("users").insert({
                id: user?.id,
                email: email,
                name_first: nameFirst,
                name_last: nameLast,
            });
        } catch (error) {
            alert(error.error_description || error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = async (email: string) => {
        try {
            setLoading(true);
            const {
                data: { user },
                error,
            } = await supabase.auth.signInWithPassword({ email, password });
            if (error) throw error;
            router.push("/");
        } catch (error) {
            alert(error.error_description || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container fixed>
            <Box sx={{ textAlign: "center" }}>
                <h1>NextGram</h1>
                <h2>Auth</h2>
            </Box>

            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
            >
                {isRegister ? (
                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <TextField
                            id="standard-basic"
                            label="Your email"
                            variant="standard"
                            type="email"
                            placeholder="Your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            id="standard-basic"
                            label="Your password"
                            variant="standard"
                            type="password"
                            placeholder="Your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <TextField
                            id="standard-basic"
                            label="First name"
                            variant="standard"
                            type="text"
                            placeholder="First name"
                            value={nameFirst}
                            onChange={(e) => setNameFirst(e.target.value)}
                        />
                        <TextField
                            id="standard-basic"
                            label="Last name"
                            variant="standard"
                            type="text"
                            placeholder="Last name"
                            value={nameLast}
                            onChange={(e) => setNameLast(e.target.value)}
                        />{" "}
                        <Button
                            variant="text"
                            onClick={(e) => {
                                e.preventDefault();
                                handleRegistr(email);
                            }}
                            disabled={loading}
                        >
                            <span>{loading ? "Loading" : "Sign Up"}</span>
                        </Button>
                    </Grid>
                ) : (
                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <TextField
                            id="standard-basic"
                            label="Your email"
                            variant="standard"
                            type="email"
                            placeholder="Your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <TextField
                            id="standard-basic"
                            label="Standard"
                            variant="standard"
                            type="password"
                            placeholder="Your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button
                            variant="text"
                            onClick={(e) => {
                                e.preventDefault();
                                handleLogin(email);
                            }}
                            disabled={loading}
                        >
                            <span>{loading ? "Loading" : "Sign In"}</span>
                        </Button>
                    </Grid>
                )}
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                >
                    <Button
                        variant="text"
                        onClick={(e) => {
                            setIsRegister(!isRegister);
                        }}
                        disabled={loading}
                    >
                        <span>
                            {isRegister
                                ? "ALREADY HAVE AN ACCOUNT"
                                : "STILL HAVE NO ACCOUNT"}
                        </span>
                    </Button>
                </Grid>
            </Grid>
        </Container>
    );
}
