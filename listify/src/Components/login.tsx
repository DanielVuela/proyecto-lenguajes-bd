'use client'; 

import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box } from '@mui/material';
import useUserStore from '@/context/userContext';
import { navigate } from '../Actions/Navigate';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const {setToken} = useUserStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const response = await fetch('/api/login', {
      method: 'POST',
      cache: "reload",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    const token = await response.json();
    if(token && token !== ""){
      console.log("new token:", token);
      setToken(token);
      navigate("/");
    }else{
      alert("Credenciales incorrectas");
    }
    
  };

  return (
    <Box height="100vh" width={"100%"} justifyContent={"center"} marginTop={10} >
    <Container component="main" maxWidth="xs" > 
      <Typography component="h1" variant="h5">
        Iniciar sesión
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          margin="normal"
          required
          fullWidth
          label="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" fullWidth variant="contained" color="primary">
          Iniciar sesión
        </Button>
      </form>
    </Container>
    </Box>
  );
};

export default Login;