'use client'; 

import React, { useState } from 'react';
import { Button, TextField, Container, Typography, Box } from '@mui/material';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log('Email:', email);
    console.log('Password:', password);
    
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await response.json();
    console.log(data);
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