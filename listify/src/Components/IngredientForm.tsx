"use client";

import React, { useState } from 'react';
import { Button, TextField, Grid2 as Grid, Typography, Snackbar, MenuItem, Select, FormControl, InputLabel } from '@mui/material';

interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
  price: number;
}

const IngredientForm: React.FC = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState<number | ''>('');
  const [unit, setUnit] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [successMessage, setSuccessMessage] = useState(false);

  const units = ['kg', 'g', 'L', 'mL', 'unidad', 'paquete', 'botella', 'lata']; 

  const handleAddIngredient = () => {
    if (name && quantity && unit && price) {
      const newIngredient: Ingredient = {
        name,
        quantity: Number(quantity),
        unit,
        price: Number(price),
      };
      setIngredients([...ingredients, newIngredient]);

      setSuccessMessage(true);

      setName('');
      setQuantity('');
      setUnit('');
      setPrice('');
    } else {
      alert('Por favor, completa todos los campos.');
    }
  };

  const handleClose = () => {
    setSuccessMessage(false);
  };

  return (
    <div>
      <Typography variant="h6">Añadir Ingrediente</Typography>
      <Grid container spacing={2}>
        <Grid size={12}>
          <TextField
            fullWidth
            label="Nombre del ingrediente"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Grid>
        <Grid size={6}>
          <TextField
            fullWidth
            label="Cantidad"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </Grid>
        <Grid size={6}>
          <FormControl fullWidth>
            <InputLabel id="unit-label">Unidad</InputLabel>
            <Select
              labelId="unit-label"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              label="Unidad"
            >
              {units.map((unitOption) => (
                <MenuItem key={unitOption} value={unitOption}>
                  {unitOption}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid size={6}>
          <TextField
            fullWidth
            label="Precio"
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </Grid>
        <Grid size={6}>
          <Button fullWidth variant="contained" onClick={handleAddIngredient}>
            Añadir Ingrediente
          </Button>
        </Grid>
      </Grid>
      <Snackbar
        open={successMessage}
        autoHideDuration={3000}
        onClose={handleClose}
        message="Ingrediente añadido con éxito"
      /> 
      {/* Esto seria la lista de agregados quizas podemos quitarlos luego*/}
      <Typography variant="h6" style={{ marginTop: '20px' }}>
        Ingredientes Añadidos:
      </Typography>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient.quantity} {ingredient.unit} de {ingredient.name} a ${ingredient.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default IngredientForm;
