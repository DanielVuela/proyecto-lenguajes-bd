'use client';
import React, { useEffect, useState } from 'react';
import { Button, TextField, Grid2 as Grid, Typography, Card, CardContent, IconButton, Modal, Box } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { navigate } from '../Actions/Navigate';
import useUserStore from '@/context/userContext';

interface Ingredient {
  id?: number;
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
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  const [isEditing, setIsEditing] = useState<number | null>(null);
  const [editRecipe, setEditRecipe] = useState<Recipe | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { userId } = useUserStore();

  useEffect(() => {
    async function fetchRecipes() {
      console.log(userId);
      const response = await fetch(`/api/recipe?userId=${userId}`);
      const result = await response.json();
      let recipesParsed: Recipe[] = [];
      console.log(result);
      result.forEach((recipeEntry: { ingredientid:number ;recipeId: number; ingredientName: any; measurementUnit: any; recipeName: any; recipeDescription: any; }) => {
        const finding = recipesParsed.find(r => recipeEntry.recipeId === r.id)
        if (finding) {
          finding.ingredients.push({ name: recipeEntry.ingredientName, unit: recipeEntry.measurementUnit, quantity: 1, id: recipeEntry.ingredientid })
        }
        else {
          recipesParsed.push({
            id: recipeEntry.recipeId,
            name: recipeEntry.recipeName,
            instructions: recipeEntry.recipeDescription,
            ingredients: [{ name: recipeEntry.ingredientName, unit: recipeEntry.measurementUnit, quantity: 1, id: recipeEntry.ingredientid }]
          })
        }
        setRecipes(recipesParsed);
      });
    };
    if (userId)
      fetchRecipes();
  }, [userId]);

  const handleDeleteRecipe = async (recipeId: number) => {
    // const updatedIngredients = ingredients.filter((ingredient) => ingredient.id !== id);
        const response = await fetch('/api/recipe', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify( { id: recipeId } ),
        });
        console.log(response);
        if (response.ok) {
          alert("borrado con exito");
        } else {
          alert("Error al cerrar la sesion");
        }
    // setIngredients(updatedIngredients);
  };

  const handleEditRecipe = (recipe: Recipe) => {
    setIsEditing(recipe.id);
    setEditRecipe({ ...recipe });
    setModalOpen(true);
  };

  const handleSaveRecipe = async () => {
    if (editRecipe) {
      console.log(editRecipe);
      const response = await fetch('/api/recipe', {
        method: 'PUT',
        cache: "reload",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id : editRecipe.id,userId , ingredientsIds: editRecipe.ingredients.map(i => i.id), name: editRecipe.name , instructions: editRecipe.instructions }),
      });

      if (response.ok) {
        console.log('Receta Guardada:', { editRecipe});
 
      } else {
        alert("La receta no se pudo actulizar");
      }
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
      <Typography variant="h6">Recetario</Typography>
      <Button variant="contained"
        color="primary" onClick={() => navigate('/recipe-form')} >Receta Nueva</Button>
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
                    {recipe.ingredients.map((ingredient, i) => (
                      <li key={`${ingredient.name}-${i}`}>
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

