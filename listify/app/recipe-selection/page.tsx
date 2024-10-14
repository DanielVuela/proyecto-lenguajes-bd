import React from 'react';
import { Container } from '@mui/material';
import RecipeSelection from '@/src/Components/RecipeSelection';

const RecipeFormPage: React.FC = () => {
  // Fetch las recetas en SSR
  return (
    <Container>
      <RecipeSelection />
    </Container>
  );
};

export default RecipeFormPage;