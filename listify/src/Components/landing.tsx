'use client';
import React from 'react';
import { Box, Typography, Button, Grid2 as  Grid} from '@mui/material';
import { navigate } from '../Actions/Navigate';

const LandingPage = () => {

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      width={"100vw"}
      textAlign="center"
      sx={{ backgroundColor: 'background.default', padding: 4 }}
    >
      <Typography variant="h2" component="h1" gutterBottom>
        Bienvenido a tu App de Gestión de Recetas
      </Typography>
      <Typography variant="h5" component="p" gutterBottom>
        ¡Explora y gestiona tus ingredientes, recetas y listas de compras!
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        <Grid>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/ingredientes')}
          >
            Ingredientes
          </Button>
        </Grid>
        <Grid>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/recetas')}
          >
            Recetas
          </Button>
        </Grid>
        <Grid>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/lista-compras')}
          >
            Lista de Compras
          </Button>
        </Grid>
        <Grid>
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate('/logout')}
          >
            Log out
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LandingPage;