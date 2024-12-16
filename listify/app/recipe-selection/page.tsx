import React from 'react';
import { Container } from '@mui/material';
import RecipeSelection from '@/src/Components/RecipeSelection';

const RecipeFormPage: React.FC = () => {
  return (
    <Container>
      <RecipeSelection />
    </Container>
  );
};

export default RecipeFormPage;