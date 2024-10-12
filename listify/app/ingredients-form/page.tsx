import React from 'react';
import { Container } from '@mui/material';
import IngredientForm from '@/src/Components/IngredientForm';

const IngredientFormPage: React.FC = () => {
  return (
    <Container>
      <h1>Ingrediente nuevo</h1>
      <IngredientForm />
    </Container>
  );
};

export default IngredientFormPage;