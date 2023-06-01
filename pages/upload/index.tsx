import React, { useState } from "react";
import { supabase } from "../../utils/supabase";
import { Button, Container, Grid } from "@mui/material";
import Header from "../../components/Header";
import router from "next/router";

export default function Upload() {
    const [uploading, setUploading] = useState(false);

    const uploadAvatar = async (event: any) => {
        try {
            setUploading(true);
            if (!event.target.files || event.target.files.length === 0) {
                throw new Error("You must select an image to upload.");
            }

            const file = event.target.files[0];
            const fileExt = file.name.split(".").pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;
            let { error: uploadError } = await supabase.storage
                .from("photos")
                .upload(filePath, file, { upsert: true });

            if (uploadError) {
                throw uploadError;
            }

            const publicURL = supabase.storage
                .from("photos")
                .getPublicUrl(filePath).data.publicUrl;
            const userID = (await supabase.auth.getUser()!).data.user.id;
            await supabase
                .from("photos")
                .insert({
                    user_id: userID,
                    url: publicURL,
                })
                .single();

            router.push("/");
        } catch (error: any) {
            alert("The user is not known, please log in or register!");
        } finally {
            setUploading(false);
        }
    };

    return (
        <Container fixed>
            <Header />
            <Grid container justifyContent="center" alignItems="center">
                <label htmlFor="container-button-file">
                    <input
                        style={{ visibility: "hidden", position: "absolute" }}
                        type="file"
                        id="container-button-file"
                        accept="image/*"
                        onChange={uploadAvatar}
                        disabled={uploading}
                    />
                    <Button variant="contained" component="span">
                        {uploading ? "Uploading..." : "Upload"}
                    </Button>
                </label>
            </Grid>
        </Container>
    );
}
