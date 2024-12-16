import React from 'react';
import { Container } from '@mui/material';
import RecipeForm from '@/src/Components/RecipeForm';

const RecipeFormPage: React.FC = () => {
  // Fetch los ingredientes en SSR
  return (
    <Container>
      <RecipeForm />
    </Container>
  );
};

export default RecipeFormPage;