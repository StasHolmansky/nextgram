import { useRouter } from "next/router";
import { supabase } from "../../utils/supabase";
import User from "../../components/UserData";
import { Button, Grid, IconButton, Link, Typography } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

export default function Header() {
    const user = User();
    const router = useRouter();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.reload();
    };

    return (
        <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
        >
            <Grid item>
                <Typography variant="h2" component="h1" gutterBottom>
                    <Link
                        sx={{ cursor: "pointer" }}
                        underline="none"
                        onClick={() => router.push("/")}
                    >
                        NextGram
                    </Link>
                </Typography>
            </Grid>
            <Grid item>
                <IconButton
                    size="large"
                    color="primary"
                    aria-label="upload picture"
                    component="span"
                    onClick={() => router.push("/upload")}
                >
                    <PhotoCamera />
                </IconButton>
            </Grid>
            <Grid item>
                {user ? (
                    <Grid
                        spacing={2}
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Grid item>
                            <Typography
                                variant="body1"
                                component="p"
                                gutterBottom
                            >
                                {user.email}
                            </Typography>
                        </Grid>
                        <Grid item>
                            <Typography
                                variant="body1"
                                component="p"
                                gutterBottom
                            >
                                <Button variant="text" onClick={handleLogout}>
                                    SIGN OUT
                                </Button>
                            </Typography>
                        </Grid>
                    </Grid>
                ) : (
                    <Typography variant="body1" component="p" gutterBottom>
                        <Button
                            variant="text"
                            onClick={() => router.push("/auth")}
                        >
                            SIGN IN
                        </Button>
                    </Typography>
                )}
            </Grid>
        </Grid>
    );
}
