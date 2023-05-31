import React from 'react';
import Photo from '../../components/frame';
import swagPhotos from '../../photos';
import usePhoto from '../../utils/usePhoto';
import router, { useRouter } from 'next/router';
import { Box, CircularProgress, Container, Grid } from '@mui/material';


export default function PhotoPage() {
  const router = useRouter();
  const { id } = router.query;
  const [photo, photoIsLoading] = usePhoto(id);
  return (
    <Container fixed>
      {photo ? (
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Photo photo={photo} />
          </Grid>
          <Grid item xs={4}>
            //
          </Grid>
        </Grid>
      ) : (
        <Box sx={{display:'flex', justifyContent:'center', alignItems:'center', height:'100vh'}}>
          <CircularProgress disableShrink />
        </Box>
      )
      }
    </Container>
  );
}
