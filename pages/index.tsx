import { useEffect, useCallback, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import BlurImage from "../components/BlurImage/index";
import { usePhotos } from "../utils/usePhotos";
import { usePhoto } from "../utils/usePhoto";
import { supabase } from "../utils/supabase";
import Photo from "../components/frame";
import User from "../components/UserData";
import { Box, Button, Container, Grid, Modal } from "@mui/material";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    bgcolor: "background.paper",
    boxShadow: 24,
};

export default function Home() {
    const router = useRouter();
    const { photoId } = router.query;
    const [photo, photoIsLoading] = usePhoto(photoId);
    const [nameFirst, setNameFirst] = useState<any>();
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    useEffect(() => {
        if (photo) handleOpen();
        else handleClose();
    }, [photo]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.reload();
    };
    const user = User();

    async function getProfile() {
        try {
            let name = supabase
                .from("users")
                .select(`name_first`)
                .eq("id", user.id);
            console.log(name);
        } catch (error) {
            alert("Error loading user data!");
            console.log(error);
        }
    }

    useEffect(() => {
        getProfile();
    }, []);

    const [photos, isLoading] = usePhotos();

    return (
        <Container fixed>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledbly="modal-madal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={{ ...style }}>
                    <Photo photo={photo} />
                </Box>
            </Modal>
            <Box sx={{ textAlign: "center" }}>
                <h1>NextGram</h1>
                <div>{user ? user.email : ""}</div>
                <Button onClick={handleLogout} variant="text">
                    Logout
                </Button>
            </Box>
            <div>
                <ul>
                    <li>
                        <a href="/auth">Auth</a>
                    </li>
                    <li>
                        <a href="/upload">Upload</a>
                    </li>
                </ul>
            </div>
            <Grid container spacing={2}>
                {isLoading ? (
                    <p>Loading</p>
                ) : (
                    photos.map(({ id, url }: any) => (
                        <Grid key={id} item xs={4}>
                            <Link
                                legacyBehavior
                                href={{
                                    pathname: "/",
                                    query: { photoId: id },
                                }}
                                as={`/p/${encodeURI(id)}`}
                                shallow
                                scroll={false}
                            >
                                <a>
                                    <BlurImage
                                        src={url}
                                        height={500}
                                        width={500}
                                        objectFit="cover"
                                    />
                                </a>
                            </Link>
                        </Grid>
                    ))
                )}
            </Grid>
        </Container>
    );
}
