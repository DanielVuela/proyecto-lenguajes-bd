import React from 'react';
import { Container } from '@mui/material';
import Recipes from '@/src/Components/Recipes';

const RecipesPage: React.FC = () => {
  // Fetch los ingredientes en SSR
  return (
    <Container>
      <Recipes />
    </Container>
  );
};

export default RecipesPage;