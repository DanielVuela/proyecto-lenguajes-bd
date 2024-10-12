import * as React from 'react';
import { Button, Typography } from '@mui/material';

export default function Landing() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant="h3" component="h1" gutterBottom>
        ¡Bienvenido a mi proyecto Next.js con MUI y TypeScript!
      </Typography>
      <Button variant="contained" color="primary">
        ¡Haz clic aquí!
      </Button>
    </div>
  );
}