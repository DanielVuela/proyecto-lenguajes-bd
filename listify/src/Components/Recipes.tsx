'use client';
import React, { useState } from 'react';
import { Button, TextField, Grid2 as Grid, Typography, Card, CardContent, IconButton, Modal, Box } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { navigate } from '../Actions/Navigate';

interface Ingredient {
  id: number;
  name: string;
  quantity: number;
  unit: string;
}

interface Recipe {
  id: number;
  name: string;
  ingredients: Ingredient[];
  instructions: string;
}

const RecipeList: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([
    {
      id: 1,
      name: 'Pancakes',
      ingredients: [
        { id: 1, name: 'Harina', quantity: 200, unit: 'g' },
        { id: 2, name: 'Leche', quantity: 300, unit: 'ml' },
        { id: 3, name: 'Huevos', quantity: 2, unit: 'unidad' },
      ],
      instructions: 'Mezclar todos los ingredientes y cocinar en una sartén.',
    },
  ]);

  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [editRecipe, setEditRecipe] = useState<Recipe | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const handleDeleteRecipe = (recipeId: number) => {
    setRecipes(recipes.filter((recipe) => recipe.id !== recipeId));
  };

  const handleEditRecipe = (recipe: Recipe) => {
    setIsEditing(recipe.id);
    setEditRecipe({ ...recipe });
    setModalOpen(true);
  };

  const handleSaveRecipe = () => {
    if (editRecipe) {
      setRecipes(
        recipes.map((recipe) =>
          recipe.id === editRecipe.id ? editRecipe : recipe
        )
      );
    }
    setModalOpen(false);
    setIsEditing(null);
  };

  const handleIngredientChange = (
    index: number,
    field: keyof Ingredient,
    value: string | number
  ) => {
    if (editRecipe) {
      const updatedIngredients = [...editRecipe.ingredients];
      updatedIngredients[index] = {
        ...updatedIngredients[index],
        [field]: value,
      };
      setEditRecipe({ ...editRecipe, ingredients: updatedIngredients });
    }
  };

  return (
    <div>
      <Typography variant="h6">Lista de Recetas</Typography>
      <Button variant="contained"
        color="primary" onClick={() => navigate("/recipe-form")} >Receta Nueva</Button>
      <Grid container spacing={2}>
        {recipes.map((recipe) => (
          <Grid size={12} key={recipe.id}>
            <Card>
              <CardContent
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <Typography variant="h6">{recipe.name}</Typography>
                  <Typography variant="body1">Instrucciones: {recipe.instructions}</Typography>
                  <Typography variant="body2" style={{ marginTop: 10 }}>
                    Ingredientes:
                  </Typography>
                  <ul>
                    {recipe.ingredients.map((ingredient) => (
                      <li key={ingredient.id}>
                        {ingredient.quantity} {ingredient.unit} de {ingredient.name}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <IconButton
                    color="primary"
                    onClick={() => handleEditRecipe(recipe)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDeleteRecipe(recipe.id)}
                  >
                    <Delete />
                  </IconButton>
                </div>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modal para edición */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
          }}
        >
          {editRecipe && (
            <div key={editRecipe.id}>
              <Typography variant="h6">Editar Receta</Typography>
              <TextField
                fullWidth
                label="Nombre de la receta"
                value={editRecipe.name}
                onChange={(e) =>
                  setEditRecipe({ ...editRecipe, name: e.target.value })
                }
                style={{ marginBottom: 10 }}
              />
              <TextField
                fullWidth
                label="Instrucciones"
                multiline
                rows={3}
                value={editRecipe.instructions}
                onChange={(e) =>
                  setEditRecipe({ ...editRecipe, instructions: e.target.value })
                }
                style={{ marginBottom: 10 }}
              />
              <Typography variant="body2" style={{ marginBottom: 10 }}>
                Ingredientes:
              </Typography>
              {editRecipe.ingredients.map((ingredient, index) => (
                <div className="mb-2">
                  <Grid container spacing={2} key={index} >
                    <Grid size={6}>
                      <TextField
                        fullWidth
                        label="Nombre del ingrediente"
                        value={ingredient.name}
                        onChange={(e) =>
                          handleIngredientChange(index, 'name', e.target.value)
                        }
                      />
                    </Grid>
                    <Grid size={3}>
                      <TextField
                        type="number"
                        fullWidth
                        label="Cantidad"
                        value={ingredient.quantity}
                        onChange={(e) =>
                          handleIngredientChange(index, 'quantity', Number(e.target.value))
                        }
                      />
                    </Grid>
                    <Grid size={3}>
                      <TextField
                        fullWidth
                        label="Unidad"
                        value={ingredient.unit}
                        disabled
                      />
                    </Grid>
                  </Grid>
                  <br></br>
                </div>
              ))}
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleSaveRecipe}
                style={{ marginTop: 20 }}
              >
                Guardar Cambios
              </Button>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default RecipeList;

