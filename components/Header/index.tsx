import { useRouter } from "next/router";
import { supabase } from "../../utils/supabase";
import User from "../../components/UserData";
import {
    Box,
    Button,
    Grid,
    IconButton,
    Link,
    Link as MLink,
    Typography,
} from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

export default function Header() {
    const user = User();
    const router = useRouter();

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/");
    };

    return (
        <Grid
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
        >
            <Grid item>
                <Typography variant="h3" gutterBottom>
                    <Link href="/" underline="none">
                        NextGram
                    </Link>
                </Typography>
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
                            <IconButton
                                color="primary"
                                aria-label="upload picture"
                                component="span"
                                onClick={() => router.push("/upload")}
                            >
                                <PhotoCamera />
                            </IconButton>
                        </Grid>
                        <Grid item>
                            <Grid container spacing={2}>
                                <Grid item>{user.email}</Grid>
                                <Grid item>
                                    <Link
                                        href="#"
                                        onClick={handleLogout}
                                        underline="none"
                                    >
                                        SIGN OUT
                                    </Link>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                ) : (
                    <Link href="/auth" underline="none">
                        SIGN IN
                    </Link>
                )}
            </Grid>
        </Grid>
    );
}
