import React from 'react';
import { Container } from '@mui/material';
import IngredientsMaintenance from '@/src/Components/IngredientsList';

const IngredientsPage: React.FC = () => {
  return (
    <Container>
      <h1>Lista de Ingredientes</h1>
      <IngredientsMaintenance />
    </Container>
  );
};

export default IngredientsPage;