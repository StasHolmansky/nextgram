import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import BlurImage from "../components/BlurImage/index";
import { usePhotos } from "../utils/usePhotos";
import { usePhoto } from "../utils/usePhoto";
import Photo from "../components/frame";
import { Box, Container, Grid, Modal } from "@mui/material";
import Header from "../components/Header";

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    maxHeight: "90%",
    minWidth: "373px",
    bgcolor: "background.paper",
    boxShadow: 24,
};

export default function Home() {
    const router = useRouter();
    const { photoId } = router.query;
    const [photo, photoIsLoading] = usePhoto(photoId);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        router.push("/");
    };

    useEffect(() => {
        if (photo) handleOpen();
        else handleClose();
    }, [photo]);

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
            <Header></Header>
            <Grid container spacing={2}>
                {isLoading ? (
                    <p>Loading</p>
                ) : (
                    photos.map(({ id, url }: any) => (
                        <Grid key={id} item>
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
    )
}
