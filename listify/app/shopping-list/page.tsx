import React from 'react';
import { Container } from '@mui/material';
import ShoppingList from '@/src/Components/ShoppingList';
import { Recipe } from '@/src/Models/Recipe';

const exampleRecipes:{ recipe: Recipe, count: number}[] = [
 {
   recipe: {
     id: 1,
     name: 'Pancakes',
     ingredients: [
       { id: '1', name: 'Harina', quantity: 2, measurementUnit: 'tazas', price: 1.5 },
       { id: '2', name: 'Leche', quantity: 1.5, measurementUnit: 'tazas', price: 0.5 },
       { id: '3', name: 'Huevo', quantity: 1, measurementUnit: 'unidad', price: 0.2 },
       { id: '4', name: 'Azúcar', quantity: 0.5, measurementUnit: 'tazas', price: 0.3 },
     ],
     instructions: 'Mezclar todos los ingredientes y cocinar en una sartén caliente.',
   },
   count: 2
 },
  { recipe: {
    id: 2,
    name: 'Ensalada',
    ingredients: [
      { id: '5', name: 'Lechuga', quantity: 1, measurementUnit: 'unidad', price: 1.0 },
      { id: '6', name: 'Tomate', quantity: 2, measurementUnit: 'unidad', price: 0.7 },
      { id: '7', name: 'Cebolla', quantity: 0.5, measurementUnit: 'unidad', price: 0.4 },
      { id: '8', name: 'Aceite de Oliva', quantity: 2, measurementUnit: 'cucharadas', price: 0.8 },
    ],
    instructions: 'Lavar y cortar todos los ingredientes, mezclar y servir.',
  }, count: 1},
];


const RecipesPage: React.FC = () => {
  return (
    <Container>
      <ShoppingList selectedRecipes={exampleRecipes} />
    </Container>
  );
};

export default RecipesPage;