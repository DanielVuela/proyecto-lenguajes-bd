'use client'
import React, { useState } from 'react';
import { Button, Typography, Card, CardContent, Grid2 as Grid, IconButton } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { navigate } from '../Actions/Navigate';
import { Ingredient } from '../Models/Ingredient';

interface Recipe {
  id: number;
  name: string;
  ingredients: Ingredient[];
  instructions: string;
}

const RecipeSelection: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([
    {
      id: 1,
      name: 'Pancakes',
      ingredients: [
        { id: "1", name: 'Harina', quantity: 200, unit: 'g', price: 0.5 },
        { id: "2", name: 'Leche', quantity: 300, unit: 'ml', price: 0.3 },
        { id: "3", name: 'Huevos', quantity: 2, unit: 'unidad', price: 0.4 },
      ],
      instructions: 'Mezclar todos los ingredientes y cocinar en una sartén.',
    },
    {
      id: 2,
      name: 'Tortilla',
      ingredients: [
        { id: "4", name: 'Huevos', quantity: 3, unit: 'unidad', price: 0.6 },
        { id: "5", name: 'Sal', quantity: 1, unit: 'cucharadita', price: 0.1 },
      ],
      instructions: 'Batir los huevos y cocinarlos en una sartén.',
    },
  ]);

  const [selectedRecipes, setSelectedRecipes] = useState<{ recipe: Recipe; count: number }[]>([]);

  const handleAddRecipe = (recipe: Recipe) => {
    setSelectedRecipes((prev) => {
      const existingRecipe = prev.find((r) => r.recipe.id === recipe.id);
      if (existingRecipe) {
        return prev.map((r) =>
          r.recipe.id === recipe.id ? { ...r, count: r.count + 1 } : r
        );
      }
      return [...prev, { recipe, count: 1 }];
    });
  };

  const handleRemoveRecipe = (recipeId: number) => {
    setSelectedRecipes(selectedRecipes.filter((r) => r.recipe.id !== recipeId));
  };

  const handleIncreaseCount = (recipeId: number) => {
    setSelectedRecipes((prev) =>
      prev.map((r) => (r.recipe.id === recipeId ? { ...r, count: r.count + 1 } : r))
    );
  };

  const handleDecreaseCount = (recipeId: number) => {
    setSelectedRecipes((prev) => {
      const updatedRecipes = prev.map((r) =>
        r.recipe.id === recipeId ? { ...r, count: r.count - 1 } : r
      );
      return updatedRecipes.filter((r) => r.count > 0);
    });
  };

  const calculateTotalPrice = () => {
    return selectedRecipes.reduce((total, { recipe, count }) => {
      return (
        total +
        recipe.ingredients.reduce(
          (sum, ingredient) => sum + ingredient.price * ingredient.quantity * count,
          0
        )
      );
    }, 0);
  };

  const handleCheckout = () => {
    alert('Lista de compras procesada.');
    navigate('/shopping-list')
  };

  return (
    <div>
      <Typography variant="h5">Selecciona Recetas</Typography>
      <Grid container spacing={2}>
        {recipes.map((recipe) => (
          <Grid size={{sm: 6, md: 4, xs:12}} key={recipe.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{recipe.name}</Typography>
                <Typography variant="body2">Instrucciones: {recipe.instructions}</Typography>
                <Button variant="contained" onClick={() => handleAddRecipe(recipe)}>
                  Añadir
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" style={{ marginTop: 20 }}>Lista de Compras</Typography>
      <Grid container spacing={2}>
        {selectedRecipes.map(({ recipe, count }) => (
          <Grid size={{sm: 6, md: 4, xs:12}} key={recipe.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{recipe.name}</Typography>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton onClick={() => handleDecreaseCount(recipe.id)} disabled={count <= 1}>
                    <RemoveIcon />
                  </IconButton>
                  <Typography variant="body2">{count}</Typography>
                  <IconButton onClick={() => handleIncreaseCount(recipe.id)}>
                    <AddIcon />
                  </IconButton>
                </div>
                <Button variant="outlined" onClick={() => handleRemoveRecipe(recipe.id)}>
                  Remover
                </Button>
                <Typography variant="body2" style={{ marginTop: 10 }}>
                  Ingredientes:
                  <ul>
                    {recipe.ingredients.map((ingredient) => (
                      <li key={ingredient.id}>
                        {ingredient.name} - {ingredient.quantity * count} {ingredient.unit} (${(ingredient.price * ingredient.quantity * count).toFixed(2)})
                      </li>
                    ))}
                  </ul>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h6" style={{ marginTop: 20 }}>
        Precio Total: ${calculateTotalPrice().toFixed(2)}
      </Typography>
      <Button variant="contained" color="primary" onClick={handleCheckout} style={{ marginTop: 10 }}>
        Calcular Precio y Proceder
      </Button>
    </div>
  );
};

export default RecipeSelection;
