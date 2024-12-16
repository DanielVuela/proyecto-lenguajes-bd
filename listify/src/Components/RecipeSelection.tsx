'use client'
import React, { useEffect, useState } from 'react';
import { Button, Typography, Card, CardContent, Grid2 as Grid, IconButton } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { navigate } from '../Actions/Navigate';
import { Ingredient } from '../Models/Ingredient';
import useUserStore from '@/context/userContext';

interface Recipe {
  id: number;
  name: string;
  ingredients: Ingredient[];
  instructions: string;
}

const RecipeSelection: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const [selectedRecipes, setSelectedRecipes] = useState<{ recipe: Recipe; count: number }[]>([]);
  const {userId} = useUserStore();

    useEffect(() => {
      async function fetchRecipes() {
        const response = await fetch(`/api/recipe?userId=${userId}`);
        const result = await response.json();
        let recipesParsed: Recipe[] = [];
        console.log(result);
        result.forEach((recipeEntry: { recipeId: number; ingredientName: any; measurementUnit: any; recipeName: any; recipeDescription: any; }) => {
          const finding = recipesParsed.find(r => recipeEntry.recipeId === r.id)
          if (finding) {
            finding.ingredients.push({
              name: recipeEntry.ingredientName, measurementUnit: recipeEntry.measurementUnit, quantity: 1,
              price: 0
            })
          }
          else {
            recipesParsed.push({
              id: recipeEntry.recipeId,
              name: recipeEntry.recipeName,
              instructions: recipeEntry.recipeDescription,
              ingredients: [{
                name: recipeEntry.ingredientName, measurementUnit: recipeEntry.measurementUnit, quantity: 1,
                price: 0
              }]
            })
          }
          setRecipes(recipesParsed);
        });
      };
      if (userId)
        fetchRecipes();
    }, [userId]);

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


  const handleCheckout = async  () => {
    const response = await fetch('/api/shopping-list', {
      method: 'POST',
      cache: "reload",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId , recipes: selectedRecipes.map( r => ({
        id: r.recipe.id,
        quantity: r.count
      })) }),
    });

    if (response.ok) {
      const ShoppingListId = await response.json();
      navigate(`/shopping-list/${ShoppingListId}`)
    } else {
      alert("Revisar recetas, no pudo crearse lista de compras");
    }


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
                        {ingredient.name} - {ingredient.quantity * count} {ingredient.measurementUnit} 
                      </li>
                    ))}
                  </ul>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Button variant="contained" color="primary" onClick={handleCheckout} style={{ marginTop: 10 }}>
        Proceder a la lista de compra
      </Button>
    </div>
  );
};

export default RecipeSelection;
