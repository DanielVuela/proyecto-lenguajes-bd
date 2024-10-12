import React from 'react';
import { Container } from '@mui/material';
import RecipeSelection from '@/src/Components/RecipeSelection';

const RecipeFormPage: React.FC = () => {
  // Fetch las recetas en SSR
  return (
    <Container>
      <h1>Escoger Recetas</h1>
      <RecipeSelection />
    </Container>
  );
};

export default RecipeFormPage;