'use client';
import React, { useEffect } from 'react';
import { Box, Typography, Button, Grid2 as Grid } from '@mui/material';
import { navigate } from '../Actions/Navigate';
import useUserStore from '@/context/userContext';

const LandingPage =  () => {
  const { token, setToken, setUserId } = useUserStore();

  useEffect(() => {
    const getUserId = async () => {
    const response = await  fetch(`/api/login?token=${token}`);
    const result = await response.json();
    setUserId(result.id)
    };
    if(token && token !== ""){
      getUserId();
    }
  }, [token])

  const handleLogOut = async () => {
    const response = await fetch('/api/login', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify( { token: token } ),
    });

    if (response.ok) {
      setToken("");
      navigate('/login');
    } else {
      alert("Error al cerrar la sesion");
    }
  }

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
            onClick={() => navigate('/ingredients')}
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
            onClick={handleLogOut}
          >
            Log out
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LandingPage;