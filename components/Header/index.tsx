import { useRouter } from "next/router";
import { supabase } from "../../utils/supabase";
import User from "../../components/UserData";
import { Grid, IconButton, Link, Typography } from "@mui/material";
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
                    <Link href="/" underline="none">
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
                                <Link
                                    href="#"
                                    onClick={handleLogout}
                                    underline="none"
                                >
                                    SIGN OUT
                                </Link>
                            </Typography>
                        </Grid>
                    </Grid>
                ) : (
                    <Typography variant="body1" component="p" gutterBottom>
                        <Link href="/auth" underline="none">
                            SIGN IN
                        </Link>
                    </Typography>
                )}
            </Grid>
        </Grid>
    );
}
