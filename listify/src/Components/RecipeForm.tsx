'use client'
import React, { useEffect, useState } from 'react';
import {
  Button,
  TextField,
  Grid2 as Grid,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import { Ingredient } from '@/src/Models/Ingredient';
import { navigate } from '@/src/Actions/Navigate';
import useUserStore from '@/context/userContext';

interface RecipeItem {
  ingredientId: string;
  name: string;
  quantity: number;
  unit: string;
}

const RecipeForm: React.FC = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [selectedIngredient, setSelectedIngredient] = useState<string | null>(null);
  const [newQuantity, setNewQuantity] = useState<number | ''>('');
  const [instructions, setInstructions] = useState<string>(''); // Campo de instrucciones
  const [recipe, setRecipe] = useState<RecipeItem[]>([]); // Almacenar la receta
  const [name, setName] = useState<string>('');
  const { userId } = useUserStore();

  useEffect(() => {
    async function fetchIngredientes() {
      const response = await fetch(`/api/ingredient?userId=${userId}`);
      const result = await response.json() as Ingredient[];

      console.log(result);
      setIngredients(result);
    };
    if (userId)
      fetchIngredientes();
  }, [userId]);

  const handleAddToRecipe = () => {
    if (selectedIngredient !== null && newQuantity !== '') {
      const ingredient = ingredients.find(ing => ing.id === selectedIngredient);
      if (ingredient) {
        const newRecipeItem: RecipeItem = {
          ingredientId: ingredient.id ?? '',
          name: ingredient.name,
          quantity: Number(newQuantity),
          unit: ingredient.measurementUnit,
        };
        setRecipe([...recipe, newRecipeItem]);
        resetForm();
      }
    } else {
      alert('Por favor selecciona un ingrediente y una cantidad.');
    }
  };

  const resetForm = () => {
    setSelectedIngredient(null);
    setNewQuantity('');
  };

  const handleSaveRecipe = async () => {
    if (recipe.length === 0 || instructions.trim() === '') {
      alert('Por favor asegúrate de que la receta tiene ingredientes e instrucciones.');
    } else {
      
      const response = await fetch('/api/recipe', {
        method: 'POST',
        cache: "reload",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId , ingredientsIds: recipe.map(i => i.ingredientId), name, instructions }),
      });

      if (response.ok) {
        console.log('Receta Guardada:', { recipe, instructions });
 
      } else {
        alert("El ingrediente no se pudo crear");
      }
      alert('Receta guardada con éxito');
      // aca luego enviamos a la base de datos.
      navigate('/recipes');
    }
  };

  return (
    <div>
      <Typography variant="h6">Crear Receta</Typography>
      <Grid container spacing={2}>
      <Grid size={12}>
          <TextField
            label="Nombre"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid size={12}>
          <FormControl fullWidth>
            <InputLabel>Ingrediente</InputLabel>
            <Select
              value={selectedIngredient ?? ''}
              onChange={(e) => setSelectedIngredient(e.target.value)}
              fullWidth
            >
              {ingredients.map((ingredient) => (
                <MenuItem key={ingredient.id} value={ingredient.id}>
                  {ingredient.name} ({ingredient.measurementUnit})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={6}>
          <TextField
            fullWidth
            label="Cantidad"
            type="number"
            value={newQuantity}
            onChange={(e) => setNewQuantity(Number(e.target.value))}
            disabled={selectedIngredient === null}
          />
        </Grid>
        <Grid size={12}>
          <Button variant="contained" onClick={handleAddToRecipe} disabled={selectedIngredient === null}>
            Añadir Ingrediente
          </Button>
        </Grid>
        <Grid size={12}>
          <TextField
            label="Instrucciones"
            multiline
            rows={4}
            fullWidth
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
          />
        </Grid>
        <Grid size={12}>
          <Button variant="contained" color="primary" onClick={handleSaveRecipe}>
            Guardar Receta
          </Button>
        </Grid>
      </Grid>

      <Typography variant="h6" style={{ marginTop: 20 }}>
        Ingredientes de la Receta:
      </Typography>
      {recipe.length > 0 ? (
        <ul>
          {recipe.map((item, index) => (
            <li key={index}>
              {item.quantity} {item.unit} de {item.name}
            </li>
          ))}
        </ul>
      ) : (
        <Typography variant="body1">No se han añadido ingredientes aún.</Typography>
      )}
    </div>
  );
};

export default RecipeForm;